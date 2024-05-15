import s from './checkbox.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'

const CheckBox = ({ id, label, checked, handleChange }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleCheck(!isChecked)
    }
  }

  const toggleCheck = () => {
    dispatch(startLoading())
    handleChange(!isChecked, label)
    setIsChecked(!isChecked)
  }

  return (
    <label htmlFor={id} className={`form-check ${s.form_check}`}>
      <input
        className={`form-check-input ${isChecked ? s.active : ''}`}
        type='checkbox'
        checked={isChecked}
        onChange={toggleCheck}
        onKeyDown={handleKeyDown}
        id={id}
      />
      <span className='form-check-label'>{label}</span>
    </label>
  )
}

export default CheckBox
