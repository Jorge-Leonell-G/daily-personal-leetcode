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
        '| Problema | Dificultad | Categoría | Fecha | Lenguaje | Enlace |',
        '| :--- | :--- | :--- | :--- | :--- | :--- |'
    ];

    const items = fs.readdirSync(repoRoot);
    const folders = items.filter(item => {
        return fs.statSync(path.join(repoRoot, item)).isDirectory() && /^\d+_/.test(item);
    });

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
                const problem = problemMatch[1].trim();
                const difficulty = difficultyMatch[1].trim();
                
                const isDaily = dailyMatch && dailyMatch[1].trim().toLowerCase() === 'yes';
                const displayProblem = isDaily ? `🌟 ${problem}` : problem;
                
                const date = dateMatch ? dateMatch[1].trim() : '-';
                const link = linkMatch ? linkMatch[1].trim() : '#';
                const leetcodeLink = link !== '#' ? `[Ir a LeetCode](${link})` : '-';
                
                // Se emplea la categoría del comentario. Si no existe, entonces se usa el nombre de la carpeta por defecto
                const categoryName = categoryMatch ? categoryMatch[1].trim() : folder.replace(/^\d+_/, '').replace(/_/g, ' ');
                
                const relativePath = `./${folder}/${file}`.replace(/ /g, '%20');
                const ext = path.extname(file);
                const langName = languageMap[ext];

                tableLines.push(`| ${displayProblem} | ${difficulty} | ${categoryName} | ${date} | [${langName}](${relativePath}) | ${leetcodeLink} |`);
            }
        });
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