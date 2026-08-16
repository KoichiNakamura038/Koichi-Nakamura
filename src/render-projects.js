import { t } from './i18n.js';
import {
  getJapanStackOverview,
  getGlobalStackOverview,
  getJapanProjects,
  getGlobalFeatured,
  getGlobalProjects,
  getGlobalStackGroups,
} from './projects.js';

function formatPerfValue(item) {
  const unit = item.unit || '';
  const value = Number.isInteger(item.value) ? item.value : item.value.toFixed(item.value < 1 ? 2 : 1);
  return `${value}${unit}`;
}

function perfBarWidth(item) {
  if (item.label === 'Lighthouse' || item.label === 'LH') return item.value;
  if (item.max) return Math.min(100, (1 - item.value / item.max) * 100 + 60);
  return 85;
}

function renderStackChips(stacks) {
  return stacks.map((s) => `<span class="stack-chip" data-hover-chip>${s}</span>`).join('');
}

function renderPerformanceGrid(items) {
  return `
    <div class="perf-grid">
      ${items
        .map(
          (item) => `
        <div class="perf-item" data-hover-glow>
          <div class="perf-item-head">
            <span class="perf-label">${item.label}</span>
            <span class="perf-value" data-animate-value="${item.value}" data-decimals="${item.value < 1 ? 2 : item.value % 1 ? 1 : 0}">${formatPerfValue(item)}</span>
          </div>
          <div class="perf-bar" aria-hidden="true">
            <span class="perf-bar-fill" data-width="${perfBarWidth(item)}"></span>
          </div>
        </div>`
        )
        .join('')}
    </div>`;
}

function renderHighlights(items) {
  if (!items?.length) return '';
  return `
    <ul class="project-highlights">
      ${items.map((h) => `<li>${h}</li>`).join('')}
    </ul>`;
}

function renderSitePreview(url, name, { featured = false } = {}) {
  return `
    <a href="${url}" class="project-preview is-loading${featured ? ' project-preview--featured' : ''}" data-site-url="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name} — ${t('global.previewLabel')}">
      <div class="project-preview__chrome" aria-hidden="true">
        <span class="project-preview__dot"></span>
        <span class="project-preview__dot"></span>
        <span class="project-preview__dot"></span>
        <span class="project-preview__url">${new URL(url).hostname}</span>
      </div>
      <div class="project-preview__frame">
        <div class="project-preview__loader" aria-hidden="true">
          <span class="project-preview__loader-ring"></span>
          <span class="project-preview__loader-text">${t('global.previewLabel')}</span>
        </div>
        <div class="project-preview__fallback" aria-hidden="true"></div>
        <img
          class="project-preview__img"
          alt="${name} site preview"
          decoding="async"
          width="1400"
          height="900"
        />
      </div>
      <span class="project-preview__label">${t('global.previewLabel')}</span>
    </a>`;
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
            <span class="overview-metric-value" data-animate-value="${m.value}" data-decimals="${m.decimals ?? 0}" data-suffix="${m.suffix || ''}">${m.value}${m.suffix || ''}</span>
            <span class="overview-metric-label">${m.label}</span>
          </div>`
          )
          .join('')}
      </div>
      <div class="stack-chip-row">${renderStackChips(overview.stacks)}</div>
    </div>`;
}

function renderJapanCard(project) {
  return `
    <article class="project-card project-card--detailed" data-reveal data-tilt data-hover-card>
      <div class="project-card-glow" aria-hidden="true"></div>
      ${renderSitePreview(project.url, project.name)}
      <div class="project-card-top">
        <span class="project-tag">${project.category}</span>
        <div class="stack-chip-row stack-chip-row--sm">${renderStackChips(project.stacks)}</div>
      </div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      ${renderPerformanceGrid(project.performance)}
      ${renderHighlights(project.highlights)}
      <a href="${project.url}" class="card-link card-link--animated" target="_blank" rel="noopener noreferrer">${new URL(project.url).hostname} →</a>
    </article>`;
}

