import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrivacyPolicyModal } from "./privacy-policy-modal";
import { TermsOfServiceModal } from "./terms-of-service-modal";

interface AcknowledgmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export function AcknowledgmentModal({
  isOpen,
  onClose,
  onAgree,
}: AcknowledgmentModalProps) {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const handleAgree = () => {
    if (privacyChecked && termsChecked) {
      onAgree();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Acknowledgment</DialogTitle>
          <DialogDescription>
            Before proceeding, you must acknowledge and agree to our policies.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={privacyChecked}
              onCheckedChange={(checked) =>
                setPrivacyChecked(checked as boolean)
              }
            />
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to the{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowPrivacyPolicy(true)}
              >
                Privacy Policy
              </span>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsChecked}
              onCheckedChange={(checked) => setTermsChecked(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to the{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowTermsOfService(true)}
              >
                Terms and Conditions
              </span>
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleAgree}
            disabled={!privacyChecked || !termsChecked}
          >
            I Agree
          </Button>
        </DialogFooter>
      </DialogContent>
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
      <TermsOfServiceModal
        isOpen={showTermsOfService}
        onClose={() => setShowTermsOfService(false)}
      />
    </Dialog>
  );
}
