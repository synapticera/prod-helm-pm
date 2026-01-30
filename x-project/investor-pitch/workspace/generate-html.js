const fs = require('fs');
const path = require('path');

// Read the text inventory
const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, 'text-inventory.json'), 'utf8'));

// Synaptic brand colors from theme
const colors = {
  dk1: '#07253D',      // Dark Navy
  lt1: '#FFFFFF',      // White
  dk2: '#44546A',      // Dark Gray-Blue
  lt2: '#E7E6E6',      // Light Gray
  accent1: '#01A9DB',  // Synaptic Blue
  accent2: '#FB4100',  // Synaptic Orange
  accent3: '#E9E9E9',  // Light Gray
  accent4: '#3F3A93',  // Purple
  accent5: '#009E5F',  // Green
  accent6: '#BABBBF',  // Gray
};

// Theme color mapping
const themeColorMap = {
  'DARK_1': colors.dk1,
  'LIGHT_1': colors.lt1,
  'DARK_2': colors.dk2,
  'LIGHT_2': colors.lt2,
  'ACCENT_1': colors.accent1,
  'ACCENT_2': colors.accent2,
  'ACCENT_3': colors.accent3,
  'ACCENT_4': colors.accent4,
  'ACCENT_5': colors.accent5,
  'ACCENT_6': colors.accent6,
  'BACKGROUND_1': colors.lt1,
};

function getColor(paragraph) {
  if (paragraph.color) {
    return `#${paragraph.color}`;
  }
  if (paragraph.theme_color && themeColorMap[paragraph.theme_color]) {
    return themeColorMap[paragraph.theme_color];
  }
  return colors.dk1;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate slides HTML
let slidesHtml = '';
const slideKeys = Object.keys(inventory).sort((a, b) => {
  return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]);
});

slideKeys.forEach((slideKey, slideIndex) => {
  const slideData = inventory[slideKey];
  const shapeKeys = Object.keys(slideData).sort((a, b) => {
    return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]);
  });

  // Determine slide type based on content
  let slideClass = 'content-slide';
  let isTitle = false;
  let isSectionDivider = false;

  // Check for section divider slides (minimal content, large centered text)
  if (shapeKeys.length <= 3) {
    const titleShape = slideData['shape-0'];
    if (titleShape && titleShape.paragraphs) {
      const titleText = titleShape.paragraphs.map(p => p.text).join(' ');
      if (['Look Back', 'Plan Forward', 'DEMO\'s', 'Additional Product Details'].some(t => titleText.includes(t))) {
        isSectionDivider = true;
        slideClass = 'section-divider';
      }
    }
  }

  // Check for title slide
  if (slideIndex === 0) {
    slideClass = 'title-slide';
    isTitle = true;
  }

  let slideContent = '';

  shapeKeys.forEach((shapeKey) => {
    const shape = slideData[shapeKey];
    if (!shape.paragraphs || shape.paragraphs.length === 0) return;

    // Skip footer shapes on most slides
    if (shape.placeholder_type === 'FOOTER') return;

    shape.paragraphs.forEach((para) => {
      if (!para.text || para.text.trim() === '') return;

      const text = escapeHtml(para.text);
      const color = getColor(para);
      const fontSize = para.font_size || shape.default_font_size || 16;
      const fontWeight = para.bold ? 'bold' : 'normal';
      const fontStyle = para.italic ? 'italic' : 'normal';
      const textAlign = para.alignment ? para.alignment.toLowerCase() : 'left';

      // Determine element type
      let elementClass = 'body-text';
      if (shape.placeholder_type === 'TITLE' || shape.placeholder_type === 'CENTER_TITLE') {
        elementClass = 'slide-title';
      } else if (shape.placeholder_type === 'SUBTITLE') {
        elementClass = 'slide-subtitle';
      } else if (para.bullet) {
        elementClass = 'bullet-item';
      }

      const style = `color: ${color}; font-size: ${Math.min(fontSize, 40) * 0.75}px; font-weight: ${fontWeight}; font-style: ${fontStyle}; text-align: ${textAlign};`;

      if (para.bullet) {
        slideContent += `<div class="${elementClass}" style="${style}"><span class="bullet">•</span> ${text}</div>\n`;
      } else {
        slideContent += `<div class="${elementClass}" style="${style}">${text}</div>\n`;
      }
    });
  });

  slidesHtml += `
    <div class="slide ${slideClass}" id="slide-${slideIndex}">
      <div class="slide-number">${slideIndex + 1}</div>
      <div class="slide-content">
        ${slideContent}
      </div>
      <div class="footer">Private and Confidential. Property of Synaptic Era, Inc.</div>
    </div>
  `;
});

