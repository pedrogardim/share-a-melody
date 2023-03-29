import { FMSynth } from '@/js/tone';
import * as Tone from 'tone';

export const playMelody = (melody) => {
  Tone.start();
  Tone.Transport.seconds = 0;
  //Tone.Transport.setLoopPoints(0, '2:0:0');
  Tone.Transport.loop = false;
  Tone.Transport.cancel(0);
  Tone.Transport.start();

  console.log(melody.notes);
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
};
