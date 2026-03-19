export interface FlagLabel {
  key: string;
  text: string;
  href?: string;
}

export const flagLabels: FlagLabel[] = [
  { key: 'services', text: 'Our Services', href: '#services' },
  { key: 'faq', text: 'FAQ', href: '/faq' },
  { key: 'work', text: 'Our Work', href: '#work' },
  { key: 'contact', text: 'Contact Us', href: '/contact' },
  { key: 'solar-system', text: 'Solar System', href: '/solar-system' },
];

export function getLabelByKey(key: string) {
  const found = flagLabels.find(l => l.key === key);
  return found ? found.text : '';
}
