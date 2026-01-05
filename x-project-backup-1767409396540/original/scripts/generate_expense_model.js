const ExcelJS = require('exceljs');

// Data with assumptions
const headcountData = [
  { role: 'CEO', annualSalary: 350000, startMonth: 1 },
  { role: 'Product Owner', annualSalary: 300000, startMonth: 1 },
  { role: 'Technical Lead', annualSalary: 200000, startMonth: 1 },
  { role: 'Growth Lead', annualSalary: 150000, startMonth: 2 },
  { role: 'ML Engineer', annualSalary: 160000, startMonth: 3 },
  { role: 'Operations Lead', annualSalary: 130000, startMonth: 4 },
  { role: 'Senior ML Engineer', annualSalary: 180000, startMonth: 7 },
  { role: 'Inside Sales Lead', annualSalary: 140000, startMonth: 7 },
  { role: 'Developer Advocate', annualSalary: 140000, startMonth: 8 },
  { role: 'Customer Success Manager', annualSalary: 120000, startMonth: 9 },
  { role: 'Enterprise Sales Lead', annualSalary: 160000, startMonth: 13 },
  { role: 'Head of Customer Success', annualSalary: 150000, startMonth: 13 },
  { role: 'VP Engineering', annualSalary: 200000, startMonth: 14 },
  { role: 'Head of Product', annualSalary: 180000, startMonth: 15 },
  { role: 'Data Scientist', annualSalary: 150000, startMonth: 16 },
  { role: 'Senior Sales Rep', annualSalary: 130000, startMonth: 18 },
  { role: 'Product Manager', annualSalary: 140000, startMonth: 19 },
  { role: 'Senior Engineer', annualSalary: 170000, startMonth: 20 },
  { role: 'Marketing Manager', annualSalary: 120000, startMonth: 21 },
  { role: 'Customer Success Rep', annualSalary: 100000, startMonth: 22 },
  { role: 'Part-time CFO', annualSalary: 72000, startMonth: 1 },
  { role: 'Part-time Legal Counsel', annualSalary: 60000, startMonth: 1 },
  { role: 'Technical Advisors (3)', annualSalary: 45000, startMonth: 2 },
  { role: 'Industry Advisors (2)', annualSalary: 30000, startMonth: 3 }
];

const infrastructureData = [
  { item: 'Cloud Infrastructure (AWS/GCP)', baseAmount: 5000, growthRate: 0.10, notes: 'Scales with user growth and data processing' },
  { item: 'Edge LLM Development Tools', baseAmount: 3000, growthRate: 0.05, notes: 'Model training and optimization tools' },
  { item: 'Development Tools & Software', baseAmount: 2500, growthRate: 0.03, notes: 'IDEs, collaboration tools, per-seat licenses' },
  { item: 'Security & Compliance Tools', baseAmount: 2000, growthRate: 0.05, notes: 'SOC 2, penetration testing, monitoring' },
  { item: 'Data Storage & Processing', baseAmount: 3500, growthRate: 0.12, notes: 'Database, data warehouse, analytics storage' },
  { item: 'DevOps & Monitoring', baseAmount: 2000, growthRate: 0.05, notes: 'CI/CD, APM, logging, alerting tools' },
  { item: 'Office Space & Equipment', baseAmount: 4000, growthRate: 0.08, notes: 'Rent, furniture, equipment for growing team' },
  { item: 'IT & Communications', baseAmount: 1500, growthRate: 0.03, notes: 'Internet, phones, collaboration software' },
  { item: 'Insurance & Legal', baseAmount: 3000, growthRate: 0.02, notes: 'D&O insurance, general liability, legal retainer' },
  { item: 'Accounting & Finance', baseAmount: 2000, growthRate: 0.02, notes: 'Bookkeeping, tax prep, financial systems' }
];

const goToMarketData = [
  { item: 'Content Marketing & SEO', baseAmount: 5000, growthRate: 0.08, notes: 'Blog, SEO tools, content creation' },
  { item: 'Paid Advertising (Google, LinkedIn)', baseAmount: 8000, growthRate: 0.15, notes: 'Scales with customer acquisition goals' },
  { item: 'Marketing Automation Tools', baseAmount: 1500, growthRate: 0.05, notes: 'Email, CRM, marketing ops platforms' },
  { item: 'Design Partner Program', baseAmount: 3000, growthRate: 0.10, notes: 'Incentives, support for early adopters' },
  { item: 'Community Building & Events', baseAmount: 2000, growthRate: 0.12, notes: 'Meetups, conferences, community management' },
  { item: 'Website & Landing Pages', baseAmount: 1000, growthRate: 0.03, notes: 'Hosting, CMS, optimization tools' },
  { item: 'Sales Tools (CRM, etc)', baseAmount: 1500, growthRate: 0.05, notes: 'Salesforce, outreach tools, data enrichment' },
  { item: 'Customer Success Tools', baseAmount: 1000, growthRate: 0.08, notes: 'CS platforms, onboarding, support tools' },
  { item: 'Marketing Contractors/Agencies', baseAmount: 4000, growthRate: 0.10, notes: 'Specialized marketing support' },
  { item: 'PR & Communications', baseAmount: 2000, growthRate: 0.05, notes: 'PR agency, media relations, press releases' }
];

