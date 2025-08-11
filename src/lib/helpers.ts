export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export function formatFullName(
  first: string,
  middle: string,
  last: string
): string {
  const middleInitial = middle ? `${middle[0].toUpperCase()}.` : '';
  return [first, middleInitial, last]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
