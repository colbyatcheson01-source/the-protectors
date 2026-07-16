const emergencyContacts = [
  { name: 'Emergency Services', number: '911', description: 'Immediate danger, crime in progress, medical emergency' },
  { name: 'Canada Suicide Crisis Helpline', number: '988', description: 'Mental health crisis support, 24/7' },
  { name: 'Kids Help Phone', number: '1-800-668-6868', description: 'Confidential support for youth, 24/7' },
  { name: "Assaulted Women's Helpline", number: '1-866-863-0511', description: 'Support for women experiencing abuse, 24/7' },
  { name: 'Victim Services Ontario', number: '1-888-579-2888', description: 'Information for victims of crime' },
  { name: 'Canadian Human Rights Commission', number: '1-888-214-1090', description: 'File a human rights complaint' },
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
                <p className="text-neutral-500 text-sm font-mono">If you or someone else is in immediate danger, do not wait. Call 911 now. The Enforcers MC is not a crisis response service.</p>
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
