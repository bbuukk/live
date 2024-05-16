import { Modal } from 'react-bootstrap'
import s from './cart_modal.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CART_MODAL } = GLOBAL_COMPS

import { balsamiqSans } from 'pages/_app'

import { useEffect, useMemo, useRef, useState } from 'react'

import CartItem from './cart_item/cart_item'
import Image from 'next/image'

import useTabTrap from 'comps/accessibility/hooks/useTabbingTrap'

const CartModal = () => {
  const dispatch = useDispatch()
  const { cartModalOpen } = useSelector((state) => state.modals)
  const { user } = useSelector((state) => state.user)

  const [cartItems, setCartItems] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  const cart = useMemo(() => user?.cart, [user?.cart])

  useTabTrap(cartModalOpen, 'cartModal')

  //todo set cart items and total cost to localStorage on signOut
  useEffect(() => {
    if (cart) {
      setCartItems(cart)
      const totalCost = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      )
      setTotalCost(totalCost)
    }
  }, [cart])

  const handleBuy = async (e, value) => {}

  return (
    <Modal
      id='cartModal'
      show={cartModalOpen}
      onHide={() => dispatch(toggle(CART_MODAL))}
      centered
      fullscreen='lg-down'
      size='xl'
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className={`${s.modal_header}`}>
        <h3>Кошик покупок</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        {cartItems.length === 0 ? (
          <div className={`${s.empty_cart}`}>
            <Image
              src='/assets/empty_cart.svg'
              alt='Empty cart'
              width={200}
              height={200}
            />
            <p>Кошик поки що порожній</p>
          </div>
        ) : (
          <>
            {cartItems.map(({ product, quantity }) => {
              return (
                <CartItem
                  key={product._id}
                  product={product}
                  quantity={quantity}
                />
              )
            })}

            <footer>
              <p className={`${s.total_cost} price`}>
                <span>{`Всього:`}</span>
                {totalCost}
                <span>₴</span>
              </p>

              <menu className={`${s.controls}`}>
                <li>
                  <button
                    className={`button_primary`}
                    onClick={() => dispatch(toggle(CART_MODAL))}
                  >
                    Продовжити покупки
                  </button>
                </li>

                <li>
                  <button
                    className={`button_submit ${s.order_btn}`}
                    onClick={handleBuy}
                  >
                    Оформити замовлення
                  </button>
                </li>
              </menu>
            </footer>
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default CartModal
