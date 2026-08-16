const MSHOTS_MAX_ATTEMPTS = 14;
const MSHOTS_RETRY_MS = 2500;
const MSHOTS_WIDTH = 1400;

function buildMshotsUrl(url, attempt = 0) {
  const encoded = encodeURIComponent(url);
  return `https://s.wordpress.com/mshots/v1/${encoded}?w=${MSHOTS_WIDTH}&r=${attempt}-${Date.now()}`;
}

function buildSShotUrl(url) {
  return `https://mini.s-shot.ru/${MSHOTS_WIDTH}x${Math.round(MSHOTS_WIDTH * 0.625)}/PNG/300/100/?${url}`;
}

function isMshotsPlaceholder(img) {
  if (!img.naturalWidth || !img.naturalHeight) return true;
  return img.naturalWidth <= 640 && img.naturalHeight <= 480;
}

async function fetchMicrolinkScreenshot(url) {
  const endpoint = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Microlink request failed');
  const payload = await response.json();
  const screenshotUrl = payload?.data?.screenshot?.url;
  if (!screenshotUrl) throw new Error('Microlink screenshot missing');
  return screenshotUrl;
}

function waitForImage(src) {
  return new Promise((resolve, reject) => {
    const probe = new Image();
    probe.decoding = 'async';
    probe.onload = () => resolve(probe);
    probe.onerror = () => reject(new Error('Image failed to load'));
    probe.src = src;
  });
}

function setPreviewState(preview, state) {
  preview.classList.remove('is-loading', 'is-loaded', 'is-fallback');
  preview.classList.add(state);
}

function setFallbackInitial(preview, url) {
  let hostname = url;
  try {
    hostname = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    /* keep raw url */
  }
  const initial = hostname.charAt(0).toUpperCase() || '?';
  preview.style.setProperty('--preview-initial', `"${initial}"`);
}

async function loadPreview(preview) {
  const url = preview.dataset.siteUrl;
  const img = preview.querySelector('.project-preview__img');
  if (!url || !img) return;

  setPreviewState(preview, 'is-loading');
  setFallbackInitial(preview, url);
  img.removeAttribute('src');

  for (let attempt = 0; attempt < MSHOTS_MAX_ATTEMPTS; attempt += 1) {
    try {
      const src = buildMshotsUrl(url, attempt);
      const loaded = await waitForImage(src);
      if (!isMshotsPlaceholder(loaded)) {
        img.src = src;
        setPreviewState(preview, 'is-loaded');
        return;
      }
    } catch {
      /* try again */
    }

    if (attempt < MSHOTS_MAX_ATTEMPTS - 1) {
      await new Promise((resolve) => setTimeout(resolve, MSHOTS_RETRY_MS));
    }
  }

  const fallbacks = [
    () => buildSShotUrl(url),
    () => fetchMicrolinkScreenshot(url),
  ];

  for (const getSrc of fallbacks) {
    try {
      const src = await getSrc();
      const loaded = await waitForImage(src);
      if (loaded.naturalWidth > 320 && loaded.naturalHeight > 200) {
        img.src = src;
        setPreviewState(preview, 'is-loaded');
        return;
      }
    } catch {
      /* next provider */
    }
  }

  setPreviewState(preview, 'is-fallback');
}

export function initSitePreviews(root = document) {
  root.querySelectorAll('.project-preview[data-site-url]').forEach((preview) => {
    if (preview.dataset.previewInit === 'true') return;
    preview.dataset.previewInit = 'true';
    loadPreview(preview);
  });
}
