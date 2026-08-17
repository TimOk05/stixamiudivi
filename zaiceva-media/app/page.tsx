const instagramUrl =
  "https://www.instagram.com/zaiceva.media?igsh=OGZ2cTMybms4eGcz";

const services = [
  {
    number: "01",
    title: "Video production",
    text: "Реклама, презентации, клипы, интервью и видео для бизнеса — от идеи до финального кадра.",
    tags: ["Реклама", "Презентации", "Клипы"],
  },
  {
    number: "02",
    title: "Подкасты и YouTube",
    text: "Пространство, свет, звук и команда, с которой в кадре можно говорить уверенно и по делу.",
    tags: ["Подкасты", "Интервью", "Курсы"],
  },
  {
    number: "03",
    title: "Контент для соцсетей",
    text: "Reels, TikTok и YouTube Shorts, которые выглядят цельно и держат внимание с первых секунд.",
    tags: ["Reels", "TikTok", "Shorts"],
  },
  {
    number: "04",
    title: "Сценарий и монтаж",
    text: "Распаковываем профиль, находим сильную подачу и собираем историю, которую хочется досмотреть.",
    tags: ["Сценарий", "Монтаж", "Упаковка"],
  },
];

const formats = [
  {
    kind: "01",
    title: "Подкаст",
    text: "Разговор, который звучит как ваше медиа.",
  },
  {
    kind: "02",
    title: "Видео для бизнеса",
    text: "Смысл, динамика и картинка для доверия к бренду.",
  },
  {
    kind: "03",
    title: "Reels / Shorts",
    text: "Вертикальные форматы, созданные для темпа ленты.",
  },
  {
    kind: "04",
    title: "Онлайн-курс",
    text: "Экспертность в кадре — ясно, чисто, убедительно.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="Главная навигация">
          <a className="brand" href="#top" aria-label="Zaiceva Media — главная">
            <span className="brand-mark">ZM</span>
            <span className="brand-copy">
              ZAICEVA <em>MEDIA</em>
            </span>
          </a>

          <div className="nav-links">
            <a href="#services">Услуги</a>
            <a href="#formats">Форматы</a>
            <a href="#process">Процесс</a>
          </div>

          <a className="nav-cta" href="#contact">
            Записаться <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow">МИНСК · VIDEO PRODUCTION &amp; PODCAST STUDIO</p>
            <h1>
              Идеи, которые
              <span>звучат и выглядят</span>
              профессионально.
            </h1>
            <p className="hero-text">
              Подкасты, YouTube, Reels, реклама и курсы — снимаем под ключ,
              чтобы ваш голос, продукт и команда стали заметнее.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Обсудить съёмку <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-quiet" href="#services">
                Смотреть возможности <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Подкаст-студия Zaiceva Media">
            <div className="hero-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/zaiceva-hero.png"
                alt="Кинематографичная подкаст-студия с камерой, микрофоном и красным креслом"
                className="hero-image"
              />
              <div className="hero-image-shade" />
              <span className="shot-label">REC&nbsp; 01:27</span>
              <span className="shot-corner shot-corner-top" aria-hidden="true" />
              <span className="shot-corner shot-corner-bottom" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="hero-meta shell" aria-label="Ключевые преимущества">
          <div>
            <strong>8</strong>
            <span>уникальных локаций</span>
          </div>
          <div>
            <strong>FULL</strong>
            <span>production под ключ</span>
          </div>
          <div>
            <strong>01—01</strong>
            <span>внимание к каждой задаче</span>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Форматы производства">
        <div className="ticker-track">
          <span>ПОДКАСТЫ</span><i>✦</i><span>REELS</span><i>✦</i>
          <span>YOUTUBE</span><i>✦</i><span>РЕКЛАМА</span><i>✦</i>
          <span>КУРСЫ</span><i>✦</i><span>ПОДКАСТЫ</span><i>✦</i>
          <span>REELS</span><i>✦</i><span>YOUTUBE</span><i>✦</i>
        </div>
      </section>

      <section className="services section shell" id="services">
        <div className="section-lead">
          <p className="eyebrow">01 / ВОЗМОЖНОСТИ</p>
          <h2>Не просто снять.<br />Сделать вас <span>видимыми.</span></h2>
          <p>
            Берём на себя техническую часть и творческую логику, чтобы вы
            могли сфокусироваться на главном — своей идее и людях в кадре.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement">
        <div className="shell statement-inner">
          <p className="eyebrow">ZAICEVA MEDIA / ВАШ КАДР</p>
          <p className="statement-copy">
            Камера — это не давление.<br />
            <span>Это место, где вашу идею услышат.</span>
          </p>
          <a className="text-link" href="#contact">
            Хочу в кадр <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="formats section shell" id="formats">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">02 / ВЫБИРАЕМ ФОРМАТ</p>
            <h2>От одного кадра<br />до своего медиа.</h2>
          </div>
          <p>
            Не нужно приходить с готовым сценарием. Начнём с задачи —
            предложим формат, локацию и понятный план съёмки.
          </p>
        </div>

        <div className="formats-grid">
          {formats.map((format) => (
            <article className={`format-card format-card-${format.kind}`} key={format.kind}>
              <div className="format-no">{format.kind}</div>
              <div className="format-art" aria-hidden="true">
                <span className="format-art-line" />
                <span className="format-art-dot" />
              </div>
              <div>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
              </div>
              <span className="format-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="process section" id="process">
        <div className="shell process-grid">
          <div className="process-intro">
            <p className="eyebrow">03 / КАК МЫ РАБОТАЕМ</p>
            <h2>В кадре — легко.<br />За кадром — всё<br /><span>под контролем.</span></h2>
            <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">
              Написать в Direct <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>Знакомимся с задачей</h3>
                <p>Обсуждаем цель, аудиторию, площадку и тот самый результат, который нужен бизнесу.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Собираем съёмку</h3>
                <p>Помогаем с форматом, сценарием, локацией, техникой и комфортом каждого в кадре.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Доводим до выхода</h3>
                <p>Монтируем, адаптируем под платформы и отдаём материал, который хочется публиковать.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="about section shell">
        <div className="about-card">
          <div className="about-sign">Z<span>M</span></div>
          <div className="about-copy">
            <p className="eyebrow">О СТУДИИ</p>
            <h2>Техника — это база.<br />Важнее, чтобы<br /><span>вам было спокойно.</span></h2>
            <p>
              Zaiceva Media — студия Виктории Зайцевой для людей и команд,
              которым есть что сказать. Здесь можно записать курс, снять
              рекламу, запустить подкаст или наконец показать себя в кадре
              уверенно.
            </p>
            <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">
              Смотреть студию в Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="contact-panel">
          <p className="eyebrow">ВАШ ПРОЕКТ УЖЕ МОЖНО ПРЕДСТАВИТЬ</p>
          <h2>Ждём вас<br />в <span>объективе камеры.</span></h2>
          <p>
            Расскажите, что хотите снять — в Direct обсудим формат, дату и
            как превратить задачу в сильное видео.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href={instagramUrl} target="_blank" rel="noreferrer">
              Написать Zaiceva Media <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-quiet" href="#top">Наверх <span aria-hidden="true">↑</span></a>
          </div>
          <div className="contact-signal"><span /> ONLINE / DIRECT</div>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top">
          <span className="brand-mark">ZM</span>
          <span className="brand-copy">ZAICEVA <em>MEDIA</em></span>
        </a>
        <p>Подкаст-студия · Видео-продакшн · Минск</p>
        <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
      </footer>
    </main>
  );
}
