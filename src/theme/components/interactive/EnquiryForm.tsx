'use client'

import { useState } from 'react'
import { Choices, Link, TextField, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/contact.module.css'

const types = ['product', 'bulk', 'dealer', 'other'] as const
type EnquiryType = (typeof types)[number]

// A theme has no encodeURIComponent, so a link's text is escaped here: the characters a URL reads as its own,
// and whitespace, which core's Link refuses. Letters in any script pass through, and the browser encodes them.
const escapeChar = (c: string): string => {
  switch (c) {
    case '%':
      return '%25'
    case '&':
      return '%26'
    case '#':
      return '%23'
    case '?':
      return '%3F'
    case '+':
      return '%2B'
    case '=':
      return '%3D'
    case '\\':
      return '%5C'
    case '\n':
      return '%0A'
    default:
      return '%20'
  }
}

// Control characters (other than a new line) are dropped: core's Link refuses them.
export const escapeForLink = (text: string) =>
  [...text]
    .filter((c) => c === '\n' || (c >= ' ' && c !== '\u007f'))
    .join('')
    .replace(/[%&#?+=\\\n]|\s/g, escapeChar)

/**
 * The store's phone as WhatsApp wants it, digits only. `local` is a 10-digit Indian number, which the
 * content's `...Local` link templates put India's 91 in front of.
 */
export const whatsappNumber = (phone: string | null | undefined) => {
  const digits = (phone ?? '').replace(/\D/g, '')
  if (digits.length === 10) return { digits, local: true }
  return digits.length >= 11 ? { digits, local: false } : null
}

/**
 * The Contact page's enquiry form. The platform has no way for a theme to send a message, so "Send" opens
 * WhatsApp with the enquiry written out, addressed to the store's phone number.
 */
export const EnquiryForm = () => {
  const { store, t } = useStorefront()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [place, setPlace] = useState('')
  const [type, setType] = useState<EnquiryType>('product')
  const [animals, setAnimals] = useState('')
  const [message, setMessage] = useState('')
  // Errors show only after a first try to send, not while the shopper is still typing.
  const [tried, setTried] = useState(false)

  const errors = {
    name: name.trim() ? undefined : t('pages.contact.form.nameError'),
    phone: phone.replace(/\D/g, '').length >= 10 ? undefined : t('pages.contact.form.phoneError'),
    message: message.trim() ? undefined : t('pages.contact.form.messageError'),
  }
  const valid = !errors.name && !errors.phone && !errors.message
  const to = whatsappNumber(store.contactPhone)
  const none = t('pages.contact.form.none')
  const text = t('pages.contact.form.whatsappText', {
    name: name.trim(),
    phone: phone.trim(),
    place: place.trim() || none,
    type: t(`pages.contact.form.types.${type}`),
    animals: animals.trim() || none,
    message: message.trim(),
  })
  const href = to ? t(to.local ? 'pages.contact.form.whatsappHrefLocal' : 'pages.contact.form.whatsappHref', { phone: to.digits, text: escapeForLink(text) }) : null

  return (
    <div className={styles.form}>
      <TextField label={t('pages.contact.form.name')} autoComplete="name" value={name} onChange={setName} maxLength={80} error={tried ? errors.name : undefined} className={styles.field} />
      <TextField label={t('pages.contact.form.phone')} type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={setPhone} maxLength={16} error={tried ? errors.phone : undefined} className={styles.field} />
      <TextField label={t('pages.contact.form.place')} note={t('pages.contact.form.optional')} autoComplete="address-level2" value={place} onChange={setPlace} maxLength={80} className={styles.field} />
      <Choices
        legend={t('pages.contact.form.type')}
        value={type}
        options={types.map((v) => ({ value: v, content: <span>{t(`pages.contact.form.types.${v}`)}</span> }))}
        onChange={setType}
        className={styles.choices}
        optionClassName={styles.choice}
        chosenClassName={styles.choiceOn}
      />
      <TextField label={t('pages.contact.form.animals')} note={t('pages.contact.form.optional')} inputMode="numeric" value={animals} onChange={setAnimals} maxLength={6} className={styles.field} />
      <TextField label={t('pages.contact.form.message')} value={message} onChange={setMessage} maxLength={500} error={tried ? errors.message : undefined} className={styles.field} />
      {!href ? (
        <p className={styles.unavailable}>{t('pages.contact.form.unavailable')}</p>
      ) : valid ? (
        <Link href={href} className={styles.send}>
          {t('pages.contact.form.send')}
        </Link>
      ) : (
        <button type="button" className={styles.send} onClick={() => setTried(true)}>
          {t('pages.contact.form.send')}
        </button>
      )}
    </div>
  )
}
