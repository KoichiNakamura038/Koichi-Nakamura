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

export function getGameOverview(lang) {
  return {
    title: t('games.overviewTitle'),
    subtitle: t('games.overviewSubtitle'),
    metrics: [
      { label: t('games.metricTitles'), value: 3, suffix: '' },
      { label: t('games.metricEngines'), value: 2, suffix: '+' },
      { label: t('games.metricPlatforms'), value: 4, suffix: '+' },
      { label: t('games.metricYears'), value: 4, suffix: '+' },
    ],
    stacks: ['Unity', 'C#', 'Web3 Wallet', 'Live Ops', 'Cloud Sync', 'Game Systems', 'Metaverse', 'Multiplayer'],
  };
}

const gameProjectsData = [
  {
    name: 'XANA Metaverse',
    video: '/media/games/xana-metaverse.mp4',
    category: L('Metaverse · Web3 · Wallet', 'メタバース · Web3 · ウォレット'),
    role: L('Game Systems · Wallet Integration', 'ゲームシステム · ウォレット連携'),
    description: L(
      'Contributed to core metaverse gameplay systems and Web3 wallet integration — connecting in-world economies, NFT asset flows, and on-chain authentication with a seamless player UX across desktop and mobile clients.',
      'メタバースのコアゲームプレイシステムと Web3 ウォレット連携を担当。ワールド内経済・NFT アセットフロー・オンチェーン認証を、デスクトップ/モバイル双方でシームレスな UX として統合。'
    ),
    stacks: ['Unity', 'C#', 'Web3.js', 'WalletConnect', 'Node.js', 'Solidity'],
    highlights: L(
      ['Wallet connect & asset bridge', 'In-game economy systems', 'Cross-platform metaverse UX'],
      ['ウォレット接続 & アセットブリッジ', 'ゲーム内経済システム', 'クロスプラットフォーム UX']
    ),
  },
  {
    name: 'Kaleidoscope',
    video: '/media/games/kaleidoscope.mp4',
    category: L('2D Puzzle · Live Ops', '2D パズル · Live Ops'),
    role: L('Unity · Cloud Sync · Live Ops', 'Unity · クラウド同期 · Live Ops'),
    description: L(
      'Built a 2D puzzle title with Unity — cloud save sync, remote config, and live-ops tooling for seasonal events, difficulty tuning, and player progression without forced app updates.',
      'Unity 製 2D パズルゲーム。クラウドセーブ同期・リモートコンフィグ・Live Ops 基盤を構築し、シーズンイベントや難易度調整をアプリ更新なしで運用可能に。'
    ),
    stacks: ['Unity', 'C#', 'Firebase', 'Cloud Functions', 'REST API', 'Live Ops'],
    highlights: L(
      ['Cross-device cloud sync', 'Remote config & A/B tuning', 'Seasonal live-ops pipeline'],
      ['デバイス横断クラウド同期', 'リモートコンフィグ & A/B', 'シーズン Live Ops パイプライン']
    ),
  },
  {
    name: 'Bedroom Brawl',
    video: '/media/games/bedroom-brawl.mp4',
    category: L('Fighting · Game Systems', '格闘 · ゲームシステム'),
    role: L('Combat Systems · Multiplayer', '戦闘システム · マルチプレイ'),
    description: L(
      'Developed combat mechanics, hit detection, and match flow for a fast-paced bedroom-themed fighter — balancing frame data, input buffering, and rollback-friendly netcode for responsive local and online play.',
      '寝室を舞台にした高速格闘ゲームの戦闘メカニクス・当たり判定・マッチフローを開発。フレームデータ・入力バッファ・ロールバック対応ネットコードで、ローカル/オンライン双方の応答性を最適化。'
    ),
    stacks: ['Unity', 'C#', 'Photon', 'Netcode', 'Animation', 'Game Design'],
    highlights: L(
      ['Frame-perfect combat systems', 'Input buffer & rollback netcode', 'Match flow & ranking hooks'],
      ['フレーム精度の戦闘システム', '入力バッファ & ロールバック', 'マッチフロー & ランキング連携']
    ),
  },
];

export function getGameProjects(lang) {
  return gameProjectsData.map((p) => ({
    ...p,
    category: pick(p.category, lang),
    role: pick(p.role, lang),
    description: pick(p.description, lang),
    highlights: pick(p.highlights, lang),
  }));
}
