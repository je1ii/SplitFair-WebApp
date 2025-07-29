import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function generateReceipt(expense, openInNewTab = false) {
  if (!expense) return;

  const doc = new jsPDF();
  const {
    title,
    payer,
    amount,
    desc,
    createdAt,
    splits,
    category,
  } = expense;

  const dateStr = createdAt?.toDate?.().toLocaleString?.() || 'N/A';

  doc.setFontSize(16);
  doc.text('SplitFair Expense Receipt', 14, 20);

  doc.setFontSize(12);
  doc.text(`Title: ${title || 'Untitled'}`, 14, 30);
  if (desc) doc.text(`Description: ${desc}`, 14, 38);
  if (category) doc.text(`Category: ${category}`, 14, 46);
  doc.text(`Payer: ${payer}`, 14, category ? 54 : 46);
  doc.text(`Total Amount: P${amount}`, 14, category ? 62 : 54);
  doc.text(`Date: ${dateStr}`, 14, category ? 70 : 62);

  const tableStartY = category ? 78 : 70;

  const splitData = splits
    ? Object.entries(splits).map(([name, entry]) => [
        name,
        `P${entry.amount.toFixed(2)}`,
        entry.settled ? 'Settled' : 'Unsettled',
      ])
    : [['(No data)', '-', '-']];

  autoTable(doc, {
    startY: tableStartY,
    head: [['Name', 'Amount', 'Status']],
    body: splitData,
  });

  try {
    if (openInNewTab) {
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);

      // Workaround for popup blocking
      setTimeout(() => {
        window.open(url, '_blank');
      }, 0);
    } else {
      doc.save(`${title || 'receipt'}.pdf`);
    }
  } catch (error) {
    console.error('Error generating receipt:', error);
  }
}

export { generateReceipt };