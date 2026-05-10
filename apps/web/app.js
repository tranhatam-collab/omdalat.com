const featuredContainer = document.querySelector("#featured-articles");
const groupsContainer = document.querySelector("#article-groups");
const joinForm = document.querySelector("#join-form");
const joinStatus = document.querySelector("#join-status");
const heroImage = document.querySelector("#hero-image");
const heroPlace = document.querySelector("#hero-place");

const dalatHeroImages = [
  {
    src: "https://images.unsplash.com/photo-1609424360486-c5b2636741d1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=khanh-tran-mZ9UNtdwrlo-unsplash.jpg&w=1600",
    alt: "Toàn cảnh Đà Lạt trong sương sớm",
    place: "Đà Lạt trong sương sớm"
  },
  {
    src: "https://images.unsplash.com/photo-1741524427564-0173c980c432?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=di-p-zader-i29Z07meKds-unsplash.jpg&w=1600",
    alt: "Mặt nước và rừng thông ở Đà Lạt",
    place: "Mặt hồ và rừng thông"
  },
  {
    src: "https://images.unsplash.com/photo-1691058428634-86aea938b448?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-space-DiE0DPySJTU-unsplash.jpg&w=1600",
    alt: "Con đường đất giữa vùng cây xanh Đà Lạt",
    place: "Đường rừng vùng ven"
  }
];

const featuredArticles = [
  {
    slug: "/song-o-da-lat-la-gi",
    title: "Sống ở Đà Lạt là gì",
    description: "Hiểu đúng về sống dài hạn ở Đà Lạt: nhịp sống, chi phí, và những điều không ai nói.",
    meta: "Nhóm Sống ở Đà Lạt"
  },
  {
    slug: "/lam-viec-o-da-lat-co-thuc-te-khong",
    title: "Làm việc ở Đà Lạt có thực tế không",
    description: "Không tô hồng việc sống ở nơi đẹp. Chỉ nói điều có thể làm được và điều không thể tránh.",
    meta: "Nhóm Làm việc ở Đà Lạt"
  },
  {
    slug: "/song-cham-khong-phai-luoi",
    title: "Sống chậm không phải lười",
    description: "Đi chậm để sống lâu, làm đều và giữ đầu óc sáng không có nghĩa là đứng yên.",
    meta: "Nhóm Xây cuộc đời"
  }
];

const articleGroups = [
  {
    heading: "Sống ở Đà Lạt",
    intro: "Nhịp sống, chi phí, phù hợp và sai lầm phổ biến.",
    items: [
      "Sống ở Đà Lạt là gì (không phải du lịch)",
      "Chi phí sống Đà Lạt 2026",
      "Ở đâu khi mới đến Đà Lạt",
      "Những điều khiến bạn không hợp Đà Lạt",
      "Một ngày sống ở Đà Lạt",
      "Thời tiết và nhịp sống",
      "Có nên bỏ phố về Đà Lạt",
      "Sai lầm khi sống ở Đà Lạt",
      "Cách ở lâu dài Đà Lạt",
      "Sống một mình ở Đà Lạt"
    ]
  },
  {
    heading: "Làm việc ở Đà Lạt",
    intro: "Việc gì làm được, cách bắt đầu và cách giữ thu nhập.",
    items: [
      "Làm việc ở Đà Lạt có thực tế không",
      "Remote work Đà Lạt",
      "Công việc phù hợp Đà Lạt",
      "Freelance ở Đà Lạt",
      "Thu nhập ở Đà Lạt",
      "Làm việc trong không gian nhỏ",
      "Network ở Đà Lạt",
      "Bắt đầu làm việc từ 0",
      "Quản lý thời gian ở Đà Lạt",
      "Burnout ở nơi yên tĩnh"
    ]
  },
  {
    heading: "Xây cuộc đời",
    intro: "Điều khó, điều thật và điều cần giữ khi ở lâu.",
    items: [
      "Sống chậm không phải lười",
      "Bạn không cần chạy nhanh",
      "Những điều nên làm khi đến Đà Lạt",
      "Sống thật ở Đà Lạt",
      "Không phải ai cũng hợp",
      "Sống ở đây có gì khó",
      "Xây cuộc đời từ đầu",
      "Tìm nhịp sống",
      "Sống lâu dài là gì",
      "Ở lại hay rời đi"
    ]
  }
];

