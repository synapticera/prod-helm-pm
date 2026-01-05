const ExcelJS = require('exceljs');

// Revenue model with quarterly totals, segment ARR, and free-to-paid conversion
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

async function readExistingCustomerData() {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('./outputdocs/EVOLVE_Revenue_Model.xlsx');
    const sheet = workbook.getWorksheet('Revenue Model');

    // Find the rows with "New SMB Customers", "New Mid-Market Customers", "New Enterprise Customers"
    let newCustomersByMonth = [];
    let smbRow = null, midRow = null, entRow = null;

    sheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1).value;
      if (firstCell && typeof firstCell === 'string') {
        if (firstCell.includes('New SMB Customers')) smbRow = rowNumber;
        if (firstCell.includes('New Mid-Market Customers')) midRow = rowNumber;
        if (firstCell.includes('New Enterprise Customers')) entRow = rowNumber;
      }
    });

    if (smbRow && midRow && entRow) {
      for (let m = 0; m < MONTHS; m++) {
        const col = 2 + m; // Month columns start at column 2
        const smb = sheet.getRow(smbRow).getCell(col).value || 0;
        const midMarket = sheet.getRow(midRow).getCell(col).value || 0;
        const enterprise = sheet.getRow(entRow).getCell(col).value || 0;

        newCustomersByMonth.push({
          smb: typeof smb === 'object' ? 0 : smb,
          midMarket: typeof midMarket === 'object' ? 0 : midMarket,
          enterprise: typeof enterprise === 'object' ? 0 : enterprise
        });
      }
      console.log('✓ Successfully read existing customer data from spreadsheet');
      return newCustomersByMonth;
    }
  } catch (error) {
    console.log('⚠ Could not read existing file, using default data');
  }

  // Fallback to default data
  // SMB starts at 0, 0, then 1, 2, 3, 4, 5, etc.
  // Mid-Market and Enterprise are all 0 (no new customers - they come from free tier conversions)
  return [
    { smb: 0, midMarket: 0, enterprise: 0 },
    { smb: 0, midMarket: 0, enterprise: 0 },
    { smb: 1, midMarket: 0, enterprise: 0 },
    { smb: 2, midMarket: 0, enterprise: 0 },
    { smb: 3, midMarket: 0, enterprise: 0 },
    { smb: 4, midMarket: 0, enterprise: 0 },
    { smb: 5, midMarket: 0, enterprise: 0 },
    { smb: 6, midMarket: 0, enterprise: 0 },
    { smb: 7, midMarket: 0, enterprise: 0 },
    { smb: 8, midMarket: 0, enterprise: 0 },
    { smb: 9, midMarket: 0, enterprise: 0 },
    { smb: 10, midMarket: 0, enterprise: 0 },
    { smb: 11, midMarket: 0, enterprise: 0 },
    { smb: 12, midMarket: 0, enterprise: 0 },
    { smb: 13, midMarket: 0, enterprise: 0 },
    { smb: 14, midMarket: 0, enterprise: 0 },
    { smb: 15, midMarket: 0, enterprise: 0 },
    { smb: 16, midMarket: 0, enterprise: 0 },
    { smb: 17, midMarket: 0, enterprise: 0 },
    { smb: 18, midMarket: 0, enterprise: 0 },
    { smb: 19, midMarket: 0, enterprise: 0 },
    { smb: 20, midMarket: 0, enterprise: 0 },
    { smb: 21, midMarket: 0, enterprise: 0 },
    { smb: 22, midMarket: 0, enterprise: 0 }
  ];
}

