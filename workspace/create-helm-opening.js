const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/wkarp/devlocal/prod-helm-pm/.claude/skills/x:pptx/scripts/html2pptx.js');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Synaptic Era, Inc.';
    pptx.title = 'HELM Opening Pitch';

    // Slide 1: The AI Transformation Pressure
    console.log('Creating slide 1: AI Transformation Pressure...');
    await html2pptx('workspace/helm-opening-slide1.html', pptx);

    // Slide 2: The Overwhelm
    console.log('Creating slide 2: The Overwhelm...');
    await html2pptx('workspace/helm-opening-slide2.html', pptx);

    // Slide 3: The Insight
    console.log('Creating slide 3: The Insight...');
    await html2pptx('workspace/helm-opening-slide3.html', pptx);

    // Slide 4a: Split Screen Transformation
    console.log('Creating slide 4a: Split Screen Transformation...');
    await html2pptx('workspace/helm-opening-slide4a.html', pptx);

    // Slide 4b: Confident Leader
    console.log('Creating slide 4b: Confident Leader...');
    await html2pptx('workspace/helm-opening-slide4b.html', pptx);

    // Slide 4c: HELM as AI Agent Presence
    console.log('Creating slide 4c: HELM as AI Agent Presence...');
    await html2pptx('workspace/helm-opening-slide4c.html', pptx);

    // Slide 4d: Hybrid - Leader + Interface
    console.log('Creating slide 4d: Hybrid - Leader + Interface...');
    await html2pptx('workspace/helm-opening-slide4d.html', pptx);

    // Save presentation
    const filename = 'workspace/HELM-Opening-Pitch.pptx';
    await pptx.writeFile({ fileName: filename });
    console.log(`\nPresentation created successfully: ${filename}`);
    console.log('\nSlide structure:');
    console.log('- Slides 1-3: Core opening sequence');
    console.log('- Slide 4a: Split screen (Before/After)');
    console.log('- Slide 4b: Hero image placeholder (Confident leader)');
    console.log('- Slide 4c: AI agent visual with capabilities');
    console.log('- Slide 4d: Hybrid (Text + Interface placeholder)');
}

createPresentation().catch(console.error);
