export const formatTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleTimeString("ru-RU", options);
};
