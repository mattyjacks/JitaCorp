export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
        <p className="text-text-light mb-8">Last updated: January 2026</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">1. Introduction</h2>
            <p className="text-text-light leading-relaxed">
              JitaCorp ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, including our blog, forum, and contact forms.
            </p>
            <p className="text-text-light leading-relaxed mt-4">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Services. By accessing and using JitaCorp, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3">2.1 Information You Provide Directly</h3>
            <ul className="list-disc list-inside space-y-2 text-text-light">
              <li><strong>Account Registration:</strong> When you create an account, we collect your email address, name, and password.</li>
              <li><strong>Profile Information:</strong> You may provide a profile picture, bio, and other biographical information.</li>
              <li><strong>Content You Create:</strong> Blog posts, forum threads, replies, and comments you publish.</li>
              <li><strong>Contact Form:</strong> When you submit the contact form, we collect your name, email, subject, and message.</li>
              <li><strong>Communications:</strong> Any emails, messages, or feedback you send us.</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-2 text-text-light">
              <li><strong>Log Data:</strong> IP address, browser type, operating system, referring URL, pages visited, and timestamps.</li>
              <li><strong>Cookies:</strong> We use cookies to remember your preferences and track your activity.</li>
              <li><strong>Device Information:</strong> Device type, unique device identifiers, and mobile network information.</li>
              <li><strong>Usage Analytics:</strong> How you interact with our Services (via Vercel Analytics).</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">2.3 Information from Third Parties</h3>
            <ul className="list-disc list-inside space-y-2 text-text-light">
              <li><strong>Google OAuth:</strong> When you sign in with Google, we receive your email, name, and profile picture.</li>
              <li><strong>Cloudflare Turnstile:</strong> Anti-spam verification data is processed by Cloudflare.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-text-light">
              <li>To create and maintain your account</li>
              <li>To provide, maintain, and improve our Services</li>
              <li>To send you transactional emails (account confirmations, password resets)</li>
              <li>To respond to your inquiries and contact form submissions</li>
              <li>To moderate content and enforce our Terms of Service</li>
              <li>To prevent fraud and abuse</li>
              <li>To comply with legal obligations</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To send you updates about new features (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3">4.1 Service Providers</h3>
            <p className="text-text-light leading-relaxed">
              We share information with third-party service providers who assist us in operating our Services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li><strong>Supabase:</strong> Database and authentication provider</li>
              <li><strong>Brevo:</strong> Email service provider for contact form submissions</li>
              <li><strong>Cloudflare:</strong> Anti-spam and security services (Turnstile)</li>
              <li><strong>Vercel:</strong> Hosting and analytics provider</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">4.2 Public Content</h3>
            <p className="text-text-light leading-relaxed">
              Any blog posts, forum threads, or comments you publish are publicly visible. Your profile information (name, bio, avatar) is also publicly visible.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">4.3 Legal Requirements</h3>
            <p className="text-text-light leading-relaxed">
              We may disclose your information if required by law, court order, or government request, or if we believe in good faith that disclosure is necessary to protect our rights or the safety of others.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">4.4 Business Transfers</h3>
            <p className="text-text-light leading-relaxed">
              If JitaCorp is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">5. Data Security</h2>
            <p className="text-text-light leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
            <p className="text-text-light leading-relaxed mt-4">
              Security measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li>Encryption of data in transit (HTTPS/TLS)</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Row-level security policies in the database</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">6. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3">6.1 Access and Correction</h3>
            <p className="text-text-light leading-relaxed">
              You have the right to access, review, and correct your personal information. You can update your profile information in your account settings.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.2 Data Deletion</h3>
            <p className="text-text-light leading-relaxed">
              You may request deletion of your account and associated data. Please note that some information may be retained for legal or operational purposes.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.3 Opt-Out</h3>
            <p className="text-text-light leading-relaxed">
              You can opt out of marketing emails by clicking the unsubscribe link in any email we send. You cannot opt out of transactional emails necessary for account management.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.4 Cookie Management</h3>
            <p className="text-text-light leading-relaxed">
              You can control cookies through your browser settings. Disabling cookies may affect the functionality of our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-text-light leading-relaxed">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li>Remember your login information</li>
              <li>Understand how you use our Services</li>
              <li>Improve user experience</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p className="text-text-light leading-relaxed mt-4">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
              <li><strong>Analytics Cookies:</strong> Track usage patterns (Vercel Analytics)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">8. Children's Privacy</h2>
            <p className="text-text-light leading-relaxed">
              Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information and terminate the child's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">9. Indiana-Specific Rights</h2>
            <p className="text-text-light leading-relaxed">
              Under Indiana law, you have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether your personal information is sold or shared</li>
              <li>Right to delete personal information collected from you</li>
              <li>Right to correct inaccurate personal information</li>
              <li>Right to opt-out of the sale or sharing of personal information</li>
            </ul>
            <p className="text-text-light leading-relaxed mt-4">
              To exercise these rights, contact us at hello@jitacorp.com with your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">10. Third-Party Links</h2>
            <p className="text-text-light leading-relaxed">
              Our Services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">11. Data Retention</h2>
            <p className="text-text-light leading-relaxed">
              We retain your personal information for as long as necessary to provide our Services and fulfill the purposes outlined in this Privacy Policy. You can request deletion of your account at any time, subject to legal retention requirements.
            </p>
            <p className="text-text-light leading-relaxed mt-4">
              Retention periods:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li><strong>Account Data:</strong> Until account deletion</li>
              <li><strong>Published Content:</strong> Until deletion by user or admin</li>
              <li><strong>Contact Form Data:</strong> 1 year</li>
              <li><strong>Log Data:</strong> 90 days</li>
              <li><strong>Cookies:</strong> As specified in cookie settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-text-light leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our Services after such modifications constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">13. Contact Us</h2>
            <p className="text-text-light leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-warm-white p-6 rounded-lg mt-4 border border-border">
              <p className="text-text font-semibold">JitaCorp</p>
              <p className="text-text-light">Email: hello@jitacorp.com</p>
              <p className="text-text-light">Website: jitacorp.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">14. Compliance</h2>
            <p className="text-text-light leading-relaxed">
              This Privacy Policy complies with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light mt-3">
              <li>Indiana Consumer Data Protection Act</li>
              <li>General Data Protection Regulation (GDPR) - where applicable</li>
              <li>California Consumer Privacy Act (CCPA) - where applicable</li>
              <li>Children's Online Privacy Protection Act (COPPA)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
