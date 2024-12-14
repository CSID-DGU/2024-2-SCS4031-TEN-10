export const formatTime = (dateTime: string) => {
  if (!dateTime) return;

  const now = new Date();

  const pastDate = new Date(dateTime);
  pastDate.setHours(pastDate.getHours() - 9);

  // 두 날짜 간의 차이를 밀리초 단위로 계산
  const timeDifference: number = now.getTime() - pastDate.getTime();

  // 시간 차이를 분 단위로 계산
  const minutesDifference = timeDifference / (1000 * 60);

  if (minutesDifference < 1) {
    return "방금 전";
  } else if (minutesDifference < 60) {
    return `${Math.floor(minutesDifference)}분 전`;
  } else if (minutesDifference < 60 * 24) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference}시간 전`;
  } else if (now.getFullYear() === pastDate.getFullYear()) {
    const month = pastDate.getMonth() + 1;
    const day = pastDate.getDate();
    return `${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
  } else {
    return dateTime.split("T")[0];
  }
};
