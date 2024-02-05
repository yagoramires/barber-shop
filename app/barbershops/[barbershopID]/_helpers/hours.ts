import {
  addMinutes,
  format,
  getDate,
  getDay,
  getHours,
  setHours,
  setMinutes,
} from "date-fns";

export default function generateDayByTimeList(date: Date): string[] {
  const actualDay = getDate(new Date());
  const selectedDay = getDate(date);

  let startTime;
  if (actualDay !== selectedDay) {
    startTime = setMinutes(setHours(date, 9), 0);
  } else {
    const actualHours = getHours(new Date());

    startTime = setMinutes(setHours(date, actualHours + 1), 0);
  }

  const endTime = setMinutes(setHours(date, 21), 0);
  const interval = 45;
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));

    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
