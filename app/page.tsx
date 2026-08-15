"use client";

import { FormEvent, useState } from "react";

const instagram = "https://www.instagram.com/stihamiudivi/";

const services = [
  {
    number: "01",
    title: "Стихотворение по вашей истории",
    text: "Для тех, кому важнее всего сказать по-настоящему. О любви, семье, благодарности, пути и людях, которых хочется бережно увидеть в словах.",
    tag: "Личный подарок",
  },
  {
    number: "02",
    title: "Небанальное поздравление",
    text: "День рождения, юбилей, свадьба, профессиональный праздник или важное «спасибо». Поздравление, которое останется не только в моменте.",
    tag: "Для близких и коллег",
  },
  {
    number: "03",
    title: "Стихопортрет и арт-декор",
    text: "Слова получают форму: стихопортрет, арт-сердце или предмет декора. Подарок, который наполняет пространство личным смыслом.",
    tag: "Вещь с историей",
  },
];

const process = [
  ["01", "Вы рассказываете", "Поделитесь человеком, поводом и деталями — голосом, заметками или как вам удобно."],
  ["02", "Я вслушиваюсь", "Нахожу характер, важные образы и ту самую интонацию, за которую хочется держаться."],
  ["03", "История становится подарком", "Вы получаете произведение, в котором можно узнать себя, близкого человека или ваш общий путь."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Стихами удиви — на главную">
          <span>Стихами</span><i>удиви</i><b>✦</b>
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Основная навигация">
          <a onClick={() => setMenuOpen(false)} href="#services">Что создаю</a>
          <a onClick={() => setMenuOpen(false)} href="#process">Как это будет</a>
          <a onClick={() => setMenuOpen(false)} href="#about">О проекте</a>
          <a className="nav-cta" href="#request" onClick={() => setMenuOpen(false)}>Обсудить подарок</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Авторские стихи и подарки по личным историям</p>
          <h1>Слова, в которых<br /><em>узнают себя.</em></h1>
          <p className="hero-lead">Создаю стихи, поздравления и предметы декора, чтобы важное не осталось несказанным.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#request">Рассказать историю <span>↗</span></a>
            <a className="text-link" href="#services">Посмотреть, что можно подарить <span>↓</span></a>
          </div>
          <p className="hero-note"><span>✦</span> Личное внимание к каждой истории</p>
        </div>
        <div className="hero-image-wrap" aria-label="Рукописное письмо, лилия, перо и арт-сердце">
          <img className="hero-image" src="/images/poetry-hero.png" alt="Рукописное письмо, лилия, перо и арт-сердце на светлом столе" />
          <div className="image-caption"><span>✒</span> Не просто подарок<br />— ваша история в форме искусства</div>
          <div className="hero-arc">для тех, кто чувствует глубоко · для тех, кто помнит детали · </div>
        </div>
      </section>

      <section className="intro section-shell">
        <div className="intro-mark">“</div>
        <div>
          <p className="eyebrow">Когда привычных слов недостаточно</p>
          <h2>Самые дорогие подарки<br />говорят: <em>«я тебя вижу».</em></h2>
        </div>
        <p className="intro-copy">Не открытка с готовой фразой, а тёплое произведение о человеке. О его особенностях, ваших воспоминаниях, смешных мелочах и том, за что вы его любите.</p>
      </section>

      <section id="services" className="services section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Создаю для ваших важных поводов</p>
            <h2>Смысл можно<br /><em>подарить.</em></h2>
          </div>
          <p>От камерного четверостишия до подарка, который станет частью дома. Выберем форму, которая подходит именно вашей истории.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <p className="service-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#request" aria-label={`Заказать ${service.title}`}>Обсудить идею <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="process">
        <div className="section-shell process-inner">
          <div className="process-title">
            <p className="eyebrow">Как рождается ваш подарок</p>
            <h2>Берегу детали.<br /><em>Нахожу слова.</em></h2>
            <p>Не нужно уметь красиво рассказывать. Достаточно быть собой и вспомнить то, что вам дорого.</p>
          </div>
          <ol className="process-list">
            {process.map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="about" className="about section-shell">
        <div className="about-orbit" aria-hidden="true"><span>С</span><span>И</span><span>Л</span><span>А</span><span>Л</span><span>И</span><span>Ч</span><span>Н</span><span>О</span><span>Й</span><span>И</span><span>С</span><span>Т</span><span>О</span><span>Р</span><span>И</span><span>И</span></div>
        <div className="about-content">
          <p className="eyebrow">Стихами удиви</p>
          <h2>Я — Екатерина Саутина,<br />и я верю, что слова<br /><em>сближают.</em></h2>
          <p>Я пишу стихи и поздравления по личным историям, создаю стихопортреты, арт-сердца и декор. В моём внимании к человеку соединяются любовь к генеалогии, интерес к психологии и умение услышать то, что обычно остаётся между строк.</p>
          <a className="text-link" href={instagram} target="_blank" rel="noreferrer">Заглянуть в Instagram <span>↗</span></a>
        </div>
      </section>

      <section id="request" className="request section-shell">
        <div className="request-card">
          <div className="request-copy">
            <p className="eyebrow">Первый шаг — без обязательств</p>
            <h2>Расскажите<br />немного <em>о важном.</em></h2>
            <p>Оставьте пару строк — я подскажу, какой формат лучше передаст вашу идею.</p>
            <a href={instagram} target="_blank" rel="noreferrer" className="instagram-link"><span>◎</span> @stihamiudivi <i>↗</i></a>
          </div>
          {submitted ? (
            <div className="success-message" role="status">
              <span>✦</span>
              <h3>Спасибо за вашу историю!</h3>
              <p>В демо-версии сайта форма показывает сценарий заявки. Для настоящего диалога напишите Екатерине в Instagram — кнопка слева уже ведёт в профиль.</p>
              <button type="button" onClick={() => setSubmitted(false)}>Рассказать ещё одну историю</button>
            </div>
          ) : (
            <form className="request-form" onSubmit={submitRequest}>
              <label>Как к вам обращаться?<input name="name" required placeholder="Ваше имя" /></label>
              <label>Для кого и по какому поводу?<input name="occasion" required placeholder="Например: маме на юбилей" /></label>
              <label>Что вам особенно хочется передать?<textarea name="story" required rows={4} placeholder="Пару тёплых деталей — этого достаточно для первого разговора" /></label>
              <button className="button button-primary" type="submit">Отправить историю <span>↗</span></button>
              <p>Нажимая кнопку, вы отправляете только демо-заявку. В рабочей версии она будет приходить Екатерине.</p>
            </form>
          )}
        </div>
      </section>

      <footer className="site-footer section-shell">
        <a className="brand" href="#top"><span>Стихами</span><i>удиви</i><b>✦</b></a>
        <p>Подарки, которые остаются в памяти<br />и в сердце.</p>
        <a href={instagram} target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
        <small>© {new Date().getFullYear()} Екатерина Саутина</small>
      </footer>
    </main>
  );
}
