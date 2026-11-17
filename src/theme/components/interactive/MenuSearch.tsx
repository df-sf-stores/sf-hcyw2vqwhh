'use client'

import { navigate, SearchField, useStorefront } from '@dripfunnel/storefront-core/theme'

// Characters that would break or change a query value; everything else the browser encodes itself.
// '%' goes first, so the escapes added after it aren't escaped again.
const queryValue = (words: string) =>
  words
    .replace(/%/g, '%25')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/\+/g, '%2B')
    .replace(/=/g, '%3D')
    .replace(/\?/g, '%3F')
    .replace(/ /g, '+')

/** The search bar at the top of the mobile menu: submitting opens the Search page with the words. */
export const MenuSearch = ({ className }: { className?: string }) => {
  const { t } = useStorefront()
  const search = (words: string) => {
    const q = words.trim()
    navigate(q ? `/search/?q=${queryValue(q)}` : '/search/')
  }
  return <SearchField label={t('shop.search.label')} placeholder={t('shop.search.placeholder')} button={t('shop.search.button')} value="" onSearch={search} className={className} />
}
