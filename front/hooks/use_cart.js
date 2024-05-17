import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useRef } from 'react'

// import todo from './use_sync_cart'
import * as crtSlice from 'store/slices/cart.slice'

import useLocalStorage from 'hooks/useLocalStorage'
import useManageCart from './use_manage_cart'

//todo
//todo when login in on catalog page, new likes are not saved

export const useCart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cart)

  const [localCart, setValue] = useLocalStorage('cart', [])

  const isSet = useRef(false)

  useEffect(() => {
    ;(async () => {
      /* 
        when user reload page
        if user has changed cart
        we need to set new state to user.cart
        as cleanup function of useEffect does not work on page reload
        */

      if (!isSet.current) {
        ;(async () => await set(localCart))()
      }
      isSet.current = true
    })()
  }, [])

  const [_, set] = useManageCart()

  //sync with localStorage and db on component unmount
  const cartRef = useRef(cart)
  cartRef.current = cart
  useEffect(() => {
    //todo do it on sign and signUP modals open
    return () => {
      ;(async () => await set(cartRef.current))()
    }
  }, [])

  //save to localStorage if user reloads or closes page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setValue(cartRef.current)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  //actions
  const add = useCallback(
    async function () {
      dispatch(crtSlice.add(this))
    },
    [dispatch],
  )

  const remove = useCallback(
    async function () {
      dispatch(crtSlice.removeOne(this))
    },
    [dispatch],
  )

  const removeAll = useCallback(
    async function () {
      dispatch(crtSlice.removeAll(this))
    },
    [dispatch],
  )

  return [cart, add, remove, removeAll]
}
