const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;
const readmePath = path.join(repoRoot, 'README.md'); // ruta al README.md al mismo nivel del script

// regex para busqueda de la etiqueta "Daily"
const problemRegex = /\* Problem:\s*(.*)/;
const difficultyRegex = /\* Difficulty:\s*(.*)/;
const dailyRegex = /\* Daily:\s*(.*)/i; 

function generateTable() {
    let tableLines = [
        '| Problema | Dificultad | Categoría | Solución |',
        '| :--- | :--- | :--- | :--- |'
    ];

    const items = fs.readdirSync(repoRoot);
    const folders = items.filter(item => {
        return fs.statSync(path.join(repoRoot, item)).isDirectory() && /^\d+_/.test(item);
    });

    folders.forEach(folder => {
        const folderPath = path.join(repoRoot, folder);
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        const categoryName = folder.replace(/^\d+_/, '').replace(/_/g, ' ');

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const problemMatch = content.match(problemRegex);
            const difficultyMatch = content.match(difficultyRegex);
            
            const dailyMatch = content.match(dailyRegex); //match para coincidencia de la etiqueta "Daily"

            if (problemMatch && difficultyMatch) {
                const problem = problemMatch[1].trim();
                const difficulty = difficultyMatch[1].trim();
                
                const isDaily = dailyMatch && dailyMatch[1].trim().toLowerCase() === 'yes';
                
                // icono para distinguir problemas diarios
                const displayProblem = isDaily ? `🌟 ${problem}` : problem;
                
                const relativePath = `./${folder}/${file}`.replace(/ /g, '%20');

                tableLines.push(`| ${displayProblem} | ${difficulty} | ${categoryName} | [JavaScript](${relativePath}) |`);
            }
        });
    });

    return tableLines.join('\n');
}

function updateReadme() {
    const currentReadme = fs.readFileSync(readmePath, 'utf-8');
    
    // marcadores para identificar dónde insertar la tabla en el README.md
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
    console.log("README.md file updated successfully!");
}

updateReadme();