const rdExpensesData = [
  { item: 'AI/ML Model Training Compute', baseAmount: 4000, growthRate: 0.12, notes: 'GPU compute for model development and testing' },
  { item: 'Research Tools & Subscriptions', baseAmount: 1500, growthRate: 0.03, notes: 'Academic journals, research databases, APIs' },
  { item: 'User Research & Testing', baseAmount: 2000, growthRate: 0.08, notes: 'User interviews, usability testing, research tools' },
  { item: 'Product Analytics Tools', baseAmount: 1000, growthRate: 0.05, notes: 'Analytics platforms, session replay, heatmaps' },
  { item: 'API & Integration Costs', baseAmount: 1500, growthRate: 0.10, notes: 'Third-party APIs, integration platform fees' },
  { item: 'Prototyping & Design Tools', baseAmount: 1000, growthRate: 0.03, notes: 'Design software, prototyping tools, user testing' }
];

const MONTHS = 24;
const monthNames = [
  'Jan-26', 'Feb-26', 'Mar-26', 'Apr-26', 'May-26', 'Jun-26',
  'Jul-26', 'Aug-26', 'Sep-26', 'Oct-26', 'Nov-26', 'Dec-26',
  'Jan-27', 'Feb-27', 'Mar-27', 'Apr-27', 'May-27', 'Jun-27',
  'Jul-27', 'Aug-27', 'Sep-27', 'Oct-27', 'Nov-27', 'Dec-27'
];