// Generate full HTML document
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
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --synaptic-blue: ${colors.accent1};
      --synaptic-orange: ${colors.accent2};
      --dark-navy: ${colors.dk1};
      --dark-gray: ${colors.dk2};
      --light-gray: ${colors.lt2};
      --white: ${colors.lt1};
      --purple: ${colors.accent4};
      --green: ${colors.accent5};
    }

    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      color: var(--dark-navy);
    }

    /* Navigation */
    .nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: var(--dark-navy);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    .nav-brand {
      color: var(--white);
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-brand::before {
      content: '';
      width: 8px;
      height: 24px;
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
      color: var(--white);
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      transition: all 0.2s;
    }

    .nav-btn:hover {
      background: var(--synaptic-blue);
      border-color: var(--synaptic-blue);
    }

    .slide-counter {
      color: var(--white);
      font-size: 14px;
      opacity: 0.8;
    }

    /* Slide Container */
    .slides-container {
      padding: 80px 24px 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }

    /* Individual Slide */
    .slide {
      width: 100%;
      max-width: 960px;
      aspect-ratio: 16 / 9;
      background: var(--white);
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .slide-number {
      position: absolute;
      top: 12px;
      right: 16px;
      background: var(--synaptic-blue);
      color: var(--white);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }

    .slide-content {
      flex: 1;
      padding: 48px 56px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
    }

    .footer {
      padding: 12px 56px;
      font-size: 10px;
      color: #888;
      border-top: 1px solid var(--light-gray);
      text-align: center;
    }

    /* Title Slide */
    .title-slide {
      background: linear-gradient(135deg, var(--dark-navy) 0%, #0d1829 100%);
    }

    .title-slide .slide-content {
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .title-slide .slide-title {
      color: var(--white) !important;
      font-size: 36px !important;
      font-weight: 600;
    }

    .title-slide .slide-subtitle,
    .title-slide .body-text {
      color: rgba(255,255,255,0.8) !important;
    }

    .title-slide .footer {
      color: rgba(255,255,255,0.5);
      border-top-color: rgba(255,255,255,0.1);
    }

    /* Section Divider */
    .section-divider {
      background: linear-gradient(135deg, var(--synaptic-blue) 0%, #0891b2 100%);
    }

    .section-divider .slide-content {
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .section-divider .slide-title {
      color: var(--white) !important;
      font-size: 42px !important;
      font-weight: 600;
    }

    .section-divider .footer {
      color: rgba(255,255,255,0.6);
      border-top-color: rgba(255,255,255,0.2);
    }

    /* Typography */
    .slide-title {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 16px;
      line-height: 1.3;
    }

    .slide-subtitle {
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 12px;
      opacity: 0.9;
    }

    .body-text {
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 4px;
    }

    .bullet-item {
      font-size: 14px;
      line-height: 1.6;
      padding-left: 8px;
      margin-bottom: 6px;
    }

    .bullet {
      color: var(--synaptic-blue);
      margin-right: 8px;
      font-weight: bold;
    }

    /* Presentation Mode Styles */
    .presentation-mode .nav-bar {
      display: none;
    }

    .presentation-mode .slides-container {
      padding: 0;
      gap: 0;
    }

    .presentation-mode .slide {
      max-width: none;
      border-radius: 0;
      height: 100vh;
      display: none;
    }

    .presentation-mode .slide.active {
      display: flex;
    }

    /* Thumbnail Grid */
    .thumbnail-mode .slides-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      padding: 80px 24px 40px;
    }

    .thumbnail-mode .slide {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .thumbnail-mode .slide:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 70px rgba(0,0,0,0.4);
    }

    .thumbnail-mode .slide-content {
      padding: 24px 28px;
    }

    .thumbnail-mode .slide-title {
      font-size: 14px;
    }

    .thumbnail-mode .body-text,
    .thumbnail-mode .bullet-item {
      font-size: 9px;
    }

    /* Print Styles */
    @media print {
      body {
        background: white;
      }

      .nav-bar {
        display: none;
      }

      .slide {
        page-break-after: always;
        box-shadow: none;
        border: 1px solid #ddd;
        margin: 0;
        max-width: none;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .slide-content {
        padding: 32px;
      }

      .slide-title {
        font-size: 20px;
      }

      .body-text, .bullet-item {
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <nav class="nav-bar">
    <div class="nav-brand">SYNAPTIC Investor Presentation</div>
    <div class="nav-controls">
      <span class="slide-counter"><span id="current-slide">1</span> / ${slideKeys.length}</span>
      <button class="nav-btn" onclick="toggleThumbnails()">Grid View</button>
      <button class="nav-btn" onclick="startPresentation()">Present</button>
    </div>
  </nav>

  <div class="slides-container" id="slides-container">
    ${slidesHtml}
  </div>

  <script>
    let currentSlide = 0;
    const totalSlides = ${slideKeys.length};
    let isPresentationMode = false;
    let isThumbnailMode = false;

    function updateSlideCounter() {
      document.getElementById('current-slide').textContent = currentSlide + 1;
    }

    function showSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;

      if (isPresentationMode) {
        document.querySelectorAll('.slide').forEach((slide, i) => {
          slide.classList.toggle('active', i === currentSlide);
        });
      } else {
        const slide = document.getElementById('slide-' + currentSlide);
        if (slide) {
          slide.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      updateSlideCounter();
    }

    function startPresentation() {
      isPresentationMode = true;
      isThumbnailMode = false;
      document.body.classList.add('presentation-mode');
      document.body.classList.remove('thumbnail-mode');
      showSlide(currentSlide);

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    }

    function exitPresentation() {
      isPresentationMode = false;
      document.body.classList.remove('presentation-mode');
      document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
      });

      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    function toggleThumbnails() {
      isThumbnailMode = !isThumbnailMode;
      document.body.classList.toggle('thumbnail-mode', isThumbnailMode);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (isPresentationMode) {
        switch(e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
          case ' ':
          case 'PageDown':
            e.preventDefault();
            showSlide(currentSlide + 1);
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
          case 'PageUp':
            e.preventDefault();
            showSlide(currentSlide - 1);
            break;
          case 'Escape':
            exitPresentation();
            break;
          case 'Home':
            showSlide(0);
            break;
          case 'End':
            showSlide(totalSlides - 1);
            break;
        }
      }
    });

    // Click on thumbnail to go to slide
    document.querySelectorAll('.slide').forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (isThumbnailMode) {
          isThumbnailMode = false;
          document.body.classList.remove('thumbnail-mode');
          showSlide(index);
        }
      });
    });

    // Exit presentation mode on fullscreen exit
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && isPresentationMode) {
        exitPresentation();
      }
    });
  </script>
</body>
</html>`;

// Write output
const outputPath = path.join(__dirname, '..', 'pitch-working.html');
fs.writeFileSync(outputPath, html);
console.log('Generated:', outputPath);
console.log('Total slides:', slideKeys.length);
