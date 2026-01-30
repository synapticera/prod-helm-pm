const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();

    // Set presentation properties
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Synaptic';
    pptx.title = 'HELM Executive Operating System Framework';
    pptx.subject = 'Executive Function Model and HELM Value Proposition';
    pptx.company = 'Synaptic Era, Inc.';

    // Synaptic brand colors
    const colors = {
        synapticBlue: '0066CC',
        synapticDarkBlue: '003D7A',
        synapticLightBlue: '4D94D9',
        synapticAccent: '00A3E0',
        synapticGray: '5A6872',
        synapticLightGray: 'E8EBED',
        dark: '1A1A1A',
        white: 'FFFFFF',
        green: '28a745',
        red: 'dc3545'
    };

    console.log('Note: This is a simplified PowerPoint export.');
    console.log('The HTML contains 13 slides with complex SVG funnels and custom layouts.');
    console.log('For full fidelity, consider using screenshot-based conversion or Google Slides export.');
    console.log('');
    console.log('Creating simplified slide deck with Synaptic branding...');

    // Slide 1: Title
    let slide = pptx.addSlide();
    slide.background = { color: colors.white };
    slide.addText('HELM', {
        x: 0.5, y: 2, w: 9, h: 1,
        fontSize: 64, bold: true, color: colors.synapticBlue, align: 'center'
    });
    slide.addText('The Executive Operating System', {
        x: 0.5, y: 3.2, w: 9, h: 0.8,
        fontSize: 48, bold: true, color: colors.dark, align: 'center'
    });
    slide.addText('Managing 20 Responsibilities to Drive Strategic Outcomes', {
        x: 1, y: 4.2, w: 8, h: 0.5,
        fontSize: 24, color: colors.synapticGray, align: 'center'
    });
    slide.addText('"Your teams can execute 10x faster with AI. Can you manage 10x faster?"', {
        x: 1, y: 5, w: 8, h: 0.5,
        fontSize: 20, italic: true, color: colors.synapticBlue, align: 'center'
    });

    // Add slide numbers
    slide.addText('1', {
        x: 9, y: 7, w: 0.5, h: 0.3,
        fontSize: 18, bold: true, color: colors.synapticBlue, align: 'right'
    });

    // Slide 2: Three-Layer Model
    slide = pptx.addSlide();
    slide.addText('HELM', { x: 0.5, y: 0.3, w: 2, h: 0.4, fontSize: 24, bold: true, color: colors.synapticBlue });
    slide.addText('The Complete Executive Model', { x: 0.5, y: 0.7, w: 5, h: 0.3, fontSize: 14, color: colors.synapticGray });

    slide.addText('The Three-Layer Executive Model', {
        x: 0.5, y: 1.2, w: 9, h: 0.6,
        fontSize: 32, bold: true, color: colors.dark, align: 'center'
    });

    // Outcomes layer
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1, y: 2.2, w: 8, h: 1.2,
        fill: { color: colors.synapticBlue },
        line: { color: colors.synapticAccent, width: 4 },
        rectRadius: 0.15
    });
    slide.addText([
        { text: 'Strategic Outcomes (The Why)\n', options: { fontSize: 20, bold: true, color: colors.white, breakLine: true } },
        { text: 'Revenue Growth | Profitability | Market Leadership | Innovation | Excellence', options: { fontSize: 14, color: colors.white } }
    ], { x: 1.2, y: 2.4, w: 7.6, h: 0.8, valign: 'middle' });

    // Management layer
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1, y: 3.8, w: 8, h: 1.4,
        fill: { color: 'F8F9FA' },
        line: { color: colors.synapticAccent, width: 3 },
        rectRadius: 0.15
    });
    slide.addText([
        { text: 'Executive Management (The How × What)\n', options: { fontSize: 20, bold: true, color: colors.dark, breakLine: true } },
        { text: '4 Functions × 5 Domains = 20 Responsibilities\n', options: { fontSize: 14, color: colors.dark, breakLine: true } },
        { text: 'Sense → Understand → Decide → Execute\n', options: { fontSize: 13, color: colors.dark, breakLine: true } },
        { text: 'Market | Process | People | Technology | Finance', options: { fontSize: 13, color: colors.dark } }
    ], { x: 1.2, y: 3.9, w: 7.6, h: 1.2, valign: 'top' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1.5, y: 4.7, w: 7, h: 0.4,
        fill: { color: colors.synapticBlue }
    });
    slide.addText('← HELM OPERATES HERE (Maintains Continuous Context) →', {
        x: 1.5, y: 4.75, w: 7, h: 0.3,
        fontSize: 14, bold: true, color: colors.white, align: 'center'
    });

    // Resources layer
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1, y: 5.5, w: 8, h: 1.2,
        fill: { color: 'F1F3F5' },
        line: { color: colors.synapticLightBlue, width: 4 },
        rectRadius: 0.15
    });
    slide.addText([
        { text: 'Resources & Execution (The Inputs)\n', options: { fontSize: 20, bold: true, color: colors.dark, breakLine: true } },
        { text: 'Human Resources | Technology (AI Agents, Automation) | Capital | Infrastructure', options: { fontSize: 13, color: colors.dark } }
    ], { x: 1.2, y: 5.7, w: 7.6, h: 0.8, valign: 'middle' });

    slide.addText('2', { x: 9, y: 7, w: 0.5, h: 0.3, fontSize: 18, bold: true, color: colors.synapticBlue, align: 'right' });

    // Slide 3: The Matrix
    slide = pptx.addSlide();
    slide.addText('HELM', { x: 0.5, y: 0.3, w: 2, h: 0.4, fontSize: 24, bold: true, color: colors.synapticBlue });
    slide.addText('Executive Management Layer', { x: 0.5, y: 0.7, w: 5, h: 0.3, fontSize: 14, color: colors.synapticGray });

    slide.addText('The Matrix: 20 Executive Responsibilities', {
        x: 0.5, y: 1.2, w: 9, h: 0.5,
        fontSize: 28, bold: true, color: colors.dark, align: 'center'
    });

    // Create the 5x4 matrix table
    const matrixData = [
        [
            { text: 'Domain ↓\nFunction →', options: { fill: { color: colors.synapticDarkBlue }, color: colors.white, bold: true, fontSize: 11, valign: 'middle' } },
            { text: 'Sense', options: { fill: { color: colors.synapticBlue }, color: colors.white, bold: true, fontSize: 13 } },
            { text: 'Understand', options: { fill: { color: colors.synapticBlue }, color: colors.white, bold: true, fontSize: 13 } },
            { text: 'Decide', options: { fill: { color: colors.synapticBlue }, color: colors.white, bold: true, fontSize: 13 } },
            { text: 'Execute', options: { fill: { color: colors.synapticBlue }, color: colors.white, bold: true, fontSize: 13 } }
        ],
        [
            { text: 'Market', options: { fill: { color: colors.synapticDarkBlue }, color: colors.white, bold: true, fontSize: 12 } },
            'Customer signals, competitive moves',
            'Win/loss patterns, market position',
            'Market strategy, positioning',
            'Launches, campaigns, expansion'
        ],
        [
            { text: 'Process', options: { fill: { color: colors.synapticDarkBlue }, color: colors.white, bold: true, fontSize: 12 } },
            'Performance metrics, bottlenecks',
            'Root causes, waste drivers',
            'Automation priorities, capabilities',
            'Process changes, optimization'
        ],
        [
            { text: 'People', options: { fill: { color: colors.synapticDarkBlue }, color: colors.white, bold: true, fontSize: 12 } },
            'Team performance, morale',
            'Engagement drivers, culture',
            'Hiring, org design, comp',
            'Development, performance mgmt'
        ],
        [
            { text: 'Technology', options: { fill: { color: colors.synapticDarkBlue }, color: colors.white, bold: true, fontSize: 12 } },
            'Tech trends, adoption',
            'Innovation opportunities, tech debt',
            'Build/buy/partner, roadmap',
            'Deployments, pilots, scaling'
        ],
        [
            { text: 'Finance', options: { fill: { color: colors.synapticDarkBlue }, color: colors.white, bold: true, fontSize: 12 } },
            'Burn rate, spending, ROI',
            'Unit economics, profitability',
            'Budget allocation, funding',
            'ROI tracking, cash flow'
        ]
    ];

    slide.addTable(matrixData, {
        x: 0.5, y: 2, w: 9, h: 4.5,
        border: { pt: 1, color: colors.synapticLightGray },
        fontSize: 11,
        align: 'left',
        valign: 'top',
        colW: [1.3, 1.925, 1.925, 1.925, 1.925]
    });

    slide.addText('Context is fragmented across all 20. HELM maintains continuous context.', {
        x: 0.5, y: 6.7, w: 9, h: 0.3,
        fontSize: 16, bold: true, color: colors.synapticBlue, align: 'center'
    });

    slide.addText('3', { x: 9, y: 7, w: 0.5, h: 0.3, fontSize: 18, bold: true, color: colors.synapticBlue, align: 'right' });

    // Add closing slide
    slide = pptx.addSlide();
    slide.addText('HELM', { x: 0.5, y: 0.3, w: 2, h: 0.4, fontSize: 24, bold: true, color: colors.synapticBlue });

    slide.addText('HELM Executive Operating System', {
        x: 0.5, y: 2.5, w: 9, h: 0.8,
        fontSize: 42, bold: true, color: colors.dark, align: 'center'
    });

    slide.addText('Eliminating the Management Bottleneck', {
        x: 0.5, y: 3.5, w: 9, h: 0.5,
        fontSize: 28, color: colors.synapticGray, align: 'center'
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1.5, y: 4.5, w: 7, h: 1.5,
        fill: { color: colors.synapticBlue },
        rectRadius: 0.15
    });

    slide.addText([
        { text: '10x Execution × 10x Management = 10x Outcomes\n\n', options: { fontSize: 24, bold: true, color: colors.white, breakLine: true } },
        { text: 'HELM maintains continuous context across all 20 executive responsibilities,\nenabling faster decisions and superior strategic outcomes.', options: { fontSize: 16, color: colors.white } }
    ], { x: 1.7, y: 4.7, w: 6.6, h: 1.1, valign: 'middle', align: 'center' });

    slide.addText('4', { x: 9, y: 7, w: 0.5, h: 0.3, fontSize: 18, bold: true, color: colors.synapticBlue, align: 'right' });

    // Save presentation
    const outputPath = '/Users/wkarp/devlocal/prod-helm-pm/ai-kb/frameworks/HELM-Executive-OS-Framework.pptx';
    await pptx.writeFile({ fileName: outputPath });

    console.log('\\n✓ PowerPoint created successfully!');
    console.log(`  Location: ${outputPath}`);
    console.log('\\nNote: This is a simplified 4-slide summary.');
    console.log('The HTML version contains 13 detailed slides with:');
    console.log('  - Technology stack visualization');
    console.log('  - Data paradigm comparison');
    console.log('  - Theory of Constraints funnel diagrams');
    console.log('  - Executive pyramid');
    console.log('  - Role-specific matrices (CCO, CRO, CFO, CPO, CHRO)');
    console.log('\\nFor the complete presentation, use the HTML file or convert via screenshots.');
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
