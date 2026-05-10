import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream pt-32">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-navy via-navy-light to-teal-dark relative overflow-hidden pt-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/15 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              <span className="text-gold-soft text-sm font-medium">Public Benefit Corporation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Profit <em className="font-playfair italic text-gold-soft">with</em> Purpose
            </h1>
            
            <p className="text-xl text-white/75 mb-8 leading-relaxed max-w-xl">
              We're building a scalable model that transforms the lives of homeless and disabled individuals while generating sustainable revenue through creative synergies of high-margin business models.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Link href="/blog" className="px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition transform hover:-translate-y-1 shadow-lg">
                Explore Blog
              </Link>
              <Link href="/forum" className="px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 transition">
                Join Forum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy mb-6">
                Our <span className="text-teal">Mission</span>
              </h2>
              <p className="text-lg text-text-light mb-6 leading-relaxed">
                We believe that every person deserves dignity, opportunity, and a path forward. JitaCorp combines cutting-edge business innovation with genuine social impact.
              </p>
              <ul className="space-y-4">
                {[
                  'Provide free housing to homeless and disabled individuals',
                  'Create meaningful employment and training opportunities',
                  'Build pathways to entrepreneurship through our incubator',
                  'Generate sustainable revenue for long-term impact',
                  'Scale to serve 800,000+ homeless and disabled Americans'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-teal to-navy-light rounded-2xl p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">The Hub Model</h3>
              <p className="text-white/85 leading-relaxed">
                Each Hub serves 100 residents with integrated housing, employment, training, and entrepreneurship programs. We're building 8,000 Hubs for homeless individuals and 12,000 Hubs for the disabled population over the next decade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-navy mb-16">
            The <span className="text-teal">Impact</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '2M+', label: 'People Served Over 10 Years' },
              { number: '$70B+', label: 'Government Cost Savings' },
              { number: '20,000', label: 'Hubs Across America' },
              { number: '$37K', label: 'Per Disability Person (Ticket to Work)' },
              { number: '100%', label: 'Sustainable & Profitable' },
              { number: '10 yrs', label: 'Implementation Timeline' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-border text-center hover:shadow-lg transition">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal to-teal-light bg-clip-text text-transparent mb-2">
                  {item.number}
                </div>
                <p className="text-text-light">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal to-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mb-48"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Movement?</h2>
          <p className="text-xl text-white/85 mb-8 max-w-2xl mx-auto">
            We're looking for partners, investors, and team members who believe that profit and purpose can coexist.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="px-8 py-4 bg-white text-teal font-semibold rounded-lg hover:bg-cream transition">
              Get In Touch
            </Link>
            <Link href="/investors" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              For Investors
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
