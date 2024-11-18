import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container py-8 flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/trip-selection?vehicleType=BUS"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Bus Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/trip-selection?vehicleType=VAN"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Van Booking
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 Irawan Terminal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
