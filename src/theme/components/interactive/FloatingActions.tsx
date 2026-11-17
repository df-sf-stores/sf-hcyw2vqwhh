'use client'

import { useRef, type ReactNode } from 'react'
import { useInView, useReducedMotion } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/floating.module.css'

// The bottom-right buttons: whatever the layout passes in (the WhatsApp link), with "Back to top" above it.
// "Back to top" shows once the first screen of the page has scrolled away, and scrolls back to it.
export const FloatingActions = ({ topLabel, children }: { topLabel: string; children?: ReactNode }) => {
  const top = useRef<HTMLSpanElement>(null)
  const atTop = useInView(top)
  const reduced = useReducedMotion()
  return (
    <>
      <span ref={top} className={styles.marker} aria-hidden="true" />
      <div className={styles.floating}>
        <button
          type="button"
          className={atTop ? styles.top : `${styles.top} ${styles.shown}`}
          aria-hidden={atTop}
          tabIndex={atTop ? -1 : 0}
          onClick={() => top.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}
        >
          <svg className={styles.topIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
          </svg>
          <span className={styles.hidden}>{topLabel}</span>
        </button>
        {children}
      </div>
    </>
  )
}
