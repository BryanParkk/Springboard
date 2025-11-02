export function asArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.rows)) return data.rows;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
}
