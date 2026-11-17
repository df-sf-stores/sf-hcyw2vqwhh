import type { ReactNode } from 'react'
import { ConsentBanner, ConsentSettingsButton, Link, PoweredBy, PreviewBanner, StoreLogo, ThemeImage, useCollections, useStorefront } from '@dripfunnel/storefront-core/theme'
import { FloatingActions } from './interactive/FloatingActions'
import { Menu } from './interactive/Menu'
import { WishlistLink, WishlistProvider } from './interactive/Wishlist'
import floating from '../styles/floating.module.css'
import styles from '../styles/layout.module.css'

// Social networks, in the order their icons show in the footer.
const networks = ['facebook', 'instagram', 'x', 'youtube', 'tiktok', 'whatsapp'] as const
type Network = (typeof networks)[number]

// Each network's filled brand mark, drawn in a 24 x 24 box.
const brandMarks: Record<Network, string> = {
  facebook: 'M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z',
  instagram:
    'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z',
  x: 'M18.9 1.2h3.7l-8 9.1L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9zm-1.3 19.4h2L6.5 3.2H4.3z',
  youtube:
    'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6z',
  tiktok:
    'M12.5 0h3.9c.1 1.5.6 3.1 1.8 4.2 1.1 1.1 2.7 1.6 4.2 1.8V10c-1.4 0-2.9-.3-4.2-1-.6-.3-1.1-.6-1.6-.9v8.7c-.1 1.4-.5 2.8-1.4 3.9a7 7 0 0 1-5.9 3.2 7 7 0 0 1-4.1-1A7.3 7.3 0 0 1 1.6 17v-1.5a7.2 7.2 0 0 1 8.7-6.7v4.4a3.3 3.3 0 0 0-4.4 2.1c-.2.5-.1 1.1-.1 1.6.2 1.6 1.8 3 3.5 2.9a3.3 3.3 0 0 0 3.2-2.7c.1-1.8.1-3.6.1-5.4z',
  whatsapp:
    'M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12.1 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4A9.9 9.9 0 0 1 12 2.1a9.8 9.8 0 0 1 7 2.9 9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.8 9.8zm8.4-18.3A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.7 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z',
}

