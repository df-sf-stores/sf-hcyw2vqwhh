import { Link, ThemeImage, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { GridPlaceholder, ProductGrid } from '../components/ProductCard'
import styles from '../styles/about.module.css'

// The About page at /about/ (routes.json). Its words are under pages.about in content/en/pages.json.

const values = ['ayurveda', 'complete', 'herd', 'farmer'] as const

// One line icon per value, drawn in a 24 x 24 box.
const icons: Record<(typeof values)[number], readonly string[]> = {
  ayurveda: ['M5 19c0-8 5-13 14-14-1 9-6 14-14 14z', 'M5 19l7-7'],
  complete: ['M12 3l7 4v10l-7 4-7-4V7z', 'M12 3v18', 'M5 7l7 4 7-4'],
  herd: ['M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z'],
  farmer: ['M4 19h16', 'M6 16l4-5 3 3 5-7', 'M15 7h3v3'],
}

// The range: the two products with their own article link to it; the rest are described here and shown in the grid below.
const range = [
  ['elixir', '/elixir/'],
  ['oxellent', '/oxellent/'],
  ['puremin', null],
  ['calcio', null],
  ['mintrox', null],
  ['purevit', null],
] as const

export const AboutPage = () => {
  const { store, t } = useStorefront()
  const products = useProducts({ first: 8 })
  const city = store.address?.city
  const region = store.address?.region
  return (
    <Layout>
      <article className={styles.about}>
        <header className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.kicker}>{t('pages.about.kicker')}</p>
            <h1 className={styles.title}>{t('pages.about.title', { store: store.name })}</h1>
            <p className={styles.lead}>{t('pages.about.lead')}</p>
          </div>
          <div className={styles.logoCard}>
            <ThemeImage src="purua-logo-full.png" alt={t('pages.about.logoAlt', { store: store.name })} ratio={1548 / 1016} sizes="(min-width: 900px) 420px, 80vw" className={styles.logo} />
            <p className={styles.tagline}>{t('pages.about.tagline')}</p>
          </div>
        </header>

        {/* Who we are: text on the left, the cow picture on the right, in the logo's column (below the text on phones). */}
        <section className={styles.storyRow}>
          <div className={styles.section}>
            <h2 className={styles.heading}>{t('pages.about.story.title')}</h2>
            <p className={styles.body}>{t('pages.about.story.first', { store: store.name })}</p>
            <p className={styles.body}>{t('pages.about.story.second')}</p>
            <p className={styles.body}>{t('pages.about.story.third')}</p>
            {city && region ? <p className={styles.body}>{t('pages.about.story.based', { city, region })}</p> : null}
          </div>
          <figure className={styles.storyPicture}>
            <ThemeImage src="cow.png" alt={t('pages.about.story.pictureAlt')} ratio={540 / 360} sizes="(min-width: 900px) 420px, 90vw" className={styles.storyImage} />
          </figure>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{t('pages.about.purpose.title')}</h2>
          <ul className={`${styles.values} ${styles.pair}`}>
            <li className={`${styles.value} ${styles.statement}`}>
              <h3 className={styles.valueTitle}>{t('pages.about.purpose.vision.title')}</h3>
              <p className={styles.valueBody}>{t('pages.about.purpose.vision.body')}</p>
            </li>
            <li className={`${styles.value} ${styles.statement}`}>
              <h3 className={styles.valueTitle}>{t('pages.about.purpose.mission.title')}</h3>
              <p className={styles.valueBody}>{t('pages.about.purpose.mission.body')}</p>
            </li>
          </ul>
          <p className={styles.body}>{t('pages.about.purpose.goal')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{t('pages.about.values.title')}</h2>
          <ul className={styles.values}>
            {values.map((k) => (
              <li key={k} className={styles.value}>
                <span className={styles.valueIcon}>
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {icons[k].map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </span>
                <h3 className={styles.valueTitle}>{t(`pages.about.values.${k}.title`)}</h3>
                <p className={styles.valueBody}>{t(`pages.about.values.${k}.body`)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{t('pages.about.range.title')}</h2>
          <p className={styles.body}>{t('pages.about.range.lead')}</p>
          {/* The range picture: wide from 640px up, square on phones. */}
          <div className={styles.banner}>
            <span className={styles.wide}>
              <ThemeImage src="slider1.png" alt={t('pages.about.rangeAlt', { store: store.name })} ratio={2172 / 724} sizes="(min-width: 1240px) 1176px, 100vw" className={styles.bannerImage} />
            </span>
            <span className={styles.square}>
              <ThemeImage src="home-mobile.png" alt={t('pages.about.rangeAlt', { store: store.name })} ratio={1} sizes="100vw" className={styles.bannerImage} />
            </span>
          </div>
          {/* The Elixir and Ox'ellent banners, one above the other: wide from 640px up, square on phones. Each opens its article. */}
          <ul className={styles.posters} aria-label={t('pages.about.range.posters')}>
            <li>
              <Link href="/elixir/" className={styles.poster}>
                <span className={styles.wide}>
                  <ThemeImage src="slider2.png" alt={t('pages.about.range.elixirPoster')} ratio={2172 / 724} sizes="(min-width: 1240px) 1176px, 100vw" className={styles.posterImage} />
                </span>
                <span className={styles.square}>
                  <ThemeImage src="elixir-mobile.png" alt={t('pages.about.range.elixirPoster')} ratio={1} sizes="100vw" className={styles.posterImage} />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/oxellent/" className={styles.poster}>
                <span className={styles.wide}>
                  <ThemeImage src="slider3.png" alt={t('pages.about.range.oxellentPoster')} ratio={2172 / 724} sizes="(min-width: 1240px) 1176px, 100vw" className={styles.posterImage} />
                </span>
                <span className={styles.square}>
                  <ThemeImage src="oxellent-mobile.png" alt={t('pages.about.range.oxellentPoster')} ratio={1} sizes="100vw" className={styles.posterImage} />
                </span>
              </Link>
            </li>
          </ul>
          <ul className={styles.range}>
            {range.map(([k, href]) => (
              <li key={k} className={styles.item}>
                <h3 className={styles.itemName}>{t(`pages.about.range.${k}.name`)}</h3>
                <p className={styles.itemBody}>{t(`pages.about.range.${k}.body`)}</p>
                {href ? (
                  <Link href={href} className={styles.more}>
                    {t('pages.about.range.more')}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {products.status === 'loading' || products.products.length ? (
          <section className={styles.section}>
            <div className={styles.shopHead}>
              <h2 className={styles.heading}>{t('pages.about.shop.title')}</h2>
              <Link href="/collections/all/" className={styles.more}>
                {t('pages.about.shop.all')}
              </Link>
            </div>
            {products.status === 'loading' ? <GridPlaceholder label={t('shop.listing.loading')} count={4} /> : <ProductGrid products={products.products} />}
          </section>
        ) : null}

        <p className={styles.note}>{t('pages.about.note')}</p>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t('pages.about.cta.title')}</h2>
          <p className={styles.ctaBody}>{t('pages.about.cta.body')}</p>
          <div className={styles.actions}>
            <Link href="/collections/all/" className={styles.primary}>
              {t('pages.about.cta.shop')}
            </Link>
            <Link href="/contact/" className={styles.secondary}>
              {t('pages.about.cta.contact')}
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  )
}
