const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;
const readmePath = path.join(repoRoot, 'README.md');

const problemRegex = /\* Problem:\s*(.*)/;
const difficultyRegex = /\* Difficulty:\s*(.*)/;
const dailyRegex = /\* Daily:\s*(.*)/i;
const dateRegex = /\* Date:\s*(.*)/;
const linkRegex = /\* Link:\s*(.*)/;
const categoryRegex = /\* Category:\s*(.*)/i;

// Mapa de extensiones soportadas
const languageMap = {
    '.js': 'JavaScript',
    '.py': 'Python',
    '.java': 'Java',
    '.cpp': 'C++'
};

function generateTable() {
    let tableLines = [
        '| # | Problema | Dificultad | Categoría | Fecha | Lenguaje | Enlace |',
        '| :--- | :--- | :--- | :--- | :--- | :--- | :--- |'
    ];

    const items = fs.readdirSync(repoRoot);
    const folders = items.filter(item => {
        return fs.statSync(path.join(repoRoot, item)).isDirectory() && /^\d+_/.test(item);
    });

    // array vacio para almacenar los datos de los problemas antes de ordenarlos
    let problemsData = [];

    folders.forEach(folder => {
        const folderPath = path.join(repoRoot, folder);
        
        const files = fs.readdirSync(folderPath).filter(file => {
            const ext = path.extname(file);
            return languageMap.hasOwnProperty(ext);
        });

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const problemMatch = content.match(problemRegex);
            const difficultyMatch = content.match(difficultyRegex);
            const dailyMatch = content.match(dailyRegex);
            const dateMatch = content.match(dateRegex);
            const linkMatch = content.match(linkRegex);
            const categoryMatch = content.match(categoryRegex);

            if (problemMatch && difficultyMatch) {
                const isDaily = dailyMatch && dailyMatch[1].trim().toLowerCase() === 'yes';

                if (isDaily) {
                    const problem = problemMatch[1].trim();
                    const difficulty = difficultyMatch[1].trim();
                    const dateStr = dateMatch ? dateMatch[1].trim() : '-';
                    const link = linkMatch ? linkMatch[1].trim() : '#';
                    const leetcodeLink = link !== '#' ? `[Ir a LeetCode](${link})` : '-';
                    const categoryName = categoryMatch ? categoryMatch[1].trim() : folder.replace(/^\d+_/, '').replace(/_/g, ' ');
                    const relativePath = `./${folder}/${file}`.replace(/ /g, '%20');
                    const ext = path.extname(file);
                    const langName = languageMap[ext];

                    // conversión de la fecha a timestamp para ordenamiento
                    let timestamp = 0;
                    if (dateStr !== '-') {
                        const parts = dateStr.split('/');
                        if (parts.length === 3) {
                            // JS Date usa (Año, Mes [0-11], Día)
                            timestamp = new Date(parts[2], parts[1] - 1, parts[0]).getTime();
                        }
                    }

                    problemsData.push({
                        problem, difficulty, categoryName, dateStr, timestamp, langName, relativePath, leetcodeLink
                    });
                }
            }
        });
    });

    // ordenamiento por fecha (timestamp) de menor a mayor
    problemsData.sort((a, b) => a.timestamp - b.timestamp);

    // se recorre el array ordenado para generar las filas de la tabla
    problemsData.forEach((data, index) => {
        const count = index + 1;
        tableLines.push(`| ${count} | ${data.problem} | ${data.difficulty} | ${data.categoryName} | ${data.dateStr} | [${data.langName}](${data.relativePath}) | ${data.leetcodeLink} |`);
    });

    return tableLines.join('\n');
}

function updateReadme() {
    const currentReadme = fs.readFileSync(readmePath, 'utf-8');
    
    const startMarker = '<!-- TABLE_START -->';
    const endMarker = '<!-- TABLE_END -->';

    const startIndex = currentReadme.indexOf(startMarker);
    const endIndex = currentReadme.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
        console.error("No se encontraron los marcadores ocultos HTML en el README.md");
        return;
    }

    const beforeTable = currentReadme.slice(0, startIndex + startMarker.length);
    const afterTable = currentReadme.slice(endIndex);
    
    const newTable = '\n' + generateTable() + '\n';
    
    const newReadme = beforeTable + newTable + afterTable;
    
    fs.writeFileSync(readmePath, newReadme);
    console.log("README.md actualizado exitosamente con la nueva tabla :D");
}

updateReadme();