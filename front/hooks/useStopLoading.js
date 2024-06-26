import { stopLoading } from 'store/slices/global_comps/global_comps.slice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function useStopLoading() {
  const router = useRouter()

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.modals)

  useEffect(() => {
    if (loading) {
      dispatch(stopLoading())
    }
  }, [router.query])

  return { loading }
}
