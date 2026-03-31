export interface FlagLabel {
  key: string;
  text: string;
  href?: string;
}

export const flagLabels: FlagLabel[] = [
  { key: 'services', text: 'Our Services', href: '#services' },
  { key: 'blog', text: 'Blog', href: '/blog' },
  { key: 'faq', text: 'FAQ', href: '/faq' },
  { key: 'work', text: 'Our Work', href: '#work' },
  { key: 'contact', text: 'Contact Us', href: '/contact' },
];

export function getLabelByKey(key: string) {
  const found = flagLabels.find(l => l.key === key);
  return found ? found.text : '';
}
