import s from './star_icon.module.scss'

const StarIcon = ({ id, starValue }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className={`bi bi-star-fill ${s.star}`}
      viewBox='0 0 16 16'
    >
      <defs>
        <linearGradient id={id} x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop
            offset={`${starValue * 100}%`}
            style={{ stopColor: 'orange', stopOpacity: 1 }}
          />
          <stop
            offset={`${starValue * 100}%`}
            style={{ stopColor: 'lightgrey', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'
        fill={`url(#${id})`}
      />
    </svg>
  )
}

export default StarIcon
