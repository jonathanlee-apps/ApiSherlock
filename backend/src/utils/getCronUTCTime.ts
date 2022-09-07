export async function getCronUTCTime({
  timezone,
  inputDay,
  inputHour,
  inputMinute,
}: {
  timezone: number;
  inputDay: number;
  inputHour: number;
  inputMinute: number;
}): Promise<string> {
  if (timezone < 0) {
    const diffHour = inputHour - timezone;

    if (diffHour >= 24) {
      const UTCDay = inputDay + 1;
      const UTCHour = diffHour - 24;

      return `* ${inputMinute} ${UTCHour} * * ${UTCDay}`;
    } else {
      return `* ${inputMinute} ${diffHour} * * ${inputDay}`;
    }
  } else if (timezone > 0) {
    const diffHour = inputHour - timezone;

    if (diffHour <= 0) {
      const UTCDay = inputDay - 1;
      const UTCHour = diffHour + 24;

      return `* ${inputMinute} ${UTCHour} * * ${UTCDay}`;
    } else {
      return `* ${inputMinute} ${diffHour} * * ${inputDay}`;
    }
  } else {
    return `* ${inputMinute} ${inputHour} * * ${inputDay}`;
  }
}
