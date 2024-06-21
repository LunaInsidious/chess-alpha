export const generateUniqueId = (): string => {
  const uniqueId = Math.random().toString(32).substring(2);
  return uniqueId;
};