function renderGlobalCard(project) {
  if (project.detailed) {
    return `
    <article class="project-card project-card--detailed project-card--automation" data-reveal data-tilt data-hover-card>
      <div class="project-card-glow" aria-hidden="true"></div>
      ${renderSitePreview(project.url, project.name)}
      <div class="project-card-top">
        <span class="project-tag">${project.category}</span>
        <div class="stack-chip-row stack-chip-row--sm">${renderStackChips(project.stacks)}</div>
      </div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      ${renderPerformanceGrid(project.performance)}
      ${renderHighlights(project.highlights)}
      <a href="${project.url}" class="card-link card-link--animated" target="_blank" rel="noopener noreferrer">${new URL(project.url).hostname} →</a>
    </article>`;
  }

  const perfText = project.performance
    .map((p) => `${p.label} ${formatPerfValue(p)}`)
    .join(' · ');

  return `
    <article class="project-card compact" data-reveal data-tilt data-hover-card>
      <div class="project-card-glow" aria-hidden="true"></div>
      ${renderSitePreview(project.url, project.name)}
      <span class="project-tag">${project.category}</span>
      <h3>${project.name}</h3>
      <div class="stack-chip-row stack-chip-row--sm">${renderStackChips(project.stacks)}</div>
      <p class="perf-inline">${perfText}</p>
      <a href="${project.url}" class="card-link card-link--animated" target="_blank" rel="noopener noreferrer">${new URL(project.url).hostname} →</a>
    </article>`;
}

function renderProjectSubsection(title, cardsHtml, gridClass = 'project-grid') {
  if (!cardsHtml) return '';
  return `
    <div class="project-subsection" data-reveal>
      <h3 class="project-subsection-title">${title}</h3>
      <div class="${gridClass}">${cardsHtml}</div>
    </div>`;
}

function renderStackGroups() {
  return `
    <div class="stack-groups" data-reveal>
      <h3 class="stack-groups-title">${t('global.stackMatrix')}</h3>
      <div class="stack-groups-grid">
        ${getGlobalStackGroups()
          .map(
            (group) => `
          <article class="stack-group-card" data-hover-lift data-tilt-subtle>
            <h4>${group.title}</h4>
            <div class="stack-chip-row stack-chip-row--sm">${renderStackChips(group.items)}</div>
            <div class="stack-group-stats">
              <span><strong data-animate-value="${group.stats.projects}">${group.stats.projects}</strong> ${t('global.projects')}</span>
              <span>${t('global.avgLh')} <strong>${group.stats.avgLh}</strong></span>
              <span>LCP <strong>${group.stats.avgLcp}</strong></span>
            </div>
          </article>`
          )
          .join('')}
      </div>
    </div>`;
}

function renderFeatured(project) {
  return `
    <article class="featured-project" data-reveal data-hover-lift>
      <div class="featured-visual" data-featured-parallax>
        ${renderSitePreview(project.url, project.name, { featured: true })}
        <span class="featured-label">${t('global.featuredLabel')}</span>
      </div>
      <div class="featured-content">
        <span class="featured-badge">${t('global.featuredBadge')}</span>
        <h3>${project.name} — ${project.category}</h3>
        <p>${project.description}</p>
        <div class="stack-chip-row">${renderStackChips(project.stacks)}</div>
        ${renderPerformanceGrid(project.performance)}
        ${renderHighlights(project.highlights)}
        <a href="${project.url}" class="btn btn-primary btn-primary--glow" target="_blank" rel="noopener noreferrer">${t('global.visit')} ${new URL(project.url).hostname} →</a>
      </div>
    </article>`;
}

export function mountProjectSections(lang) {
  const japanOverview = document.getElementById('japan-overview');
  const japanGrid = document.getElementById('japan-projects');
  const globalOverview = document.getElementById('global-overview');
  const globalFeaturedEl = document.getElementById('global-featured');
  const globalGrid = document.getElementById('global-projects');
  const globalGroups = document.getElementById('global-stack-groups');

  if (japanOverview) japanOverview.innerHTML = renderOverview(getJapanStackOverview(lang));

  if (japanGrid) {
    const webCards = getJapanProjects(lang, 'web').map(renderJapanCard).join('');
    const aiCards = getJapanProjects(lang, 'ai-system').map(renderJapanCard).join('');
    japanGrid.innerHTML =
      renderProjectSubsection(t('japan.webTitle'), webCards) +
      renderProjectSubsection(t('japan.aiSystemTitle'), aiCards);
  }

  if (globalOverview) globalOverview.innerHTML = renderOverview(getGlobalStackOverview(lang));
  if (globalFeaturedEl) globalFeaturedEl.innerHTML = renderFeatured(getGlobalFeatured(lang));
  if (globalGroups) globalGroups.innerHTML = renderStackGroups();

  if (globalGrid) {
    const webCards = getGlobalProjects(lang, 'web').map(renderGlobalCard).join('');
    const automationCards = getGlobalProjects(lang, 'automation').map(renderGlobalCard).join('');
    globalGrid.innerHTML =
      renderProjectSubsection(t('global.webTitle'), webCards, 'project-grid global-grid') +
      renderProjectSubsection(t('global.automationTitle'), automationCards, 'project-grid global-grid global-grid--automation');
  }
}
