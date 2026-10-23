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

const mobileHeader = document.querySelector(".site-header");
const mobileViewport = window.matchMedia("(max-width: 760px)");
let lastMobileScroll = window.scrollY;

function updateMobileHeader() {
  if (!mobileHeader) return;
  if (!mobileViewport.matches) {
    mobileHeader.classList.remove("is-mobile-header-visible", "has-scrolled");
    return;
  }

  const currentScroll = window.scrollY;
  const menuIsOpen = menu?.classList.contains("is-open");
  const nearTop = currentScroll < 36;
  const movingUp = currentScroll < lastMobileScroll - 4;
  const movingDown = currentScroll > lastMobileScroll + 4;

  if (nearTop || movingUp || menuIsOpen) mobileHeader.classList.add("is-mobile-header-visible");
  if (movingDown && !menuIsOpen) mobileHeader.classList.remove("is-mobile-header-visible");
  mobileHeader.classList.toggle("has-scrolled", currentScroll > 8);
  lastMobileScroll = currentScroll;
}

window.addEventListener("scroll", updateMobileHeader, { passive: true });
mobileViewport.addEventListener("change", updateMobileHeader);
updateMobileHeader();

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

document.querySelectorAll(".review-tile").forEach((tile) => {
  tile.hidden = false;
  tile.addEventListener("click", () => {
    if (Date.now() < suppressReviewOpenUntil) return;
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
  let startY = 0;
  let startScrollLeft = 0;
  let dragged = false;
  let dragAxis = null;

  reviewsGallery.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = reviewsGallery.scrollLeft;
    dragged = false;
    dragAxis = null;
    reviewsGallery.setPointerCapture(pointerId);
  });

  reviewsGallery.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;

    if (!dragAxis) {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 8) return;
      dragAxis = Math.abs(distanceX) > Math.abs(distanceY) ? "horizontal" : "vertical";

      if (dragAxis === "vertical") {
        if (reviewsGallery.hasPointerCapture(pointerId)) reviewsGallery.releasePointerCapture(pointerId);
        pointerId = null;
        return;
      }

      reviewsGallery.classList.add("is-dragging");
    }

    if (dragAxis !== "horizontal") return;
    dragged = true;
    event.preventDefault();
    reviewsGallery.scrollLeft = startScrollLeft - distanceX;
  });

  const finishReviewDrag = (event) => {
    if (event.pointerId !== pointerId) return;
    if (dragged) suppressReviewOpenUntil = Date.now() + 180;
    if (reviewsGallery.hasPointerCapture(pointerId)) reviewsGallery.releasePointerCapture(pointerId);
    pointerId = null;
    dragAxis = null;
    reviewsGallery.classList.remove("is-dragging");
  };

  reviewsGallery.addEventListener("pointerup", finishReviewDrag);
  reviewsGallery.addEventListener("pointercancel", finishReviewDrag);
  reviewsGallery.addEventListener("scroll", updateReviewsControls, { passive: true });
  window.addEventListener("resize", updateReviewsControls);
  updateReviewsControls();
}

const worksGallery = document.querySelector("#works-gallery");
const worksPrevious = document.querySelector("#works-prev");
const worksNext = document.querySelector("#works-next");
const worksDialog = document.querySelector("#works-dialog");
const worksDialogImage = document.querySelector("#works-dialog-image");
const worksDialogZoomTarget = document.querySelector("#works-dialog-zoom-target");
const worksDialogClose = document.querySelector(".works-dialog-close");
const worksDialogCaption = document.querySelector("#works-dialog-caption");
const worksDialogViewport = document.querySelector("#works-dialog-viewport");
const worksZoomIn = document.querySelector("#works-zoom-in");
const worksZoomOut = document.querySelector("#works-zoom-out");
const worksZoomReset = document.querySelector("#works-zoom-reset");
let workZoom = 1;
let workMaxZoom = 1;
let workBaseWidth = 0;
let workBaseHeight = 0;
let suppressWorkOpenUntil = 0;

function worksScrollStep() {
  if (!worksGallery) return 0;
  return Math.max(worksGallery.clientWidth - 8, 260);
}

