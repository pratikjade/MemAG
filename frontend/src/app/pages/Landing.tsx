import { Link } from "react-router";

export function Landing() {
  return (
    <div className="min-h-screen bg-[#DBE8F0]">
      {/* Navigation Bar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 h-[60px]" 
        style={{ 
          background: 'rgba(255, 255, 255, 0.001)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)'
        }}
      >
        <div className="max-w-[1240px] mx-auto px-5 h-full flex justify-between items-center gap-10">
          <div 
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '20px', 
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '100%'
            }}
          >
            MemAG
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="#features" 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '16px', 
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: '120%',
                color: '#000000'
              }}
              className="hover:opacity-65 transition-opacity"
            >
              Product
            </a>
            <a 
              href="#features" 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '16px', 
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: '120%',
                color: '#000000'
              }}
              className="hover:opacity-65 transition-opacity"
            >
              Journal
            </a>
            <a 
              href="#" 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '16px', 
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: '120%',
                color: '#000000'
              }}
              className="hover:opacity-65 transition-opacity"
            >
              About
            </a>
            <a 
              href="#" 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '16px', 
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: '120%',
                color: '#000000'
              }}
              className="hover:opacity-65 transition-opacity"
            >
              Careers
            </a>
            <Link 
              to="/dashboard"
              className="flex items-center gap-1 hover:opacity-65 transition-opacity"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '16px', 
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: '120%',
                color: '#000000'
              }}
            >
              Get started
              <svg width="9" height="12" viewBox="0 0 9 12" fill="none" className="-rotate-90">
                <path d="M1 1L7.5 6L1 11" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-5 pt-24 pb-16" style={{ background: 'linear-gradient(180deg, #A8D3FF 0%, #FFF4DF 100%)' }}>
        <div className="max-w-[1240px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 
              className="mb-6"
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(48px, 5vw, 80px)',
                fontWeight: 400,
                lineHeight: '100%',
                letterSpacing: '-0.04em'
              }}
            >
              Executive intelligence,<br />built for focus
            </h1>
            <p 
              className="mb-8 max-w-[600px] mx-auto"
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              Prioritize communications, automate responses, and act decisively—with clarity and confidence.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, lineHeight: '100%' }}>
                  Request a demo
                </span>
              </button>
              <Link 
                to="/dashboard"
                className="px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, lineHeight: '100%' }}>
                  Explore the platform
                </span>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview Card */}
          <div className="bg-white rounded-[20px] border border-[#000000] p-10 max-w-[1000px] mx-auto shadow-lg relative z-10 -mb-32">
            {/* Header with greeting and insight card */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '120%',
                    letterSpacing: '-0.02em',
                    color: '#000000'
                  }}
                >
                  Good morning, Executive
                </p>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em',
                    color: '#6C6C6C'
                  }}
                >
                  Your priority metrics are ready to review.
                </p>
              </div>
              
              {/* Small insight card */}
              <div className="bg-[#F6F8FB] rounded-lg p-4 min-w-[180px]">
                <div className="flex items-baseline gap-2 mb-1">
                  <span 
                    className="text-2xl"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      letterSpacing: '-0.03em'
                    }}
                  >
                    24
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#6C6C6C'
                    }}
                  >
                    emails today
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 400,
                    color: '#6C6C6C'
                  }}
                >
                  <span className="text-green-600">↑ 18%</span> vs last week
                </p>
              </div>
            </div>

            {/* Main metric */}
            <div className="mb-8">
              <div className="flex items-end gap-4 mb-2">
                <div 
                  className="text-7xl font-light"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '-0.03em'
                  }}
                >
                  98
                </div>
                <div className="mb-3">
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '120%',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Priority Score
                  </p>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#6C6C6C'
                    }}
                  >
                    <span className="text-green-600">↑ +12.5%</span> from yesterday
                  </p>
                </div>
              </div>
              
              {/* Yellow highlight bar */}
              <div className="w-full h-2 bg-[#FFF546] rounded-full mb-1"></div>
              <p 
                style={{ 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#6C6C6C'
                }}
              >
                Your highest score this month
              </p>
            </div>

            {/* Chart with Y-axis */}
            <div className="flex gap-3">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-48 py-2">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6C6C6C' }}>100</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6C6C6C' }}>75</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6C6C6C' }}>50</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6C6C6C' }}>25</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6C6C6C' }}>0</span>
              </div>

              {/* Chart area */}
              <div className="flex-1">
                <div className="relative h-48 flex items-end gap-1">
                  {[...Array(28)].map((_, i) => {
                    const heights = [65, 58, 72, 45, 68, 55, 78, 62, 70, 48, 85, 60, 75, 52, 68, 90, 72, 58, 65, 48, 70, 82, 68, 55, 78, 65, 72, 80];
                    const isHighlight = i === 10;
                    return (
                      <div 
                        key={i} 
                        className={`flex-1 ${isHighlight ? 'bg-[#FFF546]' : 'bg-black'} rounded-t transition-all hover:opacity-75`}
                        style={{ height: `${heights[i]}%` }}
                      >
                        {isHighlight && (
                          <div className="relative">
                            <div 
                              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap"
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                fontWeight: 500,
                                color: '#000'
                              }}
                            >
                              Today
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* X-axis labels */}
                <div className="flex justify-between mt-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6C6C6C' }}>
                  <span>Feb 1</span>
                  <span>Feb 15</span>
                  <span>Feb 28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-5 pt-48 pb-24 bg-white" id="features">
        <div className="max-w-[1240px] mx-auto">
          <h2 
            className="text-center mb-20"
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 400,
              lineHeight: '110%',
              letterSpacing: '-0.04em'
            }}
          >
            Everything you need to measure,<br />model, and act on communications
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left side - Image with floating card */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative bg-white rounded-[20px] overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=500&fit=crop" 
                    alt="Executive workspace"
                    className="w-full h-[500px] object-cover"
                  />
                  
                  {/* Floating metric card overlay */}
                  <div className="absolute top-8 left-8 bg-white rounded-lg border border-border p-6 shadow-lg max-w-[280px]">
                    <div className="flex justify-between items-start mb-4">
                      <p 
                        style={{ 
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#6C6C6C',
                          letterSpacing: '0.02em'
                        }}
                      >
                        Energy consumption
                      </p>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="#000" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                    <div className="flex items-end gap-2">
                      <div 
                        className="text-4xl font-light"
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          letterSpacing: '-0.03em'
                        }}
                      >
                        98
                      </div>
                      <span 
                        className="mb-1"
                        style={{ 
                          fontFamily: 'var(--font-mono)',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#6C6C6C'
                        }}
                      >
                        score
                      </span>
                    </div>
                    <p 
                      className="mt-2"
                      style={{ 
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#0066CC'
                      }}
                    >
                      +12.4%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Features */}
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: '120%',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Track
                  </h3>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#6C6C6C'
                    }}
                  >
                    001
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '140%',
                    letterSpacing: '-0.04em',
                    color: '#6C6C6C'
                  }}
                >
                  Emails, meetings, and messages across your entire organization
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: '120%',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Model
                  </h3>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#6C6C6C'
                    }}
                  >
                    002
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '140%',
                    letterSpacing: '-0.04em',
                    color: '#6C6C6C'
                  }}
                >
                  Forecast performance and goal alignment
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: '120%',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Report
                  </h3>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#6C6C6C'
                    }}
                  >
                    003
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '140%',
                    letterSpacing: '-0.04em',
                    color: '#6C6C6C'
                  }}
                >
                  Generate insights, automate response frameworks
                </p>
              </div>

              {/* Feature 4 */}
              <div className="border-t border-border pt-6 pb-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: '120%',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Act
                  </h3>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#6C6C6C'
                    }}
                  >
                    004
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '140%',
                    letterSpacing: '-0.04em',
                    color: '#6C6C6C'
                  }}
                >
                  Surface insights and operational next steps
                </p>
              </div>

              {/* CTA Button */}
              <div className="border-t border-border pt-6">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, lineHeight: '100%' }}>
                    Explore features
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-5 py-24 lg:py-32 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
            {/* Left - Image */}
            <div className="w-full h-[400px] lg:h-[700px] rounded-[20px] overflow-hidden bg-gradient-to-br from-[#A8D3FF] to-[#6BA3E8]">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&q=80"
                alt="Executive professional"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
                style={{ 
                  filter: 'contrast(1.3) saturate(0) brightness(1.1)',
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>

            {/* Right - Quote */}
            <div className="flex flex-col justify-center px-0 lg:px-20 gap-10 lg:gap-14">
              {/* Quotation mark */}
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                <path d="M10 0C10 11 4 15 0 16V20C8 19 14 13 14 0H10ZM24 0C24 11 18 15 14 16V20C22 19 28 13 28 0H24Z" fill="#DBE0EC"/>
              </svg>

              {/* Quote text */}
              <p 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '-0.03em',
                  color: '#000000'
                }}
              >
                We finally moved past email overload and missed priorities. Now we have real intelligence to guide real decisions.
              </p>

              {/* Name and role */}
              <div className="flex flex-col gap-2">
                <p 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '100%',
                    letterSpacing: '-0.02em',
                    color: '#000000'
                  }}
                >
                  Sarah Chen
                </p>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em',
                    color: '#6C6C6C'
                  }}
                >
                  Chief Operating Officer, Apex Ventures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-5 py-24 bg-[#DBE8F0]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left preview card */}
            <div className="bg-white rounded-[20px] border border-border p-8">
              <div className="mb-6">
                <p 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '120%',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Priority Inbox
                </p>
              </div>
              
              {/* Sample email cards */}
              <div className="space-y-3">
                {[
                  { sender: 'Sarah Chen', subject: 'Q4 Board Meeting', score: 98, color: 'bg-red-100 text-red-700' },
                  { sender: 'Mike Rodriguez', subject: 'Series C Update', score: 94, color: 'bg-yellow-100 text-yellow-700' },
                  { sender: 'Emily Watson', subject: 'Team Reviews', score: 87, color: 'bg-green-100 text-green-700' }
                ].map((email, i) => (
                  <div key={i} className="bg-secondary rounded-lg p-4 flex items-start justify-between">
                    <div className="flex-1">
                      <p 
                        className="mb-1"
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          fontSize: '16px',
                          fontWeight: 500,
                          lineHeight: '120%',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {email.sender}
                      </p>
                      <p 
                        style={{ 
                          fontFamily: 'var(--font-serif)',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '120%',
                          letterSpacing: '-0.04em',
                          color: '#6C6C6C'
                        }}
                      >
                        {email.subject}
                      </p>
                    </div>
                    <div 
                      className={`px-2 py-1 rounded ${email.color}`}
                      style={{ 
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      {email.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right text */}
            <div>
              <h2 
                className="mb-6"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  fontWeight: 400,
                  lineHeight: '110%',
                  letterSpacing: '-0.04em'
                }}
              >
                Executive intelligence, built for focus
              </h2>
              <p 
                className="mb-8"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '130%',
                  letterSpacing: '-0.04em',
                  color: '#6C6C6C'
                }}
              >
                Track communications, prioritize intelligently, and respond decisively—with clarity and confidence.
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, lineHeight: '100%' }}>
                    Request a demo
                  </span>
                </button>
                <Link 
                  to="/dashboard"
                  className="px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, lineHeight: '100%' }}>
                    Explore the platform
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center p-5 md:pt-10 md:px-5 md:pb-5 gap-4 md:gap-5 bg-[#FFF546]">
        <div className="w-full max-w-[1240px] flex flex-col gap-4 md:gap-5">
          {/* Top navigation and copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 sm:gap-5 justify-center sm:justify-start">
              <a 
                href="#"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0',
                  color: '#000000'
                }}
                className="hover:opacity-65 transition-opacity"
              >
                Product
              </a>
              <a 
                href="#"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0',
                  color: '#000000'
                }}
                className="hover:opacity-65 transition-opacity"
              >
                Journal
              </a>
              <a 
                href="#"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0',
                  color: '#000000'
                }}
                className="hover:opacity-65 transition-opacity"
              >
                About
              </a>
              <a 
                href="#"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0',
                  color: '#000000'
                }}
                className="hover:opacity-65 transition-opacity"
              >
                Careers
              </a>
              <a 
                href="#"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0',
                  color: '#000000'
                }}
                className="hover:opacity-65 transition-opacity"
              >
                Get started
              </a>
            </div>
            <p 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '100%',
                letterSpacing: '0',
                color: '#000000'
              }}
            >
              © 2025 · All rights reserved
            </p>
          </div>

          {/* Decorative image - larger and more prominent */}
          <div className="w-full h-[200px] md:h-[280px] lg:h-[340px] rounded-[8px] overflow-hidden bg-[#FFF546]">
            <img 
              src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=400&fit=crop&q=80&blend=FFF546&blend-mode=multiply"
              alt="Decorative halftone pattern"
              className="w-full h-full object-cover mix-blend-multiply opacity-60"
              style={{ filter: 'contrast(1.2) saturate(0)' }}
            />
          </div>

          {/* Large logo */}
          <div className="text-center">
            <h2 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(60px, 10vw, 120px)',
                fontWeight: 700,
                lineHeight: '100%',
                letterSpacing: '-0.03em',
                color: '#66640F'
              }}
            >
              MemAG
            </h2>
          </div>
        </div>
      </footer>
    </div>
  );
}