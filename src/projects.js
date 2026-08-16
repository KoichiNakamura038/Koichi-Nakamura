import { t } from './i18n.js';

function L(en, ja) {
  return { en, ja };
}

function pick(field, lang) {
  if (field && typeof field === 'object' && ('en' in field || 'ja' in field)) {
    return field[lang] ?? field.en;
  }
  return field;
}

export function getJapanStackOverview(lang) {
  return {
    title: t('overview.japanTitle'),
    subtitle: t('overview.japanSubtitle'),
    metrics: [
      { label: t('overview.avgLh'), value: 95, suffix: '' },
      { label: t('overview.avgLcp'), value: 1.4, suffix: 's', decimals: 1 },
      { label: t('overview.avgCls'), value: 0.03, suffix: '', decimals: 2 },
      { label: t('overview.projects'), value: 32, suffix: '+' },
    ],
    stacks: ['WordPress', 'Sass', 'SCSS', 'PHP 8.x', 'MySQL', 'Python', 'n8n', 'Zapier', 'FastAPI', 'OpenAI'],
  };
}

export function getGlobalStackOverview(lang) {
  return {
    title: t('overview.globalTitle'),
    subtitle: t('overview.globalSubtitle'),
    metrics: [
      { label: t('overview.stacksDelivered'), value: 18, suffix: '+' },
      { label: t('overview.avgLh'), value: 94, suffix: '' },
      { label: t('overview.avgLcp'), value: 1.5, suffix: 's', decimals: 1 },
      { label: t('overview.countries'), value: 12, suffix: '+' },
    ],
    stacks: [
      'React', 'Next.js', 'Python', 'n8n', 'Zapier', 'FastAPI',
      'Laravel', 'WordPress', 'Node.js', 'OpenAI', 'Web3', 'GraphQL',
    ],
  };
}

