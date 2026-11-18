import { Fragment } from 'react'
import { Image, Link, ThemeImage, useCollections, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { GridPlaceholder, ProductGrid } from '../components/ProductCard'
import { Layout } from '../components/Layout'
import { HeroSlider } from '../components/interactive/HeroSlider'
import shop from '../styles/shop.module.css'
import styles from '../styles/home.module.css'
import oxellent from '../styles/oxellent.module.css'
import elixir from '../styles/elixir.module.css'

const trust = ['nutrition', 'tested', 'delivery', 'farmers'] as const
const benefits = ['milk', 'fat', 'immunity', 'fertility'] as const
const steps = ['choose', 'mix', 'feed'] as const

// Simple line icons, one per trust item and benefit.
type IconKind = (typeof trust)[number] | (typeof benefits)[number]

const icons: Record<IconKind, readonly string[]> = {
  nutrition: ['M12 3c4 3 6 6.5 6 10a6 6 0 01-12 0c0-3.5 2-7 6-10z', 'M12 9v9'],
  tested: ['M9 3h6', 'M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3', 'M7.5 15h9'],
  delivery: ['M3 7h11v9H3z', 'M14 10h4l3 3v3h-7', 'M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z', 'M17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'],
  farmers: ['M12 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z', 'M5 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5'],
  milk: ['M9 3h6', 'M9 3v3l-2 3v11h10V9l-2-3V3', 'M7 13h10'],
  fat: ['M12 4l2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 19.2l.9-5.5-4-3.9 5.5-.8z'],
  immunity: ['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z', 'M9 12l2 2 4-4'],
  fertility: ['M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z'],
}

// Hero highlights: content key under home.hero, and the icon shown beside it.
const highlights = [
  ['badgeProtein', 'nutrition'],
  ['badgeMinerals', 'tested'],
  ['sack', 'immunity'],
] as const

// The cattle feed category shows the theme's cow picture (src/theme/media/cow.jpg) instead of its own.
const isCattleFeed = (name: string, href: string) => /cattle[\s-]*feed/i.test(`${name} ${href}`)

const Icon = ({ kind }: { kind: IconKind }) => (
  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {icons[kind].map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
)

export const HomePage = () => {
  const { store, t } = useStorefront()
  const { collections, status } = useCollections({ first: 4 })
  const newest = useProducts({ sort: 'newest', first: 4 })
  return (
    <Layout>
      <HeroSlider
        // Each slide has a wide desktop picture and a square mobile one; CSS shows one by screen width (home.module.css).
        slides={[
          <Fragment key="1">
            <ThemeImage src="slider1.png" alt={t('home.hero.slider.alt1')} ratio={2172 / 724} className={styles.slideDesktop} />
            <ThemeImage src="home-mobile.png" alt={t('home.hero.slider.alt1')} ratio={1} className={styles.slideMobile} />
          </Fragment>,
          <Fragment key="2">
            <ThemeImage src="slider2.png" alt={t('home.hero.slider.alt2')} ratio={2172 / 724} className={styles.slideDesktop} />
            <ThemeImage src="elixir-mobile.png" alt={t('home.hero.slider.alt2')} ratio={1} className={styles.slideMobile} />
          </Fragment>,
          <Fragment key="3">
            <ThemeImage src="slider3.png" alt={t('home.hero.slider.alt3')} ratio={2172 / 724} className={styles.slideDesktop} />
            <ThemeImage src="oxellent-mobile.png" alt={t('home.hero.slider.alt3')} ratio={1} className={styles.slideMobile} />
          </Fragment>,
        ]}
        label={t('home.hero.slider.label')}
        kind={t('home.hero.slider.kind')}
        previous={t('home.hero.slider.previous')}
        next={t('home.hero.slider.next')}
        dots={t('home.hero.slider.dots')}
        dotLabels={[1, 2, 3].map((n) => t('home.hero.slider.goTo', { n: String(n) }))}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{t('home.hero.eyebrow')}</p>
            <h1 className={styles.title}>{t('home.hero.title', { store: store.name })}</h1>
            <p className={styles.lead}>{t('home.hero.lead')}</p>
            <div className={styles.actions}>
              <Link href="/collections/all/" className={styles.button}>
                {t('home.hero.shop')}
              </Link>
              <Link href="/contact/" className={styles.ghost}>
                {t('home.hero.bulk')}
              </Link>
            </div>
          </div>
          <ul className={styles.highlights}>
            {highlights.map(([key, icon]) => (
              <li key={key} className={styles.highlight}>
                <span className={styles.highlightIcon}>
                  <Icon kind={icon} />
                </span>
                <span>{t(`home.hero.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.trust} aria-label={t('home.trust.label')}>
        <ul className={styles.trustList}>
          {trust.map((k) => (
            <li key={k} className={styles.trustItem}>
              <Icon kind={k} />
              <span>{t(`home.trust.${k}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      {status === 'loading' || collections.length ? (
        <section className={shop.band}>
          <p className={styles.kicker}>{t('home.collections.kicker')}</p>
          <h2 className={shop.heading}>{t('home.collections.title')}</h2>
          {status === 'loading' ? (
            <ul className={styles.tiles} aria-busy="true" aria-label={t('shop.listing.loading')}>
              {[0, 1, 2, 3].map((i) => (
                <li key={i}>
                  <span className={styles.tile} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles.tiles}>
              {collections.map((c) => (
                <li key={c.id}>
                  <Link href={c.href} className={styles.tile}>
                    {isCattleFeed(c.name, c.href) ? (
                      <ThemeImage src="cow.png" alt={c.name} ratio={540 / 360} sizes="(min-width: 900px) 25vw, 50vw" className={`${styles.tileImage} ${styles.tileCutout}`} />
                    ) : c.image ? (
                      <Image image={c.image} alt={c.name} ratio={1} sizes="(min-width: 900px) 25vw, 50vw" className={styles.tileImage} />
                    ) : null}
                    <span className={styles.tileName}>{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {newest.status === 'loading' || newest.products.length ? (
        <section className={shop.band}>
          <div className={shop.bandHead}>
            <h2 className={shop.heading}>{t('home.newest.title')}</h2>
            <Link href="/collections/all/?sort=newest" className={shop.textLink}>
              {t('home.newest.all')}
            </Link>
          </div>
          {newest.status === 'loading' ? <GridPlaceholder label={t('shop.listing.loading')} count={4} /> : <ProductGrid products={newest.products} />}
        </section>
      ) : null}

      {/* Small Elixir banner: the wide picture from 640px up, the square one on phones; opens the article. */}
      <section className={elixir.promo} aria-label={t('home.elixirPromo.label')}>
        <Link href="/elixir/" className={elixir.promoLink}>
          <span className={elixir.wide}>
            <ThemeImage src="slider2.png" alt={t('home.elixirPromo.alt')} ratio={2172 / 724} sizes="(min-width: 1240px) 1176px, 100vw" className={elixir.image} />
          </span>
          <span className={elixir.square}>
            <ThemeImage src="elixir-mobile.png" alt={t('home.elixirPromo.alt')} ratio={1} sizes="100vw" className={elixir.image} />
          </span>
        </Link>
      </section>

      <section className={styles.benefits}>
        <div className={styles.inner}>
          <p className={styles.kicker}>{t('home.benefits.kicker')}</p>
          <h2 className={styles.heading}>{t('home.benefits.title')}</h2>
          <ul className={styles.cards}>
            {benefits.map((k) => (
              <li key={k} className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon kind={k} />
                </span>
                <h3 className={styles.cardTitle}>{t(`home.benefits.${k}.title`)}</h3>
                <p className={styles.cardBody}>{t(`home.benefits.${k}.body`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Small Ox'ellent banner: the wide picture from 640px up, the square one on phones; opens the article. */}
      <section className={oxellent.promo} aria-label={t('home.promo.label')}>
        <Link href="/oxellent/" className={oxellent.promoLink}>
          <ThemeImage src="slider3.png" alt={t('home.promo.alt')} ratio={2172 / 724} sizes="(min-width: 1240px) 1176px, 100vw" className={oxellent.coverWide} />
          <ThemeImage src="oxellent-mobile.png" alt={t('home.promo.alt')} ratio={1} sizes="100vw" className={oxellent.coverNarrow} />
        </Link>
      </section>

      <section className={styles.steps}>
        <div className={styles.inner}>
          <p className={styles.kicker}>{t('home.steps.kicker')}</p>
          <h2 className={styles.heading}>{t('home.steps.title')}</h2>
          <ol className={styles.stepList}>
            {steps.map((k) => (
              <li key={k} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true" />
                <h3 className={styles.cardTitle}>{t(`home.steps.${k}.title`)}</h3>
                <p className={styles.cardBody}>{t(`home.steps.${k}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  )
}
