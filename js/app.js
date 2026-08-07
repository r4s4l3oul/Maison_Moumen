const MAX_VISIBLE_TESTIMONIALS = 4;
const FILLED_STAR = "★";

const products = [
  {
    id: 1,
    name: "Caftan 1",
    description: "Broderies dorées, tissu fluide et coupe sophistiquée.",
    price: "89 €",
    tag: "Sale",
    image: "../images/caftan8.png",
    hoverImage: "../images/caftan8b.png",
  },
  {
    id: 2,
    name: "Caftan 2",
    description:
      "Coupe élégante et détails luxueux pour une allure distinguée.",
    price: "169 €",
    tag: "Nouveau",
    image: "../images/caftan3.png",
    hoverImage: "../images/caftan3b.png",
  },
  {
    id: 3,
    name: "Caftan 3",
    description:
      "Confort noble et design élégant pour les grandes occasions.",
    price: "95 €",
    tag: "Édition limitée",
    image: "../images/caftan4.png",
    hoverImage: "../images/caftan4b.png",
  },
  {
    id: 4,
    name: "Caftan 4",
    description:
      "Coupe élégante et détails luxueux pour une allure distinguée.",
    price: "59 €",
    tag: "Édition limitée",
    image: "../images/caftan2.png",
    hoverImage: "../images/caftan1.png",
  },
  {
    id: 5,
    name: "Caftan 1",
    description: "Broderies dorées, tissu fluide et coupe sophistiquée.",
    price: "89 €",
    tag: "Sale",
    image: "../images/caftan8.png",
    hoverImage: "../images/caftan8b.png",
  },
  {
    id: 6,
    name: "Caftan 2",
    description:
      "Coupe élégante et détails luxueux pour une allure distinguée.",
    price: "169 €",
    tag: "Nouveau",
    image: "../images/caftan3.png",
    hoverImage: "../images/caftan3b.png",
  },
];

const testimonials = [
  {
    image: "../images/caftan1.png",
    text:
      "Gorgeous dress, looks like a princess — quality is superb! Will definitely order again.",
    author: "— Amani T.",
    stars: "★★★★★",
  },
  {
    image: "../images/caftan2.png",
    text:
      "Livraison rapide et soignée, le tissu est encore mieux en vrai.",
    author: "— Sara L.",
    stars: "★★★★★",
  },
  {
    image: "../images/caftan3.png",
    text: "Coupe parfaite, très satisfaite du service client.",
    author: "— Rania B.",
    stars: "★★★★☆",
  },
  {
    image: "../images/caftan4.png",
    text:
      "Les finitions sont incroyables, je recommande chaudement.",
    author: "— Leïla M.",
    stars: "★★★★★",
  },
  {
    image: "../images/caftan5.png",
    text:
      "Taille fidèle et très confortable, idéal pour les fêtes.",
    author: "— Yasmine A.",
    stars: "★★★★☆",
  },
];

/**
 * Crée une carte produit complète.
 *
 * @param {Object} product Produit à afficher.
 * @returns {HTMLElement} Carte produit générée.
 */
function createProductCard(product) {
  const article = document.createElement("article");

  article.className = "product-card";
  article.dataset.productId = String(product.id);

  if (product.image) {
    const image = document.createElement("img");

    article.classList.add("has-image");

    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.decoding = "async";

    if (product.hoverImage) {
      image.dataset.hoverSrc = product.hoverImage;
    }

    article.append(image);
  }

  const body = document.createElement("div");
  const meta = document.createElement("div");
  const tag = document.createElement("span");
  const price = document.createElement("span");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  body.className = "product-card-body";
  meta.className = "meta";

  tag.textContent = product.tag;
  price.textContent = product.price;
  title.textContent = product.name;
  description.textContent = product.description;

  meta.append(tag, price);
  body.append(meta, title, description);
  article.append(body);

  return article;
}

/**
 * Affiche la liste des produits dans #product-list.
 *
 * @param {Array<Object>} items Produits à afficher.
 */
