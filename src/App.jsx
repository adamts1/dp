import { useEffect, useRef, useState, useCallback } from 'react'
import pinImage from './assets/dp.jpeg'
import img6700 from './assets/IMG_6700.jpeg'
import img6699 from './assets/IMG_6699.jpeg'
import img6698 from './assets/IMG_6698.jpeg'
import imgExtra from './assets/CD771986-E7C2-4F8B-AADF-CAD0EE0D9345.JPG'
import { translations } from './translations'

const carouselImages = [img6700, img6699, img6698, imgExtra]

function ImageCarousel({ className, imgClassName, alt, interval = 3000 }) {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef(null)

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setCurrent(prev => (prev + 1) % carouselImages.length)
    }, interval)
  }, [interval])

  useEffect(() => {
    resetTimer()
    return () => clearTimeout(timeoutRef.current)
  }, [current, resetTimer])

  const goPrev = () => setCurrent(prev => (prev - 1 + carouselImages.length) % carouselImages.length)
  const goNext = () => setCurrent(prev => (prev + 1) % carouselImages.length)

  return (
    <div className={`carousel-wrapper ${className || ''}`}>
      <div className="carousel-inner">
        {carouselImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className={`${imgClassName || ''} carousel-slide ${i === current ? 'active' : ''}`}
          />
        ))}
      </div>
      <button className="carousel-btn carousel-btn-prev" onClick={goPrev} aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={goNext} aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

