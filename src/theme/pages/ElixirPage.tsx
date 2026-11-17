import { Link, ThemeImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import styles from '../styles/elixir.module.css'

// The article about Elixir, The Amrut, at /elixir/ (routes.json). Its words are in content/en/elixir.json.

const highlights = ['ayurvedic', 'minerals', 'lactation'] as const
const benefits = ['protein', 'milk', 'energy', 'breeding', 'conception', 'muscle', 'vitality', 'stress', 'resistance', 'calf', 'ketosis', 'calving', 'mortality'] as const

// One line icon per highlight, drawn in a 24 x 24 box.
const icons: Record<(typeof highlights)[number], readonly string[]> = {
  ayurvedic: ['M5 19c0-8 5-13 14-14-1 9-6 14-14 14z', 'M5 19l7-7'],
  minerals: ['M12 3l7 4v10l-7 4-7-4V7z', 'M12 3v18', 'M5 7l7 4 7-4'],
  lactation: ['M12 3c4 4.5 6 8 6 11a6 6 0 01-12 0c0-3 2-6.5 6-11z'],
}

export const ElixirPage = () => {
  const { t } = useStorefront()
  return (
    <Layout>
      <article className={styles.article}>
        <header className={styles.hero}>
          <p className={styles.kicker}>{t('elixir.kicker')}</p>
          <h1 className={styles.title}>{t('elixir.title')}</h1>
          <p className={styles.lead}>{t('elixir.lead')}</p>
          {/* The wide banner from tablets up; its square version on phones. */}
          <div className={styles.heroImage}>
            <span className={styles.wide}>
              <ThemeImage src="slider2.png" alt={t('elixir.heroAlt')} ratio={2172 / 724} sizes="(min-width: 1240px) 1208px, 100vw" className={styles.image} />
            </span>
            <span className={styles.square}>
              <ThemeImage src="elixir-mobile.png" alt={t('elixir.heroAlt')} ratio={1} sizes="100vw" className={styles.image} />
            </span>
          </div>
        </header>

        <blockquote className={styles.quote}>
          <p>{t('elixir.quote')}</p>
        </blockquote>

        <section className={styles.split}>
          <div className={styles.text}>
            <h2 className={styles.heading}>{t('elixir.what.title')}</h2>
            <p className={styles.body}>{t('elixir.what.first')}</p>
            <p className={styles.body}>{t('elixir.what.second')}</p>
          </div>
          <ThemeImage src="elixier1.jpeg" alt={t('elixir.what.imageAlt')} ratio={4362 / 4359} sizes="(min-width: 900px) 520px, 100vw" className={styles.splitImage} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{t('elixir.why.title')}</h2>
          <p className={styles.body}>{t('elixir.why.first')}</p>
          <p className={styles.body}>{t('elixir.why.second')}</p>
        </section>

        <section className={styles.section} aria-label={t('elixir.highlights.label')}>
          <ul className={styles.highlights}>
            {highlights.map((k) => (
              <li key={k} className={styles.highlight}>
                <span className={styles.highlightIcon}>
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {icons[k].map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </span>
                <h3 className={styles.highlightTitle}>{t(`elixir.highlights.${k}.title`)}</h3>
                <p className={styles.highlightBody}>{t(`elixir.highlights.${k}.body`)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{t('elixir.benefits.title')}</h2>
          <p className={styles.body}>{t('elixir.benefits.lead')}</p>
          <ul className={styles.benefits}>
            {benefits.map((k) => (
              <li key={k} className={styles.benefit}>
                <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <span>{t(`elixir.benefits.${k}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{t('elixir.gallery.title')}</h2>
          <div className={styles.gallery}>
            <figure className={styles.figure}>
              <ThemeImage src="elixier2.jpeg" alt={t('elixir.gallery.brochureAlt')} ratio={3520 / 2493} sizes="(min-width: 900px) 800px, 100vw" className={styles.figureImage} />
              <figcaption className={styles.caption}>{t('elixir.gallery.brochure')}</figcaption>
            </figure>
            <figure className={styles.figure}>
              <ThemeImage src="elixier3.jpeg" alt={t('elixir.gallery.posterAlt')} ratio={1172 / 2494} sizes="(min-width: 900px) 380px, 100vw" className={styles.figureImage} />
              <figcaption className={styles.caption}>{t('elixir.gallery.poster')}</figcaption>
            </figure>
          </div>
        </section>

        <aside className={styles.note}>
          <h2 className={styles.noteTitle}>{t('elixir.note.title')}</h2>
          <p className={styles.noteBody}>{t('elixir.note.body')}</p>
        </aside>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t('elixir.cta.title')}</h2>
          <p className={styles.ctaBody}>{t('elixir.cta.body')}</p>
          <div className={styles.actions}>
            <Link href="/collections/all/" className={styles.primary}>
              {t('elixir.cta.shop')}
            </Link>
            <Link href="/contact/" className={styles.secondary}>
              {t('elixir.cta.contact')}
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  )
}