function updateWorksControls() {
  if (!worksGallery) return;
  const maxScroll = worksGallery.scrollWidth - worksGallery.clientWidth;
  if (worksPrevious) worksPrevious.disabled = worksGallery.scrollLeft <= 2;
  if (worksNext) worksNext.disabled = worksGallery.scrollLeft >= maxScroll - 2;
}

function setWorkZoom(zoom) {
  if (!worksDialogImage || !worksDialogViewport) return;
  const viewportRect = worksDialogViewport.getBoundingClientRect();
  const imageRect = worksDialogImage.getBoundingClientRect();
  const centerX = imageRect.width ? (viewportRect.left + worksDialogViewport.clientWidth / 2 - imageRect.left) / imageRect.width : 0.5;
  const centerY = imageRect.height ? (viewportRect.top + worksDialogViewport.clientHeight / 2 - imageRect.top) / imageRect.height : 0.5;
  workZoom = Math.min(workMaxZoom, Math.max(1, zoom));
  const width = workBaseWidth * workZoom;
  const height = workBaseHeight * workZoom;
  worksDialogImage.style.width = `${width}px`;
  worksDialogImage.style.height = `${height}px`;
  const resizedRect = worksDialogImage.getBoundingClientRect();
  worksDialogViewport.scrollLeft += resizedRect.left - viewportRect.left + centerX * width - worksDialogViewport.clientWidth / 2;
  worksDialogViewport.scrollTop += resizedRect.top - viewportRect.top + centerY * height - worksDialogViewport.clientHeight / 2;
  if (worksZoomIn) worksZoomIn.disabled = workZoom >= workMaxZoom - 0.001;
  if (worksZoomOut) worksZoomOut.disabled = workZoom <= 1;
  if (worksZoomReset) {
    worksZoomReset.textContent = `${Math.round(workZoom * 100)}%`;
    worksZoomReset.disabled = workZoom <= 1;
  }
  if (worksDialogZoomTarget) {
    worksDialogZoomTarget.disabled = workMaxZoom <= 1;
    worksDialogZoomTarget.setAttribute("aria-pressed", String(workZoom > 1));
    worksDialogZoomTarget.setAttribute("aria-label", workZoom > 1 ? "Вернуть исходный масштаб" : "Увеличить изображение");
  }
}

function fitWorkImage() {
  if (!worksDialog?.open || !worksDialogViewport || !worksDialogImage?.naturalWidth || !worksDialogImage.complete) return;
  const { naturalWidth, naturalHeight } = worksDialogImage;
  const availableWidth = Math.max(1, worksDialogViewport.clientWidth - 32);
  const availableHeight = Math.max(1, worksDialogViewport.clientHeight - 32);
  const fit = Math.min(1, availableWidth / naturalWidth, availableHeight / naturalHeight);
  workBaseWidth = naturalWidth * fit;
  workBaseHeight = naturalHeight * fit;
  // Keep zoom modest and never stretch a photo past its original resolution.
  workMaxZoom = Math.min(1.5, 1 / fit);
  setWorkZoom(workZoom);
  worksDialogImage.style.visibility = "visible";
}

function openWork(tile) {
  if (!worksDialog || worksDialog.open || !worksDialogImage || !worksDialogViewport) return;
  workZoom = 1;
  workMaxZoom = 1;
  workBaseWidth = 0;
  workBaseHeight = 0;
  worksDialogImage.style.visibility = "hidden";
  setWorkZoom(1);
  worksDialogImage.alt = tile.dataset.workAlt || tile.dataset.mediaAlt || "Работа Екатерины Саутиной";
  if (worksDialogCaption) {
    worksDialogCaption.textContent = tile.dataset.work
      ? `Работа ${tile.dataset.work} · стр. ${tile.dataset.page}`
      : tile.dataset.workAlt || tile.dataset.mediaAlt || "Просмотр работы";
  }
  worksDialogImage.src = tile.dataset.workSrc || tile.dataset.mediaSrc || "";
  worksDialog.showModal();
  document.documentElement.classList.add("work-viewer-open");
  worksDialogViewport.scrollTo(0, 0);
  fitWorkImage();
  worksDialogClose?.focus();
}

