export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-foreground mb-4">Yuga</h3>
            <p className="text-sm text-foreground/70">Premium clothing, designed with care.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Shirts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Hoodies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
          <p>&copy; 2025 Yuga. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
