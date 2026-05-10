import Link from 'next/link'

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-navy mb-6">For Investors</h1>
        <p className="text-xl text-text-light mb-12">Join us in building a profitable and purposeful future</p>

        <div className="space-y-12">
          <section className="bg-white p-8 rounded-xl border border-border">
            <h2 className="text-3xl font-bold text-navy mb-4">Investment Opportunity</h2>
            <p className="text-text-light leading-relaxed mb-4">
              JitaCorp is a public benefit corporation combining high-margin business models with genuine social impact. We're building a scalable platform that serves homeless and disabled populations while generating sustainable returns.
            </p>
            <p className="text-text-light leading-relaxed">
              Our model leverages government programs (Section 8, tax credits, Ticket to Work) to create multiple revenue streams while providing comprehensive support services.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl border border-border">
            <h2 className="text-3xl font-bold text-navy mb-6">Revenue Model</h2>
            <div className="space-y-4">
              {[
                { title: 'Section 8 Housing Subsidies', desc: 'Government rental assistance for residents' },
                { title: 'Tax Credits', desc: 'Big Beautiful Bill credits converted to cash and 15-year leases' },
                { title: 'Work Opportunity Credits', desc: 'Tax credits for hiring disadvantaged workers' },
                { title: 'Ticket to Work Program', desc: '$37,000 per disability person in milestone payments' },
                { title: 'City Fees', desc: '50% of $35K annual cost (Y1), 25% trailing (Y2-Y5)' },
                { title: 'Startup Incubator', desc: 'Equity stakes in spun-off profitable ventures' },
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-teal pl-4">
                  <h3 className="font-semibold text-navy">{item.title}</h3>
                  <p className="text-text-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl border border-border">
            <h2 className="text-3xl font-bold text-navy mb-6">Scaling Plan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-teal mb-4">Homeless Program</h3>
                <p className="text-text-light mb-4">
                  8,000 Hubs serving 800,000 homeless individuals across the United States
                </p>
                <ul className="space-y-2 text-text-light">
                  <li>✓ 100 residents per Hub</li>
                  <li>✓ 10-year implementation</li>
                  <li>✓ Full housing + employment + training</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-teal mb-4">Disability Program</h3>
                <p className="text-text-light mb-4">
                  12,000 Hubs serving 1.2M disabled individuals (10% of population)
                </p>
                <ul className="space-y-2 text-text-light">
                  <li>✓ 100 residents per Hub</li>
                  <li>✓ 10-year implementation</li>
                  <li>✓ Comprehensive support services</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl border border-border">
            <h2 className="text-3xl font-bold text-navy mb-6">Impact Metrics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { number: '2M+', label: 'People Served' },
                { number: '$70B+', label: 'Government Savings' },
                { number: '100%', label: 'Sustainable & Profitable' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-teal mb-2">{item.number}</div>
                  <p className="text-text-light">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-teal to-navy text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-white/85 mb-6">
              We're seeking strategic investors and partners who believe in profitable social impact.
            </p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-white text-teal font-semibold rounded-lg hover:bg-cream transition">
              Schedule a Meeting
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
