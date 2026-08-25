const fs = require('fs');
fetch('https://rajadityaaa23-portfolio.netlify.app/')
  .then(res => res.text())
  .then(html => {
    const links = html.match(/href="([^"]+)"/g);
    console.log("LINKS:");
    if (links) console.log(links.join('\n'));
    
    // Also try to find JSON or other data blocks
    const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
    console.log("\nSCRIPTS length:", scripts ? scripts.length : 0);
    fs.writeFileSync('c:/Users/ADMIN/Downloads/anjila-portfolio/anjila-portfolio/scratch_parsed.txt', html);
  });
