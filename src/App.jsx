import { useState, useEffect, useRef } from 'react'
import Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'
import './index.css'

const navLinks = [
  { label: 'Reel', href: '#reel' },
  { label: 'Skills', href: '#skills' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const reels = [
  { id: 1, type: 'wide', label: 'Mystery Spin', src: '/videos/match_highlights.mp4', poster: '/images/reel-1.jpg', alt: 'Mystery spin bowling action' },
  { id: 2, type: 'tall', label: 'Mystery Spin 2', src: '/videos/mastery_spin.mp4', poster: '/images/reel-2.jpg', alt: 'Second mystery spin bowling variation' },
  { id: 3, type: 'tall', label: 'Power Hitting', src: '/videos/power_hitting.mp4', poster: '/images/reel-3.jpg', alt: 'Power hitting at the crease' },
  { id: 4, type: 'tall', label: 'Net Session', src: '/videos/next_session.mp4', poster: '/images/reel-4.jpg', alt: 'Focused net session practice' },
  { id: 5, type: 'tall', label: 'Bowling Variations', src: '/videos/bowling_variation.mp4', poster: '/images/reel-5.jpg', alt: 'Bowling variations in action' },
]

const skills = [
  {
    title: 'Mystery Spin',
    desc: 'Unpredictable variations including the doosra and carrom ball. Deceptive flight and drift that keeps batters guessing. Consistently takes wickets in middle overs and builds pressure.',
    icon: '🎯',
    accent: 'saffron',
  },
  {
    title: 'Death-Over Hitting',
    desc: 'Capable of clearing the ropes from ball one. Specialist in finishing innings with a high strike rate. Strong against both pace and spin in the final 5 overs.',
    icon: '🏏',
    accent: 'gold',
  },
  {
    title: 'Athletic Fielding',
    desc: 'Agile in the inner circle, saving crucial runs. Quick reflexes at point and cover. Strong throwing arm from the deep.',
    icon: '⚡',
    accent: 'green',
  }
]

const experience = [
  { league: 'KSCA', format: '2 & 3-Day Leagues', tag: 'League cricket' },
  { league: 'HCA', format: '3-Day Leagues', tag: 'League cricket' },
  { league: 'HCA', format: 'T20 Leagues', tag: 'League cricket' },
  { league: 'Net Bowler — Royals of Rayalaseema', format: 'APL 2026', tag: 'Net bowler' },
  { league: 'Net Bowler — Mysuru Warriors', format: 'KPL 2022', tag: 'Net bowler' },
]

const analyticsProfiles = {
  batting: {
    stats: { matches: 319, runs: 5172, sr: 124.63, sixes: 302, wickets: 0, econ: 0, best: '148', winRate: 58 },
    metrics: [
      ['Mat', '319'], ['Inns', '248'], ['NO', '71'], ['Runs', '5172'], ['HS', '148'], ['Avg', '29.22'],
      ['SR', '124.63'], ['30s', '44'], ['50s', '23'], ['100s', '2'], ['4s', '453'], ['6s', '302'],
      ['Ducks', '20'], ['Won', '186'], ['Loss', '127']
    ],
    totals: ['Runs', 'Wickets', 'Sixes', 'Matches'],
    totalValues: [5172, 0, 302, 319],
    rates: ['Strike rate', 'Average', 'Win rate'],
    rateValues: [124.63, 29.22, 58]
  },
  bowling: {
    stats: { matches: 319, runs: 6903, sr: 22.92, sixes: 115, wickets: 286, econ: 6.32, best: '7/31', winRate: 58 },
    metrics: [['Mat', '319'], ['Inns', '297'], ['Overs', '1092.4'], ['Maidens', '55'], ['Runs', '6903'], ['Wkts', '286'], ['BB', '7/31'], ['3 Wkts', '22'], ['5 Wkts', '3'], ['Eco', '6.32'], ['SR', '22.92'], ['Avg', '24.14'], ['WD', '732'], ['NB', '117'], ['Dots', '3877'], ['4s', '735'], ['6s', '115']],
    totals: ['Matches', 'Wickets', 'Best figures', 'Economy'],
    totalValues: [319, 286, 7, 6.32],
    rates: ['Wickets', 'Economy', 'Strike rate'],
    rateValues: [286, 6.32, 22.92]
  },
  fielding: {
    stats: { matches: 319, runs: 0, sr: 0, sixes: 0, wickets: 0, econ: 0, best: '—', winRate: 58 },
    metrics: [['Mat', '319'], ['Catches', '151'], ['C.B', '2'], ['R/O', '35'], ['St', '3'], ['Asst. R/O', '14'], ['Byes', '8']],
    totals: ['Matches', 'Catches', 'Run outs', 'Stumpings'],
    totalValues: [319, 151, 35, 3],
    rates: ['Catches', 'Run outs', 'Assisted R/O'],
    rateValues: [151, 35, 14]
  }
}

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

function useAnimatedCounter(target, active, decimals = 0) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) { setValue(0); return }
    const duration = 1400
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(parseFloat((target * eased).toFixed(decimals)))
      if (t < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, active, decimals])

  return value
}

