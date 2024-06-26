import Image from 'next/image'
import Link from 'next/link'

import s from './listing.subcat_card.module.scss'

import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import ImageFallback from '#root/comps/image/fallback_image.js'

const SubcategoryCard = ({ category }) => {
  const { name, imagePath } = category

  const categoryPathSlug = `/products/${slugify(
    transliterate(category.path),
  )}/page=1`

  return (
    <Link href={categoryPathSlug} as={categoryPathSlug} className={`${s.card}`}>
      <ImageFallback
        src={imagePath}
        fallbackSrc={'/assets/goods_placeholder.svg'}
        width={150}
        height={150}
        alt='підкатегорія'
        priority
      />
      <div>
        <p> {name}</p>
      </div>
    </Link>
  )
}

export default SubcategoryCard
