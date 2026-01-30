const pptxgen = require('pptxgenjs');
const html2pptx = require('../../.claude/skills/x:pptx/scripts/html2pptx.js');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'HELM Product Team';
    pptx.title = 'Context Graphs: HELM\'s Path to Organizational Memory';
    pptx.subject = 'Strategic Technology Initiative';

    const slidesDir = path.join(__dirname, 'slides');

    // Slide 1: Title
    await html2pptx(path.join(slidesDir, 'slide-01-title.html'), pptx);

    // Slide 2: Problem
    await html2pptx(path.join(slidesDir, 'slide-02-problem.html'), pptx);

    // Slide 3: Solution
    await html2pptx(path.join(slidesDir, 'slide-03-solution.html'), pptx);

    // Slide 4: Architecture with diagram
    const { slide: slide4, placeholders: placeholders4 } = await html2pptx(
        path.join(slidesDir, 'slide-04-architecture.html'),
        pptx
    );

    // Add simple architecture flow diagram
    if (placeholders4.length > 0) {
        const p = placeholders4[0];
        const boxWidth = 1.8;
        const boxHeight = 0.6;
        const spacing = 0.3;
        const startX = p.x + 0.2;
        const startY = p.y + 0.4;

        // Architecture layers
        const layers = [
            { name: 'Agent\nExecution', color: '01A9DB' },
            { name: 'Graph\nWriter', color: '7B68EE' },
            { name: 'Context\nGraph Store', color: 'FB4100' },
            { name: 'Query\nEngine', color: 'F39C12' },
            { name: 'AI Context\nAssembly', color: '2ECC71' }
        ];

        layers.forEach((layer, i) => {
            const y = startY + i * (boxHeight + spacing);

            // Box
            slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
                x: startX,
                y: y,
                w: boxWidth,
                h: boxHeight,
                fill: { color: layer.color },
                rectRadius: 0.1
            });

            // Text
            slide4.addText(layer.name, {
                x: startX,
                y: y,
                w: boxWidth,
                h: boxHeight,
                align: 'center',
                valign: 'middle',
                color: 'FFFFFF',
                fontSize: 10,
                bold: true
            });

            // Arrow (except last)
            if (i < layers.length - 1) {
                slide4.addShape(pptx.shapes.LINE, {
                    x: startX + boxWidth / 2,
                    y: y + boxHeight,
                    w: 0,
                    h: spacing,
                    line: { color: '666666', width: 2, endArrowType: 'triangle' }
                });
            }
        });
    }

    // Slide 5: Example
    await html2pptx(path.join(slidesDir, 'slide-05-example.html'), pptx);

    // Slide 6: Market
    await html2pptx(path.join(slidesDir, 'slide-06-market.html'), pptx);

    // Slide 7: Revenue with chart
    const { slide: slide7, placeholders: placeholders7 } = await html2pptx(
        path.join(slidesDir, 'slide-07-revenue.html'),
        pptx
    );

    // Add revenue growth chart
    if (placeholders7.length > 0) {
        slide7.addChart(pptx.charts.BAR, [{
            name: 'ARR ($M)',
            labels: ['Q2 2026\n10 customers', 'Q3 2026\n30 customers', 'Q4 2026\n100 customers', 'Q1 2027\n250 customers'],
            values: [1, 3, 15, 50]
        }], {
            ...placeholders7[0],
            barDir: 'col',
            showTitle: true,
            title: 'Projected ARR Growth',
            showLegend: false,
            showCatAxisTitle: true,
            catAxisTitle: 'Quarter / Customer Count',
            showValAxisTitle: true,
            valAxisTitle: 'Annual Recurring Revenue ($M)',
            valAxisMaxVal: 60,
            valAxisMinVal: 0,
            valAxisMajorUnit: 10,
            catAxisLabelRotate: 0,
            dataLabelPosition: 'outEnd',
            dataLabelColor: '000000',
            chartColors: ['01A9DB']
        });
    }

    // Slide 8: Roadmap
    await html2pptx(path.join(slidesDir, 'slide-08-roadmap.html'), pptx);

    // Slide 9: Investment
    await html2pptx(path.join(slidesDir, 'slide-09-investment.html'), pptx);

    // Save
    const outputPath = path.join(__dirname, 'Context-Graphs-HELM-Executive-Presentation.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log('✅ Presentation created:', outputPath);
}

createPresentation().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
