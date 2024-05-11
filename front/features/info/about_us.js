import s from './about_us.module.scss'

import { PetsRounded, YardRounded } from '@mui/icons-material'

export const AboutUs = () => {
  return (
    <article className={`${s.about_us}`}>
      <h3 className={`${s.motto}`}>
        <div className={`${s.syms}`}>
          <PetsRounded />
          <YardRounded />
        </div>
        <span>
          <strong>Живий світ</strong> − це більше, ніж просто інтернет-магазин.
        </span>
      </h3>
      <p>
        <br /> З 2023 року ми допомагаємо вам дбати про ваших чотирилапих
        друзів, надаючи широкий асортимент товарів для домашніх тварин, саду,
        городу та товарів для дому.
      </p>
      <p>
        Наша місія − зробити ваше життя та життя ваших улюбленців здоровішим,
        щасливішим і зручнішим. Ми пропонуємо тільки найкращі товари, які
        відповідають найвищим стандартам якості та безпеки.
      </p>
      {/* <div class="statistics">
        <div class="stat-item">
          <h3>1.2 млн</h3>
          <p>товарів доступних до покупки</p>
        </div>
        <div class="stat-item">
          <h3>500 тис.</h3>
          <p>користувачів відвідали нас у 2024 році</p>
        </div>
        <div class="stat-item">
          <h3>89%</h3>
          <p>наших покупців повертаються</p>
        </div>
        <div class="stat-item">
          <h3>3 млн</h3>
          <p>відвідувачів в місяць</p>
        </div>
      </div> */}
      <p>
        Ми прагнемо бути вашим надійним помічником у догляді за домашніми
        тваринами, надаючи зручність і доступність у кожній покупці.
      </p>
    </article>
  )
}

export default AboutUs