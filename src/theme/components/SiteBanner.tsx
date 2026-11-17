import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../styles/banner.module.css'

// The full-width green banner above the footer on every page (Layout.tsx). Its words are under common.banner.
export const SiteBanner = () => {
  const { store, t } = useStorefront()
  const city = store.address?.city
  const region = store.address?.region
  return (
    <section className={styles.banner}>
      {/* The city and state come from the store's address in its settings. */}
      <h2 className={styles.heading}>{city && region ? t('common.banner.title', { city, region }) : t('common.banner.titlePlain')}</h2>
      <p className={styles.body}>{t('common.banner.body')}</p>
      <Link href="/contact/" className={styles.button}>
        {t('common.banner.action')}
      </Link>
    </section>
  )
}
