'use client'

import { useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import styles from '../../styles/home.module.css'

const delay = 3000

type Props = {
  /** One picture per slide; HomePage passes core's ThemeImage for each file. */
  slides: readonly ReactNode[]
  label: string
  /** Read out as the region's kind, such as "carousel". */
  kind: string
  previous: string
  next: string
  dots: string
  /** One label per dot, such as "Go to slide 2". */
  dotLabels: readonly string[]
}

/** Full-width picture slider at the pictures' own shape: fades every 3s, arrows, dots, paused while a mouse is over it. */
export const HeroSlider = ({ slides, label, kind, previous, next, dots, dotLabels }: Props) => {
  const count = slides.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  // Bumped by an arrow or dot, so the effect restarts and the next change is a full 3s away.
  const [restart, setRestart] = useState(0)

  useEffect(() => {
    if (paused || count < 2) return
    const timer = setInterval(() => setCurrent((i) => (i + 1) % count), delay)
    return () => clearInterval(timer)
  }, [paused, count, restart])

  const go = (index: number) => {
    setCurrent((index + count) % count)
    setRestart((r) => r + 1)
  }
  // Mouse only: a tap on a phone fires pointerenter without a matching leave, which would stop the slider for good.
  const hover = (on: boolean) => (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') setPaused(on)
  }

  return (
    <section className={styles.slider} aria-roledescription={kind} aria-label={label} onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      <div className={styles.slides}>
        {slides.map((slide, i) => (
          <div key={i} className={i === current ? styles.slideOn : styles.slide} aria-hidden={i !== current}>
            {slide}
          </div>
        ))}
      </div>
      {count > 1 ? (
        <>
          <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} aria-label={previous} onClick={() => go(current - 1)}>
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} aria-label={next} onClick={() => go(current + 1)}>
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className={styles.dots} role="group" aria-label={dots}>
            {slides.map((_, i) => (
              <button key={i} type="button" className={i === current ? styles.dotOn : styles.dot} aria-label={dotLabels[i]} aria-current={i === current} onClick={() => go(i)} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