const BrandMark = ({ kind, className }: { kind: Network; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={brandMarks[kind]} fillRule="evenodd" />
  </svg>
)

// Outline icons for the footer's Contact column; WhatsApp uses its brand mark.
const contactIcons = {
  address: ['M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  phone: [
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
  ],
  email: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 7l-9 5.7a2 2 0 0 1-2 0L2 7'],
} as const

const ContactIcon = ({ kind }: { kind: keyof typeof contactIcons | 'whatsapp' }) => (
  <span className={styles.contactBadge}>
    {kind === 'whatsapp' ? (
      <BrandMark kind="whatsapp" className={styles.contactMark} />
    ) : (
      <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {contactIcons[kind].map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    )}
  </span>
)

export const Layout = ({ children }: { children: ReactNode }) => {
  const { store, t, mode, poweredBy } = useStorefront()
  const { collections } = useCollections({ first: 20 })
  const socials = networks.flatMap((network) => {
    const url = store.social.find((s) => s.network === network)?.url
    return url ? [{ network, url }] : []
  })
  const whatsapp = store.social.find((s) => s.network === 'whatsapp')?.url ?? null
  return (
    <WishlistProvider>
    <div className={styles.shell}>
      {mode === 'live' ? null : <PreviewBanner t={t} className={styles.preview} />}
      <p className={styles.announce}>{t('common.announce')}</p>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link href="/" className={styles.brand}>
            <StoreLogo className={styles.logo} />
          </Link>
          <Menu label={t('common.nav.menu')}>
            <nav className={styles.nav} aria-label={t('common.nav.label')}>
              <Link href="/search/" className={styles.navLink}>
                {t('common.nav.shop')}
              </Link>
              {/* The store's collections: a dropdown on desktop, a list inside the opened menu on mobile. */}
              {collections.length ? (
                <div className={styles.dropdown}>
                  <Link href="/search/" className={`${styles.navLink} ${styles.dropdownToggle}`}>
                    {t('common.nav.categories')}
                    <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </Link>
                  <ul className={styles.dropdownPanel}>
                    {collections.map((c) => (
                      <li key={c.id}>
                        <Link href={c.href} className={styles.dropdownLink}>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <Link href="/about/" className={styles.navLink}>
                {t('common.nav.about')}
              </Link>
              <Link href="/contact/" className={styles.navLink}>
                {t('common.nav.contact')}
              </Link>
            </nav>
          </Menu>
          <div className={styles.tools}>
            <Link href="/search/" className={styles.tool}>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5" />
              </svg>
              <span className={styles.hidden}>{t('common.tools.search')}</span>
            </Link>
            <Link href="/account/" className={styles.tool}>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="8.5" r="3.8" />
                <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
              </svg>
              <span className={styles.hidden}>{t('common.tools.account')}</span>
            </Link>
            <WishlistLink className={styles.tool} iconClassName={styles.icon} hiddenClassName={styles.hidden} />
            <Link href="/cart/" className={styles.tool}>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M5.5 8h13l-1 12h-11z" />
                <path d="M9 8V6.5a3 3 0 016 0V8" />
              </svg>
              <span className={styles.hidden}>{t('common.tools.cart')}</span>
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.columns}>
          <div className={styles.about}>
            <Link href="/" className={styles.footerLogoLink}>
              <ThemeImage src="purua-logo-full.png" alt={store.name} ratio={1548 / 1016} className={styles.footerLogo} />
            </Link>
            <p className={styles.footerName}>{store.name}</p>
            <p className={styles.note}>{t('common.footer.slogan')}</p>
            {/* Social profiles come from the store's settings; each icon shows only when its link is set. */}
            {socials.length ? (
              <ul className={styles.socials}>
                {socials.map(({ network, url }) => (
                  <li key={network}>
                    <Link href={url} className={styles.social}>
                      <BrandMark kind={network} className={styles.socialIcon} />
                      <span className={styles.hidden}>{t(`common.footer.social.${network}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className={styles.links}>
            <h2 className={styles.heading}>{t('common.footer.shop')}</h2>
            <Link href="/search/" className={styles.footerLink}>
              {t('common.footer.all')}
            </Link>
            <Link href="/about/" className={styles.footerLink}>
              {t('common.nav.about')}
            </Link>
            <Link href="/account/" className={styles.footerLink}>
              {t('common.tools.account')}
            </Link>
          </div>
          <div className={styles.links}>
            <h2 className={styles.heading}>{t('common.footer.help')}</h2>
            <Link href="/contact/" className={styles.footerLink}>
              {t('common.nav.contact')}
            </Link>
            <Link href="/policies/shipping/" className={styles.footerLink}>
              {t('common.footer.shipping')}
            </Link>
            <Link href="/policies/returns/" className={styles.footerLink}>
              {t('common.footer.returns')}
            </Link>
            <Link href="/policies/privacy/" className={styles.footerLink}>
              {t('common.footer.privacy')}
            </Link>
            <Link href="/policies/terms/" className={styles.footerLink}>
              {t('common.footer.terms')}
            </Link>
          </div>
          {/* Contact details come from the store's settings, so editing them there updates the footer. */}
          <div className={styles.links}>
            <h2 className={styles.heading}>{t('common.footer.contact')}</h2>
            {store.address ? (
              <p className={styles.contactLine}>
                <ContactIcon kind="address" />
                <span>{[store.address.street, store.address.city, store.address.region, store.address.postal, store.address.country].filter(Boolean).join(', ')}</span>
              </p>
            ) : null}
            {store.contactPhone ? (
              <Link href={t('common.footer.phoneHref', { phone: store.contactPhone.replace(/[^\d+]/g, '') })} className={`${styles.contactLine} ${styles.contactLink}`}>
                <ContactIcon kind="phone" />
                <span>{store.contactPhone}</span>
              </Link>
            ) : null}
            {whatsapp ? (
              <Link href={whatsapp} className={`${styles.contactLine} ${styles.contactLink}`}>
                <ContactIcon kind="whatsapp" />
                <span>{store.contactPhone ?? t('common.footer.whatsapp')}</span>
              </Link>
            ) : null}
            {store.contactEmail ? (
              <p className={styles.contactLine}>
                <ContactIcon kind="email" />
                <span>{store.contactEmail}</span>
              </p>
            ) : null}
          </div>
        </div>
        <div className={styles.baseInner}>
          <p className={styles.copyright}>{t('common.footer.copyright', { store: store.name })}</p>
          <div className={styles.baseEnd}>
            {/* Core's Cookie settings button: reopens the store's consent banner. */}
            <ConsentSettingsButton t={t} className={styles.cookies} />
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.poweredGroup}>
              {/* The platform requires its sealed "Powered by {brand}" line when the store has one set. */}
              {poweredBy ? (
                <PoweredBy brand={poweredBy} t={t} className={styles.powered} />
              ) : (
                <span className={styles.powered}>{t('common.footer.poweredBy')}</span>
              )}
              {/* Core's Link is the only link a theme may render; it takes no target, so this opens in the same tab. */}
              <Link href={t('common.footer.poweredUrl')} className={styles.brandLink}>
                <ThemeImage src="dripfunnel-logo.png" alt={t('common.footer.poweredLogo')} ratio={845 / 143} className={styles.brandLogo} />
              </Link>
            </span>
          </div>
        </div>
      </footer>
      {/* Bottom-right buttons; WhatsApp shows only when the store's WhatsApp link is set in its settings. */}
      <FloatingActions topLabel={t('common.floating.top')}>
        {whatsapp ? (
          <Link href={whatsapp} className={floating.whatsapp}>
            <span className={floating.whatsappLabel}>{t('common.floating.whatsapp')}</span>
            <span className={floating.whatsappMark}>
              <BrandMark kind="whatsapp" className={floating.whatsappIcon} />
            </span>
          </Link>
        ) : null}
      </FloatingActions>
      <ConsentBanner t={t} className={styles.consent} />
    </div>
    </WishlistProvider>
  )
}
