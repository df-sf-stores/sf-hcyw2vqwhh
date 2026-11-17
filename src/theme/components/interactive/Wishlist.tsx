'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { Link, useStorefront, useWishlist, type WishlistPage } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/wishlist.module.css'

/** One wishlist for the whole page, so a grid of hearts and the header count share a single load instead of one each. */
const WishlistContext = createContext<WishlistPage | null>(null)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const wishlist = useWishlist()
  return <WishlistContext.Provider value={wishlist}>{children}</WishlistContext.Provider>
}

const useShared = (): WishlistPage => {
  const shared = useContext(WishlistContext)
  // The Layout provides the wishlist; a part outside it is a theme mistake.
  if (!shared) throw new Error()
  return shared
}

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
  </svg>
)

/**
 * The heart. `wide` is the product page's full button with words; otherwise a round icon over a product card.
 * Signed out, core sends the shopper to sign in and adds the product when they come back.
 */
export const WishlistButton = ({ productId, versionId = null, wide = false }: { productId: string; versionId?: string | null; wide?: boolean }) => {
  const { t } = useStorefront()
  const wishlist = useShared()
  const saved = wishlist.has(productId)
  const toggle = () => void wishlist.toggle(productId, versionId)
  if (!wide)
    return (
      <button type="button" className={saved ? styles.heartOn : styles.heart} aria-label={t('shop.wishlist.label')} aria-pressed={saved} disabled={wishlist.busy} onClick={toggle}>
        <HeartIcon className={styles.heartIcon} />
      </button>
    )
  const problem = !wishlist.error ? null : wishlist.error === 'LIMIT' ? t('shop.wishlist.limit') : wishlist.error === 'NOT_IN_PREVIEW' ? t('shop.wishlist.preview') : t('shop.wishlist.failed')
  return (
    <>
      <button type="button" className={saved ? styles.wideOn : styles.wide} aria-pressed={saved} disabled={wishlist.busy} onClick={toggle}>
        <HeartIcon className={styles.heartIcon} />
        {saved ? t('shop.wishlist.saved') : t('shop.wishlist.add')}
      </button>
      {problem ? (
        <p className={styles.problem} role="status">
          {problem}
        </p>
      ) : null}
    </>
  )
}

/** The header's heart: goes to the Wishlist page and shows how many products it holds. */
export const WishlistLink = ({ className, iconClassName, hiddenClassName }: { className?: string; iconClassName?: string; hiddenClassName?: string }) => {
  const { t } = useStorefront()
  const { count } = useShared()
  return (
    <Link href="/account/wishlist/" className={[className, styles.headerLink].filter(Boolean).join(' ')}>
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
      </svg>
      <span className={hiddenClassName}>{count > 0 ? t('common.tools.wishlistCount', { count }) : t('common.tools.wishlist')}</span>
      {count > 0 ? (
        <span className={styles.count} aria-hidden="true">
          {count > 99 ? t('common.tools.wishlistMany') : count}
        </span>
      ) : null}
    </Link>
  )
}

/** The mobile menu's Wishlist row: heart, the word, and how many products it holds. */
export const WishlistMenuLink = ({ className, iconClassName }: { className?: string; iconClassName?: string }) => {
  const { t } = useStorefront()
  const { count } = useShared()
  return (
    <Link href="/account/wishlist/" className={className}>
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
      </svg>
      <span>{count > 0 ? t('common.tools.wishlistCount', { count }) : t('common.tools.wishlist')}</span>
    </Link>
  )
}
