import { t } from './i18n.js';
import { getGameOverview, getGameProjects } from './games.js';

function renderStackChips(stacks) {
  return stacks.map((s) => `<span class="stack-chip" data-hover-chip>${s}</span>`).join('');
}

function renderOverview(overview) {
  return `
    <div class="stack-overview" data-reveal data-hover-lift>
      <div class="stack-overview-head">
        <h3>${overview.title}</h3>
        <p>${overview.subtitle}</p>
      </div>
      <div class="overview-metrics">
        ${overview.metrics
          .map(
            (m) => `
          <div class="overview-metric" data-hover-glow>
            <span class="overview-metric-value" data-animate-value="${m.value}" data-decimals="0" data-suffix="${m.suffix || ''}">${m.value}${m.suffix || ''}</span>
            <span class="overview-metric-label">${m.label}</span>
          </div>`
          )
          .join('')}
      </div>
      <div class="stack-chip-row">${renderStackChips(overview.stacks)}</div>
    </div>`;
}

function renderHighlights(items) {
  return `
    <ul class="project-highlights">
      ${items.map((h) => `<li>${h}</li>`).join('')}
    </ul>`;
}

function renderGameCard(project) {
  return `
    <article class="game-card" data-reveal data-tilt data-hover-card>
      <div class="project-card-glow" aria-hidden="true"></div>
      <div class="game-card__video-wrap">
        <video
          class="game-card__video"
          src="${project.video}"
          controls
          playsinline
          preload="metadata"
          data-game-video
        ></video>
        <span class="game-card__video-badge">${t('games.playDemo')}</span>
      </div>
      <div class="game-card__body">
        <span class="project-tag">${project.category}</span>
        <p class="game-card__role">${project.role}</p>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="stack-chip-row stack-chip-row--sm">${renderStackChips(project.stacks)}</div>
        ${renderHighlights(project.highlights)}
      </div>
    </article>`;
}

export function mountGameSection(lang) {
  const overviewEl = document.getElementById('games-overview');
  const gridEl = document.getElementById('games-projects');

  if (overviewEl) overviewEl.innerHTML = renderOverview(getGameOverview(lang));
  if (gridEl) gridEl.innerHTML = getGameProjects(lang).map(renderGameCard).join('');
}