function App() {
  const [loading, setLoading] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [analyticsMode, setAnalyticsMode] = useState('batting')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [analyticsVisible, setAnalyticsVisible] = useState(false)
  const analyticsRef = useRef(null)

  const activeProfile = analyticsProfiles[analyticsMode]
  const currentStats = activeProfile.stats

  const animSixes = useAnimatedCounter(currentStats.sixes, analyticsVisible)
  const animWinRate = useAnimatedCounter(currentStats.winRate, analyticsVisible)

  const chartCategories = activeProfile.totals
  const chartOptions = {
    chart: { type: 'areaspline', backgroundColor: 'transparent', height: 270, spacing: [16, 10, 10, 10] },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    xAxis: {
      categories: chartCategories,
      lineColor: 'rgba(226,239,225,0.12)',
      tickColor: 'transparent',
      labels: { style: { color: '#aab9af', fontSize: '11px' } }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: 'rgba(226,239,225,0.08)',
      labels: { style: { color: '#80968a', fontSize: '10px' } }
    },
    legend: { itemStyle: { color: '#d9e3d9', fontWeight: '500' }, itemHoverStyle: { color: '#ffb347' } },
    tooltip: { shared: true, backgroundColor: '#10231e', borderColor: 'rgba(255,179,71,0.45)', style: { color: '#f6f3e9' } },
    plotOptions: { series: { lineWidth: 2, marker: { radius: 3, lineWidth: 2, lineColor: '#10231e' } }, areaspline: { fillOpacity: 0.12 } },
    series: [
      { name: 'Overall total', color: '#ffb347', data: activeProfile.totalValues }
    ]
  }
  const impactChartOptions = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 270, spacing: [16, 10, 10, 10] },
    title: { text: null }, credits: { enabled: false }, exporting: { enabled: false },
    xAxis: { categories: activeProfile.rates, lineColor: 'rgba(226,239,225,0.12)', tickColor: 'transparent', labels: { style: { color: '#aab9af', fontSize: '11px' } } },
    yAxis: { title: { text: null }, gridLineColor: 'rgba(226,239,225,0.08)', labels: { style: { color: '#80968a', fontSize: '10px' } } },
    legend: { itemStyle: { color: '#d9e3d9', fontWeight: '500' }, itemHoverStyle: { color: '#ffb347' } },
    tooltip: { shared: true, backgroundColor: '#10231e', borderColor: 'rgba(255,179,71,0.45)', style: { color: '#f6f3e9' } },
    plotOptions: { column: { borderWidth: 0, borderRadius: 3, groupPadding: 0.14, pointPadding: 0.08 } },
    series: [
      { name: 'Overall rate', color: '#e8cf73', data: activeProfile.rateValues }
    ]
  }

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(el => observer.observe(el))

    // analytics visibility
    if (analyticsRef.current) {
      const aObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setAnalyticsVisible(true); aObserver.disconnect() }
      }, { threshold: 0.25 })
      aObserver.observe(analyticsRef.current)
      return () => { observer.disconnect(); aObserver.disconnect() }
    }
    return () => observer.disconnect()
  }, [loading])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60)
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) setScrollProgress((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll) }
  }, [])

  return (
    <>
      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* PRELOADER */}
      <div id="preloader" className={!loading ? 'hide' : ''}>
        <div className="loader-ball">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#C24C34" />
            <path d="M 30 10 Q 50 50 30 90" stroke="#F0F4F8" strokeWidth="3" fill="none" />
            <path d="M 70 10 Q 50 50 70 90" stroke="#F0F4F8" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <div className="loader-stumps">
          <div className="loader-stump"></div>
          <div className="loader-stump"></div>
          <div className="loader-stump"></div>
        </div>
        <div className="loader-text">READY</div>
        <div className="loader-progress"><div className="loader-progress-bar"></div></div>
      </div>

      <div id="app-content" className={!loading ? 'visible' : ''}>

        {/* NAVBAR */}
        <div className={`nav-wrapper${navScrolled ? ' scrolled' : ''}`}>
          <div className="navbar">
            <a className="navbar-brand" href="#top" aria-label="M S D Naveen — back to top">
              <span className="brand-mark">N</span>
              <span>Naveen</span>
            </a>
            <nav className="navbar-links" aria-label="Primary navigation">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}>{link.label}</a>
              ))}
            </nav>
            <a href="https://www.instagram.com/msdnaveen_457/" target="_blank" rel="noopener noreferrer" className="nav-join-btn">
              Follow me <span className="arrow">↗</span>
            </a>
            <button
              className={`hamburger${mobileNavOpen ? ' active' : ''}`}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileNavOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
          <div className="mobile-nav-inner">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                style={{ transitionDelay: mobileNavOpen ? `${i * 0.06}s` : '0s' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/msdnaveen_457/"
              target="_blank" rel="noopener noreferrer"
              className="mobile-nav-ig"
              onClick={() => setMobileNavOpen(false)}
              style={{ transitionDelay: mobileNavOpen ? `${navLinks.length * 0.06}s` : '0s' }}
            >
              <InstagramIcon /> @msdnaveen_457
            </a>
          </div>
        </div>

        {/* HERO */}
        <header className="hero" id="top">
          <div className="hero-overlay" />
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge reveal">
                <span className="hero-badge-dot"></span>
                Available for Trials & Contracts
              </div>
              <h1 className="hero-title reveal-left">
                <span>Spin the game.</span>
                <span className="indent-1">Finish the</span>
                <span className="indent-2 accent-text">chase.</span>
              </h1>
              <p className="hero-desc reveal">
                M. S. D. Naveen is a mystery spinner and death-over hitter with eleven years of competitive cricket behind him.
              </p>
              <div className="cta-row reveal">
                <a href="#reel" className="btn-pill primary">
                  View highlights <span className="arrow">↗</span>
                </a>
                <a href="#contact" className="btn-pill secondary">
                  Talk cricket <span className="arrow">↗</span>
                </a>
              </div>
              <div className="hero-stats reveal">
                <div className="hero-stat">
                  <span className="hero-stat-num">11+</span>
                  <span className="hero-stat-label">Years Pro</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <span className="hero-stat-num">45+</span>
                  <span className="hero-stat-label">Matches / yr</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <span className="hero-stat-num">APL</span>
                  <span className="hero-stat-label">League Player</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <div className="hero-scroll-line"></div>
          </div>
        </header>

        {/* REEL */}
        <section id="reel" className="section">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">In Action</div>
              <h2 className="section-title">The Reel</h2>
              <p className="section-desc">Watch the variations in action — mystery spin, deceptive flight, and the power hitting that changes game momentum.</p>
            </div>
          </div>
          <div className="container">
            <div className="reel-grid" aria-label="Highlight reels">
              {reels.map((reel, i) => (
                <div
                  key={reel.id}
                  className={`reel-card ${reel.type} reveal-scale reel-card--mobile`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <span className="reel-label">{reel.label}</span>
                  <video
                    src={reel.src}
                    poster={reel.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload={i === 0 ? 'auto' : 'metadata'}
                    aria-label={reel.alt}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Arsenal</div>
              <h2 className="section-title">What I Bring</h2>
              <p className="section-desc">A rare combination of skills built for the demands of modern T20 cricket.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div
                  key={skill.title}
                  className={`skill-card skill-card--${skill.accent} reveal-scale`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="skill-icon-wrap">
                    <span className="skill-icon" aria-hidden="true">{skill.icon}</span>
                  </div>
                  <h3 className="skill-card-title">{skill.title}</h3>
                  <p className="skill-card-text">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANALYTICS */}
        <section id="analytics" className="section">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Performance</div>
              <h2 className="section-title">By the Numbers</h2>
              <p className="section-desc">Overall match data from CricHeroes across competitive leagues and formats.</p>
            </div>

            <div className="analytics-container reveal-scale" ref={analyticsRef}>
              <div className="analytics-tabs" role="tablist" aria-label="Performance categories">
                {Object.keys(analyticsProfiles).map(key => (
                  <button
                    key={key}
                    className={`analytics-tab${analyticsMode === key ? ' active' : ''}`}
                    role="tab"
                    aria-selected={analyticsMode === key}
                    onClick={() => setAnalyticsMode(key)}
                  >
                    {key[0].toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>

              <div className="analytics-overall-heading">
                <h3>Overall</h3>
                <span>{activeProfile.metrics.length} recorded metrics</span>
              </div>

              <div className="metric-card-grid">
                {activeProfile.metrics.map(([label, value]) => (
                  <div className="metric-card" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="chart-row">
                <div className="chart-shell">
                  <div className="chart-heading">Overall totals</div>
                  <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
                <div className="chart-shell">
                  <div className="chart-heading">Overall rates</div>
                  <HighchartsReact highcharts={Highcharts} options={impactChartOptions} />
                </div>
              </div>

              <div className="analytics-summary">
                <div className="win-rate-wrap">
                  <svg className="wr-ring" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,153,51,0.12)" strokeWidth="5"/>
                    <circle
                      cx="30" cy="30" r="26" fill="none"
                      stroke="#FF9933" strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - currentStats.winRate / 100)}`}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                    <text x="30" y="34" textAnchor="middle" fill="#F0F4F8" fontSize="12" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1">
                      {animWinRate}%
                    </text>
                  </svg>
                  <span className="wr-label">Win Rate</span>
                </div>
                <div className="sixes-wrap">
                  <span className="sixes-val">{animSixes}</span>
                  <span className="sixes-label">Sixes hit</span>
                </div>
                <div className="matches-wrap">
                  <span className="matches-val">{currentStats.matches}</span>
                  <span className="matches-label">Matches</span>
                </div>
              </div>

              <a
                href="https://cricheroes.com/player-profile/2024810/M-S-D-Naveen"
                target="_blank" rel="noopener noreferrer"
                className="ch-link"
              >
                Verify on CricHeroes ↗
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Journey</div>
              <h2 className="section-title">Experience</h2>
              <p className="section-desc">League cricket across Karnataka and Hyderabad, plus professional net-bowling assignments.</p>
            </div>
            <div className="exp-list">
              {experience.map((exp, i) => (
                <div key={exp.league} className="exp-item reveal-left" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="exp-dot" aria-hidden="true"></div>
                  <div className="exp-body">
                    <h3 className="exp-title">{exp.league}</h3>
                    <span className="exp-format">{exp.format}</span>
                  </div>
                  <span className="exp-tag">{exp.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="container">
            <div className="contact-card reveal-scale">
              <div className="contact-body">
                <p className="contact-eyebrow">Get in touch</p>
                <h3 className="contact-heading">Looking for a match-winner?</h3>
                <p className="contact-text">
                  Available for trials, net sessions, and competitive contracts. Let's discuss how I can strengthen your squad this season.
                </p>
              </div>
              <div className="contact-actions">
                <a href="mailto:naveen@example.com" className="btn-pill primary">Email Me <span className="arrow">↗</span></a>
                <a href="tel:+919876543210" className="btn-pill secondary">Call Me <span className="arrow">↗</span></a>
                <a
                  href="https://www.instagram.com/msdnaveen_457/"
                  target="_blank" rel="noopener noreferrer"
                  className="ig-link"
                >
                  <InstagramIcon /> @msdnaveen_457
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="tricolor-bar"><span /><span /><span /></div>
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">M S D Naveen</div>
              <div className="footer-copy">&copy; {new Date().getFullYear()} · Designed for the Love of the Game</div>
              <div className="footer-links">
                <a href="https://www.instagram.com/msdnaveen_457/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://cricheroes.com/player-profile/2024810/M-S-D-Naveen" target="_blank" rel="noopener noreferrer">CricHeroes ↗</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
