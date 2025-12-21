import { useEffect, useRef } from 'react'
import pinImage from './assets/dp.jpeg'

function App() {
  const navbarRef = useRef(null)

  useEffect(() => {
    // Navbar scroll effect
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
    // Intersection Observer for animations
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

  return (
    <>
      {/* Navigation */}
      <nav id="navbar" ref={navbarRef}>
        <div className="container nav-content">
          <div className="logo">סיכת הצדק</div>
          <button className="nav-cta" onClick={scrollToProduct}>
            לרכישה
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image animate-in">
            <img src={pinImage} alt="סיכת הצדק" className="hero-pin-image" />
          </div>
          <span className="hero-badge animate-in delay-1">סמל של עמדה • ביטוי דמוקרטי</span>
          <h1 className="animate-in delay-2">
            צדק הוא לא נקמה.<br />
            צדק הוא <span>אחריות</span>.
          </h1>
          <p className="hero-subtitle animate-in delay-3">
            סיכה סמלית שמבטאת תמיכה בחקיקת עונש מוות למחבלים מורשעים –
            במסגרת חוקית ודמוקרטית. לא שנאה. לא אלימות. עמדה ציבורית ברורה.
          </p>
          <a href="#product" className="cta-button animate-in delay-4" onClick={scrollToProduct}>
            רכישת סיכה - מביע עמדה
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7-7m-7 7l7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="container">
          <div className="section-header">
            <span className="section-label">מה הסיכה מייצגת</span>
            <h2 className="section-title">ארבעה ערכים. עמדה אחת.</h2>
            <p className="section-description">
              הסיכה היא לא רק אביזר – היא הצהרה שקטה אך ברורה על הערכים שמנחים אותנו כחברה.
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
              </svg>
              <h3>תמיכה בהרתעה</h3>
              <p>אמונה כי עונש הולם יכול למנוע פיגועים עתידיים ולהגן על חיי אזרחים תמימים.</p>
            </div>
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3>כיבוד שלטון החוק</h3>
              <p>כל שינוי חייב לעבור בכנסת, בהליך דמוקרטי שקוף, עם כל הבלמים והאיזונים.</p>
            </div>
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <h3>עמידה לצד הקורבנות</h3>
              <p>זיכרון הנספים והנפגעים מחייב אותנו לפעול. המשפחות שלהם ראויות לצדק.</p>
            </div>
            <div className="value-card">
              <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <h3>אחריות לאומית</h3>
              <p>חובתה של המדינה להגן על אזרחיה. אנחנו קוראים למקבלי ההחלטות לקחת אחריות.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why">
        <div className="container">
          <div className="why-content">
            <div className="why-text">
              <span className="section-label">למה זה חשוב</span>
              <h2>הרתעה אמיתית יכולה <span>להציל חיים</span></h2>
              <p>
                כיום, מחבלים שרוצחים אזרחים יודעים שגם במקרה של מאסר – הם עשויים להשתחרר בעסקאות עתידיות.
                המציאות הזו פוגעת ביכולת ההרתעה של המדינה.
              </p>
              <p>
                חקיקה של עונש מוות למקרים חריגים של טרור רצחני – בתוך מסגרת משפטית קפדנית –
                עשויה לשנות את חישובי הסיכון של ארגוני הטרור ולמנוע פיגועים.
              </p>
              <div className="why-points">
                <div className="why-point">
                  <svg className="why-point-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="why-point-text">עונש מידתי לפשעים חמורים ביותר</span>
                </div>
                <div className="why-point">
                  <svg className="why-point-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="why-point-text">מניעת שחרור רוצחים בעסקאות</span>
                </div>
                <div className="why-point">
                  <svg className="why-point-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="why-point-text">מסר ברור לאויבי ישראל</span>
                </div>
                <div className="why-point">
                  <svg className="why-point-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="why-point-text">צדק אמיתי למשפחות הנרצחים</span>
                </div>
              </div>
            </div>
            <div className="why-visual">
              <div className="pin-showcase">
                <img src={pinImage} alt="סיכת הצדק - חבל זהב" className="pin-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="product" id="product">
        <div className="container">
          <div className="product-content">
            <div className="product-image">
              <img src={pinImage} alt="סיכת הצדק - חבל זהב" className="product-pin-image" />
            </div>
            <div className="product-details">
              <span className="section-label">אודות הסיכה</span>
              <p className="product-description">
                עשויה מחומרים איכותיים
                ומיוצרת בישראל. מתאימה לענידה על דש חליפה, תיק, או מדים.
              </p>
              <div className="product-price">₪49</div>
              <p className="shipping-note">המחיר כולל עלות משלוח</p>
              <a 
                href="https://wa.me/972533807804?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%9C%D7%A8%D7%9B%D7%95%D7%A9%20%D7%A1%D7%99%D7%9B%D7%AA%20%D7%94%D7%A6%D7%93%D7%A7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button whatsapp-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                רכישת סיכה - מביע עמדה
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="disclaimer">
        <div className="container">
          <div className="disclaimer-content">
            <svg className="disclaimer-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h2>הצהרה אתית ומשפטית</h2>
            <p>
              רכישת הסיכה היא ביטוי דמוקרטי של עמדה אישית בלבד.
              אנו תומכים אך ורק בפעולה חוקית, במסגרת ההליך הדמוקרטי,
              ובהתאם לחוקי מדינת ישראל.
            </p>
            <p>
              אין בסיכה זו קריאה לאלימות, להסתה, או לכל פעולה בלתי חוקית.
              כל שינוי בחקיקה צריך לעבור את ההליך הפרלמנטרי המלא.
            </p>
            <div className="disclaimer-points">
              <div className="disclaimer-point">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                ביטוי דמוקרטי בלבד
              </div>
              <div className="disclaimer-point">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                ללא קריאה לאלימות
              </div>
              <div className="disclaimer-point">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                תמיכה בשלטון החוק
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>
            הגיע הזמן <span>להשמיע קול</span>.<br />
            בצורה חוקית ומכובדת.
          </h2>
          <p>
            כל סיכה היא קול נוסף בדיון הציבורי.
            הצטרפו לאלפים שכבר מביעים את עמדתם.
          </p>
          <a href="#product" className="cta-button" onClick={scrollToProduct}>
            להביע עמדה בצורה חוקית ומכובדת
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7-7m-7 7l7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">סיכת הצדק</div>
            <p className="footer-text">
              מיזם עצמאי לביטוי דמוקרטי של עמדה ציבורית.
            </p>
            <p className="footer-legal">
              © 2024 כל הזכויות שמורות. האתר אינו מזוהה עם גוף ממשלתי או מפלגתי.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

