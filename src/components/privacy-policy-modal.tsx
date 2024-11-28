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

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) {
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
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Please read our Privacy Policy carefully.
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
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