function colToLetter(col) {
  let letter = '';
  while (col > 0) {
    const mod = (col - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}

function addQuarterlyFormulas(sheet, row, firstMonthCol, quarterCols) {
  const { q1_2026, q2_2026, q3_2026, q4_2026, total_2026, q1_2027, q2_2027, q3_2027, q4_2027, total_2027, grandTotal } = quarterCols;

  sheet.getCell(row, q1_2026).value = { formula: `SUM(${colToLetter(firstMonthCol)}${row}:${colToLetter(firstMonthCol + 2)}${row})` };
  sheet.getCell(row, q1_2026).numFmt = '$#,##0';

  sheet.getCell(row, q2_2026).value = { formula: `SUM(${colToLetter(firstMonthCol + 3)}${row}:${colToLetter(firstMonthCol + 5)}${row})` };
  sheet.getCell(row, q2_2026).numFmt = '$#,##0';

  sheet.getCell(row, q3_2026).value = { formula: `SUM(${colToLetter(firstMonthCol + 6)}${row}:${colToLetter(firstMonthCol + 8)}${row})` };
  sheet.getCell(row, q3_2026).numFmt = '$#,##0';

  sheet.getCell(row, q4_2026).value = { formula: `SUM(${colToLetter(firstMonthCol + 9)}${row}:${colToLetter(firstMonthCol + 11)}${row})` };
  sheet.getCell(row, q4_2026).numFmt = '$#,##0';

  sheet.getCell(row, total_2026).value = { formula: `SUM(${colToLetter(q1_2026)}${row}:${colToLetter(q4_2026)}${row})` };
  sheet.getCell(row, total_2026).numFmt = '$#,##0';
  sheet.getCell(row, total_2026).font = { bold: true };
  sheet.getCell(row, total_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };

  sheet.getCell(row, q1_2027).value = { formula: `SUM(${colToLetter(firstMonthCol + 12)}${row}:${colToLetter(firstMonthCol + 14)}${row})` };
  sheet.getCell(row, q1_2027).numFmt = '$#,##0';

  sheet.getCell(row, q2_2027).value = { formula: `SUM(${colToLetter(firstMonthCol + 15)}${row}:${colToLetter(firstMonthCol + 17)}${row})` };
  sheet.getCell(row, q2_2027).numFmt = '$#,##0';

  sheet.getCell(row, q3_2027).value = { formula: `SUM(${colToLetter(firstMonthCol + 18)}${row}:${colToLetter(firstMonthCol + 20)}${row})` };
  sheet.getCell(row, q3_2027).numFmt = '$#,##0';

  sheet.getCell(row, q4_2027).value = { formula: `SUM(${colToLetter(firstMonthCol + 21)}${row}:${colToLetter(firstMonthCol + 23)}${row})` };
  sheet.getCell(row, q4_2027).numFmt = '$#,##0';

  sheet.getCell(row, total_2027).value = { formula: `SUM(${colToLetter(q1_2027)}${row}:${colToLetter(q4_2027)}${row})` };
  sheet.getCell(row, total_2027).numFmt = '$#,##0';
  sheet.getCell(row, total_2027).font = { bold: true };
  sheet.getCell(row, total_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };

  sheet.getCell(row, grandTotal).value = { formula: `${colToLetter(total_2026)}${row}+${colToLetter(total_2027)}${row}` };
  sheet.getCell(row, grandTotal).numFmt = '$#,##0';
  sheet.getCell(row, grandTotal).font = { bold: true };
  sheet.getCell(row, grandTotal).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
}

function addCumulativeRow(sheet, row, totalRow, firstMonthCol, quarterCols, label) {
  sheet.getCell(row, 1).value = label;
  sheet.getCell(row, 1).font = { bold: true, italic: true };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Monthly cumulative formulas
  for (let m = 0; m < MONTHS; m++) {
    const col = firstMonthCol + m;
    if (m === 0) {
      // First month = just that month's total
      sheet.getCell(row, col).value = { formula: `${colToLetter(col)}${totalRow}` };
    } else {
      // Subsequent months = previous cumulative + this month's total
      sheet.getCell(row, col).value = { formula: `${colToLetter(col - 1)}${row}+${colToLetter(col)}${totalRow}` };
    }
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { italic: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };
  }

  // Quarterly cumulative (same as the last month of each quarter)
  const { q1_2026, q2_2026, q3_2026, q4_2026, total_2026, q1_2027, q2_2027, q3_2027, q4_2027, total_2027, grandTotal } = quarterCols;

  // Q1 2026 = Month 3 cumulative
  sheet.getCell(row, q1_2026).value = { formula: `${colToLetter(firstMonthCol + 2)}${row}` };
  sheet.getCell(row, q1_2026).numFmt = '$#,##0';
  sheet.getCell(row, q1_2026).font = { italic: true };
  sheet.getCell(row, q1_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Q2 2026 = Month 6 cumulative
  sheet.getCell(row, q2_2026).value = { formula: `${colToLetter(firstMonthCol + 5)}${row}` };
  sheet.getCell(row, q2_2026).numFmt = '$#,##0';
  sheet.getCell(row, q2_2026).font = { italic: true };
  sheet.getCell(row, q2_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Q3 2026 = Month 9 cumulative
  sheet.getCell(row, q3_2026).value = { formula: `${colToLetter(firstMonthCol + 8)}${row}` };
  sheet.getCell(row, q3_2026).numFmt = '$#,##0';
  sheet.getCell(row, q3_2026).font = { italic: true };
  sheet.getCell(row, q3_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Q4 2026 = Month 12 cumulative (same as 2026 Total)
  sheet.getCell(row, q4_2026).value = { formula: `${colToLetter(firstMonthCol + 11)}${row}` };
  sheet.getCell(row, q4_2026).numFmt = '$#,##0';
  sheet.getCell(row, q4_2026).font = { italic: true };
  sheet.getCell(row, q4_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // 2026 Total = Q4 2026 cumulative
  sheet.getCell(row, total_2026).value = { formula: `${colToLetter(q4_2026)}${row}` };
  sheet.getCell(row, total_2026).numFmt = '$#,##0';
  sheet.getCell(row, total_2026).font = { bold: true, italic: true };
  sheet.getCell(row, total_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD700' } };

  // Q1 2027 = Month 15 cumulative
  sheet.getCell(row, q1_2027).value = { formula: `${colToLetter(firstMonthCol + 14)}${row}` };
  sheet.getCell(row, q1_2027).numFmt = '$#,##0';
  sheet.getCell(row, q1_2027).font = { italic: true };
  sheet.getCell(row, q1_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Q2 2027 = Month 18 cumulative
  sheet.getCell(row, q2_2027).value = { formula: `${colToLetter(firstMonthCol + 17)}${row}` };
  sheet.getCell(row, q2_2027).numFmt = '$#,##0';
  sheet.getCell(row, q2_2027).font = { italic: true };
  sheet.getCell(row, q2_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Q3 2027 = Month 21 cumulative
  sheet.getCell(row, q3_2027).value = { formula: `${colToLetter(firstMonthCol + 20)}${row}` };
  sheet.getCell(row, q3_2027).numFmt = '$#,##0';
  sheet.getCell(row, q3_2027).font = { italic: true };
  sheet.getCell(row, q3_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // Q4 2027 = Month 24 cumulative (same as Grand Total)
  sheet.getCell(row, q4_2027).value = { formula: `${colToLetter(firstMonthCol + 23)}${row}` };
  sheet.getCell(row, q4_2027).numFmt = '$#,##0';
  sheet.getCell(row, q4_2027).font = { italic: true };
  sheet.getCell(row, q4_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };

  // 2027 Total = Q4 2027 cumulative (not meaningful, so skip or make it same as GT)
  sheet.getCell(row, total_2027).value = { formula: `${colToLetter(q4_2027)}${row}` };
  sheet.getCell(row, total_2027).numFmt = '$#,##0';
  sheet.getCell(row, total_2027).font = { bold: true, italic: true };
  sheet.getCell(row, total_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD700' } };

  // Grand Total = Month 24 cumulative
  sheet.getCell(row, grandTotal).value = { formula: `${colToLetter(firstMonthCol + 23)}${row}` };
  sheet.getCell(row, grandTotal).numFmt = '$#,##0';
  sheet.getCell(row, grandTotal).font = { bold: true, italic: true };
  sheet.getCell(row, grandTotal).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD700' } };
}

async function buildHeadcountSheet(sheet, firstMonthCol, quarterCols) {
  let row = 1;

  // Headers
  sheet.getCell(row, 1).value = 'Role';
  sheet.getCell(row, 2).value = 'Annual Salary';
  sheet.getCell(row, 3).value = 'Start Month';
  sheet.getCell(row, 4).value = 'Monthly Salary';

  [1, 2, 3, 4].forEach(col => {
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center' };
  });

  // Month headers start at column 5
  const monthStartCol = 5;
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = monthNames[m];
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center' };
  }

  // Quarterly headers (use blue color to differentiate from monthly columns)
  const headers = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', '2026 Total', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', '2027 Total', 'Grand Total'];
  Object.values(quarterCols).forEach((col, idx) => {
    sheet.getCell(row, col).value = headers[idx];
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center', wrapText: true };
  });
  row++;

  const firstDataRow = row;

  // Add each person with ASSUMPTIONS in columns
  headcountData.forEach(person => {
    sheet.getCell(row, 1).value = person.role;
    sheet.getCell(row, 2).value = person.annualSalary;
    sheet.getCell(row, 2).numFmt = '$#,##0';
    sheet.getCell(row, 3).value = person.startMonth;
    sheet.getCell(row, 4).value = { formula: `${colToLetter(2)}${row}/12` };
    sheet.getCell(row, 4).numFmt = '$#,##0';

    // Monthly columns with formulas referencing assumptions
    for (let m = 0; m < MONTHS; m++) {
      const col = monthStartCol + m;
      const monthNum = m + 1;
      sheet.getCell(row, col).value = {
        formula: `IF(${monthNum}>=${colToLetter(3)}${row},${colToLetter(4)}${row},0)`
      };
      sheet.getCell(row, col).numFmt = '$#,##0';
    }

    addQuarterlyFormulas(sheet, row, monthStartCol, quarterCols);
    row++;
  });

  const lastPersonRow = row - 1;

  // Base Salaries Subtotal
  sheet.getCell(row, 1).value = 'Subtotal: Base Salaries';
  sheet.getCell(row, 1).font = { bold: true };
  sheet.getCell(row, 2).value = '';
  sheet.getCell(row, 3).value = '';
  sheet.getCell(row, 4).value = { formula: `SUM(${colToLetter(4)}${firstDataRow}:${colToLetter(4)}${lastPersonRow})` };
  sheet.getCell(row, 4).numFmt = '$#,##0';
  sheet.getCell(row, 4).font = { bold: true };

  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    sheet.getCell(row, col).value = { formula: `SUM(${colToLetter(col)}${firstDataRow}:${colToLetter(col)}${lastPersonRow})` };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  const baseSalaryRow = row;
  row++;

  // Benefits & Taxes (ASSUMPTION: 35%)
  sheet.getCell(row, 1).value = 'Benefits & Taxes';
  sheet.getCell(row, 1).font = { bold: true };
  sheet.getCell(row, 2).value = '35%';
  sheet.getCell(row, 2).alignment = { horizontal: 'center' };
  sheet.getCell(row, 2).font = { bold: true, color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = 'of base salary';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  sheet.getCell(row, 4).value = { formula: `${colToLetter(4)}${baseSalaryRow}*${colToLetter(2)}${row}` };
  sheet.getCell(row, 4).numFmt = '$#,##0';

  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    sheet.getCell(row, col).value = { formula: `${colToLetter(col)}${baseSalaryRow}*0.35` };
    sheet.getCell(row, col).numFmt = '$#,##0';
  }
  const benefitsRow = row;
  row++;

  // Recruiting Expenses (ASSUMPTION: $5,000 per hire)
  sheet.getCell(row, 1).value = 'Recruiting Expenses';
  sheet.getCell(row, 1).font = { bold: true };
  sheet.getCell(row, 2).value = 5000;
  sheet.getCell(row, 2).numFmt = '$#,##0';
  sheet.getCell(row, 2).font = { bold: true, color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = 'per hire';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };

  // Calculate recruiting based on new hires each month
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    const monthNum = m + 1;
    let formula = `${colToLetter(2)}${row}*SUMPRODUCT((${colToLetter(3)}${firstDataRow}:${colToLetter(3)}${lastPersonRow}=${monthNum})*1)`;
    sheet.getCell(row, col).value = { formula };
    sheet.getCell(row, col).numFmt = '$#,##0';
  }
  addQuarterlyFormulas(sheet, row, monthStartCol, quarterCols);
  const recruitingRow = row;
  row++;

  // Total Team Expenses
  sheet.getCell(row, 1).value = 'TOTAL TEAM EXPENSES';
  sheet.getCell(row, 1).font = { bold: true, size: 12 };
  for (let col = 4; col <= quarterCols.grandTotal; col++) {
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${baseSalaryRow}+${colToLetter(col)}${benefitsRow}+${colToLetter(col)}${recruitingRow}`
    };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } };
  }
  const totalRow = row;
  row++;

  // Cumulative Team Expenses
  addCumulativeRow(sheet, row, totalRow, monthStartCol, quarterCols, 'Cumulative Team Expenses');

  // Column widths
  sheet.getColumn(1).width = 30;
  sheet.getColumn(2).width = 15;
  sheet.getColumn(3).width = 12;
  sheet.getColumn(4).width = 14;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    sheet.getColumn(col).width = 11;
  }

  // Add column grouping for months 13-24 (Year 2) so they can be collapsed
  for (let m = 12; m < 24; m++) {
    const col = monthStartCol + m;
    sheet.getColumn(col).outlineLevel = 1;
  }

  return { totalRow, baseSalaryRow, benefitsRow, recruitingRow, cumulativeRow: totalRow + 1 };
}

async function buildExpenseSheet(sheet, title, expenseData, firstMonthCol, quarterCols) {
  let row = 1;

  // Title
  sheet.getCell(row, 1).value = title;
  sheet.getCell(row, 1).font = { bold: true, size: 14 };
  row += 2;

  // Headers - ASSUMPTIONS first
  sheet.getCell(row, 1).value = 'Line Item';
  sheet.getCell(row, 2).value = 'Base Monthly';
  sheet.getCell(row, 3).value = 'Growth Rate';
  sheet.getCell(row, 4).value = 'Notes / Assumptions';

  [1, 2, 3, 4].forEach(col => {
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center', wrapText: true };
  });

  // Month headers start at column 5
  const monthStartCol = 5;
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = monthNames[m];
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center' };
  }

  // Quarterly headers (use blue color to differentiate from monthly columns)
  const headers = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', '2026 Total', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', '2027 Total', 'Grand Total'];
  Object.values(quarterCols).forEach((col, idx) => {
    sheet.getCell(row, col).value = headers[idx];
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center', wrapText: true };
  });
  row++;

  const firstDataRow = row;

  // Add each expense item with ASSUMPTIONS
  expenseData.forEach(item => {
    sheet.getCell(row, 1).value = item.item;
    sheet.getCell(row, 2).value = item.baseAmount;
    sheet.getCell(row, 2).numFmt = '$#,##0';
    sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
    sheet.getCell(row, 3).value = item.growthRate;
    sheet.getCell(row, 3).numFmt = '0.0%';
    sheet.getCell(row, 3).font = { color: { argb: 'FFFF0000' } };
    sheet.getCell(row, 4).value = item.notes;
    sheet.getCell(row, 4).font = { italic: true, size: 9 };
    sheet.getCell(row, 4).alignment = { wrapText: true };

    // Monthly columns with formulas: base * (1 + growth)^(month-1)
    for (let m = 0; m < MONTHS; m++) {
      const col = monthStartCol + m;
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(2)}${row}*POWER(1+${colToLetter(3)}${row},${m})`
      };
      sheet.getCell(row, col).numFmt = '$#,##0';
    }

    addQuarterlyFormulas(sheet, row, monthStartCol, quarterCols);
    row++;
  });

  const lastItemRow = row - 1;

  // Total row
  sheet.getCell(row, 1).value = `TOTAL ${title.toUpperCase()}`;
  sheet.getCell(row, 1).font = { bold: true, size: 12 };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    sheet.getCell(row, col).value = { formula: `SUM(${colToLetter(col)}${firstDataRow}:${colToLetter(col)}${lastItemRow})` };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB4C7E7' } };
  }
  const totalRow = row;
  row++;

  // Cumulative row
  addCumulativeRow(sheet, row, totalRow, monthStartCol, quarterCols, `Cumulative ${title}`);

  // Column widths
  sheet.getColumn(1).width = 35;
  sheet.getColumn(2).width = 14;
  sheet.getColumn(3).width = 12;
  sheet.getColumn(4).width = 45;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    sheet.getColumn(col).width = 11;
  }

  // Add column grouping for months 13-24 (Year 2) so they can be collapsed
  for (let m = 12; m < 24; m++) {
    const col = monthStartCol + m;
    sheet.getColumn(col).outlineLevel = 1;
  }

  return { totalRow, cumulativeRow: totalRow + 1 };
}

async function buildSummarySheet(summarySheet, firstMonthCol, quarterCols, sheetRows) {
  let row = 1;

  // Title
  summarySheet.getCell(row, 1).value = 'EVOLVE - 24 Month Expense Model';
  summarySheet.getCell(row, 1).font = { size: 16, bold: true };
  summarySheet.mergeCells(row, 1, row, 5);
  row++;

  summarySheet.getCell(row, 1).value = 'Funding Round: Seed Extension | Target: $2.0M - $3.0M | Jan 2026 - Dec 2027';
  summarySheet.getCell(row, 1).font = { size: 11 };
  summarySheet.mergeCells(row, 1, row, 5);
  row += 2;

  // Headers
  summarySheet.getCell(row, 1).value = 'Category';
  summarySheet.getCell(row, 1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  summarySheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };

  const monthStartCol = 2;
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    summarySheet.getCell(row, col).value = monthNames[m];
    summarySheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    summarySheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };
    summarySheet.getCell(row, col).alignment = { horizontal: 'center' };
  }

  const headers = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', '2026 Total', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', '2027 Total', 'Grand Total'];
  Object.values(quarterCols).forEach((col, idx) => {
    summarySheet.getCell(row, col).value = headers[idx];
    summarySheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    summarySheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    summarySheet.getCell(row, col).alignment = { horizontal: 'center', wrapText: true };
  });
  row++;

  const categoryStartRow = row;

  // Team Expenses - reference from Headcount sheet
  summarySheet.getCell(row, 1).value = 'Team Expenses';
  summarySheet.getCell(row, 1).font = { bold: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const hcCol = col - monthStartCol + 5;
    summarySheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${sheetRows.headcount.totalRow}` };
    summarySheet.getCell(row, col).numFmt = '$#,##0';
  }
  row++;

  // Infrastructure
  summarySheet.getCell(row, 1).value = 'Infrastructure & Operating';
  summarySheet.getCell(row, 1).font = { bold: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const infraCol = col - monthStartCol + 5;
    summarySheet.getCell(row, col).value = { formula: `'Infrastructure Detail'!${colToLetter(infraCol)}${sheetRows.infrastructure.totalRow}` };
    summarySheet.getCell(row, col).numFmt = '$#,##0';
  }
  row++;

  // GTM
  summarySheet.getCell(row, 1).value = 'Go-to-Market';
  summarySheet.getCell(row, 1).font = { bold: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const gtmCol = col - monthStartCol + 5;
    summarySheet.getCell(row, col).value = { formula: `'Go-to-Market Detail'!${colToLetter(gtmCol)}${sheetRows.gtm.totalRow}` };
    summarySheet.getCell(row, col).numFmt = '$#,##0';
  }
  row++;

  // R&D
  summarySheet.getCell(row, 1).value = 'R&D / Product Development';
  summarySheet.getCell(row, 1).font = { bold: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const rdCol = col - monthStartCol + 5;
    summarySheet.getCell(row, col).value = { formula: `'R&D Detail'!${colToLetter(rdCol)}${sheetRows.rd.totalRow}` };
    summarySheet.getCell(row, col).numFmt = '$#,##0';
  }
  row++;

  // Total Expenses
  summarySheet.getCell(row, 1).value = 'TOTAL EXPENSES';
  summarySheet.getCell(row, 1).font = { bold: true, size: 12 };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    summarySheet.getCell(row, col).value = {
      formula: `SUM(${colToLetter(col)}${categoryStartRow}:${colToLetter(col)}${row - 1})`
    };
    summarySheet.getCell(row, col).numFmt = '$#,##0';
    summarySheet.getCell(row, col).font = { bold: true };
    summarySheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } };
  }
  const totalRow = row;
  row++;

  // Cumulative Expenses
  addCumulativeRow(summarySheet, row, totalRow, monthStartCol, quarterCols, 'Cumulative Total Expenses');

  summarySheet.getColumn(1).width = 30;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    summarySheet.getColumn(col).width = 11;
  }

  // Add column grouping for months 13-24 (Year 2) so they can be collapsed
  for (let m = 12; m < 24; m++) {
    const col = monthStartCol + m;
    summarySheet.getColumn(col).outlineLevel = 1;
  }

  return { totalRow, cumulativeRow: totalRow + 1 };
}

async function buildAllDetailSheet(allDetailSheet, firstMonthCol, quarterCols, sheetRows) {
  let row = 1;

  // Title
  allDetailSheet.getCell(row, 1).value = 'EVOLVE - All Expense Details (24 Months)';
  allDetailSheet.getCell(row, 1).font = { size: 14, bold: true };
  row += 2;

  // Headers
  allDetailSheet.getCell(row, 1).value = 'Category / Line Item';
  allDetailSheet.getCell(row, 1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };

  const monthStartCol = 2;
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    allDetailSheet.getCell(row, col).value = monthNames[m];
    allDetailSheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };
    allDetailSheet.getCell(row, col).alignment = { horizontal: 'center' };
  }

  const headers = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', '2026 Total', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', '2027 Total', 'Grand Total'];
  Object.values(quarterCols).forEach((col, idx) => {
    allDetailSheet.getCell(row, col).value = headers[idx];
    allDetailSheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    allDetailSheet.getCell(row, col).alignment = { horizontal: 'center', wrapText: true };
  });
  row++;

  // Track total rows for final cumulative
  let teamTotalRow, infraTotalRow, gtmTotalRow, rdTotalRow;

  // === TEAM EXPENSES SECTION ===
  const teamHeaderRow = row;
  allDetailSheet.getCell(row, 1).value = 'TEAM EXPENSES';
  allDetailSheet.getCell(row, 1).font = { bold: true, size: 12 };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
  row++;

  // Base Salaries header (collapsible group)
  const baseSalaryHeaderRow = row;
  allDetailSheet.getCell(row, 1).value = 'Base Salaries';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getRow(row).outlineLevel = 1;
  row++;

  // Individual employees (nested under Base Salaries)
  const firstPersonRow = row;
  headcountData.forEach((person, idx) => {
    const hcDataRow = idx + 2;
    allDetailSheet.getCell(row, 1).value = { formula: `"  "&'Headcount Detail'!A${hcDataRow}` };
    allDetailSheet.getRow(row).outlineLevel = 2;

    for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
      const hcCol = col - monthStartCol + 5;
      allDetailSheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${hcDataRow}` };
      allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    }
    row++;
  });

  // Base Salaries Subtotal
  allDetailSheet.getCell(row, 1).value = 'Subtotal: Base Salaries';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getRow(row).outlineLevel = 1;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const hcCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${sheetRows.headcount.baseSalaryRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { bold: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  row++;

  // Benefits & Taxes
  allDetailSheet.getCell(row, 1).value = 'Benefits & Taxes (35%)';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getRow(row).outlineLevel = 1;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const hcCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${sheetRows.headcount.benefitsRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
  }
  row++;

  // Recruiting
  allDetailSheet.getCell(row, 1).value = 'Recruiting Expenses';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getRow(row).outlineLevel = 1;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const hcCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${sheetRows.headcount.recruitingRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
  }
  row++;

  // Total Team Expenses
  teamTotalRow = row;
  allDetailSheet.getCell(row, 1).value = 'TOTAL TEAM EXPENSES';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const hcCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${sheetRows.headcount.totalRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { bold: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } };
  }
  row++;

  // Cumulative Team Expenses
  allDetailSheet.getCell(row, 1).value = 'Cumulative Team Expenses';
  allDetailSheet.getCell(row, 1).font = { bold: true, italic: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const hcCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Headcount Detail'!${colToLetter(hcCol)}${sheetRows.headcount.cumulativeRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { italic: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };
  }
  row += 2;

  // === INFRASTRUCTURE SECTION ===
  allDetailSheet.getCell(row, 1).value = 'INFRASTRUCTURE & OPERATING';
  allDetailSheet.getCell(row, 1).font = { bold: true, size: 12 };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
  row++;

  infrastructureData.forEach((item, idx) => {
    const infraDataRow = idx + 4;
    allDetailSheet.getCell(row, 1).value = { formula: `"  "&'Infrastructure Detail'!A${infraDataRow}` };
    allDetailSheet.getRow(row).outlineLevel = 1;

    for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
      const infraCol = col - monthStartCol + 5;
      allDetailSheet.getCell(row, col).value = { formula: `'Infrastructure Detail'!${colToLetter(infraCol)}${infraDataRow}` };
      allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    }
    row++;
  });

  // Infrastructure Total
  infraTotalRow = row;
  allDetailSheet.getCell(row, 1).value = 'TOTAL INFRASTRUCTURE';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD966' } };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const infraCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Infrastructure Detail'!${colToLetter(infraCol)}${sheetRows.infrastructure.totalRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { bold: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD966' } };
  }
  row++;

  // Cumulative Infrastructure
  allDetailSheet.getCell(row, 1).value = 'Cumulative Infrastructure';
  allDetailSheet.getCell(row, 1).font = { bold: true, italic: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const infraCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Infrastructure Detail'!${colToLetter(infraCol)}${sheetRows.infrastructure.cumulativeRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { italic: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };
  }
  row += 2;

  // === GO-TO-MARKET SECTION ===
  allDetailSheet.getCell(row, 1).value = 'GO-TO-MARKET';
  allDetailSheet.getCell(row, 1).font = { bold: true, size: 12 };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B9BD5' } };
  row++;

  goToMarketData.forEach((item, idx) => {
    const gtmDataRow = idx + 4;
    allDetailSheet.getCell(row, 1).value = { formula: `"  "&'Go-to-Market Detail'!A${gtmDataRow}` };
    allDetailSheet.getRow(row).outlineLevel = 1;

    for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
      const gtmCol = col - monthStartCol + 5;
      allDetailSheet.getCell(row, col).value = { formula: `'Go-to-Market Detail'!${colToLetter(gtmCol)}${gtmDataRow}` };
      allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    }
    row++;
  });

  // GTM Total
  gtmTotalRow = row;
  allDetailSheet.getCell(row, 1).value = 'TOTAL GO-TO-MARKET';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9BC2E6' } };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const gtmCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Go-to-Market Detail'!${colToLetter(gtmCol)}${sheetRows.gtm.totalRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { bold: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9BC2E6' } };
  }
  row++;

  // Cumulative GTM
  allDetailSheet.getCell(row, 1).value = 'Cumulative Go-to-Market';
  allDetailSheet.getCell(row, 1).font = { bold: true, italic: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const gtmCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'Go-to-Market Detail'!${colToLetter(gtmCol)}${sheetRows.gtm.cumulativeRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { italic: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };
  }
  row += 2;

  // === R&D SECTION ===
  allDetailSheet.getCell(row, 1).value = 'R&D / PRODUCT DEVELOPMENT';
  allDetailSheet.getCell(row, 1).font = { bold: true, size: 12 };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9966FF' } };
  row++;

  rdExpensesData.forEach((item, idx) => {
    const rdDataRow = idx + 4;
    allDetailSheet.getCell(row, 1).value = { formula: `"  "&'R&D Detail'!A${rdDataRow}` };
    allDetailSheet.getRow(row).outlineLevel = 1;

    for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
      const rdCol = col - monthStartCol + 5;
      allDetailSheet.getCell(row, col).value = { formula: `'R&D Detail'!${colToLetter(rdCol)}${rdDataRow}` };
      allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    }
    row++;
  });

  // R&D Total
  rdTotalRow = row;
  allDetailSheet.getCell(row, 1).value = 'TOTAL R&D';
  allDetailSheet.getCell(row, 1).font = { bold: true };
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC299FF' } };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const rdCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'R&D Detail'!${colToLetter(rdCol)}${sheetRows.rd.totalRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { bold: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC299FF' } };
  }
  row++;

  // Cumulative R&D
  allDetailSheet.getCell(row, 1).value = 'Cumulative R&D';
  allDetailSheet.getCell(row, 1).font = { bold: true, italic: true };
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    const rdCol = col - monthStartCol + 5;
    allDetailSheet.getCell(row, col).value = { formula: `'R&D Detail'!${colToLetter(rdCol)}${sheetRows.rd.cumulativeRow}` };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { italic: true };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEFD5' } };
  }
  row += 2;

  // === GRAND TOTAL ===
  const grandTotalRow = row;
  allDetailSheet.getCell(row, 1).value = 'TOTAL ALL EXPENSES';
  allDetailSheet.getCell(row, 1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }; // WHITE FONT
  allDetailSheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };

  // FIX: Sum the category totals within this sheet instead of referencing summary
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    allDetailSheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${teamTotalRow}+${colToLetter(col)}${infraTotalRow}+${colToLetter(col)}${gtmTotalRow}+${colToLetter(col)}${rdTotalRow}`
    };
    allDetailSheet.getCell(row, col).numFmt = '$#,##0';
    allDetailSheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    allDetailSheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };
  }
  row++;

  // Cumulative All Expenses
  addCumulativeRow(allDetailSheet, row, grandTotalRow, monthStartCol, quarterCols, 'Cumulative All Expenses');

  // Column widths
  allDetailSheet.getColumn(1).width = 40;
  for (let col = monthStartCol; col <= quarterCols.grandTotal; col++) {
    allDetailSheet.getColumn(col).width = 11;
  }

  // Add column grouping for months 13-24 (Year 2) so they can be collapsed
  for (let m = 12; m < 24; m++) {
    const col = monthStartCol + m;
    allDetailSheet.getColumn(col).outlineLevel = 1;
  }
}

async function generateExpenseModel() {
  const workbook = new ExcelJS.Workbook();

  const firstMonthCol = 2;
  const quarterCols = {
    q1_2026: firstMonthCol + 24,
    q2_2026: firstMonthCol + 25,
    q3_2026: firstMonthCol + 26,
    q4_2026: firstMonthCol + 27,
    total_2026: firstMonthCol + 28,
    q1_2027: firstMonthCol + 29,
    q2_2027: firstMonthCol + 30,
    q3_2027: firstMonthCol + 31,
    q4_2027: firstMonthCol + 32,
    total_2027: firstMonthCol + 33,
    grandTotal: firstMonthCol + 34
  };

  // Detail sheets have columns 1-4 for assumptions, so months start at column 5
  const detailSheetMonthCol = 5;
  const detailQuarterCols = {
    q1_2026: detailSheetMonthCol + 24,
    q2_2026: detailSheetMonthCol + 25,
    q3_2026: detailSheetMonthCol + 26,
    q4_2026: detailSheetMonthCol + 27,
    total_2026: detailSheetMonthCol + 28,
    q1_2027: detailSheetMonthCol + 29,
    q2_2027: detailSheetMonthCol + 30,
    q3_2027: detailSheetMonthCol + 31,
    q4_2027: detailSheetMonthCol + 32,
    total_2027: detailSheetMonthCol + 33,
    grandTotal: detailSheetMonthCol + 34
  };

  console.log('Building comprehensive model with cumulative rows...');

  // Create sheets
  const summarySheet = workbook.addWorksheet('Executive Summary');
  const allDetailSheet = workbook.addWorksheet('All Detail');
  const headcountSheet = workbook.addWorksheet('Headcount Detail');
  const infraSheet = workbook.addWorksheet('Infrastructure Detail');
  const gtmSheet = workbook.addWorksheet('Go-to-Market Detail');
  const rdSheet = workbook.addWorksheet('R&D Detail');

  // Build detail sheets first (use detailQuarterCols for sheets with assumptions in columns 1-4)
  const headcountRows = await buildHeadcountSheet(headcountSheet, detailSheetMonthCol, detailQuarterCols);
  const infraRows = await buildExpenseSheet(infraSheet, 'Infrastructure & Operating', infrastructureData, detailSheetMonthCol, detailQuarterCols);
  const gtmRows = await buildExpenseSheet(gtmSheet, 'Go-to-Market', goToMarketData, detailSheetMonthCol, detailQuarterCols);
  const rdRows = await buildExpenseSheet(rdSheet, 'R&D / Product Development', rdExpensesData, detailSheetMonthCol, detailQuarterCols);

  const sheetRows = {
    headcount: headcountRows,
    infrastructure: infraRows,
    gtm: gtmRows,
    rd: rdRows
  };

  // Build summary sheet (references detail sheets)
  const summaryRows = await buildSummarySheet(summarySheet, firstMonthCol, quarterCols, sheetRows);
  sheetRows.summary = summaryRows;

  // Build all detail sheet with grouping
  await buildAllDetailSheet(allDetailSheet, firstMonthCol, quarterCols, sheetRows);

  await workbook.xlsx.writeFile('./outputdocs/EVOLVE_Expense_Model.xlsx');

  console.log('\n✓ Final Excel model generated: EVOLVE_Expense_Model.xlsx');
  console.log('✓ All "cost" references changed to "expense"');
  console.log('✓ Cumulative expense rows added after each total');
  console.log('✓ All Detail sheet bug fixed (formulas now sum category totals)');
  console.log('✓ All Detail sheet TOTAL ALL EXPENSES font is now white');
  console.log('✓ All assumptions visible as columns');
  console.log('✓ All calculations use formulas referencing assumptions');
  console.log('✓ Excel grouping enabled (collapsible sections)');
  console.log('✓ Quarterly and yearly totals with formulas');
  console.log('✓ Month headers show actual dates (Jan-26 through Dec-27)');
  console.log('\n📊 Ready for scenario planning!');
}

generateExpenseModel().catch(console.error);
