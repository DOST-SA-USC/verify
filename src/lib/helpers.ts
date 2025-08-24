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
  last: string,
  suffix?: string
): string {
  const middleInitial = middle ? `${middle[0].toUpperCase()}.` : '';
  const nameParts = [first, middleInitial, last].filter(Boolean).join(' ');
  return suffix
    ? `${nameParts}, ${suffix}`.replace(/\s+/g, ' ').trim()
    : nameParts.replace(/\s+/g, ' ').trim();
}