const routeTargets = {
  "/about": "what-is",
  "/articles": "articles",
  "/docs": "start",
  "/docs/getting-started": "start",
  "/docs/how-it-works": "start",
  "/docs/community-rules": "community",
  "/docs/stay-guide": "stay",
  "/docs/work-guide": "work",
  "/docs/faq": "faq",
  "/how-it-works": "start",
  "/faq": "faq",
  "/community": "community",
  "/join": "join",
  "/life": "life",
  "/work": "work",
  "/learning": "learning",
  "/stay": "stay",
  "/member": "member-area",
  "/member/login": "member-area",
  "/member/register": "member-area",
  "/member/verify": "member-area",
  "/member/welcome": "member-area",
  "/member/profile": "member-area",
  "/member/resources": "member-area",
  "/member/application-status": "member-area",
  "/member/handbook": "member-area",
  "/member/programs": "member-area",
  "/member/investor-overview": "member-area",
  "/member/operations": "member-area",
  "/member/node-model": "member-area",
  "/contact": "join",
  "/privacy": "join",
  "/terms": "join"
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const table = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return table[char];
  });
}

function renderArticles() {
  featuredContainer.innerHTML = featuredArticles
    .map(
      (article) => `
        <article class="article-card">
          <p class="slug">${escapeHtml(article.slug)}</p>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.description)}</p>
          <p class="meta">${escapeHtml(article.meta)}</p>
        </article>
      `
    )
    .join("");

  groupsContainer.innerHTML = articleGroups
    .map(
      (group) => `
        <section class="article-group">
          <h3>${escapeHtml(group.heading)}</h3>
          <p>${escapeHtml(group.intro)}</p>
          <ul class="article-list">
            ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      `
    )
    .join("");
}

function normalizePathname() {
  const rawPath = window.location.pathname.replace(/\/$/, "") || "/";

  if (rawPath === "/vi" || rawPath === "/en") {
    return "/";
  }

  if (rawPath.startsWith("/vi/") || rawPath.startsWith("/en/")) {
    return rawPath.replace(/^\/(?:vi|en)/, "") || "/";
  }

  return rawPath;
}

function applyRouteFocus() {
  const pathname = normalizePathname();
  const sectionId = routeTargets[pathname];

  if (!sectionId || window.location.hash) {
    return;
  }

  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start" });
  });
}

function bindJoinForm() {
  if (!joinForm || !joinStatus) {
    return;
  }

  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(joinForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const want = String(formData.get("want") ?? "").trim();
    const canDo = String(formData.get("canDo") ?? "").trim();
    const duration = String(formData.get("duration") ?? "").trim();
    const introLink = String(formData.get("introLink") ?? "").trim();

    const subject = `Tham gia Om Dalat - ${name || "Ung vien moi"}`;
    const body = [
      `Ten: ${name}`,
      `Email: ${email}`,
      `Dang o: ${location}`,
      `Du dinh o: ${duration}`,
      `Link gioi thieu: ${introLink || "Khong co"}`,
      "",
      "Ban muon gi:",
      want,
      "",
      "Ban co the lam gi:",
      canDo
    ].join("\n");

    joinStatus.textContent = "Đang mở email...";
    window.location.href = `mailto:join@omdalat.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      joinStatus.textContent = "Nếu email chưa mở, vui lòng gửi trực tiếp tới join@omdalat.com.";
    }, 400);
  });
}

function preloadHeroImages() {
  dalatHeroImages.forEach((item) => {
    const image = new Image();
    image.src = item.src;
  });
}

function startHeroSlideshow() {
  if (!heroImage || !heroPlace || dalatHeroImages.length < 2) {
    return;
  }

  let currentIndex = 0;

  const applyHero = (nextIndex) => {
    const nextImage = dalatHeroImages[nextIndex];
    const preload = new Image();
    preload.src = nextImage.src;
    heroImage.classList.add("is-fading");

    preload.onload = () => {
      heroImage.src = nextImage.src;
      heroImage.alt = nextImage.alt;
      heroPlace.textContent = nextImage.place;
      requestAnimationFrame(() => {
        heroImage.classList.remove("is-fading");
      });
    };
  };

  window.setInterval(() => {
    currentIndex = (currentIndex + 1) % dalatHeroImages.length;
    applyHero(currentIndex);
  }, 5600);
}

renderArticles();
preloadHeroImages();
startHeroSlideshow();
applyRouteFocus();
bindJoinForm();
