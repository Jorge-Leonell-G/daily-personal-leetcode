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

    let dailyCount = 1; 

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
                // se evalua si el problema es tipo daily
                const isDaily = dailyMatch && dailyMatch[1].trim().toLowerCase() === 'yes';

                // Solo se procesa y agrega a la tabla si isDaily es verdadero
                if (isDaily) {
                    const problem = problemMatch[1].trim();
                    const difficulty = difficultyMatch[1].trim();
                    
                    const date = dateMatch ? dateMatch[1].trim() : '-';
                    const link = linkMatch ? linkMatch[1].trim() : '#';
                    const leetcodeLink = link !== '#' ? `[Ir a LeetCode](${link})` : '-';
                    
                    const categoryName = categoryMatch ? categoryMatch[1].trim() : folder.replace(/^\d+_/, '').replace(/_/g, ' ');
                    
                    const relativePath = `./${folder}/${file}`.replace(/ /g, '%20');
                    const ext = path.extname(file);
                    const langName = languageMap[ext];

                    // dailyCount al inicio de la fila 
                    tableLines.push(`| ${dailyCount} | ${problem} | ${difficulty} | ${categoryName} | ${date} | [${langName}](${relativePath}) | ${leetcodeLink} |`);
                    
                    dailyCount++;
                }
            }
        });
    });

    return tableLines.join('\n');
}

function updateReadme() {
    const currentReadme = fs.readFileSync(readmePath, 'utf-8');
    
    const startMarker = '<!-- START TABLE -->';
    const endMarker = '<!-- END TABLE -->';

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