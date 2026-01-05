import { Mantra } from '../types';

export const mantras: Mantra[] = [
  // 觉察类
  {
    id: 'm001',
    category: '觉察',
    content: '此刻，我在这里。\n呼吸在发生，念头在流动。\n我只是观察。',
    tags: ['presence', 'awareness', 'breath'],
  },
  {
    id: 'm002',
    category: '觉察',
    content: '注意到了吗？\n你正在体验"注意到"本身。\n这就是觉知。',
    tags: ['meta-awareness', 'consciousness'],
  },
  {
    id: 'm003',
    category: '觉察',
    content: '感受存在于标签之前。\n先感受，再命名。\n或者，只是感受。',
    tags: ['raw-experience', 'pre-conceptual'],
  },

  // 放下类
  {
    id: 'm004',
    category: '放下',
    content: '这个念头不需要被解决。\n它只是一个念头。\n让它来，让它去。',
    tags: ['thought', 'letting-go', 'non-attachment'],
  },
  {
    id: 'm005',
    category: '放下',
    content: '你不是你的焦虑。\n焦虑是一个访客。\n你是接待焦虑的空间。',
    tags: ['anxiety', 'spaciousness', 'identity'],
  },
  {
    id: 'm006',
    category: '放下',
    content: '未来是想象。\n过去是记忆。\n此刻是唯一真实发生的地方。',
    tags: ['time', 'present', 'reality'],
  },

  // 接纳类
  {
    id: 'm007',
    category: '接纳',
    content: '此刻的你，已经完整。\n不需要修正，不需要改进。\n只需要看见。',
    tags: ['self-acceptance', 'wholeness'],
  },
  {
    id: 'm008',
    category: '接纳',
    content: '抵抗创造痛苦。\n接纳创造空间。\n在空间中，改变自然发生。',
    tags: ['acceptance', 'resistance', 'change'],
  },
  {
    id: 'm009',
    category: '接纳',
    content: '这个感受是被允许的。\n所有感受都是被允许的。\n它们只是能量在移动。',
    tags: ['emotion', 'permission', 'energy'],
  },

  // 质疑类
  {
    id: 'm010',
    category: '质疑',
    content: '这个想法是真的吗？\n你能百分百确定吗？\n没有这个想法，你是谁？',
    tags: ['inquiry', 'belief', 'byron-katie'],
  },
  {
    id: 'm011',
    category: '质疑',
    content: '谁在观察这个念头？\n谁在感到焦虑？\n向内看，找到观察者。',
    tags: ['self-inquiry', 'witness', 'ramana'],
  },
  {
    id: 'm012',
    category: '质疑',
    content: '"应该"来自哪里？\n是真实的需要，还是内化的声音？\n倾听你真正的需要。',
    tags: ['should', 'internalization', 'authentic-need'],
  },

  // 链接类
  {
    id: 'm013',
    category: '链接',
    content: '呼吸连接身体。\n身体连接大地。\n你从未分离。',
    tags: ['connection', 'grounding', 'body'],
  },
  {
    id: 'm014',
    category: '链接',
    content: '这个身体里有十万亿个细胞。\n此刻，它们在协同工作。\n你就是这个奇迹。',
    tags: ['body-wisdom', 'miracle', 'interconnection'],
  },
  {
    id: 'm015',
    category: '链接',
    content: '你的痛苦不是孤独的。\n此刻，有人和你感受相同。\n这是shared humanity。',
    tags: ['compassion', 'shared-humanity', 'connection'],
  },

  // 行动类
  {
    id: 'm016',
    category: '行动',
    content: '下一个最小的步骤是什么？\n不是完美的计划，是下一步。\n做那一步。',
    tags: ['action', 'tiny-steps', 'perfectionism'],
  },
  {
    id: 'm017',
    category: '行动',
    content: '这是一个实验。\n不是考试，是探索。\n允许失败，收集数据。',
    tags: ['experimentation', 'growth-mindset', 'learning'],
  },
  {
    id: 'm018',
    category: '行动',
    content: '专注于过程，不是结果。\n你只能控制此刻的行动。\n这就够了。',
    tags: ['process', 'control', 'presence'],
  },

  // 休息类
  {
    id: 'm019',
    category: '休息',
    content: '什么都不做，也是一种做。\n休息是生产力的一部分。\n允许停顿。',
    tags: ['rest', 'pause', 'productivity'],
  },
  {
    id: 'm020',
    category: '休息',
    content: '你已经够努力了。\n真的，够了。\n现在可以放松。',
    tags: ['enough', 'self-compassion', 'relaxation'],
  },
  {
    id: 'm021',
    category: '休息',
    content: '三次深呼吸。\n第一次，释放肩膀。\n第二次，释放腹部。\n第三次，释放一切。',
    tags: ['breath', 'release', 'somatic'],
  },

  // 视角类
  {
    id: 'm022',
    category: '视角',
    content: '拉远视角。\n一年后，这还重要吗？\n十年后呢？',
    tags: ['perspective', 'zoom-out', 'priorities'],
  },
  {
    id: 'm023',
    category: '视角',
    content: '你是一个在进化中的系统。\n今天的你，已经不同于昨天。\n每一刻都是新的。',
    tags: ['growth', 'evolution', 'newness'],
  },
  {
    id: 'm024',
    category: '视角',
    content: '从身体的智慧看这件事。\n不是从思维，从感受。\n身体知道。',
    tags: ['somatic-wisdom', 'intuition', 'embodiment'],
  },
];

export const categories = Array.from(new Set(mantras.map(m => m.category)));
