import { Link, ThemeImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import styles from '../styles/oxellent.module.css'

const benefits = ['vitality', 'fertility', 'libido', 'muscle', 'brain', 'growth', 'stress', 'resistance', 'calf', 'nutrients', 'immunity'] as const
const inside = ['calcium', 'fibres', 'vitamins', 'minerals', 'biotics'] as const

/** Article: Ox'ellent, the store's Ayurvedic supplement for bulls, written from its brochure and banners. */
export const OxellentPage = () => {
  const { store, t } = useStorefront()
  return (
    <Layout>
      <article className={styles.article}>
        {/* Wide banner on tablets and desktops, the square one on phones. */}
        <div className={styles.cover}>
          <ThemeImage src="slider3.png" alt={t('pages.oxellent.coverAlt')} ratio={2172 / 724} sizes="100vw" className={styles.coverWide} />
          <ThemeImage src="oxellent-mobile.png" alt={t('pages.oxellent.coverAlt')} ratio={1} sizes="100vw" className={styles.coverNarrow} />
        </div>

        <header className={styles.head}>
          <p className={styles.kicker}>{t('pages.oxellent.kicker')}</p>
          <h1 className={styles.title}>{t('pages.oxellent.title')}</h1>
          <p className={styles.lead}>{t('pages.oxellent.lead')}</p>
        </header>

        <div className={styles.body}>
          <section className={styles.split}>
            <div className={styles.text}>
              <h2 className={styles.heading}>{t('pages.oxellent.why.title')}</h2>
              <p>{t('pages.oxellent.why.first')}</p>
              <p>{t('pages.oxellent.why.second')}</p>
              <blockquote className={styles.quote}>{t('pages.oxellent.why.quote')}</blockquote>
            </div>
            <figure className={styles.poster}>
              <ThemeImage src="Oxellent2.jpeg" alt={t('pages.oxellent.posterAlt')} ratio={1170 / 2482} sizes="(min-width: 900px) 360px, 80vw" className={styles.posterImage} />
            </figure>
          </section>

          <section>
            <h2 className={styles.heading}>{t('pages.oxellent.benefits.title')}</h2>
            <ul className={styles.checks}>
              {benefits.map((k) => (
                <li key={k} className={styles.check}>
                  <svg className={styles.checkIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  <span>{t(`pages.oxellent.benefits.${k}`)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.heading}>{t('pages.oxellent.inside.title')}</h2>
            <p>{t('pages.oxellent.inside.lead')}</p>
            <ul className={styles.chips}>
              {inside.map((k) => (
                <li key={k} className={styles.chip}>
                  {t(`pages.oxellent.inside.${k}`)}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.heading}>{t('pages.oxellent.minerals.title')}</h2>
            <p>{t('pages.oxellent.minerals.first')}</p>
            <p>{t('pages.oxellent.minerals.second')}</p>
          </section>

          <figure className={styles.brochure}>
            <ThemeImage src="Oxellent1.jpeg" alt={t('pages.oxellent.brochureAlt')} ratio={3520 / 2494} sizes="(min-width: 1240px) 1176px, 100vw" className={styles.brochureImage} />
            <figcaption className={styles.caption}>{t('pages.oxellent.brochureCaption', { store: store.name })}</figcaption>
          </figure>

          <p className={styles.notice}>{t('pages.oxellent.notice')}</p>

          <section className={styles.cta}>
            <h2 className={styles.ctaTitle}>{t('pages.oxellent.cta.title')}</h2>
            <p className={styles.ctaBody}>{t('pages.oxellent.cta.body')}</p>
            <div className={styles.ctaActions}>
              <Link href="/search/" className={styles.primary}>
                {t('pages.oxellent.cta.shop')}
              </Link>
              <Link href="/contact/" className={styles.secondary}>
                {t('pages.oxellent.cta.contact')}
              </Link>
            </div>
          </section>
        </div>
      </article>
    </Layout>
  )
}
