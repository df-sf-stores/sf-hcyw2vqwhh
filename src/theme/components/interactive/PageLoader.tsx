'use client'

import { useEffect, useState } from 'react'
import { ThemeImage } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/loader.module.css'

// The loading screen: the logo above a running cow, over the page while it loads.
// It is in the page's first HTML, so it shows at once; after the page is ready it fades out and goes.
// If scripts never run, the CSS fades it out by itself (loader.module.css, .loader's animation).
export const PageLoader = ({ label, logoAlt }: { label: string; logoAlt: string }) => {
  const [phase, setPhase] = useState<'show' | 'hide' | 'gone'>('show')
  useEffect(() => {
    const hide = setTimeout(() => setPhase('hide'), 1200)
    const gone = setTimeout(() => setPhase('gone'), 1700)
    return () => {
      clearTimeout(hide)
      clearTimeout(gone)
    }
  }, [])
  if (phase === 'gone') return null
  return (
    <div className={phase === 'hide' ? `${styles.loader} ${styles.hide}` : styles.loader} role="status" aria-live="polite">
      <ThemeImage src="purua-logo-full.png" alt={logoAlt} ratio={1548 / 1016} sizes="200px" className={styles.logo} />
      <svg className={styles.scene} viewBox="0 0 220 130" aria-hidden="true" focusable="false">
        {/* Ground: a dashed line that scrolls left, so the cow seems to run forward. */}
        <line className={styles.ground} x1="0" y1="118" x2="220" y2="118" />
        <ellipse className={styles.shadow} cx="108" cy="119" rx="52" ry="4" />
        {/* Dust kicked up behind the back legs. */}
        <circle className={`${styles.dust} ${styles.dustA}`} cx="46" cy="112" r="5" />
        <circle className={`${styles.dust} ${styles.dustB}`} cx="40" cy="108" r="3.5" />
        <circle className={`${styles.dust} ${styles.dustC}`} cx="50" cy="106" r="2.5" />
        <g className={styles.cow}>
          {/* Legs, each swinging from its hip: back pair, then front pair. */}
          <g className={`${styles.leg} ${styles.backFar}`}>
            <rect x="66" y="70" width="9" height="38" rx="4" className={styles.legFar} />
            <rect x="65" y="104" width="11" height="7" rx="2" className={styles.hoof} />
          </g>
          <g className={`${styles.leg} ${styles.frontFar}`}>
            <rect x="136" y="70" width="9" height="38" rx="4" className={styles.legFar} />
            <rect x="135" y="104" width="11" height="7" rx="2" className={styles.hoof} />
          </g>
          {/* Tail, swishing from the rump. */}
          <g className={styles.tail}>
            <path d="M58 56 C46 62 44 74 46 86" className={styles.tailLine} />
            <path d="M46 84 c-5 3 -5 10 0 12 c5 -2 5 -9 0 -12z" className={styles.spot} />
          </g>
          {/* Body with spots, and the udder. */}
          <ellipse cx="104" cy="62" rx="50" ry="25" className={styles.body} />
          <path d="M80 42 c10 -4 20 2 18 12 c-2 9 -16 10 -22 4 c-5 -5 -3 -13 4 -16z" className={styles.spot} />
          <path d="M112 66 c8 -6 22 -2 22 8 c0 8 -14 10 -22 6 c-6 -3 -6 -10 0 -14z" className={styles.spot} />
          <path d="M66 66 c5 -2 10 2 9 7 c-1 4 -8 5 -11 2 c-2 -3 -1 -7 2 -9z" className={styles.spot} />
          <ellipse cx="82" cy="85" rx="9" ry="5" className={styles.udder} />
          <g className={`${styles.leg} ${styles.backNear}`}>
            <rect x="74" y="72" width="10" height="38" rx="4" className={styles.legNear} />
            <rect x="73" y="106" width="12" height="7" rx="2" className={styles.hoof} />
          </g>
          <g className={`${styles.leg} ${styles.frontNear}`}>
            <rect x="126" y="72" width="10" height="38" rx="4" className={styles.legNear} />
            <rect x="125" y="106" width="12" height="7" rx="2" className={styles.hoof} />
          </g>
          {/* Head: neck, horns, ear, face, muzzle, eye; it nods as the cow runs. */}
          <g className={styles.head}>
            <path d="M140 52 C146 40 152 34 160 32 L168 46 C160 54 152 60 146 64z" className={styles.body} />
            <path d="M158 24 c-4 -6 -2 -12 2 -14 c-1 5 1 9 4 11z" className={styles.horn} />
            <path d="M174 24 c4 -6 2 -12 -2 -14 c1 5 -1 9 -4 11z" className={styles.horn} />
            <path d="M154 30 c-9 -2 -14 2 -14 6 c6 1 11 -1 14 -3z" className={styles.ear} />
            <ellipse cx="167" cy="38" rx="15" ry="14" className={styles.body} />
            <path d="M160 26 c4 -4 12 -4 16 0 c-2 6 -14 6 -16 0z" className={styles.spot} />
            <ellipse cx="176" cy="48" rx="11" ry="8" className={styles.muzzle} />
            <circle cx="173" cy="47" r="1.6" className={styles.nostril} />
            <circle cx="180" cy="47" r="1.6" className={styles.nostril} />
            <circle cx="170" cy="35" r="2.6" className={styles.eye} />
            <circle cx="170.8" cy="34.2" r="0.9" className={styles.shine} />
          </g>
        </g>
      </svg>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.bar} />
      </span>
      <p className={styles.label}>{label}</p>
    </div>
  )
}
