# Audio Processing in Python

## Introduction
This Python script demonstrates various audio processing operations using the `wave`, `numpy`, and `sounddevice` libraries. The script reads a WAV file, performs several operations on its audio data, and plays back the modified audio.

## Prerequisites

Make sure you have the following libraries installed:
- `numpy`
- `wave`
- `sounddevice`

You can install them using pip:

```bash
- pip install numpy sounddevice
```

## Description
- **Functions**
    1. read_wav(file_path): Reads a WAV file and returns audio data and sample rate.
    2. play_audio(audio_data, sample_rate): Plays audio data at the specified sample rate using sounddevice.
    3. resample_audio(audio_data, original_rate, target_rate): Resamples audio data to the specified sample rate.
    4. modify_audio(audio_data, coefficient): Modifies audio data by multiplying it with a coefficient.
    5. resample_by_half(audio_data): Resamples audio data by copying every other sample.
    6. apply_fft(audio_data): Applies FFT to audio data and eliminates high frequencies.

- **Steps**
    1. Load the WAV file and read its data.
    2. Play back the sound with different sample rates.
    3. Modify the audio by multiplying it with a coefficient and play it back.
    4. Optionally, resample the audio by copying every other sample and play it back.
    5. Optionally, apply FFT to the audio data, eliminate high frequencies, and play it back.

## Further Customization
- Adjust the file path (file_path) to point to your own WAV file.
- Modify the coefficients in the coefficients list to change the effect of audio modification.