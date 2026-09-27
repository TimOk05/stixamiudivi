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

const quickMenuButton = document.querySelector("#mobile-quick-button");
const quickMenu = document.querySelector("#mobile-quick-nav");

function closeQuickMenu() {
  if (!quickMenuButton || !quickMenu) return;
  quickMenu.classList.remove("is-open");
  quickMenuButton.setAttribute("aria-expanded", "false");
}

if (quickMenuButton && quickMenu) {
  quickMenuButton.addEventListener("click", () => {
    const isOpen = quickMenu.classList.toggle("is-open");
    quickMenuButton.setAttribute("aria-expanded", String(isOpen));
  });

  quickMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeQuickMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeQuickMenu();
  });
}

const reviewDialog = document.querySelector("#review-dialog");
const reviewDialogImage = document.querySelector("#review-dialog-image");
const reviewDialogClose = document.querySelector(".review-dialog-close");

function openGalleryItem(tile) {
  if (!reviewDialog || !reviewDialogImage) return;
  reviewDialogImage.src = tile.dataset.mediaSrc || tile.dataset.reviewSrc || "";
  reviewDialogImage.alt = tile.dataset.mediaAlt || tile.dataset.reviewAlt || "Изображение";
  reviewDialog.showModal();
  reviewDialogClose?.focus();
}

const presentationGallery = document.querySelector("#presentation-gallery");

if (presentationGallery) {
  const items = Array.from({ length: 34 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const label = `Пример оформления ${index + 1}`;
    const src = `public/formatting/formatting-${number}.jpg`;
    return `<button class="presentation-tile" type="button" data-media-src="${src}" data-media-alt="${label}" aria-label="Открыть ${label.toLowerCase()}"><img src="${src}" alt="${label}" loading="lazy"></button>`;
  });
  presentationGallery.innerHTML = items.join("");
}

document.querySelectorAll(".review-tile, .presentation-tile").forEach((tile) => {
  if (tile.classList.contains("review-tile")) tile.hidden = false;
  tile.addEventListener("click", () => {
    if (tile.classList.contains("review-tile") && Date.now() < suppressReviewOpenUntil) return;
    openGalleryItem(tile);
  });
});

const reviewsGallery = document.querySelector("#reviews-gallery");
const reviewsPrevious = document.querySelector("#reviews-prev");
const reviewsNext = document.querySelector("#reviews-next");
let suppressReviewOpenUntil = 0;

function reviewScrollStep() {
  if (!reviewsGallery) return 0;
  return Math.max(reviewsGallery.clientWidth - 8, 260);
}

function updateReviewsControls() {
  if (!reviewsGallery) return;
  const maxScroll = reviewsGallery.scrollWidth - reviewsGallery.clientWidth;
  if (reviewsPrevious) reviewsPrevious.disabled = reviewsGallery.scrollLeft <= 2;
  if (reviewsNext) reviewsNext.disabled = reviewsGallery.scrollLeft >= maxScroll - 2;
}

reviewsPrevious?.addEventListener("click", () => {
  reviewsGallery?.scrollBy({ left: -reviewScrollStep(), behavior: "smooth" });
});

reviewsNext?.addEventListener("click", () => {
  reviewsGallery?.scrollBy({ left: reviewScrollStep(), behavior: "smooth" });
});

if (reviewsGallery) {
  let pointerId = null;
  let startX = 0;
  let startScrollLeft = 0;
  let dragged = false;

  reviewsGallery.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = reviewsGallery.scrollLeft;
    dragged = false;
    reviewsGallery.setPointerCapture(pointerId);
    reviewsGallery.classList.add("is-dragging");
  });

  reviewsGallery.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 4) dragged = true;
    if (!dragged) return;
    event.preventDefault();
    reviewsGallery.scrollLeft = startScrollLeft - distance;
  });

  const finishReviewDrag = (event) => {
    if (event.pointerId !== pointerId) return;
    if (dragged) suppressReviewOpenUntil = Date.now() + 180;
    if (reviewsGallery.hasPointerCapture(pointerId)) reviewsGallery.releasePointerCapture(pointerId);
    pointerId = null;
    reviewsGallery.classList.remove("is-dragging");
  };

  reviewsGallery.addEventListener("pointerup", finishReviewDrag);
  reviewsGallery.addEventListener("pointercancel", finishReviewDrag);
  reviewsGallery.addEventListener("scroll", updateReviewsControls, { passive: true });
  window.addEventListener("resize", updateReviewsControls);
  updateReviewsControls();
}

const motionTargets = Array.from(document.querySelectorAll("main > .section, .verse-section"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const heroCaption = document.querySelector(".hero-caption");

if (heroCaption && !reducedMotion.matches) {
  const captionLines = ["Ваши чувства — в словах,", "которые хочется хранить."];
  heroCaption.textContent = "";
  heroCaption.classList.add("is-typing");
  let lineIndex = 0;
  let characterIndex = 0;

  const typeCaption = () => {
    const activeLine = captionLines[lineIndex];
    if (characterIndex < activeLine.length) {
      heroCaption.append(activeLine[characterIndex]);
      characterIndex += 1;
      window.setTimeout(typeCaption, 34);
      return;
    }
    if (lineIndex < captionLines.length - 1) {
      heroCaption.append(document.createElement("br"));
      lineIndex += 1;
      characterIndex = 0;
      window.setTimeout(typeCaption, 160);
      return;
    }
    window.setTimeout(() => heroCaption.classList.remove("is-typing"), 900);
  };

  window.setTimeout(typeCaption, 780);
}

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  motionTargets.forEach((target) => target.classList.add("is-revealed"));
} else {
  motionTargets.forEach((target) => target.classList.add("motion-reveal"));
  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  motionTargets.forEach((target) => motionObserver.observe(target));
}

reviewDialogClose?.addEventListener("click", () => reviewDialog?.close());

reviewDialog?.addEventListener("click", (event) => {
  if (event.target === reviewDialog) reviewDialog.close();
});

async function copyText(text) {
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

document.querySelectorAll(".payment-copy").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copy || "");
      const hint = button.querySelector("i");
      if (!hint) return;
      const initialText = hint.textContent;
      hint.textContent = "Скопировано";
      window.setTimeout(() => {
        hint.textContent = initialText;
      }, 1800);
    } catch {
      window.alert("Не удалось скопировать номер автоматически. Пожалуйста, скопируйте его вручную.");
    }
  });
});

const orderPrompt = document.querySelector("#order-prompt");
const orderPromptClose = document.querySelector("#order-prompt-close");
const orderPromptLater = document.querySelector("#order-prompt-later");
const orderPromptOrder = document.querySelector("#order-prompt-order");

function closeOrderPrompt() {
  if (orderPrompt?.open) orderPrompt.close();
}

function promptAlreadyShown() {
  try {
    return sessionStorage.getItem("stihamiudivi-order-prompt") === "shown";
  } catch {
    return false;
  }
}

function markPromptShown() {
  try {
    sessionStorage.setItem("stihamiudivi-order-prompt", "shown");
  } catch {
    // The prompt still works if browser storage is unavailable.
  }
}

if (orderPrompt && !promptAlreadyShown()) {
  window.setTimeout(() => {
    if (orderPrompt.open) return;
    orderPrompt.showModal();
    markPromptShown();
    orderPromptClose?.focus();
  }, 20000);
}

orderPromptClose?.addEventListener("click", closeOrderPrompt);
orderPromptLater?.addEventListener("click", closeOrderPrompt);
orderPromptOrder?.addEventListener("click", closeOrderPrompt);

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
