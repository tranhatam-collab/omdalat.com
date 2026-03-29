const ids = {
  hostRoster: document.querySelector("#host-roster"),
  noteList: document.querySelector("#ops-notes"),
  nodeGrid: document.querySelector("#node-grid"),
  proofFeed: document.querySelector("#proof-feed"),
  requestFilters: document.querySelector("#request-filters"),
  requestList: document.querySelector("#request-list"),
  snapshotText: document.querySelector("#snapshot-text"),
  summaryGrid: document.querySelector("#summary-grid"),
  timelineList: document.querySelector("#timeline-list")
};

const datasetPaths = {
  activities: "../../data/activities.json",
  hosts: "../../data/hosts.json",
  nodes: "../../data/nodes.json",
  proofs: "../../data/proofs.json",
  requests: "../../data/requests.json"
};

const requestFilters = [
  { id: "all", label: "All queue" },
  { id: "open", label: "Open" },
  { id: "high", label: "High priority" },
  { id: "in-progress", label: "In progress" }
];

const state = {
  activeFilter: "all",
  activities: [],
  hosts: [],
  nodes: [],
  proofs: [],
  requests: []
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

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));

const loadDataset = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.json();
};

const getRequestMatchesFilter = (request) => {
  if (state.activeFilter === "open") {
    return request.status === "Open";
  }

  if (state.activeFilter === "high") {
    return request.priority === "High";
  }

  if (state.activeFilter === "in-progress") {
    return request.status === "In Progress";
  }

  return true;
};

const renderFilterButtons = () => {
  ids.requestFilters.innerHTML = requestFilters
    .map(
      (filter) => `
        <button class="filter-button ${filter.id === state.activeFilter ? "active" : ""}" data-filter="${escapeHtml(
          filter.id
        )}" type="button">
          ${escapeHtml(filter.label)}
        </button>
      `
    )
    .join("");
};

