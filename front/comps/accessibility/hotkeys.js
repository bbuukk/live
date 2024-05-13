import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDispatch } from 'react-redux'
import { toggle as toggleGlobalComponent } from 'store/slices/global_comps/global_comps.slice'
import { GLOBAL_COMPS } from 'store/slices/global_comps/global_comps.slice'
const {
  MAIN_OFFCANVAS,
  HOTKEYS_MODAL,
  SIGN_IN_MODAL,
  SIGN_UP_MODAL,
  CART_MODAL,
  // FILTER_OFFCANVAS,
  // CHANGE_PASSWORD_MODAL,
  // DELETE_ACCOUNT_MODAL,
  // WRITE_REVIEW_MODAL,
} = GLOBAL_COMPS

const CustomHotkeys = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  function toggle(compName) {
    dispatch(toggleGlobalComponent(compName))
  }

  function navigateTo(path) {
    router.push(path)
  }

  function focusOn(id) {
    const element = document.getElementById(id)
    if (element) {
      element.focus()
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //second hotkey is for ukrainian keyboard layout
  //general
  useHotkeys('shift+?, shift+.', () => toggle(HOTKEYS_MODAL), [dispatch])

  //navigation
  useHotkeys('g+h, п+р', () => navigateTo('/'))
  useHotkeys('g+u, п+г', () => navigateTo('/user/personal_data'))
  useHotkeys('g+w, п+ц', () => navigateTo('/user/wish_list'))
  useHotkeys('g+o, п+о', () => navigateTo('/user/orders_list'))

  useHotkeys('shift+c, shift+с', () => toggle(CART_MODAL), [dispatch])
  useHotkeys('alt+shift+i, alt+shift+ш', () => toggle(SIGN_IN_MODAL), [
    dispatch,
  ])
  useHotkeys('alt+shift+u, alt+shift+г', () => toggle(SIGN_UP_MODAL), [
    dispatch,
  ])
  useHotkeys('shift+o, shift+щ', () => toggle(MAIN_OFFCANVAS), [dispatch])
  // da
  //focus management
  useHotkeys('/, s', () => focusOn('search_bar_input'))
  useHotkeys('ctrl+m, сtrl+ь', () => focusOn('main_content'))

  //user
  useHotkeys('alt+shift+q', () => signOut({ callbackUrl: '/' }), [dispatch])

  //todo for landing page
  // Shopping Cart Shortcuts: These can help users manage their shopping cart.
  // ctrl + shift + a: Add selected product to the cart
  // ctrl + shift + r: Remove selected product from the cart
  // ctrl + shift + c: Clear the cart
  // Product Viewing Shortcuts: These can enhance the product viewing experience.
  // ctrl + →: View the next product image
  // ctrl + ←: View the previous product image
  // Accessibility Shortcuts: These can improve accessibility for users with disabilities.
  // alt + shift + p: Play product description audio
  // alt + shift + s: Stop product description audio
  // Miscellaneous Shortcuts: These can provide additional functionality.
  // ctrl + b: Bookmark a product
  // ctrl + shift + b: View bookmarked produc

  useState()
  const [text, setText] = useState('')
  function handleFocus(event) {
    setText(
      'Доступні гарячі клавіші. Щоб переглянути їх, натисніть комбінацію клавіш shift+? або просто натисніть клавішу Enter зараз.',
    )
  }

  return (
    <button
      className={`sr_only visible_on_focus`}
      onClick={() => toggle(HOTKEYS_MODAL)}
      onFocus={handleFocus}
      aria-live='assertive'
    >
      {text}
    </button>
  )
}

export default CustomHotkeys
