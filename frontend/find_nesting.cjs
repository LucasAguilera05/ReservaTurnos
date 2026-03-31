const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

console.log("Searching for invalid HTML nesting...");

walkDir('c:\\Users\\orellanal\\Documents\\lucas\\Sistema de Turnos\\ReservaTurnos\\frontend\\src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find <p> wrapping block elements
    let pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/g;
    let match;
    while ((match = pRegex.exec(content)) !== null) {
      let innerText = match[1];
      if (/<(div|h[1-6]|ul|ol|li|dl|table|blockquote|pre|form|fieldset|hr|Col|Row|Container)\b/i.test(innerText) || /<p\b/i.test(innerText)) {
         console.log('⚠️ BLOCK INSIDE <p> found in: ' + filePath);
         let startIdx = content.lastIndexOf('\n', match.index) + 1;
         let lineNumber = content.substring(0, startIdx).split('\n').length;
         console.log('Line ' + lineNumber + ':\n' + match[0].trim().substring(0, 300) + '\n');
      }
    }

    // Find <a> wrapping <a>
    let aRegex = /<a[^>]*>([\s\S]*?)<\/a>/g;
    while ((match = aRegex.exec(content)) !== null) {
        let innerText = match[1];
        if (/<a[>\s]/i.test(innerText)) {
            console.log('⚠️ <a> INSIDE <a> found in: ' + filePath);
            let startIdx = content.lastIndexOf('\n', match.index) + 1;
            let lineNumber = content.substring(0, startIdx).split('\n').length;
            console.log('Line ' + lineNumber + ':\n' + match[0].trim().substring(0, 300) + '\n');
        }
    }
    
    // Check missing tbody (Table rows directly inside table)
    let trRegex = /<table[^>]*>([\s\S]*?)<\/table>/g;
    while ((match = trRegex.exec(content)) !== null) {
        let innerText = match[1];
        if (!/<tbody/i.test(innerText) && !/<thead/i.test(innerText) && /<tr/i.test(innerText)) {
            console.log('⚠️ <tr> directly inside <table> (missing tbody) found in: ' + filePath);
            let startIdx = content.lastIndexOf('\n', match.index) + 1;
            let lineNumber = content.substring(0, startIdx).split('\n').length;
            console.log('Line ' + lineNumber + '\n');
        }
    }
  }
});
console.log("Done.");
