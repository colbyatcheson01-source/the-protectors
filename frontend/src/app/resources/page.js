const emergencyContacts = [
  { name: 'Emergency Services', number: '911', description: 'Immediate danger, crime in progress, medical emergency' },
  { name: 'Canada Suicide Crisis Helpline', number: '988', description: 'Mental health crisis support, 24/7' },
  { name: 'Kids Help Phone', number: '1-800-668-6868', description: 'Confidential support for youth, 24/7' },
  { name: "Assaulted Women's Helpline", number: '1-866-863-0511', description: 'Support for women experiencing abuse, 24/7' },
  { name: 'Crisis Line (BC)', number: '1-800-784-2433', description: 'British Columbia — 24/7 crisis support' },
  { name: 'Mental Health Helpline (AB)', number: '1-877-303-2642', description: 'Alberta — 24/7 mental health crisis support' },
  { name: 'HealthLine (SK)', number: '811', description: 'Saskatchewan — 24/7 health and crisis information' },
  { name: 'Crisis Line (MB)', number: '1-888-322-3019', description: 'Manitoba — 24/7 crisis intervention' },
  { name: 'ConnexOntario', number: '1-866-531-2600', description: 'Ontario — 24/7 mental health and crisis support' },
  { name: 'Tel-Aide (QC)', number: '1-866-277-3553', description: 'Québec — 24/7 crisis listening service (French)' },
  { name: 'Chimo Helpline (NB)', number: '1-800-667-5005', description: 'New Brunswick — 24/7 crisis and support line' },
  { name: 'Mental Health Crisis Line (NS)', number: '1-888-429-8167', description: 'Nova Scotia — 24/7 crisis support' },
  { name: 'Island Helpline (PE)', number: '1-833-553-2583', description: 'Prince Edward Island — 24/7 crisis support' },
  { name: 'Mental Health Crisis Line (NL)', number: '1-888-737-4668', description: 'Newfoundland and Labrador — 24/7 crisis support' },
  { name: 'Yukon Crisis Line', number: '1-866-456-3838', description: 'Yukon — 24/7 crisis support' },
  { name: 'NWT Helpline', number: '1-800-661-0844', description: 'Northwest Territories — 24/7 crisis support' },
  { name: 'Kamatsiaqtut Help Line (NU)', number: '1-867-979-9090', description: 'Nunavut — 24/7 crisis support (Inuktitut/English)' },
  { name: 'Canadian Resource Centre for Victims of Crime', number: '1-877-232-2610', description: 'National support, information, and referrals for victims, 24/7' },
  { name: 'VictimLink BC', number: '1-800-563-0808', description: 'British Columbia — 24/7 support and referrals for victims' },
  { name: 'Victim Services (AB)', number: '1-888-327-7828', description: 'Alberta — Victim services contacts and assistance' },
  { name: 'Victim Services (SK)', number: '1-888-286-6664', description: 'Saskatchewan — Victim services assistance' },
  { name: 'Victim Services (MB)', number: '1-800-282-8069', description: 'Manitoba — Victim services and community programs' },
  { name: 'Victim Services (ON)', number: '1-888-579-2888', description: 'Ontario — Information and referrals for victims of crime' },
  { name: 'CAVAC (QC)', number: '1-866-532-2822', description: 'Québec — Aide aux victimes d\'actes criminels' },
  { name: 'Victim Services (NB)', number: '1-866-660-4288', description: 'New Brunswick — Victim services assistance' },
  { name: 'Victim Services (NS)', number: '1-888-470-0773', description: 'Nova Scotia — Victim services program' },
  { name: 'Victim Services (PE)', number: '1-877-368-6682', description: 'Prince Edward Island — Victim services assistance' },
  { name: 'Victim Services (NL)', number: '1-800-563-9049', description: 'Newfoundland and Labrador — Victim services' },
  { name: 'Victim Services (YT)', number: '1-800-661-0408', description: 'Yukon — Victim services and community safety' },
  { name: 'Victim Services (NT/NU)', number: '1-844-979-8512', description: 'Northwest Territories / Nunavut — Victim services' },
  { name: 'Canadian Human Rights Commission', number: '1-888-214-1090', description: 'File a human rights complaint — national' },
  { name: 'Human Trafficking Hotline', number: '1-833-900-1010', description: 'Report trafficking, get support, 24/7' },
];

const supportServices = [
  { title: 'Shelter Safety', description: 'Emergency shelter information for individuals fleeing domestic violence.', link: '#' },
  { title: 'Legal Aid', description: 'Connect with legal resources for victims of violence and abuse.', link: '#' },
  { title: 'Counseling Services', description: 'Trauma-informed counseling referrals for survivors.', link: '#' },
  { title: 'Financial Assistance', description: 'Victim compensation programs and emergency financial support.', link: '#' },
];

const preventionContent = [
  { title: 'Recognizing Signs of Abuse', content: 'Physical signs, behavioral changes, controlling relationships, and isolation are potential indicators. Trust your instincts and report to authorities.' },
  { title: 'How to Help Someone in Danger', content: 'Call 911 for immediate danger. For non-emergencies, approach privately, express concern without judgment, and provide support service information.' },
  { title: 'Community Safety Tips', content: 'Establish neighborhood networks, share emergency contacts, learn first aid, attend safety workshops, and report suspicious activity to law enforcement.' },
  { title: 'Digital Safety & Privacy', content: 'Use strong passwords, enable two-factor authentication, be cautious with location data, and never share personal information about survivors online.' },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-biker-black relative overflow-hidden py-20 leather-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-biker-flame/5 via-transparent to-transparent"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="patch-badge-flame mb-4 inline-flex">Knowledge Is Power</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-tighter">Resources</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-mono">Emergency contacts, support services, and educational materials.</p>
        </div>
      </section>

      <section className="section bg-biker-dark">
        <div className="container-custom">
          <div className="bg-biker-blood/10 border-2 border-biker-blood/30 rounded-sm p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-biker-blood/30 rounded-sm flex items-center justify-center flex-shrink-0 border border-biker-blood/50">
                <span className="text-biker-flame font-bold text-xl">!</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-biker-flame mb-2 font-display uppercase tracking-wider">In an Emergency, Call 911</h2>
                <p className="text-neutral-500 text-sm font-mono">If you or someone else is in immediate danger, do not wait. Call 911 now. The Enforcers SC is not a crisis response service.</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="patch-badge-flame mb-4 inline-flex">Emergency Lines</div>
            <h2 className="page-title">Crisis Contacts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {emergencyContacts.map((contact) => (
              <div key={contact.name} className="card flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white mb-1 font-display uppercase tracking-wider text-sm">{contact.name}</h3>
                  <p className="text-xs text-neutral-500 font-mono">{contact.description}</p>
                </div>
                <a href={`tel:${contact.number.replace(/[^0-9]/g, '')}`} className="btn-primary text-sm whitespace-nowrap ml-4 flex-shrink-0">{contact.number}</a>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="page-title">Support Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {supportServices.map((s) => (
              <div key={s.title} className="card">
                <h3 className="font-bold text-lg text-white mb-2 font-display uppercase tracking-wider">{s.title}</h3>
                <p className="text-neutral-500 mb-4 text-sm font-mono">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="page-title">Prevention Education</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {preventionContent.map((item) => (
              <div key={item.title} className="card">
                <h3 className="font-bold text-lg text-white mb-3 font-display uppercase tracking-wider">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-mono">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
