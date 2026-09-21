const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Открыть меню");
    });
  });
}

const orderForm = document.querySelector("#order-form");
const successPanel = document.querySelector("#form-success");
const newOrderButton = document.querySelector("#new-order");
const dateInput = document.querySelector('input[name="date"]');

if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

async function copyOrder(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const fallback = document.createElement("textarea");
  fallback.value = text;
  fallback.setAttribute("readonly", "");
  fallback.style.position = "fixed";
  fallback.style.opacity = "0";
  document.body.append(fallback);
  fallback.select();
  document.execCommand("copy");
  fallback.remove();
}

if (orderForm && successPanel) {
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(orderForm);
    const request = [
      "Здравствуйте, Екатерина! Хочу заказать стихотворение.",
      "",
      "Имя: " + data.get("name"),
      "Контакт: " + data.get("contact"),
      "Повод: " + data.get("occasion"),
      "Желаемая дата: " + (data.get("date") || "не указана"),
      "Удобный способ оплаты: " + data.get("payment"),
      "",
      "Моя история:",
      String(data.get("story")).trim(),
    ].join("\n");

    try {
      await copyOrder(request);
      orderForm.hidden = true;
      successPanel.hidden = false;
      successPanel.querySelector("a")?.focus();
    } catch {
      window.alert("Не удалось скопировать заявку автоматически. Пожалуйста, напишите Екатерине в Instagram.");
    }
  });
}

newOrderButton?.addEventListener("click", () => {
  successPanel.hidden = true;
  orderForm.hidden = false;
  orderForm.reset();
  orderForm.querySelector("input")?.focus();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
