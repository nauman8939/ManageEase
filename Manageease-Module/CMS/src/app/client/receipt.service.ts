// pdf.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  generatePdf(content: string): void {
    const pdf = new jsPDF();
    pdf.text(content, 10, 10);
    const blob = pdf.output('blob');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Receipt.pdf';
    link.click();
  }
}