function renderProducts(items) {
  const productList = document.getElementById("product-list");

  if (!productList) {
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((product) => {
    fragment.append(createProductCard(product));
  });

  productList.replaceChildren(fragment);
}

/**
 * Initialise le changement d’image au survol des cartes produits.
 */
function initProductImageHover() {
  const images = document.querySelectorAll(
    ".product-image[data-hover-src]"
  );

  images.forEach((image) => {
    const originalSrc = image.getAttribute("src");
    const hoverSrc = image.dataset.hoverSrc;

    if (!originalSrc || !hoverSrc) {
      return;
    }

    image.addEventListener("mouseenter", () => {
      image.src = hoverSrc;
    });

    image.addEventListener("mouseleave", () => {
      image.src = originalSrc;
    });
  });
}

/**
 * Supprime le tiret long placé devant le nom d’une cliente.
 *
 * @param {string} author Auteur complet.
 * @returns {string} Nom nettoyé.
 */
function getCustomerName(author) {
  return author.replace(/^—\s*/, "");
}

/**
 * Compte le nombre d’étoiles pleines.
 *
 * @param {string} stars Chaîne représentant la note.
 * @returns {number} Nombre d’étoiles pleines.
 */
function countFilledStars(stars) {
  return [...stars].filter(
    (star) => star === FILLED_STAR
  ).length;
}

/**
 * Initialise la galerie des avis clients.
 */
function initTestimonialGallery() {
  const slider = document.getElementById("testimonialGallery");

  if (!slider || testimonials.length === 0) {
    return;
  }

  const track = slider.querySelector(".testimonial-images-track");
  const previousButton = slider.querySelector(".gallery-nav.prev");
  const nextButton = slider.querySelector(".gallery-nav.next");
  const textElement = slider.querySelector(".testimonial-text");
  const authorElement = slider.querySelector(".testimonial-author");
  const starsElement = slider.querySelector(".stars");

  if (
    !track ||
    !previousButton ||
    !nextButton ||
    !textElement ||
    !authorElement ||
    !starsElement
  ) {
    return;
  }

  const testimonialCount = testimonials.length;

  const visibleImageCount = Math.min(
    MAX_VISIBLE_TESTIMONIALS,
    testimonialCount
  );

  let activeIndex = 0;

  /**
   * Transforme n’importe quel index en index valide et circulaire.
   *
   * @param {number} index Index demandé.
   * @returns {number} Index valide.
   */
  function normalizeIndex(index) {
    return (
      ((index % testimonialCount) + testimonialCount) %
      testimonialCount
    );
  }

  /**
   * Crée une image cliquable de témoignage.
   *
   * @param {number} index Index du témoignage.
   * @param {number} position Position dans la galerie.
   * @returns {HTMLButtonElement} Bouton contenant l’image.
   */
  function createTestimonialImage(index, position) {
    const testimonial = testimonials[index];
    const customerName = getCustomerName(testimonial.author);

    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.className = "testimonial-image-button";

    button.classList.add(
      position === 0 ? "is-active" : "is-preview"
    );

    button.setAttribute(
      "aria-label",
      position === 0
        ? `Image de l’avis de ${customerName}`
        : `Afficher l’avis de ${customerName}`
    );

    image.className = "testimonial-image";
    image.src = testimonial.image;
    image.alt = `Cliente portant un caftan — ${customerName}`;
    image.loading = position === 0 ? "eager" : "lazy";
    image.decoding = "async";

    button.append(image);

    button.addEventListener("click", () => {
      renderTestimonial(index);
    });

    return button;
  }

  /**
   * Affiche un témoignage et les aperçus suivants.
   *
   * @param {number} index Index du témoignage à afficher.
   */
  function renderTestimonial(index) {
    activeIndex = normalizeIndex(index);

    const testimonial = testimonials[activeIndex];
    const filledStars = countFilledStars(testimonial.stars);
    const fragment = document.createDocumentFragment();

    textElement.textContent = testimonial.text;
    authorElement.textContent = testimonial.author;
    starsElement.textContent = testimonial.stars;

    starsElement.setAttribute(
      "aria-label",
      `${filledStars} étoile${
        filledStars > 1 ? "s" : ""
      } sur 5`
    );

    for (
      let position = 0;
      position < visibleImageCount;
      position += 1
    ) {
      const testimonialIndex = normalizeIndex(
        activeIndex + position
      );

      fragment.append(
        createTestimonialImage(
          testimonialIndex,
          position
        )
      );
    }

    track.replaceChildren(fragment);
  }

  previousButton.addEventListener("click", () => {
    renderTestimonial(activeIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    renderTestimonial(activeIndex + 1);
  });

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderTestimonial(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      renderTestimonial(activeIndex + 1);
    }
  });

  renderTestimonial(0);
}

/**
 * Prépare un e-mail depuis le formulaire de contact.
 * À remplacer par un envoi vers un backend ou un service de formulaires
 * lorsque l'adresse professionnelle sera disponible.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const recipient = "bonjour@maison-moumen.example";
    const mailSubject = `[Maison Moumen] ${subject}`;
    const mailBody = `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`;

    status.textContent = "Votre application de messagerie va s’ouvrir avec le message prérempli.";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;
  });
}

/**
 * Ouvre et referme le champ de recherche de l'en-tête.
 */
function initSearchToggle() {
  const searchForm = document.getElementById("site-search");
  const toggle = document.getElementById("search-toggle");
  const input = document.getElementById("site-search-input");

  if (!searchForm || !toggle || !input) {
    return;
  }

  function setSearchOpen(isOpen) {
    searchForm.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      requestAnimationFrame(() => input.focus());
    }
  }

  toggle.addEventListener("click", () => {
    setSearchOpen(!searchForm.classList.contains("is-open"));
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSearchOpen(false);
      toggle.focus();
    }
  });
}

/**
 * Ouvre les collections au survol et laisse le temps d'atteindre le sous-menu.
 */
function initCollectionMenuHover() {
  const closeDelay = 220;
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".collections-trigger");
    const menu = dropdown.querySelector(".dropdown-menu");
    const header = dropdown.closest(".header-inner");

    if (!trigger || !menu) {
      return;
    }

    let closeTimer;

    function positionMenu() {
      if (!header) {
        return;
      }

      const headerRect = header.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();

      menu.style.left = `${triggerRect.left - headerRect.left}px`;
    }

    function openMenu() {
      window.clearTimeout(closeTimer);
      positionMenu();
      dropdown.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }

    function closeMenuSoon() {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }, closeDelay);
    }

    dropdown.addEventListener("mouseenter", openMenu);
    dropdown.addEventListener("mouseleave", closeMenuSoon);
    menu.addEventListener("mouseenter", openMenu);
    menu.addEventListener("mouseleave", closeMenuSoon);
    dropdown.addEventListener("focusin", openMenu);
    dropdown.addEventListener("focusout", (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        closeMenuSoon();
      }
    });
    window.addEventListener("resize", positionMenu);

    trigger.addEventListener("click", () => {
      if (!window.matchMedia("(pointer: fine)").matches) {
        if (dropdown.classList.contains("is-open")) {
          closeMenuSoon();
        } else {
          openMenu();
        }
      }
    });
  });
}

/**
 * Initialise toutes les fonctionnalités de la page.
 */
function init() {
  renderProducts(products);
  initProductImageHover();
  initTestimonialGallery();
  initContactForm();
  initSearchToggle();
  initCollectionMenuHover();
}

init();
