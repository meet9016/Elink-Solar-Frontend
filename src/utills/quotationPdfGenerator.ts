import { ApiLead } from '@/components/leads/types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateQuotationPDF = async (lead: ApiLead) => {
  if (!lead.quotation) return;

  const { date, solarModule, inverter, options = [], rows = [] } = lead.quotation;

  const formattedDate = date ? new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '').toUpperCase() : new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '').toUpperCase();

  // Create a container element off-screen
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '800px'; 
  container.style.minHeight = '1130px'; 
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '40px 60px'; // Matching margins of the screenshot
  container.style.fontFamily = 'Montserrat, Arial, sans-serif';
  container.style.boxSizing = 'border-box';

  container.innerHTML = `
    <!-- Header with Logo and Date -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
      <div style="width: 120px;">
        <!-- Using SMS Logo instead of GS -->
        <img src="/logo/solar (2).png" alt="SMS Solar" style="max-width: 100%; height: auto;" />
      </div>
      <div style="font-weight: 700; font-size: 16px; color: #1e293b; margin-top: 15px;">
        DATE: ${formattedDate.split(',')[0] || formattedDate}
      </div>
    </div>

    <!-- Commercial Offer Section -->
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 800; color: #A63C71; text-transform: uppercase;">COMMERCIAL OFFER:</h2>
      <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 500;">Price for complete solar system with 5 years free AMC.</p>
    </div>

    <!-- Dynamic Quotation Table -->
    <table style="width: 100%; border-collapse: separate; border-spacing: 2px; text-align: center; font-size: 13px; font-weight: 700; margin-bottom: 15px;">
      <tbody>
        <tr>
          <td style="width: 70%; background-color: #A63C71; color: #ffffff; padding: 10px; text-transform: uppercase;">SOLAR MODULE MAKE</td>
          <td style="width: 30%; background-color: #fdf5f9; color: #1e293b; padding: 10px;">${solarModule || '-'}</td>
        </tr>
        <tr>
          <td style="background-color: #A63C71; color: #ffffff; padding: 10px; text-transform: uppercase;">INVERTER</td>
          <td style="background-color: #fdf5f9; color: #1e293b; padding: 10px;">${inverter || '-'}</td>
        </tr>
        ${rows.map((row) => `
        <tr>
          <td style="background-color: #A63C71; color: #ffffff; padding: 10px; text-transform: uppercase;">${row.title}</td>
          <td style="background-color: #fdf5f9; color: #1e293b; padding: 10px;">${row.values[0] || row.values.join(', ') || '-'}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <p style="margin: 0 0 20px 0; font-size: 11px; color: #A63C71; line-height: 1.4;">
      <strong>Note:</strong> If you are eligible, the subsidy amount will be credited by the government to your bank account after the meter installation is completed. Please keep this in mind during your planning.
    </p>

    <!-- Documents Required Section -->
    <table style="width: 100%; border-collapse: separate; border-spacing: 2px; text-align: center; font-size: 12px; margin-bottom: 20px; font-weight: 600; color: #1e293b;">
      <thead>
        <tr>
          <th style="width: 50%; background-color: #A63C71; color: #ffffff; padding: 10px; text-transform: uppercase; font-weight: 700;">DOCUMENTS REQUIRED FOR INDIVIDUAL SOLAR</th>
          <th style="width: 50%; background-color: #A63C71; color: #ffffff; padding: 10px; text-transform: uppercase; font-weight: 700;">DOCUMENTS REQUIRED FOR COMMON SOLAR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Latest Light Bill</td>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Latest Light Bill</td>
        </tr>
        <tr>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Aadhar Card Copy</td>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">PAN Card</td>
        </tr>
        <tr>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Cancelled Cheque</td>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Cancelled Cheque</td>
        </tr>
        <tr>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Passport Size Photo</td>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Society Registration Letter</td>
        </tr>
        <tr>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Property Tax Bill</td>
          <td style="background-color: #fdf5f9; border: 1px solid #f3e4ec; padding: 8px;">Sammati Patrak (Consent Letter)</td>
        </tr>
      </tbody>
    </table>

    <!-- Terms & Conditions Section -->
    <div style="font-size: 12px; color: #475569; line-height: 1.5;">
      <h3 style="margin: 0 0 5px 0; font-size: 13px; font-weight: 800; color: #A63C71; text-transform: uppercase;">TERMS & CONDITIONS:</h3>
      
      <h4 style="margin: 10px 0 2px 0; font-size: 12px; font-weight: 800; color: #A63C71;">GST:</h4>
      <p style="margin: 0;">Included at actual rate of 8.9%</p>

      <h4 style="margin: 10px 0 2px 0; font-size: 12px; font-weight: 800; color: #A63C71;">COMPLETION TIMELINE:</h4>
      <p style="margin: 0;">Work will be completed within 45 days from the date of receipt of Work Order & Procurement clearance, or receipt of advance payment (whichever is later), subject to site clearance.</p>

      <h4 style="margin: 10px 0 2px 0; font-size: 12px; font-weight: 800; color: #A63C71;">WARRANTY:</h4>
      <ul style="margin: 0; padding-left: 15px; list-style-type: none;">
        <li>• Solar Modules: 30 years output warranty</li>
        <li>• Inverter: 10 years warranty with monitoring</li>
        <li>• Free service warranty : 5 years included (Physical damage not applicable)</li>
      </ul>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2, // high quality
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');

    // 1. Load pdf-lib
    const { PDFDocument } = await import('pdf-lib');

    // 2. Fetch the fixed PDFs
    const res1 = await fetch('/pdf/1-4.pdf');
    if (!res1.ok) throw new Error("Could not load /pdf/1-4.pdf");
    const firstPdfBytes = await res1.arrayBuffer();
    
    // Fetch blank 5.pdf to use as background for dynamic page
    const res5 = await fetch('/pdf/5.pdf');
    if (!res5.ok) throw new Error("Could not load /pdf/5.pdf");
    const fifthPdfBytes = await res5.arrayBuffer();

    const res2 = await fetch('/pdf/6-9.pdf');
    if (!res2.ok) throw new Error("Could not load /pdf/6-9.pdf");
    const thirdPdfBytes = await res2.arrayBuffer();

    const firstPdf = await PDFDocument.load(firstPdfBytes);
    const fifthPdf = await PDFDocument.load(fifthPdfBytes);
    const thirdPdf = await PDFDocument.load(thirdPdfBytes);

    // 3. Create the final merged PDF
    const mergedPdf = await PDFDocument.create();

    // 4. Add Pages 1 to 4
    const firstPages = await mergedPdf.copyPages(firstPdf, firstPdf.getPageIndices());
    firstPages.forEach((page) => mergedPdf.addPage(page));

    // 5. Create Dynamic Page 5 (Copy from 5.pdf and overlay the HTML)
    const fifthPages = await mergedPdf.copyPages(fifthPdf, fifthPdf.getPageIndices());
    const dynamicPage = fifthPages[0]; // Take the first page of 5.pdf
    mergedPdf.addPage(dynamicPage);
    
    const { width, height } = dynamicPage.getSize();
    const pngImage = await mergedPdf.embedPng(imgData);
    const imgWidth = width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    dynamicPage.drawImage(pngImage, {
      x: 0,
      y: height - imgHeight, // Draw from top
      width: imgWidth,
      height: imgHeight,
    });

    // 6. Add Pages 6 to 9
    const thirdPages = await mergedPdf.copyPages(thirdPdf, thirdPdf.getPageIndices());
    thirdPages.forEach((page) => mergedPdf.addPage(page));

    // 7. Serialize and trigger download
    const pdfBytesModified = await mergedPdf.save();
    
    const blob = new Blob([pdfBytesModified], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const cleanedName = lead.fullName?.replace(/\s+/g, '_') || 'Lead';
    link.download = `Quotation_${cleanedName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

  } catch (error) {
    console.error('Failed to generate PDF:', error);
    alert('Failed to download PDF. Please try again.');
  } finally {
    document.body.removeChild(container);
  }
};
