export function timeAgo(dateParam) {
  const getDifferenceInSeconds = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
  };

  const seconds = Math.round(
    getDifferenceInSeconds(new Date(dateParam), new Date()),
  );

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}
