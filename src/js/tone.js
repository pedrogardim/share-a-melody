import * as Tone from 'tone';

const instrumentOptions = {
  harmonicity: 50,
  modulationIndex: 20,
  oscillator: {
    type: 'sine2',
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.0,
    release: 0.2,
  },
  modulation: {
    type: 'sine',
  },
  modulationEnvelope: {
    attack: 0.001,
    decay: 0.5,
    sustain: 0,
    release: 0.0,
  },
};

Tone.Transport.loop = true;

const reverbModule = new Tone.Reverb({ wet: 0.35 }).toDestination();

export const FMSynth = new Tone.PolySynth(
  Tone.FMSynth,
  instrumentOptions
).connect(reverbModule);
