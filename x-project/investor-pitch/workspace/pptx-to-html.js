const fs = require('fs');
const path = require('path');
const { DOMParser } = require('@xmldom/xmldom');

// Constants
const EMU_PER_INCH = 914400;
const SLIDE_WIDTH_EMU = 12192000;  // 16:9 = 13.33"
const SLIDE_HEIGHT_EMU = 6858000; // 16:9 = 7.5"

// Synaptic brand colors
const themeColors = {
  dk1: '07253D', lt1: 'FFFFFF', dk2: '44546A', lt2: 'E7E6E6',
  accent1: '01A9DB', accent2: 'FB4100', accent3: 'E9E9E9',
  accent4: '3F3A93', accent5: '009E5F', accent6: 'BABBBF',
  tx1: '07253D', tx2: '44546A', bg1: 'FFFFFF', bg2: 'E7E6E6'
};

const schemeMap = {
  'dk1': 'dk1', 'lt1': 'lt1', 'dk2': 'dk2', 'lt2': 'lt2',
  'accent1': 'accent1', 'accent2': 'accent2', 'accent3': 'accent3',
  'accent4': 'accent4', 'accent5': 'accent5', 'accent6': 'accent6',
  'tx1': 'tx1', 'tx2': 'tx2', 'bg1': 'bg1', 'bg2': 'bg2',
  'hlink': 'accent1', 'folHlink': 'accent4'
};

function resolveSchemeColor(val) {
  const mapped = schemeMap[val] || val;
  return themeColors[mapped] || themeColors.dk1;
}

function emuToPercent(emu, total) {
  return (emu / total) * 100;
}

function emuToPx(emu, totalEmu, totalPx) {
  return (emu / totalEmu) * totalPx;
}

function getAttr(node, name) {
  return node && node.getAttribute ? node.getAttribute(name) : null;
}

function findChild(node, localName) {
  if (!node || !node.childNodes) return null;
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (child.localName === localName) return child;
  }
  return null;
}

function findAllChildren(node, localName) {
  const results = [];
  if (!node || !node.childNodes) return results;
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (child.localName === localName) results.push(child);
  }
  return results;
}

function findDescendant(node, ...path) {
  let current = node;
  for (const name of path) {
    current = findChild(current, name);
    if (!current) return null;
  }
  return current;
}

function getTransform(spPr) {
  const xfrm = findChild(spPr, 'xfrm');
  if (!xfrm) return null;
  const off = findChild(xfrm, 'off');
  const ext = findChild(xfrm, 'ext');
  if (!off || !ext) return null;
  return {
    x: parseInt(getAttr(off, 'x') || '0'),
    y: parseInt(getAttr(off, 'y') || '0'),
    cx: parseInt(getAttr(ext, 'cx') || '0'),
    cy: parseInt(getAttr(ext, 'cy') || '0')
  };
}

function extractTextFromTxBody(txBody) {
  if (!txBody) return [];
  const paragraphs = [];
  const pNodes = findAllChildren(txBody, 'p');

  for (const p of pNodes) {
    let text = '';
    let color = null;
    let fontSize = null;
    let bold = false;
    let align = 'left';

    const pPr = findChild(p, 'pPr');
    if (pPr) {
      const algn = getAttr(pPr, 'algn');
      if (algn === 'ctr') align = 'center';
      else if (algn === 'r') align = 'right';
    }

    for (let i = 0; i < p.childNodes.length; i++) {
      const child = p.childNodes[i];
      if (child.localName === 'r') {
        const rPr = findChild(child, 'rPr');
        if (rPr) {
          const sz = getAttr(rPr, 'sz');
          if (sz) fontSize = parseInt(sz) / 100;
          const b = getAttr(rPr, 'b');
          if (b === '1') bold = true;

          const solidFill = findChild(rPr, 'solidFill');
          if (solidFill) {
            const schemeClr = findChild(solidFill, 'schemeClr');
            const srgbClr = findChild(solidFill, 'srgbClr');
            if (schemeClr) color = resolveSchemeColor(getAttr(schemeClr, 'val'));
            else if (srgbClr) color = getAttr(srgbClr, 'val');
          }
        }
        const t = findChild(child, 't');
        if (t && t.textContent) text += t.textContent;
      } else if (child.localName === 'fld') {
        const t = findChild(child, 't');
        if (t && t.textContent) text += t.textContent;
      }
    }

    if (text.trim()) {
      paragraphs.push({ text: text.trim(), color, fontSize, bold, align });
    }
  }
  return paragraphs;
}

