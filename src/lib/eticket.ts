import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

export async function generateETicket(booking: any) {
  const doc = new jsPDF();
  
  // Helper function to add a formatted text block
  const addTextBlock = (text: string, x: number, y: number, options: any = {}) => {
    doc.text(text, x, y, options);
  };

  // Add title
  doc.setFontSize(20);
  doc.text('E-Ticket', 105, 20, { align: 'center' });

  // Add booking details
  doc.setFontSize(12);
  addTextBlock(`Booking Code: ${booking.bookingCode}`, 20, 40);
  addTextBlock(`Issued: ${format(new Date(), 'MMMM d, yyyy hh:mm a')}`, 20, 50);
  addTextBlock(`Trip Date: ${format(new Date(booking.tripDate), 'MMMM d, yyyy')}`, 20, 60);
  addTextBlock(`Trip Time: ${booking.tripTime}`, 20, 70);
  addTextBlock(`Trip Route: Irawan to ${booking.checkpointName}`, 20, 80);
  addTextBlock(`Vehicle Company: ${booking.vehicleCompany}`, 20, 90);

  // Add passenger details
  doc.setFontSize(14);
  doc.text('Passenger Details:', 20, 110);
  doc.setFontSize(12);
  booking.passengers.forEach((passenger: any, index: number) => {
    const yPos = 120 + (index * 40);
    addTextBlock(`Passenger ${index + 1}:`, 30, yPos);
    addTextBlock(`Name: ${passenger.firstName} ${passenger.lastName}`, 40, yPos + 10);
    addTextBlock(`Seat: ${passenger.seatNumber}`, 40, yPos + 20);
  });

  // Add footer
  doc.setFontSize(10);
  doc.text('Thank you for choosing our service!', 105, 280, { align: 'center' });

  // Generate PDF as data URL
  const pdfDataUri = doc.output('datauristring');
  
  return { url: pdfDataUri };
}

