'use client'

import { useState } from 'react'
import { Link, useStorefront, useWishlist, type WishlistItem } from '@dripfunnel/storefront-core/theme'
import { Notice } from '../Notice'
import { GridPlaceholder, ProductCard } from '../ProductCard'
import { Retry } from './Retry'
import shop from '../../styles/shop.module.css'
import styles from '../../styles/wishlist.module.css'

/** One saved product: its card, then Add to cart (or Choose options when it has several versions) and Remove. */
const Item = ({ item, onAdd, onRemove }: { item: WishlistItem; onAdd: (item: WishlistItem) => Promise<boolean>; onRemove: (id: string) => Promise<boolean> }) => {
  const { t } = useStorefront()
  const [note, setNote] = useState<'added' | 'failed' | null>(null)
  const add = async () => setNote((await onAdd(item)) ? 'added' : 'failed')
  return (
    <li className={`${shop.cell} ${styles.item}`}>
      <ProductCard product={item} />
      <div className={styles.itemActions}>
        {item.versionId ? (
          <button type="button" className={shop.primary} onClick={() => void add()}>
            {t('pages.wishlist.addToCart')}
          </button>
        ) : (
          <Link href={item.href} className={shop.secondary}>
            {t('pages.wishlist.choose')}
          </Link>
        )}
        <button type="button" className={styles.remove} onClick={() => void onRemove(item.id)}>
          {t('pages.wishlist.remove')}
        </button>
        {note ? (
          <p className={styles.note} role="status">
            {note === 'added' ? t('pages.wishlist.added') : t('pages.wishlist.addFailed')}
          </p>
        ) : null}
      </div>
    </li>
  )
}

/** The Wishlist page's body: its heading, then loading, signed-out, failed, empty or the saved products. */
export const WishlistView = () => {
  const { t } = useStorefront()
  const wishlist = useWishlist({ cards: true })
  return (
    <section className={shop.page}>
      <div className={shop.intro}>
        <h1 className={shop.title}>{t('pages.wishlist.title')}</h1>
        <p className={shop.lead}>{t('pages.wishlist.lead')}</p>
      </div>
      {wishlist.status === 'loading' ? <GridPlaceholder label={t('pages.wishlist.loading')} count={4} /> : null}
      {wishlist.status === 'signedOut' ? (
        <Notice title={t('pages.wishlist.signedOut')} lead={t('pages.wishlist.signedOutLead')}>
          <Link href="/sign-in/?next=%2Faccount%2Fwishlist%2F" className={shop.primary}>
            {t('pages.wishlist.signIn')}
          </Link>
        </Notice>
      ) : null}
      {wishlist.status === 'error' ? (
        <Notice title={t('pages.wishlist.failed')} lead={t('pages.wishlist.failedLead')}>
          <Retry label={t('shop.listing.retry')} onRetry={wishlist.retry} />
        </Notice>
      ) : null}
      {wishlist.status === 'ready' && wishlist.items.length === 0 ? (
        <Notice title={t('pages.wishlist.empty')} lead={t('pages.wishlist.emptyLead')}>
          <Link href="/collections/all/" className={shop.primary}>
            {t('pages.wishlist.browse')}
          </Link>
        </Notice>
      ) : null}
      {wishlist.status === 'ready' && wishlist.items.length > 0 ? (
        <ul className={shop.gridWide}>
          {wishlist.items.map((item) => (
            <Item key={item.id} item={item} onAdd={wishlist.addToCart} onRemove={wishlist.remove} />
          ))}
        </ul>
      ) : null}
    </section>
  )
}