function parseRelationships(relsPath) {
  if (!fs.existsSync(relsPath)) return {};
  const xml = fs.readFileSync(relsPath, 'utf8');
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  const rels = {};
  const relNodes = doc.getElementsByTagName('Relationship');
  for (let i = 0; i < relNodes.length; i++) {
    const rel = relNodes[i];
    const id = rel.getAttribute('Id');
    const target = rel.getAttribute('Target');
    const type = rel.getAttribute('Type');
    if (type && type.includes('image')) {
      rels[id] = target.replace('../media/', '');
    }
  }
  return rels;
}

function parseSolidFill(fillNode) {
  if (!fillNode) return null;
  const schemeClr = findChild(fillNode, 'schemeClr');
  const srgbClr = findChild(fillNode, 'srgbClr');
  if (schemeClr) return resolveSchemeColor(getAttr(schemeClr, 'val'));
  if (srgbClr) return getAttr(srgbClr, 'val');
  return null;
}

function parseSlide(slideNum, unpackedDir) {
  const slidePath = path.join(unpackedDir, 'ppt', 'slides', `slide${slideNum}.xml`);
  const relsPath = path.join(unpackedDir, 'ppt', 'slides', '_rels', `slide${slideNum}.xml.rels`);

  if (!fs.existsSync(slidePath)) return null;

  const xml = fs.readFileSync(slidePath, 'utf8');
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  const rels = parseRelationships(relsPath);

  const elements = [];

  // Find spTree
  const sld = doc.documentElement;
  const cSld = findChild(sld, 'cSld');
  const spTree = findChild(cSld, 'spTree');
  if (!spTree) return { elements };

  // Process all children
  for (let i = 0; i < spTree.childNodes.length; i++) {
    const node = spTree.childNodes[i];
    const nodeName = node.localName;

    if (nodeName === 'sp') {
      // Shape or text box
      const nvSpPr = findChild(node, 'nvSpPr');
      const cNvPr = findChild(nvSpPr, 'cNvPr');
      const name = getAttr(cNvPr, 'name') || '';

      const spPr = findChild(node, 'spPr');
      const txBody = findChild(node, 'txBody');

      const transform = getTransform(spPr);
      if (!transform) continue;

      // Get fill color
      let fillColor = null;
      const solidFill = findChild(spPr, 'solidFill');
      if (solidFill) fillColor = parseSolidFill(solidFill);

      // Get shape type
      const prstGeom = findChild(spPr, 'prstGeom');
      const shapeType = prstGeom ? getAttr(prstGeom, 'prst') : 'rect';

      const paragraphs = extractTextFromTxBody(txBody);

      // Check if it's a placeholder
      const nvPr = findChild(nvSpPr, 'nvPr');
      const ph = findChild(nvPr, 'ph');
      const phType = ph ? getAttr(ph, 'type') : null;

      // Skip slide numbers
      if (phType === 'sldNum') continue;

      elements.push({
        type: 'shape',
        name,
        shapeType,
        phType,
        x: transform.x, y: transform.y,
        cx: transform.cx, cy: transform.cy,
        fillColor,
        paragraphs
      });

    } else if (nodeName === 'pic') {
      // Picture
      const nvPicPr = findChild(node, 'nvPicPr');
      const cNvPr = findChild(nvPicPr, 'cNvPr');
      const name = getAttr(cNvPr, 'name') || '';

      const blipFill = findChild(node, 'blipFill');
      const blip = findChild(blipFill, 'blip');
      const embedId = blip ? getAttr(blip, 'r:embed') : null;

      const spPr = findChild(node, 'spPr');
      const transform = getTransform(spPr);
      if (!transform) continue;

      const imageSrc = embedId && rels[embedId] ? rels[embedId] : null;

      elements.push({
        type: 'picture',
        name,
        x: transform.x, y: transform.y,
        cx: transform.cx, cy: transform.cy,
        imageSrc
      });

    } else if (nodeName === 'cxnSp') {
      // Connector/line
      const spPr = findChild(node, 'spPr');
      const transform = getTransform(spPr);
      if (!transform) continue;

      const ln = findChild(spPr, 'ln');
      let lineColor = themeColors.dk1;
      if (ln) {
        const solidFill = findChild(ln, 'solidFill');
        if (solidFill) lineColor = parseSolidFill(solidFill) || lineColor;
      }

      elements.push({
        type: 'connector',
        x: transform.x, y: transform.y,
        cx: transform.cx, cy: transform.cy,
        lineColor
      });

    } else if (nodeName === 'grpSp') {
      // Group - could recurse but skipping for now
    }
  }

  return { elements };
}

