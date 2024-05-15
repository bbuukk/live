import { useDispatch, useSelector } from 'react-redux'

import { useCallback, useEffect, useRef } from 'react'
import useSyncWishList from './use_sync_wish_list'
import * as wishList from 'store/slices/wish_list.slice'
import { getSession, useSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'

export const useWishList = () => {
  const dispatch = useDispatch()
  const { wishList: wshl, status } = useSelector((state) => state.wishList)

  const [localStWishList, setValue] = useLocalStorage('wish_list', [])

  // set global state of wish list if not set yet
  useEffect(() => {
    ;(async () =>
      await getSession().then((session) => {
        if (status === 'idle') {
          if (session) {
            console.log(session.user.wishList)
            dispatch(wishList.set(session.user.wishList))
          } else {
            dispatch(wishList.set(localStWishList))
          }
        }
      }))()
  }, [])

  const sync = useSyncWishList()

  //sync with localStorage and db on unmount
  const wshlRef = useRef(wshl)
  wshlRef.current = wshl
  useEffect(() => {
    return () => {
      console.log(wshlRef.current)
      ;(async () => await sync(wshlRef.current))()
    }
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setValue(wshlRef.current)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  async function like() {
    if (!wshl.includes(this._id)) {
      dispatch(wishList.add(this._id))
    } else {
      dispatch(wishList.remove(this._id))
    }
  }

  return [wshl, like]
}