const japanProjectsData = [
  {
    group: 'web',
    name: 'Suidou Rescue 24',
    url: 'https://suidourescue24.com/',
    category: L('Landing Page · Local Service', 'ランディングページ · 地域サービス'),
    description: L(
      'High-conversion emergency plumbing LP with scroll-driven sections, click-to-call UX, and region-specific SEO — tuned for mobile-first Japanese search behavior.',
      'スクロール演出・ワンタップ発信・地域SEOに最適化した高コンバージョンの水道修理LP。モバイルファーストの国内検索行動に合わせた設計。'
    ),
    stacks: ['WordPress', 'PHP', 'Sass', 'MySQL', 'LiteSpeed'],
    performance: [
      { label: 'Lighthouse', value: 97 },
      { label: 'LCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'FCP', value: 0.9, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.02, max: 0.1 },
      { label: 'TTFB', value: 280, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['Custom WP theme', 'SCSS design tokens', 'Form conversion +38%'],
      ['カスタム WP テーマ', 'SCSS デザイントークン', 'フォーム CV +38%']
    ),
  },
  {
    group: 'web',
    name: 'Loive',
    url: 'https://loive.co.jp/',
    category: L('Brand · Lifestyle', 'ブランド · ライフスタイル'),
    description: L(
      "Editorial women's lifestyle site with soft motion, category-driven layouts, and a modular WordPress block system for seasonal campaigns.",
      'ソフトなモーションとカテゴリ設計、季節キャンペーン向けモジュラー WordPress ブロック構成の女性向けライフスタイルメディア。'
    ),
    stacks: ['WordPress', 'PHP', 'Sass', 'ACF', 'MySQL'],
    performance: [
      { label: 'Lighthouse', value: 96 },
      { label: 'LCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.0, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.01, max: 0.1 },
      { label: 'TTFB', value: 310, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['BEM + Sass architecture', 'Lazy media pipeline', 'Core Web Vitals pass'],
      ['BEM + Sass アーキテクチャ', 'メディア遅延読み込み', 'CWV 合格']
    ),
  },
  {
    group: 'web',
    name: 'Muppi de Oppi Salon',
    url: 'https://muppi-de-oppi.com/',
    category: L('Salon · Booking', 'サロン · 予約'),
    description: L(
      'Salon brand site with reservation flows, staff galleries, and Instagram-driven content blocks — optimized for local discovery and repeat visits.',
      '予約導線・スタッフギャラリー・Instagram 連携ブロックを備えたサロンサイト。地域検索とリピート来店に最適化。'
    ),
    stacks: ['WordPress', 'PHP', 'Sass', 'Contact Form 7', 'MySQL'],
    performance: [
      { label: 'Lighthouse', value: 95 },
      { label: 'LCP', value: 1.5, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.04, max: 0.1 },
      { label: 'TTFB', value: 340, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['PHP booking hooks', 'Image WebP pipeline', 'Mobile 94+ score'],
      ['PHP 予約フック', 'WebP 画像パイプライン', 'モバイル 94+ スコア']
    ),
  },
  {
    group: 'web',
    name: 'Dr. Kamada Clinic',
    url: 'https://dr-kamada.jp/',
    category: L('Healthcare · Trust UX', '医療 · 信頼 UX'),
    description: L(
      'Specialist clinic web presence with accessible typography, treatment explainers, and a calm visual system built for patient confidence.',
      'アクセシブルなタイポグラフィと診療説明、患者の安心感を高める落ち着いたビジュアルシステムを備えた専門クリニックサイト。'
    ),
    stacks: ['WordPress', 'PHP', 'Sass', 'MySQL', 'Cloudflare'],
    performance: [
      { label: 'Lighthouse', value: 96 },
      { label: 'LCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'FCP', value: 0.8, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.01, max: 0.1 },
      { label: 'TTFB', value: 260, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['WCAG-aware Sass mixins', 'Schema markup', 'Secure PHP forms'],
      ['WCAG 対応 Sass mixin', 'Schema マークアップ', 'セキュア PHP フォーム']
    ),
  },
  {
    group: 'ai-system',
    name: 'LLMO Shindan Media',
    url: 'https://media.meo-taisaku.com/llmo-shindan/',
    category: L('AI · Content Platform', 'AI · コンテンツ基盤'),
    description: L(
      'LLMO diagnostic media hub with dynamic scorecards, article templates, and a PHP-driven CMS layer for rapid SEO content iteration.',
      '動的スコアカード・記事テンプレート・PHP CMS 層を備えた LLMO 診断メディア。SEO コンテンツの高速イテレーションに対応。'
    ),
    stacks: ['WordPress', 'PHP', 'Sass', 'MySQL', 'REST API'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.6, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TTFB', value: 380, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['Custom PHP endpoints', 'Sass component library', 'AI widget embed'],
      ['カスタム PHP エンドポイント', 'Sass コンポーネント', 'AI ウィジェット組込']
    ),
  },
  {
    group: 'ai-system',
    name: 'JA Okinawa Portal',
    url: 'https://www.ja-okinawa.or.jp/',
    category: L('Institution · System Web', '組織 · システム Web'),
    description: L(
      'Large-scale organizational portal with member information architecture, news pipelines, and a maintainable PHP backend for multi-department publishing.',
      '会員情報設計・ニュース配信・部門横断の公開を支える PHP バックエンドを備えた大規模組織ポータル。'
    ),
    stacks: ['PHP', 'Sass', 'MySQL', 'Custom CMS', 'Nginx'],
    performance: [
      { label: 'Lighthouse', value: 93 },
      { label: 'LCP', value: 1.8, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.05, max: 0.1 },
      { label: 'TTFB', value: 420, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['Legacy PHP refactor', 'Sass design system', 'Multi-site admin'],
      ['レガシー PHP 刷新', 'Sass デザインシステム', 'マルチサイト管理']
    ),
  },
  {
    group: 'ai-system',
    name: 'LLMO Check',
    url: 'https://llmocheck.ai/',
    category: L('AI · LLMO Audit', 'AI · LLMO 監査'),
    description: L(
      'Automated LLMO visibility scoring with Python inference pipelines and n8n orchestration for crawl → analyze → report workflows.',
      'Python 推論パイプラインと n8n オーケストレーションによる LLMO 可視性スコアリング。クロール → 分析 → レポートの自動化フロー。'
    ),
    stacks: ['Python', 'n8n', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    performance: [
      { label: 'Lighthouse', value: 95 },
      { label: 'LCP', value: 1.4, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.0, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.02, max: 0.1 },
      { label: 'TTFB', value: 320, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['n8n workflow automation', 'Python scoring engine', 'Report API −62% manual time'],
      ['n8n ワークフロー自動化', 'Python スコアリング', 'レポート工数 −62%']
    ),
  },
  {
    group: 'ai-system',
    name: 'Trilia LLMO Tools',
    url: 'https://trilia.co.jp/llmo-tools/',
    category: L('System · LLMO Automation', 'システム · LLMO 自動化'),
    description: L(
      'LLMO tooling suite with Zapier-triggered content sync, Python batch jobs, and dashboard hooks for multi-brand SEO operations.',
      'Zapier 連携コンテンツ同期・Python バッチ・ダッシュボードフックを備えた LLMO ツール群。マルチブランド SEO 運用を自動化。'
    ),
    stacks: ['Python', 'Zapier', 'WordPress', 'REST API', 'MySQL'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.5, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TTFB', value: 350, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['Zapier multi-step zaps', 'Python cron pipelines', 'CMS webhook bridge'],
      ['Zapier マルチステップ', 'Python cron パイプライン', 'CMS Webhook 連携']
    ),
  },
  {
    group: 'ai-system',
    name: 'Sensy AI',
    url: 'https://sensy.ai/',
    category: L('AI · Marketing Automation', 'AI · マーケ自動化'),
    description: L(
      'Behavioral marketing AI platform with Python recommendation services, n8n event routing, and real-time segment triggers.',
      'Python レコメンドサービス・n8n イベントルーティング・リアルタイムセグメントトリガーを備えた行動マーケ AI 基盤。'
    ),
    stacks: ['Python', 'n8n', 'FastAPI', 'Redis', 'React'],
    performance: [
      { label: 'Lighthouse', value: 93 },
      { label: 'LCP', value: 1.6, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.04, max: 0.1 },
      { label: 'TTFB', value: 390, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['Event-driven n8n flows', 'Python ML scoring', 'Segment sync −45% ops'],
      ['n8n イベント駆動', 'Python ML スコア', 'セグメント同期 −45%']
    ),
  },
  {
    group: 'ai-system',
    name: 'Aillis',
    url: 'https://aillis.jp/',
    category: L('AI · Health System', 'AI · ヘルスシステム'),
    description: L(
      'Medical AI product site backed by Python inference APIs, Zapier CRM handoffs, and compliance-aware content automation.',
      'Python 推論 API・Zapier CRM 連携・コンプライアンス対応コンテンツ自動化を備えた医療 AI プロダクトサイト。'
    ),
    stacks: ['Python', 'Zapier', 'Django', 'PostgreSQL', 'AWS'],
    performance: [
      { label: 'Lighthouse', value: 92 },
      { label: 'LCP', value: 1.7, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TTFB', value: 410, unit: 'ms', max: 800 },
    ],
    highlights: L(
      ['Zapier lead routing', 'Python model serving', 'HIPAA-aware forms'],
      ['Zapier リード振分', 'Python モデル配信', 'HIPAA 対応フォーム']
    ),
  },
];

const globalFeaturedData = {
  name: 'Datylon',
  url: 'https://www.datylon.com/',
  category: L('Enterprise SaaS · Data Visualization', 'エンタープライズ SaaS · データ可視化'),
  description: L(
    'A benchmark in beautiful, high-performance web design — fluid scroll animations, editorial typography, and a design system that scales across industries without sacrificing speed.',
    '美しいデザインと高パフォーマンスのベンチマーク — 流れるようなスクロールアニメーション、エディトリアルなタイポグラフィ、速度を犠牲にしないスケーラブルなデザインシステム。'
  ),
  stacks: ['React', 'Node.js', 'D3.js', 'Sass', 'AWS', 'GraphQL'],
  performance: [
    { label: 'Lighthouse', value: 98 },
    { label: 'LCP', value: 1.0, unit: 's', max: 2.5 },
    { label: 'FCP', value: 0.7, unit: 's', max: 2.5 },
    { label: 'CLS', value: 0.01, max: 0.1 },
    { label: 'TBT', value: 120, unit: 'ms', max: 600 },
  ],
  highlights: L(
    ['Scroll-triggered motion', 'Sub-1s LCP', 'Zero layout shift'],
    ['スクロール連動モーション', 'LCP 1秒未満', 'レイアウトシフトゼロ']
  ),
  initial: 'D',
};

const globalProjectsData = [
  { group: 'web', name: 'Dawn Corner', url: 'https://dawncorner.com/', category: L('Commerce · Motion', 'EC · モーション'), stacks: ['React', 'Next.js', 'Sass', 'Shopify'], performance: [{ label: 'LH', value: 97 }, { label: 'LCP', value: 1.1, unit: 's' }] },
  { group: 'web', name: 'The Things Between', url: 'https://thethingsbetween.com/', category: L('Editorial · E-commerce', 'エディトリアル · EC'), stacks: ['WordPress', 'PHP', 'Sass', 'WooCommerce'], performance: [{ label: 'LH', value: 96 }, { label: 'LCP', value: 1.3, unit: 's' }] },
  { group: 'web', name: 'Shop Ambiance', url: 'https://www.shopambiance.com/', category: L('Retail · Visual Merch', '小売 · ビジュアル'), stacks: ['Shopify', 'Liquid', 'Sass', 'JavaScript'], performance: [{ label: 'LH', value: 95 }, { label: 'LCP', value: 1.4, unit: 's' }] },
  { group: 'web', name: 'SimplePOS', url: 'https://simplepos.co.uk/', category: L('SaaS · POS', 'SaaS · POS'), stacks: ['Vue 3', 'Vite', 'Sass', 'Laravel', 'PHP'], performance: [{ label: 'LH', value: 96 }, { label: 'LCP', value: 1.2, unit: 's' }] },
  { group: 'web', name: 'RestoPage', url: 'https://restopage.eu/', category: L('Hospitality · Booking', '飲食 · 予約'), stacks: ['React', 'Node.js', 'MongoDB', 'Sass'], performance: [{ label: 'LH', value: 94 }, { label: 'LCP', value: 1.5, unit: 's' }] },
  { group: 'web', name: 'Smash & Slice', url: 'https://smash-slice.lu/', category: L('Restaurant · Brand', 'レストラン · ブランド'), stacks: ['WordPress', 'PHP', 'Sass', 'GSAP'], performance: [{ label: 'LH', value: 97 }, { label: 'LCP', value: 1.0, unit: 's' }] },
  { group: 'web', name: 'Ai Fratelli', url: 'https://aifratelli.lu/', category: L('Food · Storytelling', '飲食 · ストーリー'), stacks: ['WordPress', 'PHP', 'Sass', 'ACF'], performance: [{ label: 'LH', value: 95 }, { label: 'LCP', value: 1.4, unit: 's' }] },
  { group: 'web', name: 'SecureGuard 360', url: 'https://secureguard360.co.uk/', category: L('Security · B2B', 'セキュリティ · B2B'), stacks: ['Laravel', 'PHP', 'Vue', 'Sass', 'MySQL'], performance: [{ label: 'LH', value: 96 }, { label: 'LCP', value: 1.3, unit: 's' }] },
  { group: 'web', name: 'Intercool Studio', url: 'https://www.intercoolstudio.com/', category: L('Creative · Agency', 'クリエイティブ · 代理店'), stacks: ['React', 'Three.js', 'Sass', 'Node.js'], performance: [{ label: 'LH', value: 95 }, { label: 'LCP', value: 1.6, unit: 's' }] },
  { group: 'web', name: 'Resido', url: 'https://www.resido.co.nz/', category: L('Property · Listings', '不動産 · 物件'), stacks: ['WordPress', 'PHP', 'Sass', 'REST API'], performance: [{ label: 'LH', value: 94 }, { label: 'LCP', value: 1.7, unit: 's' }] },
  { group: 'web', name: 'Menoid', url: 'https://www.menoid.xyz/', category: L('Web3 · Product', 'Web3 · プロダクト'), stacks: ['React', 'Vite', 'Web3.js', 'Sass', 'Solidity'], performance: [{ label: 'LH', value: 93 }, { label: 'LCP', value: 1.5, unit: 's' }] },
  { group: 'web', name: 'Zodiacy', url: 'https://www.zodiacy.com/', category: L('SPA · Interactive', 'SPA · インタラクティブ'), stacks: ['React', 'Vite', 'Sass', 'Framer Motion'], performance: [{ label: 'LH', value: 97 }, { label: 'LCP', value: 1.1, unit: 's' }] },
  { group: 'web', name: 'Sophisticated Cloud', url: 'https://sophisticatedcloud.com/', category: L('Cloud · Consulting', 'クラウド · コンサル'), stacks: ['WordPress', 'PHP', 'Sass', 'HubSpot'], performance: [{ label: 'LH', value: 95 }, { label: 'LCP', value: 1.4, unit: 's' }] },
  { group: 'web', name: 'Webyurt', url: 'https://www.webyurt.com/', category: L('Agency · Portfolio', '代理店 · ポートフォリオ'), stacks: ['React', 'Next.js', 'Sass', 'Vercel'], performance: [{ label: 'LH', value: 96 }, { label: 'LCP', value: 1.2, unit: 's' }] },
  { group: 'web', name: 'Nomad Tribe', url: 'https://nomadtribetest.com.au/', category: L('Travel · Adventure', '旅行 · アドベンチャー'), stacks: ['WordPress', 'PHP', 'Sass', 'JavaScript'], performance: [{ label: 'LH', value: 96 }, { label: 'LCP', value: 1.2, unit: 's' }] },
  {
    group: 'automation',
    detailed: true,
    name: 'Mailmodo',
    url: 'https://www.mailmodo.com/',
    category: L('Automation · Email AI', '自動化 · メール AI'),
    description: L(
      'Interactive email automation platform with Python personalization services and Zapier-triggered campaign orchestration across CRM stacks.',
      'Python パーソナライズと Zapier 連携キャンペーンオーケストレーションを備えたインタラクティブメール自動化プラットフォーム。'
    ),
    stacks: ['Python', 'Zapier', 'Node.js', 'React', 'AWS'],
    performance: [
      { label: 'Lighthouse', value: 95 },
      { label: 'LCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.0, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.02, max: 0.1 },
      { label: 'TBT', value: 180, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier CRM zaps', 'Python template engine', 'Workflow time −55%'],
      ['Zapier CRM 連携', 'Python テンプレート', 'ワークフロー −55%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'LoopCV',
    url: 'https://loopcv.pro/',
    category: L('Automation · Recruiting', '自動化 · 採用'),
    description: L(
      'Job-search automation with n8n application pipelines, Python matching logic, and multi-board sync for candidate workflows.',
      'n8n 応募パイプライン・Python マッチング・求人ボード同期を備えた就活・採用自動化プロダクト。'
    ),
    stacks: ['Python', 'n8n', 'FastAPI', 'React', 'PostgreSQL'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.4, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TBT', value: 210, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['n8n apply automation', 'Python job scoring', 'Board sync −70% manual'],
      ['n8n 応募自動化', 'Python 求人スコア', 'ボード同期 −70%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Recruit CRM',
    url: 'https://recruitcrm.io/',
    category: L('System · ATS Automation', 'システム · ATS 自動化'),
    description: L(
      'Recruitment CRM with Zapier webhook bridges, Python ETL for candidate data, and automated pipeline stage transitions.',
      'Zapier Webhook・Python ETL・パイプライン段階自動遷移を備えた採用 CRM システム。'
    ),
    stacks: ['Python', 'Zapier', 'Laravel', 'Vue', 'MySQL'],
    performance: [
      { label: 'Lighthouse', value: 93 },
      { label: 'LCP', value: 1.5, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.04, max: 0.1 },
      { label: 'TBT', value: 240, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier ATS integrations', 'Python data sync', 'Stage automation +48%'],
      ['Zapier ATS 連携', 'Python データ同期', '段階自動化 +48%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Manatal',
    url: 'https://www.manatal.com/',
    category: L('Automation · HR Stack', '自動化 · HR スタック'),
    description: L(
      'AI-powered ATS with Python resume parsing, Zapier hiring workflows, and n8n notifications across Slack and email.',
      'Python 履歴書解析・Zapier 採用フロー・n8n 通知を備えた AI 採用 ATS。'
    ),
    stacks: ['Python', 'Zapier', 'n8n', 'React', 'Node.js'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.4, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TBT', value: 200, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Python CV parsing', 'Zapier + n8n dual flows', 'Hire cycle −40%'],
      ['Python CV 解析', 'Zapier + n8n 二重フロー', '採用サイクル −40%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Solvexia',
    url: 'https://www.solvexia.com/',
    category: L('System · Workflow RPA', 'システム · ワークフロー RPA'),
    description: L(
      'No-code workflow automation with n8n backend orchestration and Python microservices for document and finance pipelines.',
      'n8n オーケストレーションと Python マイクロサービスによるドキュメント・財務パイプラインのノーコード自動化。'
    ),
    stacks: ['Python', 'n8n', 'Node.js', 'PostgreSQL', 'AWS'],
    performance: [
      { label: 'Lighthouse', value: 92 },
      { label: 'LCP', value: 1.6, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.04, max: 0.1 },
      { label: 'TBT', value: 260, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['n8n process graphs', 'Python doc parsers', 'Finance ops −50%'],
      ['n8n プロセスグラフ', 'Python 文書解析', '財務 ops −50%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'CoreFactors',
    url: 'https://corefactors.ai/',
    category: L('AI · RevOps Automation', 'AI · RevOps 自動化'),
    description: L(
      'Revenue operations platform with Python lead scoring, Zapier CRM sync, and automated nurture sequence triggers.',
      'Python リードスコア・Zapier CRM 同期・ナーチャーシーケンストリガーを備えた RevOps 自動化基盤。'
    ),
    stacks: ['Python', 'Zapier', 'FastAPI', 'React', 'HubSpot'],
    performance: [
      { label: 'Lighthouse', value: 93 },
      { label: 'LCP', value: 1.5, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TBT', value: 230, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier nurture zaps', 'Python scoring API', 'Pipeline velocity +35%'],
      ['Zapier ナーチャー', 'Python スコア API', 'パイプライン +35%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Outranking',
    url: 'https://www.outranking.io/',
    category: L('AI · SEO Automation', 'AI · SEO 自動化'),
    description: L(
      'SEO content automation with Python NLP pipelines, n8n publish workflows, and SERP-driven brief generation.',
      'Python NLP・n8n 公開ワークフロー・SERP 連動ブリーフ生成による SEO コンテンツ自動化。'
    ),
    stacks: ['Python', 'n8n', 'OpenAI', 'Next.js', 'Redis'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.4, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.02, max: 0.1 },
      { label: 'TBT', value: 190, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['n8n content publish', 'Python NLP briefs', 'Draft time −65%'],
      ['n8n コンテンツ公開', 'Python NLP ブリーフ', '下書き −65%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Predis.ai',
    url: 'https://predis.ai/',
    category: L('AI · Social Automation', 'AI · SNS 自動化'),
    description: L(
      'Social content automation with Python creative models, Zapier scheduling hooks, and multi-channel post pipelines.',
      'Python クリエイティブモデル・Zapier スケジュール・マルチチャネル投稿パイプラインによる SNS 自動化。'
    ),
    stacks: ['Python', 'Zapier', 'TensorFlow', 'React', 'AWS'],
    performance: [
      { label: 'Lighthouse', value: 93 },
      { label: 'LCP', value: 1.5, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TBT', value: 220, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier social zaps', 'Python creative gen', 'Post throughput +3×'],
      ['Zapier SNS 連携', 'Python 生成', '投稿量 +3×']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Insighto.ai',
    url: 'https://insighto.ai/',
    category: L('AI · Chat Automation', 'AI · チャット自動化'),
    description: L(
      'Conversational AI builder with Python RAG services, n8n handoff flows, and Zapier CRM ticket routing.',
      'Python RAG・n8n ハンドオフ・Zapier CRM チケット振分を備えた会話 AI ビルダー。'
    ),
    stacks: ['Python', 'n8n', 'Zapier', 'OpenAI', 'Next.js'],
    performance: [
      { label: 'Lighthouse', value: 95 },
      { label: 'LCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.0, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.02, max: 0.1 },
      { label: 'TBT', value: 170, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['n8n agent handoffs', 'Python RAG stack', 'Support deflection −42%'],
      ['n8n エージェント引継', 'Python RAG', 'サポート −42%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'Chattr.ai',
    url: 'https://chattr.ai/',
    category: L('Automation · Support AI', '自動化 · サポート AI'),
    description: L(
      'Customer support automation with Zapier ticket creation, Python intent classification, and n8n escalation paths.',
      'Zapier チケット生成・Python 意図分類・n8n エスカレーションを備えたカスタマーサポート自動化。'
    ),
    stacks: ['Python', 'Zapier', 'n8n', 'FastAPI', 'React'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.4, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.1, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TBT', value: 200, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier helpdesk sync', 'Python intent ML', 'First response −58%'],
      ['Zapier ヘルプデスク', 'Python 意図 ML', '初回応答 −58%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'HubEngage',
    url: 'https://www.hubengage.com/',
    category: L('SaaS · Engagement Automation', 'SaaS · エンゲージ自動化'),
    description: L(
      'Employee engagement SaaS with Python analytics jobs, Zapier HRIS connectors, and n8n pulse-survey automation.',
      'Python 分析ジョブ・Zapier HRIS 連携・n8n パルスサーベイ自動化を備えた従業員エンゲージ SaaS。'
    ),
    stacks: ['Python', 'Zapier', 'n8n', 'React', 'GraphQL'],
    performance: [
      { label: 'Lighthouse', value: 94 },
      { label: 'LCP', value: 1.6, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.03, max: 0.1 },
      { label: 'TBT', value: 210, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier HRIS zaps', 'Python cohort analytics', 'Survey ops −45%'],
      ['Zapier HRIS', 'Python コホート分析', 'サーベイ ops −45%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'SynLabs',
    url: 'https://synlabs.io/',
    category: L('AI · Research Automation', 'AI · 研究自動化'),
    description: L(
      'AI research lab site with Python experiment pipelines, n8n dataset ingestion, and Zapier lab-notebook sync.',
      'Python 実験パイプライン・n8n データセット取込・Zapier ラボノート同期を備えた AI 研究ラボ。'
    ),
    stacks: ['Python', 'n8n', 'Zapier', 'Next.js', 'TensorFlow'],
    performance: [
      { label: 'Lighthouse', value: 95 },
      { label: 'LCP', value: 1.3, unit: 's', max: 2.5 },
      { label: 'FCP', value: 1.0, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.02, max: 0.1 },
      { label: 'TBT', value: 180, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['n8n data ingestion', 'Python ML pipelines', 'Experiment setup −50%'],
      ['n8n データ取込', 'Python ML', '実験セットアップ −50%']
    ),
  },
  {
    group: 'automation',
    detailed: true,
    name: 'AI4Seniors',
    url: 'https://www.ai4seniors.info/',
    category: L('AI · Accessibility Automation', 'AI · アクセシビリティ自動化'),
    description: L(
      'Senior-focused AI education with Python content generators, Zapier newsletter flows, and n8n lesson-delivery triggers.',
      'Python コンテンツ生成・Zapier ニュースレター・n8n レッスン配信トリガーを備えたシニア向け AI 教育。'
    ),
    stacks: ['Python', 'Zapier', 'n8n', 'Next.js', 'OpenAI'],
    performance: [
      { label: 'Lighthouse', value: 96 },
      { label: 'LCP', value: 1.2, unit: 's', max: 2.5 },
      { label: 'FCP', value: 0.9, unit: 's', max: 2.5 },
      { label: 'CLS', value: 0.01, max: 0.1 },
      { label: 'TBT', value: 150, unit: 'ms', max: 600 },
    ],
    highlights: L(
      ['Zapier email flows', 'Python lesson gen', 'Outreach automation +60%'],
      ['Zapier メール', 'Python レッスン生成', 'リーチ +60%']
    ),
  },
];

const globalStackGroupsData = [
  { title: 'Automation · n8n / Zapier', items: ['Python', 'n8n', 'Zapier', 'FastAPI', 'Redis'], stats: { projects: 14, avgLh: 94, avgLcp: '1.4s' } },
  { title: 'React / Next.js', items: ['React', 'Next.js', 'TypeScript', 'Vercel', 'Sass'], stats: { projects: 18, avgLh: 96, avgLcp: '1.2s' } },
  { title: 'Vue / Laravel', items: ['Vue 3', 'Laravel', 'PHP', 'Vite', 'MySQL'], stats: { projects: 12, avgLh: 95, avgLcp: '1.3s' } },
  { title: 'WordPress / PHP', items: ['WordPress', 'PHP', 'Sass', 'WooCommerce', 'ACF'], stats: { projects: 22, avgLh: 95, avgLcp: '1.4s' } },
  { title: 'Web3 / Blockchain', items: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Hardhat'], stats: { projects: 6, avgLh: 93, avgLcp: '1.5s' } },
  { title: 'AI / Python', items: ['Python', 'FastAPI', 'OpenAI', 'Next.js', 'TensorFlow'], stats: { projects: 16, avgLh: 94, avgLcp: '1.4s' } },
];

export function getJapanProjects(lang, group) {
  return japanProjectsData
    .filter((p) => !group || p.group === group)
    .map((p) => ({
      ...p,
      category: pick(p.category, lang),
      description: pick(p.description, lang),
      highlights: pick(p.highlights, lang),
    }));
}

export function getGlobalFeatured(lang) {
  return {
    ...globalFeaturedData,
    category: pick(globalFeaturedData.category, lang),
    description: pick(globalFeaturedData.description, lang),
    highlights: pick(globalFeaturedData.highlights, lang),
  };
}

export function getGlobalProjects(lang, group) {
  return globalProjectsData
    .filter((p) => !group || p.group === group)
    .map((p) => ({
      ...p,
      category: pick(p.category, lang),
      description: pick(p.description, lang),
      highlights: pick(p.highlights, lang),
    }));
}

export function getGlobalStackGroups() {
  return globalStackGroupsData;
}
