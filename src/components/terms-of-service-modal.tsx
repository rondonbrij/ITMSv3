import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({
  isOpen,
  onClose,
}: TermsOfServiceModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      if (
        content.scrollHeight - content.scrollTop <=
        content.clientHeight + 10
      ) {
        // User has scrolled to the bottom
      }
    };

    content.addEventListener("scroll", handleScroll);
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our Terms of Service carefully.
          </DialogDescription>
        </DialogHeader>
        <div ref={contentRef} className="overflow-y-auto flex-grow pr-4">
          <h2 className="text-xl font-bold mt-4 mb-2">Terms of Service</h2>
          <h3 className="text-lg font-semibold mt-3 mb-1">Introduction</h3>
          <p>
            Welcome to the Puerto Princesa Land Transportation Terminal Website
            (&quot;Website&quot;). By using this website, you agree to abide by
            these Terms of Service. If you do not agree, please refrain from
            using our services.
          </p>

          <h3 className="text-lg font-semibold mt-3 mb-1">Bookings</h3>
          <ul className="list-disc pl-5 mb-2">
            <li>
              Accuracy of Information: You are responsible for providing
              accurate information when making a booking.
            </li>
            <li>
              Payment: Payments must be completed through the website&apos;s
              secure system.
            </li>
            <li>
              Booking Confirmation: Your booking is confirmed only when payment
              is processed, and a confirmation email or message is sent to you.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">
            Cancellation and Refunds
          </h3>
          <ul className="list-disc pl-5 mb-2">
            <li>
              Company-Specific Policies: Cancellation and refund policies vary
              depending on the transport company.
            </li>
            <li>
              Direct Contact: If refunds are allowed, you must contact the
              transport company directly using the contact details provided on
              your e-ticket or message ticket.
            </li>
            <li>
              No Website Liability: The website is not responsible for
              processing refunds or resolving disputes between users and
              transport companies.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">
            User Responsibilities
          </h3>
          <ul className="list-disc pl-5 mb-2">
            <li>Lawful Use: Do not use the website for illegal activities.</li>
            <li>
              Respect Intellectual Property: All content on the website is
              protected by intellectual property laws.
            </li>
            <li>
              Security: Do not attempt to compromise the website&apos;s security
              or functionality.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">
            Limitation of Liability
          </h3>
          <ul className="list-disc pl-5 mb-2">
            <li>
              The website is a booking platform and is not responsible for
              transport delays, cancellations, or service quality provided by
              the transport companies.
            </li>
            <li>
              The website is not liable for any damages arising from incorrect
              booking details provided by users.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            Updates will be posted on the website, and your continued use of the
            website constitutes acceptance of the changes.
          </p>

          <h3 className="text-lg font-semibold mt-3 mb-1">Contact Us</h3>
          <p>
            For questions or concerns about these Terms of Service, email us at
            support@pptc-terminal.com.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
