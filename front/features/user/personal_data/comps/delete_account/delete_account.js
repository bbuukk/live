import s from './delete_account.module.scss'
import card_s from './../card.module.scss'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { DeleteOutlineRounded } from '@mui/icons-material'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { DELETE_ACCOUNT_MODAL } = GLOBAL_COMPS

const DeleteAccount = () => {
  const dispatch = useDispatch()

  return (
    <Card className={`${card_s.card}`}>
      <Card.Header className={`${card_s.header} ${s.header}`}>
        <DeleteOutlineRounded />
        <h5>Видалити акаунт</h5>
      </Card.Header>
      <Card.Body className={`${card_s.body} ${s.body}`}>
        <p>
          Якщо ви видалите свій обліковий запис, повернути його назад неможливо.
          Будь ласка, будьте впевненими.
        </p>
        <button
          className='button_danger'
          onClick={() => {
            //todo delete account
            dispatch(toggle(DELETE_ACCOUNT_MODAL))
            // signOut({ callbackUrl: "/" });
          }}
        >
          Видалити акаунт
        </button>
      </Card.Body>
    </Card>
  )
}

export default DeleteAccount