function generateSlideHtml(slideData, slideNum, slideWidth, slideHeight) {
  let html = '';

  for (const el of slideData.elements) {
    const left = emuToPx(el.x, SLIDE_WIDTH_EMU, slideWidth);
    const top = emuToPx(el.y, SLIDE_HEIGHT_EMU, slideHeight);
    const width = emuToPx(el.cx, SLIDE_WIDTH_EMU, slideWidth);
    const height = emuToPx(el.cy, SLIDE_HEIGHT_EMU, slideHeight);

    if (el.type === 'picture' && el.imageSrc) {
      html += `<img src="media/${el.imageSrc}" style="position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;object-fit:contain;">\n`;
    } else if (el.type === 'shape') {
      const bgColor = el.fillColor ? `background:#${el.fillColor};` : '';
      let borderRadius = '';
      if (el.shapeType === 'ellipse' || el.shapeType === 'oval') borderRadius = 'border-radius:50%;';
      else if (el.shapeType === 'roundRect') borderRadius = 'border-radius:8px;';

      // For chevrons, use a simple representation
      if (el.shapeType === 'chevron') {
        borderRadius = 'clip-path:polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%, 25% 50%);';
      }

      if (el.paragraphs.length > 0 || bgColor) {
        html += `<div style="position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;${bgColor}${borderRadius}display:flex;flex-direction:column;justify-content:center;overflow:hidden;">\n`;

        for (const p of el.paragraphs) {
          const color = p.color ? `color:#${p.color};` : '';
          const fontSize = p.fontSize ? `font-size:${Math.min(p.fontSize, 40) * 0.9}px;` : '';
          const fontWeight = p.bold ? 'font-weight:bold;' : '';
          const textAlign = `text-align:${p.align};`;

          // Determine class based on placeholder type
          let className = 'body-text';
          if (el.phType === 'title' || el.phType === 'ctrTitle') className = 'slide-title';
          else if (el.phType === 'subTitle') className = 'slide-subtitle';
          else if (el.phType === 'ftr') className = 'footer-text';

          html += `  <div class="${className}" style="${color}${fontSize}${fontWeight}${textAlign}padding:4px 8px;">${escapeHtml(p.text)}</div>\n`;
        }

        html += `</div>\n`;
      }
    } else if (el.type === 'connector') {
      // Draw as a line
      const lineColor = el.lineColor || themeColors.dk2;
      if (el.cy > el.cx) {
        // Vertical line
        html += `<div style="position:absolute;left:${left}px;top:${top}px;width:3px;height:${height}px;background:#${lineColor};"></div>\n`;
      } else {
        // Horizontal line
        html += `<div style="position:absolute;left:${left}px;top:${top}px;width:${width}px;height:3px;background:#${lineColor};"></div>\n`;
      }
    }
  }

  return html;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Main
const unpackedDir = path.join(__dirname, 'unpacked');
const outputDir = path.join(__dirname, '..');
const mediaDir = path.join(__dirname, 'media');

// Find all slides
const slidesDir = path.join(unpackedDir, 'ppt', 'slides');
const slideFiles = fs.readdirSync(slidesDir).filter(f => f.match(/^slide\d+\.xml$/));
const slideNums = slideFiles.map(f => parseInt(f.match(/\d+/)[0])).sort((a, b) => a - b);

console.log(`Found ${slideNums.length} slides`);

const SLIDE_WIDTH = 960;
const SLIDE_HEIGHT = 540;

let slidesHtml = '';

for (const num of slideNums) {
  console.log(`Processing slide ${num}...`);
  const slideData = parseSlide(num, unpackedDir);
  if (!slideData) continue;

  const slideContent = generateSlideHtml(slideData, num, SLIDE_WIDTH, SLIDE_HEIGHT);

  slidesHtml += `
    <div class="slide" id="slide-${num - 1}">
      <div class="slide-number">${num}</div>
      <div class="slide-inner">
        ${slideContent}
      </div>
    </div>
  `;
}

// Generate full HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Synaptic Investor Presentation - Jan 27, 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --synaptic-blue: #01A9DB;
      --synaptic-orange: #FB4100;
      --dark-navy: #07253D;
      --dark-gray: #44546A;
      --light-gray: #E7E6E6;
    }

    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
    }

    .nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      background: var(--dark-navy);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    .nav-brand {
      color: white;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-brand::before {
      content: '';
      width: 6px;
      height: 20px;
      background: var(--synaptic-blue);
      border-radius: 2px;
    }

    .nav-controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .nav-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 6px 14px;
      border-radius: 5px;
      cursor: pointer;
      font-family: inherit;
      font-size: 13px;
      transition: all 0.2s;
    }

    .nav-btn:hover {
      background: var(--synaptic-blue);
      border-color: var(--synaptic-blue);
    }

    .slide-counter {
      color: white;
      font-size: 13px;
      opacity: 0.8;
    }

    .slides-container {
      padding: 72px 24px 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }

    .slide {
      width: 100%;
      max-width: ${SLIDE_WIDTH}px;
      aspect-ratio: 16 / 9;
      background: white;
      border-radius: 8px;
      box-shadow: 0 16px 48px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }

    .slide-number {
      position: absolute;
      top: 8px;
      right: 12px;
      background: var(--synaptic-blue);
      color: white;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
      z-index: 10;
    }

    .slide-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .slide-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--dark-navy);
      line-height: 1.3;
    }

    .slide-subtitle {
      font-size: 16px;
      color: var(--dark-gray);
    }

    .body-text {
      font-size: 12px;
      color: var(--dark-navy);
      line-height: 1.5;
    }

    .footer-text {
      font-size: 9px;
      color: #888;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }

    /* Presentation mode */
    .presentation-mode .nav-bar { display: none; }
    .presentation-mode .slides-container { padding: 0; gap: 0; }
    .presentation-mode .slide {
      max-width: none;
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      display: none;
    }
    .presentation-mode .slide.active { display: block; }
    .presentation-mode .slide-inner {
      transform: scale(calc(100vh / ${SLIDE_HEIGHT}px));
      transform-origin: top left;
      width: ${SLIDE_WIDTH}px;
      height: ${SLIDE_HEIGHT}px;
    }

    /* Grid view */
    .grid-mode .slides-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 72px 24px 40px;
    }
    .grid-mode .slide { cursor: pointer; transition: transform 0.2s; }
    .grid-mode .slide:hover { transform: translateY(-4px); }

    @media print {
      .nav-bar { display: none; }
      .slide { page-break-after: always; box-shadow: none; border: 1px solid #ddd; }
    }
  </style>
</head>
<body>
  <nav class="nav-bar">
    <div class="nav-brand">SYNAPTIC Investor Presentation</div>
    <div class="nav-controls">
      <span class="slide-counter"><span id="current">1</span> / ${slideNums.length}</span>
      <button class="nav-btn" onclick="toggleGrid()">Grid</button>
      <button class="nav-btn" onclick="startPresent()">Present</button>
    </div>
  </nav>

  <div class="slides-container" id="container">
    ${slidesHtml}
  </div>

  <script>
    let current = 0;
    const total = ${slideNums.length};
    let presenting = false;
    let gridMode = false;

    function showSlide(n) {
      if (n < 0) n = total - 1;
      if (n >= total) n = 0;
      current = n;
      document.getElementById('current').textContent = n + 1;
      if (presenting) {
        document.querySelectorAll('.slide').forEach((s, i) => {
          s.classList.toggle('active', i === n);
        });
      } else {
        document.getElementById('slide-' + n)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    function startPresent() {
      presenting = true;
      gridMode = false;
      document.body.classList.add('presentation-mode');
      document.body.classList.remove('grid-mode');
      showSlide(current);
      document.documentElement.requestFullscreen?.();
    }

    function exitPresent() {
      presenting = false;
      document.body.classList.remove('presentation-mode');
      document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
      document.exitFullscreen?.();
    }

    function toggleGrid() {
      gridMode = !gridMode;
      document.body.classList.toggle('grid-mode', gridMode);
    }

    document.addEventListener('keydown', e => {
      if (presenting) {
        if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); showSlide(current + 1); }
        else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); showSlide(current - 1); }
        else if (e.key === 'Escape') exitPresent();
        else if (e.key === 'Home') showSlide(0);
        else if (e.key === 'End') showSlide(total - 1);
      }
    });

    document.querySelectorAll('.slide').forEach((s, i) => {
      s.addEventListener('click', () => {
        if (gridMode) { gridMode = false; document.body.classList.remove('grid-mode'); showSlide(i); }
      });
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && presenting) exitPresent();
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(outputDir, 'pitch-working.html'), html);
console.log('Generated: pitch-working.html');
console.log('Total slides:', slideNums.length);
