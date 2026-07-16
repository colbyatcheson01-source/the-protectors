export default function TermsPage() {
  return (
    <>
      <section className="bg-biker-black relative overflow-hidden py-20 leather-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-biker-flame/5 via-transparent to-transparent"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="patch-badge-flame mb-4 inline-flex">Our Code</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-tighter">Terms of Use</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-mono">Guidelines and terms governing the use of The Enforcers MC website and services.</p>
        </div>
      </section>

      <section className="section bg-biker-dark">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-sm text-neutral-500 mb-8">Last updated: January 2024</div>

          <div className="space-y-8">
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing or using The Enforcers website (the "Site"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use the Site. These terms constitute a legally binding agreement between you and The Enforcers.' },
              { title: '2. Our Mission & Ethical Standards', content: 'The Enforcers is a Canadian nonprofit organization committed to community safety, victim support, and violence prevention through lawful means. By using this Site, you agree to:', list: ['Not use the Site to encourage or engage in harassment, vigilantism, or targeting of individuals', 'Not publish accusations or personal information about alleged offenders', 'Report criminal activity to law enforcement authorities, not to this platform', 'Respect the privacy and dignity of all individuals, including survivors and community members', 'Use the Site in compliance with all applicable Canadian federal and provincial laws'] },
              { title: '3. User Conduct', content: 'You agree that you will not:', list: ['Submit false or misleading information through any form on the Site', 'Attempt to access restricted areas of the Site without authorization', 'Interfere with the security, functionality, or integrity of the Site', 'Use the Site to disseminate spam, malware, or harmful content', 'Impersonate any person or entity, or misrepresent your affiliation with any person or entity', 'Collect or harvest personal information from the Site without our explicit consent'] },
              { title: '4. Intellectual Property', content: 'All content on the Site, including text, graphics, logos, images, and software, is the property of The Enforcers or its content providers and is protected by Canadian and international copyright laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.' },
              { title: '5. Limitation of Liability', content: 'The Enforcers provides the Site and its content on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of the Site. To the fullest extent permitted by Canadian law, The Enforcers disclaims all liability for any damages arising from the use or inability to use the Site.' },
              { title: '6. Third-Party Links', content: 'The Site may contain links to third-party websites or services that are not owned or controlled by The Enforcers. We are not responsible for the content, privacy practices, or terms of use of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.' },
              { title: '7. Background Screening', content: 'All volunteers are subject to background checks in compliance with Canadian laws and privacy standards. By submitting a volunteer application, you consent to lawful background screening conducted through approved third-party providers. We do not directly access or scrape criminal records. We store only eligibility status (approved, ineligible, or pending) and do not retain sensitive screening details.' },
              { title: '8. Anonymous Tips', content: 'Anonymous tips submitted through the Site are reviewed privately by our team. We do not collect identifying information with tips. However, we reserve the right to share tip content with law enforcement if we determine in good faith that there is a risk of imminent harm or a legal obligation to do so.' },
              { title: '9. Modifications', content: 'We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any modifications constitutes acceptance of the updated terms.' },
              { title: '10. Governing Law', content: 'These Terms of Use are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes arising from these terms shall be resolved in the courts of Ontario.' },
              { title: '11. Contact', content: 'For questions about these Terms of Use, please contact us at [insert email].' },
            ].map((section, i) => (
              <div key={i}>
                <h2 className="text-2xl font-bold text-white mb-4 font-display">{section.title}</h2>
                <p className="text-neutral-400 leading-relaxed">{section.content}</p>
                {section.list && (
                  <ul className="list-disc pl-6 mt-3 space-y-1.5 text-neutral-400">
                    {section.list.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
