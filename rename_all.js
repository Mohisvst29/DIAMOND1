const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replacements
  content = content.replace(/DGR Diamond Growth/g, "Diamond Growth");
  content = content.replace(/DGR /g, ""); // "شركة DGR " -> "شركة "
  content = content.replace(/DGR/g, "Diamond Growth");
  content = content.replace(/صالح الأزهري/g, "Diamond Growth");
  content = content.replace(/صالح الازهري/g, "Diamond Growth");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === '.gitkeep') {
      continue;
    }
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, 'components'));
traverse(path.join(__dirname, 'app'));
traverse(path.join(__dirname, 'lib'));
traverse(path.join(__dirname, 'models'));

console.log("Done");
