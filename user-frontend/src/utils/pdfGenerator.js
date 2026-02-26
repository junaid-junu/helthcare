import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateMedicalReportPDF = (patient, reports) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text('SmartHealth Medical Report', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Patient Info
    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.text('Patient Details', 14, 45);

    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(`Name: ${patient.name}`, 14, 53);
    doc.text(`Age: ${patient.age || 'N/A'}`, 14, 59);
    doc.text(`Blood Group: ${patient.bloodGroup || 'N/A'}`, 80, 59);
    doc.text(`Height: ${patient.height || 'N/A'} cm`, 14, 65);
    doc.text(`Weight: ${patient.weight || 'N/A'} kg`, 80, 65);

    // Table Data mapping
    const tableColumn = ["Date", "Doctor", "BP (Sys/Dia)", "Sugar (mg/dL)", "Cholesterol", "Notes"];
    const tableRows = [];

    reports.forEach(report => {
        const reportData = [
            new Date(report.dateOfTest).toLocaleDateString(),
            report.doctor?.name || 'Unknown',
            `${report.bloodPressureSys || '-'}/${report.bloodPressureDia || '-'}`,
            report.sugarLevel || '-',
            report.cholesterol || '-',
            report.notes || '-'
        ];
        tableRows.push(reportData);
    });

    // Render Table
    doc.autoTable({
        startY: 75,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] }, // Blue-600 headers
        styles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    // Save the PDF
    doc.save(`${patient.name.replace(/\s+/g, '_')}_Medical_Report.pdf`);
};
