export default function PrivacyPage() {
  return (
    <>
      <section className="bg-biker-black relative overflow-hidden py-20 leather-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-biker-flame/5 via-transparent to-transparent"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="patch-badge-flame mb-4 inline-flex">Your Trust Matters</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-tighter">Privacy Policy</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-mono">How we protect your personal information in compliance with Canadian privacy laws.</p>
        </div>
      </section>

      <section className="section bg-biker-dark">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-sm text-neutral-500 mb-8">Last updated: January 2024</div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">1. Introduction</h2>
              <p className="text-neutral-400 leading-relaxed">The Enforcers (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is committed to protecting the privacy of all individuals who interact with our organization. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable Canadian privacy laws.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">2. Information We Collect</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                <li><strong className="text-neutral-200">Contact Information:</strong> Name, email address, phone number, and mailing address when you submit forms or contact us.</li>
                <li><strong className="text-neutral-200">Volunteer Information:</strong> Full name, contact details, availability, skills, and background screening consent as part of the volunteer application process.</li>
                <li><strong className="text-neutral-200">Communication Records:</strong> Messages submitted through our contact form or other communication channels.</li>
                <li><strong className="text-neutral-200">Anonymous Tips:</strong> Tip content without any personally identifying information.</li>
                <li><strong className="text-neutral-200">Technical Data:</strong> Basic website analytics collected through cookies and similar technologies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                <li>Processing volunteer applications and conducting lawful background screenings</li>
                <li>Responding to inquiries and providing support services</li>
                <li>Reviewing and acting on anonymous tips</li>
                <li>Improving our programs and services</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">4. Data Encryption & Security</h2>
              <p className="text-neutral-400 leading-relaxed">All personal data stored in our systems is encrypted at rest using AES-256 encryption. Data transmitted between your browser and our servers is protected using TLS/SSL encryption (HTTPS). We implement strict access controls, regular security audits, and follow industry best practices to protect your information from unauthorized access, disclosure, or breach.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">5. Data Retention & Disposal</h2>
              <p className="text-neutral-400 leading-relaxed">We retain personal information only as long as necessary to fulfill the purposes for which it was collected, or as required by law. Volunteer records are retained for the duration of the volunteer relationship plus two years. Contact form submissions are retained for one year. Anonymous tips are retained for review purposes and securely deleted after 90 days unless required for an ongoing investigation.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">6. Your Rights</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">Under Canadian privacy law, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent for the collection and use of your information</li>
                <li>Request deletion of your personal data, subject to legal retention requirements</li>
                <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">7. Third-Party Disclosure</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                <li>Approved third-party background screening providers (with your explicit consent)</li>
                <li>Law enforcement agencies when required by law or court order</li>
                <li>Service providers who assist us in operating our website and programs (under strict confidentiality agreements)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">8. Cookies</h2>
              <p className="text-neutral-400 leading-relaxed">Our website uses essential cookies for security and session management. We do not use tracking cookies or third-party analytics that collect personal information. You can configure your browser to reject cookies, though this may affect certain functionality.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">9. Contact Us</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">For questions about this Privacy Policy or to exercise your privacy rights, please contact our Privacy Officer:</p>
              <p className="text-neutral-400">Email: <span className="text-guardian-gold">[insert privacy email]</span><br />Mail: The Enforcers, Privacy Officer, [Address], Canada</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
