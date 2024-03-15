const WorkHours = () => {
  return (
    <section>
      <h2>
        <i className="bi bi-clock-fill"></i>
        <span>Коли працюємо?</span>
      </h2>

      <dl>
        <dt>Понеділок - Неділя</dt>
        <dd>
          <time dateTime="08:00">з 8:00</time>
          <time dateTime="18:00"> до 18:00</time>
        </dd>
      </dl>
    </section>
  );
};

export default WorkHours;
