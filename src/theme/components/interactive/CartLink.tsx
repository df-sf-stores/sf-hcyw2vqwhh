'use client'

import { Link, useCart, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/wishlist.module.css'

/** The header's bag: goes to the cart and shows how many items it holds, updating as soon as something is added. */
export const CartLink = ({ className, iconClassName, hiddenClassName }: { className?: string; iconClassName?: string; hiddenClassName?: string }) => {
  const { t } = useStorefront()
  const { count } = useCart()
  return (
    <Link href="/cart/" className={[className, styles.headerLink].filter(Boolean).join(' ')}>
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.5 8h13l-1 12h-11z" />
        <path d="M9 8V6.5a3 3 0 016 0V8" />
      </svg>
      <span className={hiddenClassName}>{count > 0 ? t('common.tools.cartCount', { count }) : t('common.tools.cart')}</span>
      {count > 0 ? (
        <span className={styles.count} aria-hidden="true">
          {count > 99 ? t('common.tools.wishlistMany') : count}
        </span>
      ) : null}
    </Link>
  )
}
