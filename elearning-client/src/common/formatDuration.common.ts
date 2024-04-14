export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - hours * 3600 - minutes * 60;
  if (seconds > 9) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:0${seconds}`;
  }
};

export const formatDurationTitle = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  if (hours > 9) {
    return `${hours} giờ ${minutes} phút`;
  } else {
    return `0${hours} giờ ${minutes} phút`;
  }
};
