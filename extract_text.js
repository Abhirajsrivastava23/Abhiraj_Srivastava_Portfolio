const fs = require('fs');
const html = fs.readFileSync('c:/Users/ADMIN/Downloads/anjila-portfolio/anjila-portfolio/scratch_parsed.txt', 'utf8');

// A very simple regex to strip all HTML tags
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log(text.substring(0, 5000));