async function generateRevenueModel() {
  const newCustomersByMonth = await readExistingCustomerData();

  // Key Assumptions
  const assumptions = {
    smbAverageARR: 20000,
    midMarketAverageARR: 75000,
    enterpriseAverageARR: 200000,
    smbExpansionRate: 0.0085,
    midMarketExpansionRate: 0.0146,
    enterpriseExpansionRate: 0.0193,
    smbChurnRate: 0.015,
    midMarketChurnRate: 0.008,
    enterpriseChurnRate: 0.005,

    // Free-to-paid conversion (30-day model)
    conversionRate: 0.05  // 5% of free users convert to paid in following month
  };

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Revenue Model');

  let row = 1;

  // Title
  sheet.getCell(row, 1).value = 'EVOLVE - 24 Month Revenue Model';
  sheet.getCell(row, 1).font = { size: 16, bold: true };
  sheet.mergeCells(row, 1, row, 5);
  row++;

  sheet.getCell(row, 1).value = 'Target Case: Year 1 $2M ARR → Year 2 $10M ARR';
  sheet.getCell(row, 1).font = { size: 11, italic: true };
  sheet.mergeCells(row, 1, row, 5);
  row++;

  sheet.getCell(row, 1).value = 'With Free-to-Paid Conversion Model & Quarterly Totals';
  sheet.getCell(row, 1).font = { size: 9, italic: true, color: { argb: 'FF666666' } };
  sheet.mergeCells(row, 1, row, 5);
  row += 2;

  // ASSUMPTIONS SECTION
  sheet.getCell(row, 1).value = 'KEY ASSUMPTIONS';
  sheet.getCell(row, 1).font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };
  sheet.mergeCells(row, 1, row, 4);
  row++;

  // Pricing assumptions
  sheet.getCell(row, 1).value = 'Average Annual Revenue per Customer (Year 1)';
  sheet.getCell(row, 1).font = { bold: true };
  row++;

  sheet.getCell(row, 1).value = '  SMB Average ARR';
  sheet.getCell(row, 2).value = assumptions.smbAverageARR;
  sheet.getCell(row, 2).numFmt = '$#,##0';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '$500-2,500/month tiers';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const smbARRCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  Mid-Market Average ARR';
  sheet.getCell(row, 2).value = assumptions.midMarketAverageARR;
  sheet.getCell(row, 2).numFmt = '$#,##0';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = 'Grows to $150K by Year 5';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const midARRCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  Enterprise Average ARR';
  sheet.getCell(row, 2).value = assumptions.enterpriseAverageARR;
  sheet.getCell(row, 2).numFmt = '$#,##0';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = 'Grows to $500K by Year 5';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const entARRCell = `${colToLetter(2)}${row}`;
  row += 2;

  // Expansion & Churn
  sheet.getCell(row, 1).value = 'Net Dollar Retention (Expansion - Churn)';
  sheet.getCell(row, 1).font = { bold: true };
  row++;

  sheet.getCell(row, 1).value = '  SMB Monthly Expansion Rate';
  sheet.getCell(row, 2).value = assumptions.smbExpansionRate;
  sheet.getCell(row, 2).numFmt = '0.00%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '~110% NDR annually';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const smbExpansionCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  Mid-Market Monthly Expansion Rate';
  sheet.getCell(row, 2).value = assumptions.midMarketExpansionRate;
  sheet.getCell(row, 2).numFmt = '0.00%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '~119% NDR annually';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const midExpansionCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  Enterprise Monthly Expansion Rate';
  sheet.getCell(row, 2).value = assumptions.enterpriseExpansionRate;
  sheet.getCell(row, 2).numFmt = '0.00%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '~126% NDR annually';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const entExpansionCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  SMB Monthly Churn Rate';
  sheet.getCell(row, 2).value = assumptions.smbChurnRate;
  sheet.getCell(row, 2).numFmt = '0.0%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '~18% annual churn';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const smbChurnCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  Mid-Market Monthly Churn Rate';
  sheet.getCell(row, 2).value = assumptions.midMarketChurnRate;
  sheet.getCell(row, 2).numFmt = '0.0%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '~10% annual churn';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const midChurnCell = `${colToLetter(2)}${row}`;
  row++;

  sheet.getCell(row, 1).value = '  Enterprise Monthly Churn Rate';
  sheet.getCell(row, 2).value = assumptions.enterpriseChurnRate;
  sheet.getCell(row, 2).numFmt = '0.0%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = '~6% annual churn';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const entChurnCell = `${colToLetter(2)}${row}`;
  row += 2;

  // Free-to-Paid Conversion (Simplified)
  sheet.getCell(row, 1).value = 'Free-to-Paid Conversion (30-day model)';
  sheet.getCell(row, 1).font = { bold: true };
  row++;

  sheet.getCell(row, 1).value = '  30-Day Conversion Rate';
  sheet.getCell(row, 2).value = assumptions.conversionRate;
  sheet.getCell(row, 2).numFmt = '0.0%';
  sheet.getCell(row, 2).font = { color: { argb: 'FFFF0000' } };
  sheet.getCell(row, 3).value = 'Free users who convert to paid in following month';
  sheet.getCell(row, 3).font = { italic: true, size: 9 };
  const conversionCell = `${colToLetter(2)}${row}`;
  row += 3;

  // MONTHLY DATA SECTION
  // Column setup: Months + Q1-Q4 for each year + year totals + grand total
  const monthStartCol = 2;
  const q1_2026_col = monthStartCol + MONTHS;
  const q2_2026_col = q1_2026_col + 1;
  const q3_2026_col = q2_2026_col + 1;
  const q4_2026_col = q3_2026_col + 1;
  const total_2026_col = q4_2026_col + 1;
  const q1_2027_col = total_2026_col + 1;
  const q2_2027_col = q1_2027_col + 1;
  const q3_2027_col = q2_2027_col + 1;
  const q4_2027_col = q3_2027_col + 1;
  const total_2027_col = q4_2027_col + 1;
  const grandTotal_col = total_2027_col + 1;

  const quarterCols = {
    q1_2026: q1_2026_col,
    q2_2026: q2_2026_col,
    q3_2026: q3_2026_col,
    q4_2026: q4_2026_col,
    total_2026: total_2026_col,
    q1_2027: q1_2027_col,
    q2_2027: q2_2027_col,
    q3_2027: q3_2027_col,
    q4_2027: q4_2027_col,
    total_2027: total_2027_col,
    grandTotal: grandTotal_col
  };

  // Headers
  sheet.getCell(row, 1).value = 'Metric';
  sheet.getCell(row, 1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };

  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = monthNames[m];
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center', textRotation: 90 };
  }

  // Quarterly headers
  const quarterHeaders = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', '2026 Total', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', '2027 Total', 'Grand Total'];
  Object.values(quarterCols).forEach((col, idx) => {
    sheet.getCell(row, col).value = quarterHeaders[idx];
    sheet.getCell(row, col).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    sheet.getCell(row, col).alignment = { horizontal: 'center', wrapText: true };
  });
  row++;

  // Helper function to add quarterly formulas
  function addQuarterlySums(sheet, row, monthStartCol, quarterCols, format = '#,##0') {
    // Q1 2026 (months 1-3)
    sheet.getCell(row, quarterCols.q1_2026).value = {
      formula: `SUM(${colToLetter(monthStartCol)}${row}:${colToLetter(monthStartCol + 2)}${row})`
    };
    sheet.getCell(row, quarterCols.q1_2026).numFmt = format;

    // Q2 2026 (months 4-6)
    sheet.getCell(row, quarterCols.q2_2026).value = {
      formula: `SUM(${colToLetter(monthStartCol + 3)}${row}:${colToLetter(monthStartCol + 5)}${row})`
    };
    sheet.getCell(row, quarterCols.q2_2026).numFmt = format;

    // Q3 2026 (months 7-9)
    sheet.getCell(row, quarterCols.q3_2026).value = {
      formula: `SUM(${colToLetter(monthStartCol + 6)}${row}:${colToLetter(monthStartCol + 8)}${row})`
    };
    sheet.getCell(row, quarterCols.q3_2026).numFmt = format;

    // Q4 2026 (months 10-12)
    sheet.getCell(row, quarterCols.q4_2026).value = {
      formula: `SUM(${colToLetter(monthStartCol + 9)}${row}:${colToLetter(monthStartCol + 11)}${row})`
    };
    sheet.getCell(row, quarterCols.q4_2026).numFmt = format;

    // 2026 Total
    sheet.getCell(row, quarterCols.total_2026).value = {
      formula: `SUM(${colToLetter(quarterCols.q1_2026)}${row}:${colToLetter(quarterCols.q4_2026)}${row})`
    };
    sheet.getCell(row, quarterCols.total_2026).numFmt = format;
    sheet.getCell(row, quarterCols.total_2026).font = { bold: true };
    sheet.getCell(row, quarterCols.total_2026).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };

    // Q1 2027 (months 13-15)
    sheet.getCell(row, quarterCols.q1_2027).value = {
      formula: `SUM(${colToLetter(monthStartCol + 12)}${row}:${colToLetter(monthStartCol + 14)}${row})`
    };
    sheet.getCell(row, quarterCols.q1_2027).numFmt = format;

    // Q2 2027 (months 16-18)
    sheet.getCell(row, quarterCols.q2_2027).value = {
      formula: `SUM(${colToLetter(monthStartCol + 15)}${row}:${colToLetter(monthStartCol + 17)}${row})`
    };
    sheet.getCell(row, quarterCols.q2_2027).numFmt = format;

    // Q3 2027 (months 19-21)
    sheet.getCell(row, quarterCols.q3_2027).value = {
      formula: `SUM(${colToLetter(monthStartCol + 18)}${row}:${colToLetter(monthStartCol + 20)}${row})`
    };
    sheet.getCell(row, quarterCols.q3_2027).numFmt = format;

    // Q4 2027 (months 22-24)
    sheet.getCell(row, quarterCols.q4_2027).value = {
      formula: `SUM(${colToLetter(monthStartCol + 21)}${row}:${colToLetter(monthStartCol + 23)}${row})`
    };
    sheet.getCell(row, quarterCols.q4_2027).numFmt = format;

    // 2027 Total
    sheet.getCell(row, quarterCols.total_2027).value = {
      formula: `SUM(${colToLetter(quarterCols.q1_2027)}${row}:${colToLetter(quarterCols.q4_2027)}${row})`
    };
    sheet.getCell(row, quarterCols.total_2027).numFmt = format;
    sheet.getCell(row, quarterCols.total_2027).font = { bold: true };
    sheet.getCell(row, quarterCols.total_2027).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };

    // Grand Total
    sheet.getCell(row, quarterCols.grandTotal).value = {
      formula: `${colToLetter(quarterCols.total_2026)}${row}+${colToLetter(quarterCols.total_2027)}${row}`
    };
    sheet.getCell(row, quarterCols.grandTotal).numFmt = format;
    sheet.getCell(row, quarterCols.grandTotal).font = { bold: true };
    sheet.getCell(row, quarterCols.grandTotal).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
  }

  // === SMB SEGMENT ===
  sheet.getCell(row, 1).value = 'SMB SEGMENT';
  sheet.getCell(row, 1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
  row++;

  // New Free SMB Users (calculated from NEXT month's paid customers / conversion rate)
  // Reference the customer row which will be on the next row
  const newSMBRow = row + 1;
  sheet.getCell(row, 1).value = '  New Free SMB Users (Month Prior)';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m < MONTHS - 1) {
      // Next month's new customers / conversion rate
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col + 1)}${newSMBRow}/${conversionCell}`
      };
    } else {
      // Last month: use same as this month's new customers
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col)}${newSMBRow}/${conversionCell}`
      };
    }
    sheet.getCell(row, col).numFmt = '#,##0';
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols);
  row++;

  // New SMB Customers (from user's data) - HARD-CODED, EDITABLE
  sheet.getCell(row, 1).value = '  New SMB Customers';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = newCustomersByMonth[m].smb;
    sheet.getCell(row, col).numFmt = '#,##0';
    sheet.getCell(row, col).font = { color: { argb: 'FFFF0000' } };
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols);
  row++;

  // Active SMB Customers
  sheet.getCell(row, 1).value = '  Active SMB Customers';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = { formula: `${colToLetter(col)}${newSMBRow}` };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}*(1-${smbChurnCell})+${colToLetter(col)}${newSMBRow}`
      };
    }
    sheet.getCell(row, col).numFmt = '#,##0';
  }
  // Ending balance for quarters
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '#,##0';
  }
  const activeSMBRow = row;
  row++;

  // SMB MRR
  sheet.getCell(row, 1).value = '  SMB MRR';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col)}${activeSMBRow}*${smbARRCell}/12`
      };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}*(1-${smbChurnCell})*(1+${smbExpansionCell})+${colToLetter(col)}${newSMBRow}*${smbARRCell}/12`
      };
    }
    sheet.getCell(row, col).numFmt = '$#,##0';
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols, '$#,##0');
  const smbMRRRow = row;
  row++;

  // SMB ARR
  sheet.getCell(row, 1).value = '  SMB ARR (MRR x 12)';
  sheet.getCell(row, 1).font = { bold: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${smbMRRRow}*12`
    };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  // ARR for quarters should be ending ARR not sum
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '$#,##0';
    sheet.getCell(row, qCol).font = { bold: true };
    sheet.getCell(row, qCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  const smbARRRow = row;
  row += 2;

  // === MID-MARKET SEGMENT ===
  sheet.getCell(row, 1).value = 'MID-MARKET SEGMENT';
  sheet.getCell(row, 1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
  row++;

  // New Free Mid-Market Users (calculated from NEXT month's paid customers / conversion rate)
  // Reference the customer row which will be on the next row
  const newMidRow = row + 1;
  sheet.getCell(row, 1).value = '  New Free Mid-Market Users (Month Prior)';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m < MONTHS - 1) {
      // Next month's new customers / conversion rate
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col + 1)}${newMidRow}/${conversionCell}`
      };
    } else {
      // Last month: use same as this month's new customers
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col)}${newMidRow}/${conversionCell}`
      };
    }
    sheet.getCell(row, col).numFmt = '#,##0';
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols);
  row++;

  // New Mid-Market Customers (all from free tier conversions)
  sheet.getCell(row, 1).value = '  New Mid-Market Customers';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = 0;
    sheet.getCell(row, col).numFmt = '#,##0';
    sheet.getCell(row, col).font = { color: { argb: 'FF999999' }, italic: true };
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols);
  row++;

  // Active Mid-Market Customers
  sheet.getCell(row, 1).value = '  Active Mid-Market Customers';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = { formula: `${colToLetter(col)}${newMidRow}` };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}*(1-${midChurnCell})+${colToLetter(col)}${newMidRow}`
      };
    }
    sheet.getCell(row, col).numFmt = '#,##0';
  }
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '#,##0';
  }
  const activeMidRow = row;
  row++;

  // Mid-Market MRR
  sheet.getCell(row, 1).value = '  Mid-Market MRR';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col)}${activeMidRow}*${midARRCell}/12`
      };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}*(1-${midChurnCell})*(1+${midExpansionCell})+${colToLetter(col)}${newMidRow}*${midARRCell}/12`
      };
    }
    sheet.getCell(row, col).numFmt = '$#,##0';
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols, '$#,##0');
  const midMRRRow = row;
  row++;

  // Mid-Market ARR
  sheet.getCell(row, 1).value = '  Mid-Market ARR (MRR x 12)';
  sheet.getCell(row, 1).font = { bold: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${midMRRRow}*12`
    };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '$#,##0';
    sheet.getCell(row, qCol).font = { bold: true };
    sheet.getCell(row, qCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  const midARRRow = row;
  row += 2;

  // === ENTERPRISE SEGMENT ===
  sheet.getCell(row, 1).value = 'ENTERPRISE SEGMENT';
  sheet.getCell(row, 1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
  row++;

  // New Free Enterprise Users (calculated from NEXT month's paid customers / conversion rate)
  // Reference the customer row which will be on the next row
  const newEntRow = row + 1;
  sheet.getCell(row, 1).value = '  New Free Enterprise Users (Month Prior)';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m < MONTHS - 1) {
      // Next month's new customers / conversion rate
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col + 1)}${newEntRow}/${conversionCell}`
      };
    } else {
      // Last month: use same as this month's new customers
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col)}${newEntRow}/${conversionCell}`
      };
    }
    sheet.getCell(row, col).numFmt = '#,##0';
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols);
  row++;

  // New Enterprise Customers (all from free tier conversions)
  sheet.getCell(row, 1).value = '  New Enterprise Customers';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = 0;
    sheet.getCell(row, col).numFmt = '#,##0';
    sheet.getCell(row, col).font = { color: { argb: 'FF999999' }, italic: true };
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols);
  row++;

  // Active Enterprise Customers
  sheet.getCell(row, 1).value = '  Active Enterprise Customers';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = { formula: `${colToLetter(col)}${newEntRow}` };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}*(1-${entChurnCell})+${colToLetter(col)}${newEntRow}`
      };
    }
    sheet.getCell(row, col).numFmt = '#,##0';
  }
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '#,##0';
  }
  const activeEntRow = row;
  row++;

  // Enterprise MRR
  sheet.getCell(row, 1).value = '  Enterprise MRR';
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col)}${activeEntRow}*${entARRCell}/12`
      };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}*(1-${entChurnCell})*(1+${entExpansionCell})+${colToLetter(col)}${newEntRow}*${entARRCell}/12`
      };
    }
    sheet.getCell(row, col).numFmt = '$#,##0';
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols, '$#,##0');
  const entMRRRow = row;
  row++;

  // Enterprise ARR
  sheet.getCell(row, 1).value = '  Enterprise ARR (MRR x 12)';
  sheet.getCell(row, 1).font = { bold: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${entMRRRow}*12`
    };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '$#,##0';
    sheet.getCell(row, qCol).font = { bold: true };
    sheet.getCell(row, qCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2D9' } };
  }
  const entARRRow = row;
  row += 2;

  // === TOTALS SECTION ===
  sheet.getCell(row, 1).value = 'TOTAL METRICS';
  sheet.getCell(row, 1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
  sheet.getCell(row, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF203864' } };
  row++;

  // Total Active Customers
  sheet.getCell(row, 1).value = '  Total Active Paid Customers';
  sheet.getCell(row, 1).font = { bold: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${activeSMBRow}+${colToLetter(col)}${activeMidRow}+${colToLetter(col)}${activeEntRow}`
    };
    sheet.getCell(row, col).numFmt = '#,##0';
    sheet.getCell(row, col).font = { bold: true };
  }
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '#,##0';
    sheet.getCell(row, qCol).font = { bold: true };
  }
  row++;

  // Total MRR
  sheet.getCell(row, 1).value = '  Total MRR';
  sheet.getCell(row, 1).font = { bold: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${smbMRRRow}+${colToLetter(col)}${midMRRRow}+${colToLetter(col)}${entMRRRow}`
    };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols, '$#,##0');
  const totalMRRRow = row;
  row++;

  // Total ARR
  sheet.getCell(row, 1).value = '  Total ARR (MRR x 12)';
  sheet.getCell(row, 1).font = { bold: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    sheet.getCell(row, col).value = {
      formula: `${colToLetter(col)}${smbARRRow}+${colToLetter(col)}${midARRRow}+${colToLetter(col)}${entARRRow}`
    };
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
  }
  for (let qCol of Object.values(quarterCols)) {
    const lastMonthOfPeriod = qCol === quarterCols.q1_2026 ? monthStartCol + 2 :
                              qCol === quarterCols.q2_2026 ? monthStartCol + 5 :
                              qCol === quarterCols.q3_2026 ? monthStartCol + 8 :
                              qCol === quarterCols.q4_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.q1_2027 ? monthStartCol + 14 :
                              qCol === quarterCols.q2_2027 ? monthStartCol + 17 :
                              qCol === quarterCols.q3_2027 ? monthStartCol + 20 :
                              qCol === quarterCols.q4_2027 ? monthStartCol + 23 :
                              qCol === quarterCols.total_2026 ? monthStartCol + 11 :
                              qCol === quarterCols.total_2027 ? monthStartCol + 23 :
                              monthStartCol + 23;
    sheet.getCell(row, qCol).value = { formula: `${colToLetter(lastMonthOfPeriod)}${row}` };
    sheet.getCell(row, qCol).numFmt = '$#,##0';
    sheet.getCell(row, qCol).font = { bold: true };
    sheet.getCell(row, qCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
  }
  row++;

  // Cumulative Revenue
  sheet.getCell(row, 1).value = '  Cumulative Revenue';
  sheet.getCell(row, 1).font = { bold: true, italic: true };
  for (let m = 0; m < MONTHS; m++) {
    const col = monthStartCol + m;
    if (m === 0) {
      sheet.getCell(row, col).value = { formula: `${colToLetter(col)}${totalMRRRow}` };
    } else {
      sheet.getCell(row, col).value = {
        formula: `${colToLetter(col - 1)}${row}+${colToLetter(col)}${totalMRRRow}`
      };
    }
    sheet.getCell(row, col).numFmt = '$#,##0';
    sheet.getCell(row, col).font = { bold: true, italic: true };
    sheet.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
  }
  addQuarterlySums(sheet, row, monthStartCol, quarterCols, '$#,##0');

  // Column widths
  sheet.getColumn(1).width = 35;
  sheet.getColumn(2).width = 20;
  sheet.getColumn(3).width = 45;
  for (let col = monthStartCol; col < monthStartCol + MONTHS; col++) {
    sheet.getColumn(col).width = 11;
  }
  for (let col of Object.values(quarterCols)) {
    sheet.getColumn(col).width = 11;
  }

  // Add column grouping for months 13-24 (Year 2)
  for (let m = 12; m < 24; m++) {
    const col = monthStartCol + m;
    sheet.getColumn(col).outlineLevel = 1;
  }

  // Save workbook
  await workbook.xlsx.writeFile('./outputdocs/EVOLVE_Revenue_Model.xlsx');
  console.log('\n✓ Revenue model generated: EVOLVE_Revenue_Model.xlsx');
  console.log('✓ Quarterly and annual totals with color-coded columns');
  console.log('✓ ARR rows at segment level');
  console.log('✓ Free-to-paid conversion model included');
  console.log('✓ Free users tracked for each segment');
  console.log('✓ All assumptions editable');
  console.log('✓ Year 2 columns grouped for easy hiding\n');
}

generateRevenueModel().catch(console.error);
