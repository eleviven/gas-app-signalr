export function normalize<T = any>(
  id: keyof T | Array<keyof T>,
  list: Array<T>
) {
  return list.reduce((acc, listItem) => {
    if (!Array.isArray(id)) {
      acc[String(listItem[id])] = listItem;
    } else {
      const joinedID = id.map((key) => listItem[key]).toString();
      acc[joinedID] = listItem;
    }

    return acc;
  }, {} as Record<string, T>);
}
