'use client'

import { useState } from 'react'
import {
  AddressFields,
  Checkbox,
  Choices,
  Form,
  Link,
  OrderSummary,
  PaymentElement,
  PhoneField,
  PlaceOrder,
  Price,
  SubmitButton,
  TextField,
  addressDraft,
  useCheckout,
  useStorefront,
  type AddressDraft,
  type AddressField,
  type CheckoutStepId,
  type DeliveryOption,
  type FieldProblem,
} from '@dripfunnel/storefront-core/theme'
import { Notice } from '../Notice'
import { Retry } from './Retry'
import shop from '../../styles/shop.module.css'
import styles from '../../styles/checkout.module.css'

const Tick = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

/** The checkout: contact, address, delivery, payment and review as steps, with the order summary beside them. */
export const CheckoutView = () => {
  const { store, locale, t } = useStorefront()
  const c = useCheckout()
  const [contact, setContact] = useState<{ email: string; phone: string } | null>(null)
  const [contactErrors, setContactErrors] = useState<Partial<Record<'email' | 'phone', FieldProblem>>>({})
  const [address, setAddress] = useState<AddressDraft | null>(null)
  const [addressErrors, setAddressErrors] = useState<Partial<Record<AddressField, FieldProblem>>>({})
  const [keepAddress, setKeepAddress] = useState(true)
  const stepWord = (id: CheckoutStepId) =>
    id === 'contact' ? t('shop.checkout.contact') : id === 'address' ? t('shop.checkout.address') : id === 'delivery' ? t('shop.checkout.delivery') : id === 'payment' ? t('shop.checkout.payment') : t('shop.checkout.review')
  const methodWord = (provider: string) =>
    provider === 'cod'
      ? t('shop.checkout.methods.cod')
      : provider === 'bank_transfer'
        ? t('shop.checkout.methods.transfer')
        : provider === 'razorpay' || provider === 'cashfree'
          ? t('shop.checkout.methods.upi')
          : provider === 'phonepe'
            ? t('shop.checkout.methods.phonepe')
            : provider === 'paypal'
              ? t('shop.checkout.methods.paypal')
              : t('shop.checkout.methods.card')
  const refusalWord = (code: string) =>
    code === 'OUT_OF_STOCK'
      ? t('shop.checkout.refusals.outOfStock')
      : code === 'PHONE_REQUIRED'
        ? t('shop.checkout.refusals.phone')
        : code === 'NOT_READY'
          ? t('shop.checkout.refusals.notReady')
          : code === 'CART_CHANGED'
            ? t('shop.checkout.refusals.changed')
            : t('shop.checkout.refusals.other')
  const problem = (p: FieldProblem | undefined) => (p === 'required' ? t('shop.checkout.required') : p === 'invalid' ? t('shop.checkout.invalid') : null)

  if (c.status === 'loading') {
    return (
      <section className={shop.page} aria-busy="true">
        <h1 className={shop.title}>{t('shop.checkout.title')}</h1>
        <p className={shop.lead}>{t('shop.checkout.loading')}</p>
      </section>
    )
  }
  if (c.status === 'error') {
    return (
      <section className={shop.page}>
        <Notice main title={t('shop.checkout.failed')} lead={t('shop.listing.failedLead')}>
          <Retry label={t('shop.listing.retry')} onRetry={c.retry} />
        </Notice>
      </section>
    )
  }
  const cart = c.cart
  if (c.status === 'empty' || !cart) {
    return (
      <section className={shop.page}>
        <Notice main title={t('shop.checkout.empty')} lead={t('shop.cart.emptyLead')}>
          <Link href="/collections/all/" className={shop.primary}>
            {t('shop.cart.keepShopping')}
          </Link>
        </Notice>
      </section>
    )
  }

  const deliveryName = (o: DeliveryOption) => (o.id === 'pickup' ? t('shop.checkout.pickup') : o.id === 'flat' ? t('shop.checkout.standard') : (o.service ?? t('shop.checkout.courier')))
  const deliveryDays = (o: DeliveryOption) => (o.minDays !== null && o.maxDays !== null ? t('shop.checkout.days', { min: o.minDays, max: o.maxDays }) : null)
  const delivery = cart.shippingOptions.find((o) => o.id === cart.shippingOption)

  const summary = (id: CheckoutStepId) =>
    id === 'contact'
      ? [cart.email, cart.phone].filter(Boolean).join(' · ')
      : id === 'address' && cart.shippingAddress
        ? [cart.shippingAddress.name, cart.shippingAddress.line1, cart.shippingAddress.city, cart.shippingAddress.postalCode].filter(Boolean).join(', ')
        : id === 'delivery' && delivery
          ? deliveryName(delivery)
          : id === 'payment' && c.chosen
            ? methodWord(c.chosen)
            : null

  const body = (id: CheckoutStepId) => {
    if (id === 'contact') {
      const value = contact ?? { email: cart.email ?? '', phone: cart.phone ?? '' }
      return (
        <Form className={styles.form} onSubmit={() => void c.saveContact(value).then(setContactErrors)}>
          <TextField
            label={t('shop.checkout.email')}
            type="email"
            autoComplete="email"
            hint={t('shop.checkout.emailHint')}
            value={value.email}
            onChange={(email) => setContact({ ...value, email })}
            error={problem(contactErrors.email)}
            className={styles.field}
          />
          <PhoneField
            label={t('shop.checkout.phone')}
            codeLabel={t('shop.checkout.countryCode')}
            country={store.address?.country ?? c.countries[0] ?? ''}
            locale={locale}
            hint={t('shop.checkout.phoneHint')}
            value={value.phone}
            onChange={(phone) => setContact({ ...value, phone })}
            error={contactErrors.phone === 'invalid' ? t('shop.checkout.phoneInvalid') : problem(contactErrors.phone)}
            className={styles.field}
            groupClassName={styles.phone}
          />
          <SubmitButton disabled={c.busy} className={shop.primary}>
            {t('shop.checkout.continue')}
          </SubmitButton>
        </Form>
      )
    }
    if (id === 'address') {
      const draft = address ?? addressDraft(cart.shippingAddress, c.countries[0] ?? '')
      return (
        <Form className={styles.form} onSubmit={() => void c.saveAddress(draft, keepAddress).then(setAddressErrors)}>
          <AddressFields value={draft} onChange={setAddress} countries={c.countries} errors={addressErrors} t={t} locale={locale} className={styles.fields} fieldClassName={styles.field} phoneClassName={styles.phone} />
          {c.canKeepAddress ? (
            <Checkbox checked={keepAddress} onChange={setKeepAddress} className={styles.check}>
              {t('checkout.keepAddress')}
            </Checkbox>
          ) : null}
          <SubmitButton disabled={c.busy} className={shop.primary}>
            {t('shop.checkout.continue')}
          </SubmitButton>
        </Form>
      )
    }
    if (id === 'delivery') {
      if (cart.shippingOptions.length === 0) return <p className={styles.alert}>{t('shop.checkout.noDelivery')}</p>
      return (
        <Choices
          legend={t('shop.checkout.delivery')}
          value={cart.shippingOption}
          onChange={(option) => void c.chooseDelivery(option)}
          className={styles.choices}
          optionClassName={styles.option}
          chosenClassName={styles.optionOn}
          options={cart.shippingOptions.map((o) => ({
            value: o.id,
            content: (
              <span className={styles.optionBody}>
                <span className={styles.optionName}>
                  {deliveryName(o)}
                  {deliveryDays(o) ? <span className={styles.optionNote}>{deliveryDays(o)}</span> : null}
                </span>
                {Number(o.amount.amount) === 0 ? <span className={styles.optionPrice}>{t('shop.checkout.free')}</span> : <Price money={o.amount} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.optionPrice} />}
              </span>
            ),
          }))}
        />
      )
    }
    if (id === 'payment') {
      if (c.payments.length === 0) return <p className={styles.alert}>{t('shop.checkout.noPayment')}</p>
      return (
        <Form className={styles.form} onSubmit={() => void c.review()}>
          <Choices
            legend={t('shop.checkout.payment')}
            value={c.chosen}
            onChange={c.choosePayment}
            className={styles.choices}
            optionClassName={styles.option}
            chosenClassName={styles.optionOn}
            options={c.payments.map((p) => ({ value: p.provider, content: <span className={styles.optionName}>{methodWord(p.provider)}</span> }))}
          />
          <SubmitButton disabled={c.busy || !c.chosen} className={shop.primary}>
            {t('shop.checkout.continue')}
          </SubmitButton>
        </Form>
      )
    }
    return (
      <div className={styles.form}>
        <PaymentElement t={t} className={styles.payment} />
        <p className={styles.note}>{t('shop.checkout.agree')}</p>
        <PlaceOrder checkout={c} again={t('shop.checkout.payAgain')} className={`${shop.primary} ${styles.place}`}>
          {t('shop.checkout.place')}
        </PlaceOrder>
      </div>
    )
  }

  return (
    <section className={shop.page}>
      <div className={styles.head}>
        <h1 className={shop.title}>{t('shop.checkout.title')}</h1>
        <Link href="/cart/" className={shop.textLink}>
          {t('shop.checkout.backToCart')}
        </Link>
      </div>
      {c.error ? (
        <p className={styles.alert} role="alert">
          {refusalWord(c.error)}
        </p>
      ) : null}
      <div className={styles.grid}>
        <ol className={styles.steps}>
          {c.steps.map((s) => (
            <li key={s.id} className={s.state === 'open' ? `${styles.step} ${styles.stepOpen}` : styles.step}>
              <div className={styles.stepHead}>
                <h2 className={styles.stepTitle}>
                  <span className={s.state === 'done' ? `${styles.stepNumber} ${styles.stepDone}` : styles.stepNumber} aria-hidden="true">
                    {s.state === 'done' ? <Tick className={styles.tick} /> : null}
                  </span>
                  {stepWord(s.id)}
                </h2>
                {s.state === 'done' ? (
                  <button type="button" className={styles.change} aria-label={t('shop.checkout.changeStep', { step: stepWord(s.id) })} onClick={() => c.edit(s.id)}>
                    {t('shop.checkout.change')}
                  </button>
                ) : null}
              </div>
              {s.state === 'done' && summary(s.id) ? <p className={styles.done}>{summary(s.id)}</p> : null}
              {s.state === 'open' ? body(s.id) : null}
            </li>
          ))}
        </ol>
        <aside className={styles.side}>
          <h2 className={styles.sideTitle}>{t('shop.checkout.summary')}</h2>
          <OrderSummary cart={cart} at="checkout" locale={locale} t={t} className={styles.summary} />
          <p className={styles.secure}>{t('shop.checkout.secure')}</p>
        </aside>
      </div>
    </section>
  )
}