worksDialogImage?.addEventListener("load", fitWorkImage);
window.addEventListener("resize", fitWorkImage);
worksZoomIn?.addEventListener("click", () => setWorkZoom(workZoom + 0.25));
worksZoomOut?.addEventListener("click", () => setWorkZoom(workZoom - 0.25));
worksZoomReset?.addEventListener("click", () => setWorkZoom(1));
worksDialogZoomTarget?.addEventListener("click", () => {
  setWorkZoom(workZoom > 1 ? 1 : workMaxZoom);
});
worksDialog?.addEventListener("close", () => {
  document.documentElement.classList.remove("work-viewer-open");
});
document.addEventListener("keydown", (event) => {
  if (!worksDialog?.open || event.ctrlKey || event.metaKey || event.altKey) return;
  if (["+", "=", "-", "0"].includes(event.key)) {
    event.preventDefault();
    setWorkZoom(event.key === "0" ? 1 : workZoom + (["+", "="].includes(event.key) ? 0.25 : -0.25));
  }
});
document.querySelectorAll(".work-image-button, .presentation-tile").forEach((tile) => {
  tile.addEventListener("click", () => openWork(tile));
});

worksPrevious?.addEventListener("click", () => {
  worksGallery?.scrollBy({ left: -worksScrollStep(), behavior: "smooth" });
});

worksNext?.addEventListener("click", () => {
  worksGallery?.scrollBy({ left: worksScrollStep(), behavior: "smooth" });
});

if (worksGallery) {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let dragged = false;
  let dragAxis = null;

  worksGallery.addEventListener("pointerdown", (event) => {
    // Touch scrolling and taps are handled by the browser. Only mouse dragging
    // needs pointer capture; intercepting touch events can swallow image taps.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = worksGallery.scrollLeft;
    dragged = false;
    dragAxis = null;
  });

  worksGallery.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;

    if (!dragAxis) {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 8) return;
      dragAxis = Math.abs(distanceX) > Math.abs(distanceY) ? "horizontal" : "vertical";

      if (dragAxis === "vertical") {
        if (worksGallery.hasPointerCapture(pointerId)) worksGallery.releasePointerCapture(pointerId);
        pointerId = null;
        return;
      }

      worksGallery.classList.add("is-dragging");
      worksGallery.setPointerCapture(pointerId);
    }

    if (dragAxis !== "horizontal") return;
    dragged = true;
    event.preventDefault();
    worksGallery.scrollLeft = startScrollLeft - distanceX;
  });

  const finishWorkDrag = (event) => {
    if (event.pointerId !== pointerId) return;
    if (dragged) suppressWorkOpenUntil = Date.now() + 180;
    if (worksGallery.hasPointerCapture(pointerId)) worksGallery.releasePointerCapture(pointerId);
    pointerId = null;
    dragAxis = null;
    worksGallery.classList.remove("is-dragging");
  };

  worksGallery.addEventListener("pointerup", finishWorkDrag);
  worksGallery.addEventListener("pointercancel", finishWorkDrag);
  worksGallery.addEventListener("click", (event) => {
    if (Date.now() < suppressWorkOpenUntil) return;
    const tile = event.target.closest(".works-gallery-tile");
    if (tile) openWork(tile);
  });
  worksGallery.addEventListener("scroll", updateWorksControls, { passive: true });
  window.addEventListener("resize", updateWorksControls);
  updateWorksControls();
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

worksDialogClose?.addEventListener("click", () => worksDialog?.close());

worksDialog?.addEventListener("click", (event) => {
  if (event.target === worksDialog) worksDialog.close();
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
    // This is a gentle reminder, not a blocking dialog: a modal dialog prevents
    // the whole document from responding to the mouse wheel on desktop.
    orderPrompt.show();
    markPromptShown();
    orderPromptClose?.focus();
  }, 20000);
}

orderPromptClose?.addEventListener("click", closeOrderPrompt);
orderPromptLater?.addEventListener("click", closeOrderPrompt);
orderPromptOrder?.addEventListener("click", closeOrderPrompt);

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
