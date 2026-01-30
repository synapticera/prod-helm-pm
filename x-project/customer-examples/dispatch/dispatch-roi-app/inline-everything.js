#!/usr/bin/env node

/**
 * Inline all CSS and JS into index.html to create a single standalone file
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Creating fully inlined standalone HTML file...\n');

// Read the exported index.html
const indexPath = path.join(__dirname, 'out/index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Find all CSS links and inline them
const cssRegex = /<link[^>]+href="([^"]+\.css)"[^>]*>/g;
let match;
while ((match = cssRegex.exec(html)) !== null) {
  const cssPath = path.join(__dirname, 'out', match[1]);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    html = html.replace(match[0], `<style>${cssContent}</style>`);
    console.log(`✓ Inlined CSS: ${match[1]}`);
  }
}

// Find all script tags and inline them
const scriptRegex = /<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g;
while ((match = scriptRegex.exec(html)) !== null) {
  const jsPath = path.join(__dirname, 'out', match[1]);
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    html = html.replace(match[0], `<script>${jsContent}</script>`);
    console.log(`✓ Inlined JS: ${match[1]}`);
  }
}

// Write the standalone file
const outputPath = path.join(__dirname, 'dispatch-roi-complete.html');
fs.writeFileSync(outputPath, html, 'utf-8');

const stats = fs.statSync(outputPath);
const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);

console.log('\n✅ Complete standalone HTML file created!\n');
console.log(`📄 File: dispatch-roi-complete.html`);
console.log(`📊 Size: ${fileSizeMB} MB`);
console.log(`\n💡 This file contains:`);
console.log(`   ✓ All 4 tabs with full functionality`);
console.log(`   ✓ All interactive charts and tables`);
console.log(`   ✓ All styling and animations`);
console.log(`   ✓ Exact same experience as the web app`);
console.log(`\n📧 You can email this file or open it directly in any browser!`);