const renderSummary = () => {
  const now = new Date();
  const next72Hours = new Date(now.getTime() + 72 * 60 * 60 * 1000);
  const openRequests = state.requests.filter((request) => request.status === "Open");
  const upcomingActivities = state.activities.filter((activity) => {
    const startsAt = new Date(activity.startsAt);
    return startsAt >= now && startsAt <= next72Hours;
  });
  const verifiedHosts = state.hosts.filter((host) => host.verified);
  const liveNodes = state.nodes.filter((node) => node.readiness >= 80);
  const recentProofs = state.proofs.filter((proof) => {
    const recordedAt = new Date(proof.recordedAt);
    return now.getTime() - recordedAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
  });

  const cards = [
    {
      label: "Open requests",
      value: openRequests.length,
      foot: `${openRequests.filter((request) => request.priority === "High").length} high priority`
    },
    {
      label: "Next 72 hours",
      value: upcomingActivities.length,
      foot: "Scheduled activity windows"
    },
    {
      label: "Ready nodes",
      value: liveNodes.length,
      foot: `${state.nodes.length} tracked operating surfaces`
    },
    {
      label: "Recent proof",
      value: recentProofs.length,
      foot: `${verifiedHosts.length} verified hosts carrying trust`
    }
  ];

  ids.summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <p class="panel-label">${escapeHtml(card.label)}</p>
          <strong class="summary-value">${escapeHtml(card.value)}</strong>
          <span class="summary-foot">${escapeHtml(card.foot)}</span>
        </article>
      `
    )
    .join("");
};

const renderNotes = () => {
  const highPriority = state.requests.filter((request) => request.priority === "High" && request.status === "Open");
  const softNodes = state.nodes.filter((node) => node.readiness < 80);
  const recentProof = [...state.proofs].sort((left, right) => new Date(right.recordedAt) - new Date(left.recordedAt))[0];

  const notes = [
    {
      title: `${highPriority.length} high-priority requests still open`,
      copy: highPriority.length
        ? `Clear host matching and introductions before ${highPriority
            .map((request) => request.window)
            .join(" and ")}.`
        : "Priority queue is stable. Keep watch on new needs entering the flow."
    },
    {
      title: `${softNodes.length} nodes need stabilization`,
      copy: softNodes.length
        ? `Focus on ${softNodes.map((node) => node.name).join(" and ")} before the next public-facing window.`
        : "All tracked nodes are above readiness threshold for the next cycle."
    },
    {
      title: "Most recent proof signal",
      copy: recentProof
        ? `${recentProof.title} on ${recentProof.date} keeps the trust loop visible.`
        : "No proof logged yet. Capture one concrete outcome in the next cycle."
    }
  ];

  ids.noteList.innerHTML = notes
    .map(
      (note) => `
        <article class="note-item">
          <strong>${escapeHtml(note.title)}</strong>
          <span>${escapeHtml(note.copy)}</span>
        </article>
      `
    )
    .join("");
};

const renderRequests = () => {
  const filteredRequests = [...state.requests].filter(getRequestMatchesFilter);

  ids.requestList.innerHTML = filteredRequests
    .map(
      (request) => `
        <article class="request-card">
          <div class="request-top">
            <div>
              <div class="chip priority-${escapeHtml(request.priority.toLowerCase())}">${escapeHtml(request.priority)}</div>
              <h3>${escapeHtml(request.title)}</h3>
              <span class="request-meta">${escapeHtml(request.lane)} | ${escapeHtml(request.area)}</span>
            </div>
            <div>
              <div class="chip status-${escapeHtml(request.status.toLowerCase().replace(/\s+/g, "-"))}">${escapeHtml(
                request.status
              )}</div>
            </div>
          </div>
          <p class="request-copy">${escapeHtml(request.need)}</p>
          <div class="request-bottom">
            <span class="mini-note">Owner: ${escapeHtml(request.owner)}</span>
            <span class="mini-note">Due ${escapeHtml(formatDateTime(request.dueAt))}</span>
          </div>
        </article>
      `
    )
    .join("");
};

const renderTimeline = () => {
  const items = [
    ...state.activities.map((activity) => ({
      title: activity.title,
      time: activity.startsAt,
      type: "Activity",
      meta: `${activity.place} | ${activity.host}`
    })),
    ...state.requests.map((request) => ({
      title: request.title,
      time: request.dueAt,
      type: "Request due",
      meta: `${request.lane} | ${request.area}`
    }))
  ]
    .sort((left, right) => new Date(left.time) - new Date(right.time))
    .slice(0, 6);

  ids.timelineList.innerHTML = items
    .map(
      (item) => `
        <article class="timeline-card">
          <div class="timeline-top">
            <div>
              <div class="chip">${escapeHtml(item.type)}</div>
              <h3>${escapeHtml(item.title)}</h3>
            </div>
            <span class="timeline-meta">${escapeHtml(formatDateTime(item.time))}</span>
          </div>
          <p>${escapeHtml(item.meta)}</p>
        </article>
      `
    )
    .join("");
};

const renderNodes = () => {
  const nodes = [...state.nodes].sort((left, right) => right.readiness - left.readiness);

  ids.nodeGrid.innerHTML = nodes
    .map(
      (node) => `
        <article class="node-card">
          <div class="node-top">
            <div>
              <div class="chip">${escapeHtml(node.status)}</div>
              <h3>${escapeHtml(node.name)}</h3>
              <span class="mini-note">${escapeHtml(node.zone)} | ${escapeHtml(node.type)}</span>
            </div>
            <span class="mini-note">${escapeHtml(node.lead)}</span>
          </div>
          <p class="node-copy">${escapeHtml(node.surface)}</p>
          <div class="readiness">
            <div class="readiness-label">
              <span>Readiness</span>
              <span>${escapeHtml(node.readiness)}%</span>
            </div>
            <div class="readiness-track">
              <div class="readiness-fill" style="width:${escapeHtml(node.readiness)}%"></div>
            </div>
          </div>
          <div class="node-bottom">
            <span class="mini-note">${escapeHtml(node.signal)}</span>
            <span class="mini-note">Next ${escapeHtml(formatDateTime(node.nextWindow))}</span>
          </div>
        </article>
      `
    )
    .join("");
};

const renderHosts = () => {
  const coverage = new Map();

  state.nodes.forEach((node) => {
    coverage.set(node.lead, (coverage.get(node.lead) || 0) + 1);
  });

  ids.hostRoster.innerHTML = state.hosts
    .map(
      (host) => `
        <article class="host-card">
          <div class="host-top">
            <div>
              <h3>${escapeHtml(host.name)}</h3>
              <span class="mini-note">${escapeHtml(host.role)} | ${escapeHtml(host.zone)}</span>
            </div>
            <div class="chip">${host.verified ? "Verified" : "Reviewing"}</div>
          </div>
          <p class="host-copy">${escapeHtml(host.focus)}</p>
          <p class="mini-note">Trust: ${escapeHtml(host.trust)}</p>
          <p class="mini-note">Coverage: ${escapeHtml(coverage.get(host.name) || 0)} active nodes</p>
          <p class="mini-note">Availability: ${escapeHtml(host.availability)}</p>
        </article>
      `
    )
    .join("");
};

const renderProofs = () => {
  const proofs = [...state.proofs].sort((left, right) => new Date(right.recordedAt) - new Date(left.recordedAt));

  ids.proofFeed.innerHTML = proofs
    .map(
      (proof) => `
        <article class="proof-card">
          <div class="request-top">
            <div>
              <div class="chip">${escapeHtml(proof.kind)}</div>
              <h3>${escapeHtml(proof.title)}</h3>
            </div>
            <span class="mini-note">${escapeHtml(formatDateTime(proof.recordedAt))}</span>
          </div>
          <p class="proof-copy">${escapeHtml(proof.outcome)}</p>
          <p class="mini-note">Evidence: ${escapeHtml(proof.evidence)}</p>
        </article>
      `
    )
    .join("");
};

const renderError = (error) => {
  const message = `Unable to load operating datasets. ${error.message}`;
  const card = `<article class="error-card"><h3>Data unavailable</h3><p>${escapeHtml(message)}</p></article>`;

  ids.summaryGrid.innerHTML = card;
  ids.requestList.innerHTML = card;
  ids.timelineList.innerHTML = card;
  ids.nodeGrid.innerHTML = card;
  ids.hostRoster.innerHTML = card;
  ids.proofFeed.innerHTML = card;
  ids.noteList.innerHTML = card;
};

const attachEvents = () => {
  ids.requestFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");

    if (!button) {
      return;
    }

    state.activeFilter = button.dataset.filter;
    renderFilterButtons();
    renderRequests();
  });
};

const init = async () => {
  ids.snapshotText.textContent = `Operator snapshot ${new Intl.DateTimeFormat("en-US", {
    dateStyle: "full"
  }).format(new Date())}`;

  renderFilterButtons();
  attachEvents();

  try {
    const datasets = await Promise.all(
      Object.entries(datasetPaths).map(async ([key, datasetPath]) => [key, await loadDataset(datasetPath)])
    );

    Object.assign(state, Object.fromEntries(datasets));

    renderSummary();
    renderNotes();
    renderRequests();
    renderTimeline();
    renderNodes();
    renderHosts();
    renderProofs();
  } catch (error) {
    renderError(error);
  }
};

init();
