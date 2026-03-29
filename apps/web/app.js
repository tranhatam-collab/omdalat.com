const ids = {
  heroEyebrow: document.querySelector("#hero-eyebrow"),
  heroLede: document.querySelector("#hero-lede"),
  heroTitle: document.querySelector("#hero-title"),
  overview: document.querySelector("#overview-grid"),
  routeNote: document.querySelector("#route-note"),
  stats: document.querySelector("#stats"),
  places: document.querySelector("#places-list"),
  hosts: document.querySelector("#hosts-list"),
  requests: document.querySelector("#requests-list"),
  activities: document.querySelector("#activities-list"),
  proofs: document.querySelector("#proofs-list"),
  snapshot: document.querySelector("#snapshot-time")
};

const datasetPaths = {
  activities: "/data/activities.json",
  hosts: "/data/hosts.json",
  places: "/data/places.json",
  proofs: "/data/proofs.json",
  requests: "/data/requests.json"
};

const routeShells = {
  "/about": {
    eyebrow: "About shell",
    title: "What OMDALAT is, in public-facing form.",
    lede: "This path is reserved for the full system story and city-layer framing while the runtime route is still being wired in."
  },
  "/communities": {
    eyebrow: "Communities shell",
    title: "Community surfaces that make the city layer denser.",
    lede: "Use this route to preview how trusted community clusters will be introduced before the runtime route takes over."
  },
  "/contact": {
    eyebrow: "Contact shell",
    title: "Partnership, founder intake, and support routing.",
    lede: "This static path holds the route open while the runtime contact workflow is prepared."
  },
  "/events": {
    eyebrow: "Events shell",
    title: "Upcoming moments where local density can grow.",
    lede: "The runtime route will turn this shell into a structured events surface fed by the city-layer datasets."
  },
  "/experts": {
    eyebrow: "Experts shell",
    title: "Visible expertise for local coordination.",
    lede: "This shell previews the future experts route while the current static layer keeps the public path live."
  },
  "/faq": {
    eyebrow: "FAQ shell",
    title: "Answers that reduce ambiguity before trust is earned.",
    lede: "The dedicated FAQ route will land here in runtime form once the content model is connected."
  },
  "/hosts": {
    eyebrow: "Hosts shell",
    title: "Hosts who make the city layer credible.",
    lede: "This route is staged now so the public map stays stable while the runtime shell is still scaffold-only."
  },
  "/join": {
    eyebrow: "Join shell",
    title: "Entry paths into the first living intelligence city.",
    lede: "This static preview keeps the join route alive until the runtime onboarding path is implemented."
  },
  "/places": {
    eyebrow: "Places shell",
    title: "Places where real local activity can happen.",
    lede: "This public route already resolves in the static surface while the runtime shell waits for entity-backed data wiring."
  },
  "/privacy": {
    eyebrow: "Privacy shell",
    title: "Policy surface for public trust and operational clarity.",
    lede: "This placeholder keeps the public contract visible until the full privacy page is authored in the runtime app."
  },
  "/proofs": {
    eyebrow: "Proofs shell",
    title: "Outcomes that make trust repeatable.",
    lede: "The runtime route will deepen this path with proof cards, evidence types, and archival detail."
  },
  "/terms": {
    eyebrow: "Terms shell",
    title: "Terms path reserved for formal platform rules.",
    lede: "The dedicated runtime page will replace this static shell once the legal copy is ready."
  },
  "/trust": {
    eyebrow: "Trust shell",
    title: "Trust signals, verification, and visible credibility.",
    lede: "This route stays available now so the public trust path does not have to wait for the runtime launch."
  },
  "/vision": {
    eyebrow: "Vision shell",
    title: "Why this city node exists and where it is going.",
    lede: "This shell keeps the vision path live while deeper narrative content is prepared."
  }
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const table = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return table[char];
  });

const loadDataset = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.json();
};

const renderOverview = (data) => {
  const cards = [
    {
      value: data.places.length,
      label: "Active places",
      copy: "Public surfaces where trust, flow, and repeat interaction can become visible."
    },
    {
      value: data.hosts.filter((host) => host.verified).length,
      label: "Verified hosts",
      copy: "People who can welcome, bridge, and coordinate with visible context."
    },
    {
      value: data.requests.filter((request) => request.status === "Open").length,
      label: "Open requests",
      copy: "Needs that invite real contribution instead of passive browsing."
    },
    {
      value: data.proofs.length,
      label: "Proof signals",
      copy: "Concrete outcomes that make the city layer more trustworthy over time."
    }
  ];

  ids.overview.innerHTML = cards
    .map(
      (card, index) => `
        <article class="metric-card" style="--delay:${index}">
          <p class="metric-value">${escapeHtml(card.value)}</p>
          <h3>${escapeHtml(card.label)}</h3>
          <p>${escapeHtml(card.copy)}</p>
        </article>
      `
    )
    .join("");

  ids.stats.innerHTML = cards
    .map(
      (card) => `
        <div class="stat-pill">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
        </div>
      `
    )
    .join("");
};

