const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;
const readmePath = path.join(repoRoot, 'README.md');

const problemRegex = /\* Problem:\s*(.*)/;
const difficultyRegex = /\* Difficulty:\s*(.*)/;
const dailyRegex = /\* Daily:\s*(.*)/i;
const dateRegex = /\* Date:\s*(.*)/;
const linkRegex = /\* Link:\s*(.*)/;

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
        
        // se revisa si el archivo es de un lenguaje soportado antes de procesarlo
        const files = fs.readdirSync(folderPath).filter(file => {
            const ext = path.extname(file);
            return languageMap.hasOwnProperty(ext);
        });
        
        const categoryName = folder.replace(/^\d+_/, '').replace(/_/g, ' ');

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const problemMatch = content.match(problemRegex);
            const difficultyMatch = content.match(difficultyRegex);
            const dailyMatch = content.match(dailyRegex);
            const dateMatch = content.match(dateRegex);
            const linkMatch = content.match(linkRegex);

            if (problemMatch && difficultyMatch) {
                const problem = problemMatch[1].trim();
                const difficulty = difficultyMatch[1].trim();
                
                const isDaily = dailyMatch && dailyMatch[1].trim().toLowerCase() === 'yes';
                const displayProblem = isDaily ? `🌟 ${problem}` : problem;
                
                const date = dateMatch ? dateMatch[1].trim() : '-';
                const link = linkMatch ? linkMatch[1].trim() : '#';
                const leetcodeLink = link !== '#' ? `[Ir a LeetCode](${link})` : '-';
                
                const relativePath = `./${folder}/${file}`.replace(/ /g, '%20');
                
                // se obtiene la extensión del archivo para determinar el lenguaje
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
    
    const startMarker = '';
    const endMarker = '';

    const startIndex = currentReadme.indexOf(startMarker);
    const endIndex = currentReadme.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
        console.error("No se encontraron los marcadores y en el README.md");
        return;
    }

    const beforeTable = currentReadme.slice(0, startIndex + startMarker.length);
    const afterTable = currentReadme.slice(endIndex);
    
    const newTable = '\n' + generateTable() + '\n';
    
    const newReadme = beforeTable + newTable + afterTable;
    
    fs.writeFileSync(readmePath, newReadme);
    console.log("README.md actualizado exitosamente con la nueva tabla.");
}

updateReadme();