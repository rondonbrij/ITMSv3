import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  onDisagree: () => void;
}

export function PolicyModal({
  isOpen,
  onClose,
  onAgree,
  onDisagree,
}: PolicyModalProps) {
  const [canAgree, setCanAgree] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      if (
        content.scrollHeight - content.scrollTop <=
        content.clientHeight + 10
      ) {
        setCanAgree(true);
      }
    };

    content.addEventListener("scroll", handleScroll);
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Privacy Policy and Terms of Service</DialogTitle>
          <DialogDescription>
            Please read and agree to our Privacy Policy and Terms of Service
            before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div ref={contentRef} className="overflow-y-auto flex-grow pr-4">
          <h2 className="text-xl font-bold mt-4 mb-2">Privacy Policy</h2>
          <h3 className="text-lg font-semibold mt-3 mb-1">Introduction</h3>
          <p>
            Welcome to the Puerto Princesa Land Transportation Terminal Website
            (&quot;Website&quot;). We respect your privacy and are committed to
            safeguarding your personal data. This Privacy Policy outlines how we
            collect, use, and protect your information.
          </p>

          <h3 className="text-lg font-semibold mt-3 mb-1">
            Information We Collect
          </h3>
          <ul className="list-disc pl-5 mb-2">
            <li>
              Personal Information: We collect information such as your name,
              email address, phone number, and payment details when you book
              through our website.
            </li>
            <li>
              Usage Data: We collect information about your interaction with the
              website, including IP address, browser type, operating system, and
              session activity.
            </li>
            <li>
              Cookies: Our website uses cookies to enhance your browsing
              experience and improve our services.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">
            How We Use Your Information
          </h3>
          <ul className="list-disc pl-5 mb-2">
            <li>To process bookings and send confirmations.</li>
            <li>To communicate updates, changes, or cancellations.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal and regulatory requirements.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">
            Information Sharing
          </h3>
          <p>
            We do not sell or share your information with third parties, except
            in the following cases:
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>
              Service Providers: Third-party platforms that assist with payment
              processing or booking management.
            </li>
            <li>
              Legal Requirements: When required by law or in response to a valid
              legal request.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">Security Measures</h3>
          <p>
            We use advanced security measures, such as encryption and secure
            servers, to protect your personal data. However, no system is 100%
            secure, so we encourage caution when sharing sensitive information.
          </p>

          <h3 className="text-lg font-semibold mt-3 mb-1">Your Rights</h3>
          <ul className="list-disc pl-5 mb-2">
            <li>
              Access and Correction: You can review and update your personal
              information.
            </li>
            <li>
              Request Deletion: You can request the deletion of your data unless
              required by law.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-3 mb-1">Policy Updates</h3>
          <p>
            This Privacy Policy may be updated periodically. Changes will be
            posted on this page, and we encourage you to review it regularly.
          </p>

          <h3 className="text-lg font-semibold mt-3 mb-1">Contact Us</h3>
          <p>
            For questions or concerns about this policy, email us at
            support@pptc-terminal.com.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">Terms of Service</h2>
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
          <Button onClick={onDisagree} variant="outline">
            Disagree
          </Button>
          <Button onClick={onAgree} disabled={!canAgree}>
            I Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
