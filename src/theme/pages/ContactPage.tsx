import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { EnquiryForm, escapeForLink, whatsappNumber } from '../components/interactive/EnquiryForm'
import styles from '../styles/contact.module.css'

const reasons = ['product', 'bulk', 'dealer'] as const

// Outline icons for the contact cards; WhatsApp is its filled brand mark.
const icons = {
  address: ['M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  phone: [
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
  ],
  email: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 7l-9 5.7a2 2 0 0 1-2 0L2 7'],
  product: ['M12 3c4 3 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 2-7 6-10z', 'M12 9v9'],
  bulk: ['M3 7h11v9H3z', 'M14 10h4l3 3v3h-7', 'M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'],
  dealer: ['M3 9l1.5-5h15L21 9', 'M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z', 'M5 13.5V20h14v-6.5', 'M10 20v-4h4v4'],
} as const

const whatsappMark =
  'M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12.1 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4A9.9 9.9 0 0 1 12 2.1a9.8 9.8 0 0 1 7 2.9 9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.8 9.8zm8.4-18.3A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.7 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z'

const Icon = ({ kind }: { kind: keyof typeof icons | 'whatsapp' }) => (
  <span className={styles.badge}>
    {kind === 'whatsapp' ? (
      <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={whatsappMark} fillRule="evenodd" />
      </svg>
    ) : (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {icons[kind].map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    )}
  </span>
)

/** Contact us: the store's details from its settings, an enquiry form that sends through WhatsApp, and why to get in touch. */
export const ContactPage = () => {
  const { store, t } = useStorefront()
  const place = [store.address?.street, store.address?.city, store.address?.region, store.address?.postal, store.address?.country].filter(Boolean).join(', ')
  const phoneDigits = store.contactPhone?.replace(/[^\d+]/g, '') ?? ''
  const chatNumber = whatsappNumber(store.contactPhone)
  const whatsapp = store.social.find((s) => s.network === 'whatsapp')?.url ?? (chatNumber ? t(chatNumber.local ? 'pages.contact.form.chatHrefLocal' : 'pages.contact.form.chatHref', { phone: chatNumber.digits }) : null)

  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{t('pages.contact.eyebrow')}</p>
          <h1 className={styles.title}>{t('pages.contact.title')}</h1>
          <p className={styles.lead}>{t('pages.contact.lead')}</p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.info}>
          <h2 className={styles.heading}>{t('pages.contact.infoTitle')}</h2>
          <ul className={styles.cards}>
            {place ? (
              <li className={styles.card}>
                <Icon kind="address" />
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{t('pages.contact.address')}</h3>
                  <p className={styles.cardValue}>{place}</p>
                  <Link href={t('pages.contact.directionsHref', { place: escapeForLink(place) })} className={styles.cardLink}>
                    {t('pages.contact.directions')}
                  </Link>
                </div>
              </li>
            ) : null}
            {store.contactPhone ? (
              <li className={styles.card}>
                <Icon kind="phone" />
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{t('pages.contact.phone')}</h3>
                  <p className={styles.cardValue}>{store.contactPhone}</p>
                  <Link href={t('common.footer.phoneHref', { phone: phoneDigits })} className={styles.cardLink}>
                    {t('pages.contact.call')}
                  </Link>
                </div>
              </li>
            ) : null}
            {whatsapp ? (
              <li className={styles.card}>
                <Icon kind="whatsapp" />
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{t('pages.contact.whatsapp')}</h3>
                  {store.contactPhone ? <p className={styles.cardValue}>{store.contactPhone}</p> : null}
                  <Link href={whatsapp} className={styles.cardLink}>
                    {t('pages.contact.chat')}
                  </Link>
                </div>
              </li>
            ) : null}
            {store.contactEmail ? (
              <li className={styles.card}>
                <Icon kind="email" />
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{t('pages.contact.email')}</h3>
                  <p className={styles.cardValue}>{store.contactEmail}</p>
                </div>
              </li>
            ) : null}
          </ul>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.heading}>{t('pages.contact.form.title')}</h2>
          <p className={styles.formLead}>{t('pages.contact.form.lead')}</p>
          <EnquiryForm />
        </div>
      </section>

      <section className={styles.reasons}>
        <div className={styles.reasonsInner}>
          <h2 className={styles.heading}>{t('pages.contact.reasonsTitle')}</h2>
          <ul className={styles.reasonList}>
            {reasons.map((k) => (
              <li key={k} className={styles.reason}>
                <Icon kind={k} />
                <h3 className={styles.cardTitle}>{t(`pages.contact.reasons.${k}.title`)}</h3>
                <p className={styles.reasonBody}>{t(`pages.contact.reasons.${k}.body`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
