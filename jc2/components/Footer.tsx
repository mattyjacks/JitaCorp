import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4">JitaCorp</h4>
            <p className="text-sm">Profit with Purpose. Building sustainable solutions for homelessness and disability.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-gold transition">Blog</Link></li>
              <li><Link href="/forum" className="hover:text-gold transition">Forum</Link></li>
              <li><Link href="/investors" className="hover:text-gold transition">Investors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-gold transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@jitacorp.com" className="hover:text-gold transition">hello@jitacorp.com</a></li>
              <li><a href="https://twitter.com/jitacorp" className="hover:text-gold transition">Twitter</a></li>
              <li><a href="https://linkedin.com/company/jitacorp" className="hover:text-gold transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm">
          <p>&copy; 2026 JitaCorp. A Public Benefit Corporation.</p>
        </div>
      </div>
    </footer>
  )
}
