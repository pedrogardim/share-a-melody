import * as Tone from 'tone';

export const timeToPixels = (time, element) => {
  const timeInMeasures =
    Tone.Time(time).toSeconds() / Tone.Time('1m').toSeconds();

  return timeInMeasures * (element?.offsetWidth / 4);
};