function App() {
  const navbarRef = useRef(null)
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    return saved === 'fr' ? 'fr' : 'he'
  })

  const t = translations[lang]
  const isRtl = lang === 'he'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.title = lang === 'he' ? 'סיכת עונש מוות למחבלים למכירה - סיכת הצדק והרתעה | Jerusalem Popup' : 'L\'Épinglette de la Justice - Une position pour le changement'
    localStorage.setItem('lang', lang)
  }, [lang])

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.classList.add('scrolled')
        } else {
          navbarRef.current.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    document.querySelectorAll('.value-card, .why-point, .product-features li').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToProduct = (e) => {
    e.preventDefault()
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })
  }

  const whatsappUrl = `https://wa.me/972533807804?text=${encodeURIComponent(t.product.whatsappText)}`

  return (
    <>
      <nav id="navbar" ref={navbarRef}>
        <div className="container nav-content">
          <div className="logo">{t.nav.logo}</div>
          <button className="nav-cta" onClick={scrollToProduct}>
            {t.nav.cta}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-image animate-in">
            <img src={pinImage} alt="סיכת עונש מוות למחבלים למכירה" className="hero-pin-image" />
          </div>
          <span className="hero-badge animate-in delay-1">{t.hero.badge}</span>
          <h1 className="animate-in delay-2">
            {t.hero.title.split('\n')[0]}<br />
            {t.hero.title.split('\n')[1]} <span>{t.hero.titleHighlight}</span>.
          </h1>
          <p className="hero-subtitle animate-in delay-3">
            {t.hero.subtitle}
          </p>
          <a href="#product" className="cta-button animate-in delay-4" onClick={scrollToProduct}>
            {t.hero.cta}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={isRtl ? "M19 12H5m0 0l7-7m7 7l7 7" : "M5 12h14m0 0l-7-7m7 7l-7 7"} />
            </svg>
          </a>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t.values.label}</span>
            <h2 className="section-title">{t.values.title}</h2>
            <p className="section-description">
              {t.values.description}
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
              </svg>
              <h3>{t.values.support.title}</h3>
              <p>{t.values.support.desc}</p>
            </div>
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3>{t.values.law.title}</h3>
              <p>{t.values.law.desc}</p>
            </div>
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <h3>{t.values.victims.title}</h3>
              <p>{t.values.victims.desc}</p>
            </div>
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <h3>{t.values.responsibility.title}</h3>
              <p>{t.values.responsibility.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why">
        <div className="container">
          <div className="why-content">
            <div className="why-text">
              <span className="section-label">{t.why.label}</span>
              <h2>{t.why.title} <span>{t.why.titleHighlight}</span></h2>
              <p>{t.why.p1}</p>
              <p>{t.why.p2}</p>
              <div className="why-points">
                {t.why.points.map((point, i) => (
                  <div key={i} className="why-point">
                    <svg className="why-point-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="why-point-text">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-visual">
              <div className="pin-showcase">
                <ImageCarousel imgClassName="pin-image" alt="סיכת עוצמה יהודית איתמר בן גביר" interval={3000} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product" id="product">
        <div className="container">
          <div className="product-content">
            <div className="product-image">
              <ImageCarousel imgClassName="product-pin-image" alt="סיכת הרתעה וצדק נגד טרור" interval={4500} />
            </div>
            <div className="product-details">
              <span className="section-label">{t.product.label}</span>
              <p className="product-description">
                {t.product.description}
              </p>
              <div className="product-price">₪36</div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button whatsapp-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.product.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="disclaimer">
        <div className="container">
          <div className="disclaimer-content">
            <svg className="disclaimer-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h2>{t.disclaimer.title}</h2>
            <p>{t.disclaimer.p1}</p>
            <p>{t.disclaimer.p2}</p>
            <div className="disclaimer-points">
              {t.disclaimer.points.map((point, i) => (
                <div key={i} className="disclaimer-point">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <h2>
            {t.finalCta.title} <span>{t.finalCta.titleHighlight}</span>
            {t.finalCta.titleSuffix.split('\n').map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
          </h2>
          <p>{t.finalCta.p}</p>
          <a href="#product" className="cta-button" onClick={scrollToProduct}>
            {t.finalCta.cta}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={isRtl ? "M19 12H5m0 0l7-7m7 7l7 7" : "M5 12h14m0 0l-7-7m7 7l-7 7"} />
            </svg>
          </a>
        </div>
      </section>

      <button
        className="lang-switcher-floating"
        onClick={() => setLang(lang === 'he' ? 'fr' : 'he')}
        title={lang === 'he' ? 'Français' : 'עברית'}
        aria-label={lang === 'he' ? 'Switch to French' : 'עבור לעברית'}
      >
        <span className="lang-flag">{lang === 'he' ? '🇫🇷' : '🇮🇱'}</span>
      </button>

      {isRtl && (
        <section className="seo-faq">
          <div className="container">
            <h3>שאלות ותשובות על סיכת עונש מוות למחבלים</h3>
            <p>
              <strong>איפה ניתן לרכוש סיכת עונש מוות למחבלים?</strong><br />
              ניתן להזמין את <strong>סיכת עונש מוות למחבלים</strong> המקורית (סיכת הצדק) ישירות כאן באתר Jerusalem Popup. הסיכה עוצבה כביטוי לדרישה הציבורית להחזרת ההרתעה ומיצוי הדין עם הטרור הרצחני.
            </p>
            <p>
              <strong>האם זו סיכת בן גביר?</strong><br />
              רבים מכנים אותה <strong>סיכת בן גביר</strong> בשל התמיכה העקבית של המחנה הלאומי והשר איתמר בן גביר בחקיקת עונש מוות למחבלים. הסיכה מאפשרת לכל אזרח להביע תמיכה בעמדה זו בצורה חוקית ומכובדת.
            </p>
            <p>
              <strong>מה מסמלת סיכת עונש מוות למחבלים?</strong><br />
              הסיכה מייצגת ארבעה ערכי ליבה: הרתעה ביטחונית, צדק למשפחות הנרצחים, מניעת שחרור מחבלים בעסקאות עתידיות ושמירה על ביטחון אזרחי ישראל במסגרת החוק.
            </p>
          </div>
        </section>
      )}

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">{t.footer.logo}</div>
            <p className="footer-text">{t.footer.text}</p>
            <p className="footer-legal">{t.footer.legal}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
