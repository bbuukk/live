import { useRouter } from 'next/router'
import Head from 'next/head'
import { stripHtmlTags } from 'utils/stripHtmlTags'
import axios from 'axios'
import LandingHeader from '#root/features/products/landing/mutual/layout/landing_header.js'

import dynamic from 'next/dynamic'

const LandingProductAboutPage = dynamic(
  () => import('features/products/landing/about/landing_product_about'),
)
const Characteristics = dynamic(
  () => import('features/products/landing/characteristics/index'),
)
const LandingProductReviewsPage = dynamic(
  () => import('features/products/landing/reviews/reviews_page'),
)

import { useStopLoading } from 'hooks/useStopLoading'

// // todo make fallback page for suspense
// // todo fix we take first category available on product, but it can be not the category user was in

const Landing = ({ product }) => {
  const router = useRouter()
  const { activeTab } = router.query

  useStopLoading()

  return (
    <>
      <Head>
        <title>{`${product.name} в інтернет-магазині Живий світ`}</title>
        <meta
          name='description'
          content={`${product.name}\n\n${stripHtmlTags(
            product.description.substring(0, 110),
          )}...`}
        />
      </Head>

      <LandingHeader category={product.category[0]} activeTab={activeTab} />

      {activeTab == 'about' && <LandingProductAboutPage product={product} />}
      {activeTab == 'characteristics' && <Characteristics product={product} />}
      {activeTab == 'reviews' && (
        <LandingProductReviewsPage product={product} />
      )}
    </>
  )
}

export default Landing

export async function getServerSideProps({ params }) {
  const { productId, activeTab } = params

  const res = await axios.get(`/products/product/by-id/${productId}`)

  if (!['about', 'characteristics', 'reviews'].includes(activeTab)) {
    return {
      notFound: true,
    }
  }

  const product = res.data

  return {
    props: {
      product,
    },
  }
}