const renderPlaces = (places) => {
  ids.places.innerHTML = places
    .map(
      (place, index) => `
        <article class="place-card" style="--delay:${index}">
          <div class="card-topline">
            <span class="badge">${escapeHtml(place.mode)}</span>
            <span class="mini-note">${escapeHtml(place.cadence)}</span>
          </div>
          <h3>${escapeHtml(place.name)}</h3>
          <p class="meta-line">${escapeHtml(place.area)} | ${escapeHtml(place.type)}</p>
          <p>${escapeHtml(place.activity)}</p>
          <div class="card-footer">
            <span>${escapeHtml(place.signal)}</span>
            <strong>${escapeHtml(place.hostCount)} hosts</strong>
          </div>
        </article>
      `
    )
    .join("");
};

const renderHosts = (hosts) => {
  ids.hosts.innerHTML = hosts
    .map(
      (host, index) => `
        <article class="host-card" style="--delay:${index}">
          <div class="host-head">
            <div>
              <h3>${escapeHtml(host.name)}</h3>
              <p class="meta-line">${escapeHtml(host.role)} | ${escapeHtml(host.zone)}</p>
            </div>
            <span class="badge">${host.verified ? "Verified" : "Reviewing"}</span>
          </div>
          <p>${escapeHtml(host.focus)}</p>
          <p class="host-proof">${escapeHtml(host.trust)}</p>
          <p class="mini-note">${escapeHtml(host.availability)}</p>
        </article>
      `
    )
    .join("");
};

const renderRequests = (requests) => {
  ids.requests.innerHTML = requests
    .map(
      (request, index) => `
        <article class="request-card" style="--delay:${index}">
          <div class="card-topline">
            <span class="badge priority-${escapeHtml(request.priority.toLowerCase())}">${escapeHtml(
              request.priority
            )}</span>
            <span class="mini-note">${escapeHtml(request.status)}</span>
          </div>
          <h3>${escapeHtml(request.title)}</h3>
          <p>${escapeHtml(request.need)}</p>
          <div class="card-footer">
            <span>${escapeHtml(request.area)}</span>
            <strong>${escapeHtml(request.window)}</strong>
          </div>
        </article>
      `
    )
    .join("");
};

const renderActivities = (activities) => {
  ids.activities.innerHTML = activities
    .map(
      (activity, index) => `
        <article class="activity-card" style="--delay:${index}">
          <p class="mini-note">${escapeHtml(activity.date)}</p>
          <h3>${escapeHtml(activity.title)}</h3>
          <p>${escapeHtml(activity.description)}</p>
          <div class="card-footer">
            <span>${escapeHtml(activity.place)}</span>
            <strong>${escapeHtml(activity.host)}</strong>
          </div>
        </article>
      `
    )
    .join("");
};

const renderProofs = (proofs) => {
  ids.proofs.innerHTML = proofs
    .map(
      (proof, index) => `
        <article class="proof-card" style="--delay:${index}">
          <div class="card-topline">
            <span class="badge">${escapeHtml(proof.kind)}</span>
            <span class="mini-note">${escapeHtml(proof.date)}</span>
          </div>
          <h3>${escapeHtml(proof.title)}</h3>
          <p>${escapeHtml(proof.outcome)}</p>
          <p class="proof-evidence">${escapeHtml(proof.evidence)}</p>
        </article>
      `
    )
    .join("");
};

const renderError = (error) => {
  const message = `Unable to load city-layer datasets. ${error.message}`;

  [ids.overview, ids.places, ids.hosts, ids.requests, ids.activities, ids.proofs].forEach((element) => {
    element.innerHTML = `<article class="error-card"><h3>Data unavailable</h3><p>${escapeHtml(message)}</p></article>`;
  });

  ids.stats.innerHTML = `<div class="stat-pill"><span>Status</span><strong>Offline</strong></div>`;
  ids.snapshot.textContent = "Local snapshot unavailable";
};

const applyRouteShell = () => {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const routeShell = routeShells[pathname];

  if (!routeShell) {
    ids.routeNote.hidden = true;
    return;
  }

  ids.heroEyebrow.textContent = routeShell.eyebrow;
  ids.heroTitle.textContent = routeShell.title;
  ids.heroLede.textContent = routeShell.lede;
  ids.routeNote.hidden = false;
  document.title = `${routeShell.title} | OMDALAT`;

  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute("content", routeShell.lede);
  }
};

const init = async () => {
  applyRouteShell();

  ids.snapshot.textContent = `Local snapshot ${new Intl.DateTimeFormat("en-US", {
    dateStyle: "full"
  }).format(new Date())}`;

  try {
    const [activities, hosts, places, proofs, requests] = await Promise.all(
      Object.values(datasetPaths).map((datasetPath) => loadDataset(datasetPath))
    );

    const data = { activities, hosts, places, proofs, requests };

    renderOverview(data);
    renderPlaces(data.places);
    renderHosts(data.hosts);
    renderRequests(data.requests);
    renderActivities(data.activities);
    renderProofs(data.proofs);
  } catch (error) {
    renderError(error);
  }
};

init();
