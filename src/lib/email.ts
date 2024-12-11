import { Resend } from 'resend';
import { format } from 'date-fns';
import { generateETicket } from './eticket';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(booking: any) {
  const { passengers, tripDate, tripTime, vehicleCompany, bookingCode, checkpointName } = booking;
  const primaryPassenger = passengers[0];

  // Generate e-ticket
  const eTicketData = await generateETicket(booking);

  // Ticket issued date and time
  const issueDateTime = format(new Date(), 'MMMM d, yyyy hh:mm a');

  // Update trip route
  const tripRoute = `Irawan to ${checkpointName}`; // Use checkpointName

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: primaryPassenger.email || 'ronjames6213@gmail.com',
    subject: 'Booking Confirmation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${primaryPassenger.firstName},</p>
      <p>Your booking has been confirmed. Here are the details:</p>
      <ul>
        <li><strong>Booking Code:</strong> ${bookingCode}</li>
        <li><strong>Issued:</strong> ${issueDateTime}</li>
        <li><strong>Trip Date:</strong> ${format(new Date(tripDate), 'MMMM d, yyyy')}</li>
        <li><strong>Trip Time:</strong> ${tripTime}</li>
        <li><strong>Trip Route:</strong> ${tripRoute}</li>
        <li><strong>Vehicle Company:</strong> ${vehicleCompany}</li>
      </ul>
      <p>Please find your e-ticket attached to this email.</p>
      <p>Thank you for choosing our service!</p>
    `,
    attachments: [
      {
        filename: `e-ticket-${bookingCode}.pdf`,
        content: eTicketData.blob,
      },
    ],
  });
}

