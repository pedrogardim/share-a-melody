import { FMSynth } from '@/js/tone';
import * as Tone from 'tone';

export const playMelody = (melody, isEditor) => {
  Tone.start();
  Tone.Transport.loop = false;
  Tone.Transport.cancel(0);

  melody.notes.map((note) => {
    let event = Tone.Transport.schedule((time) => {
      FMSynth.triggerAttackRelease(
        Tone.Frequency(note.note, 'midi').toNote(),
        note.duration,
        time
      );
    }, note.time);
    return event;
  });
  if (isEditor) {
    Tone.Transport.setLoopPoints(
      ...[melody.loop[0], melody.loop[1] + 1].map(
        (m) => m * Tone.Time('1m').toSeconds()
      )
    );
    Tone.Transport.loop = true;
    return;
  }
  Tone.Transport.seconds = 0;
  Tone.Transport.start();
};
