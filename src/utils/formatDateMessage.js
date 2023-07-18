export default function formatDateMessage(dateStr) {
  const currentDate = new Date();
  const date = new Date(dateStr);
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;

  const dayNamesShort = [
    "dim.",
    "lun.",
    "mar.",
    "mer.",
    "jeu.",
    "ven.",
    "sam.",
  ];
  const dayNamesLong = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const monthNames = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ];

  const isToday = date.toDateString() === currentDate.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(currentDate.getTime() - oneDay).toDateString();
  const isWithinOneWeek = currentDate.getTime() - date.getTime() <= oneWeek;

  if (isToday) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `Aujourd'hui ${hours}:${minutes}`;
  } else if (isYesterday) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `Hier ${hours}:${minutes}`;
  } else if (isWithinOneWeek) {
    const dayName = dayNamesLong[date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${dayName} ${hours}:${minutes}`;
  } else {
    const dayName = dayNamesShort[date.getDay()];
    const dayNumber = String(date.getDate());
    const monthName = monthNames[date.getMonth()];
    const month =
      date.getFullYear() !== currentDate.getFullYear()
        ? `${monthName}.`
        : monthName;
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const year =
      date.getFullYear() !== currentDate.getFullYear()
        ? date.getFullYear()
        : "";
    return `${dayName} ${dayNumber} ${month} à ${hours}:${minutes} ${year}`;
  }
}
