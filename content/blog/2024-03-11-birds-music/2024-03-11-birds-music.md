---
title: Birds, Music, Cognition
description: A paper and talk that sit squarely in my areas of interest.
date: 2024-03-11
updatedOn: 
tags:
  - birds
  - music
  - just-intonation
  - harmonic-series
  - cognition
  - science
draft: false
eleventyExcludeFromCollections: false
---
On Sunday I came across two fascinating and coincidentally convergent things that I'll share with you here: a paper on songbird sound cognition that demonstrates just how differently European Starlings hear the world than humans, and a coding talk that was really all about bird song, music, and just intonation. 

## Songsbird use spectral shape, not pitch, for sound pattern recognition

>"Past work characterizes songbirds as having a strong bias to rely on absolute pitch for the recognition of tone sequences. In a series of behavioral experiments, we find that the **human percepts of both pitch and timbre are poor descriptions of the perceptual cues used by birds for melody recognition**. We suggest instead that auditory sequence recognition in some species reflects more **direct perception of acoustic spectral shape**. Signals that preserve this shape, even in the absence of pitch, allow for generalization of learned patterns."

You can find the paper [here](https://www.pnas.org/doi/abs/10.1073/pnas.1515380113) and the supporting materials [here](https://www.pnas.org/doi/suppl/10.1073/pnas.1515380113/suppl_file/pnas.201515380si.pdf).

The study design was essentially asking starlings to determine whether a sequence of musical sounds was ascending or descending in pitch. They would get a treat if they chose the correct "response port" (Fig 1 A). 

The birds would have a training session on certain musical sequences, then afterwards would be tested on variations of the musical sequences. The researchers assume if the birds recognized the new sequences as being similar to the training sequences, they would be able to choose the "correct" response port more quickly and reliably.

{% image "./figure1.png", "Figure 1 from the study" %}

## Transposition

When tested with variations that preserve melody and timbre but are transposed up or down, the starlings performed poorly on the tests.

Here is one of the musical sequences the starlings were trained on where the notes are ascending a whole-tone scale, with different timbres for each note (synesthetically shown in Fig 1 B above: first a blue oboe, then a red choir "aah", then a green muted trumpet, then a purple synthesizer): 

<audio src="./pnas.1515380113.sa01.wav" controls></audio>

Here is a test sequence where the relative changes in pitch and timbre are the same but it is transposed down four semitones:

<div class="flex items-center gap-4"><audio src="./pnas.1515380113.sa03.wav" controls></audio>
<span>❌</span></div>



The fact that the starlings did not recognize the transposed melody seems to support bird cognition based on absolute pitch as was previously thought. A song sung in a different key is perceived as a completely different song to the starlings. Apparently this is old news, but it is still intuitively surprising! 

## Timbre

I'm going to try not to get all the way into it, but timbre (pronounced "tamber") is the perceived tone quality of a note. Most sounds you hear are a combination of many different frequencies or overtones. Our brain combines all of the overtones into a single *sound* with a particular *quality*. We might call the timbre "bright" or "dark" or "nasal" or "pure". 

For example, when someone blasts a trumpet, we hear it as bright because the amplitudes of the overtones are strong relative to the fundamental frequency. When a trumpet plays with a mute, it can sound "nasal" because the fundamental frequency is muted so much that the overtones are louder than the base frequency. A flute is relatively "pure" because the overtones are muted compared to the fundamental tone. 

Whatever the timbre might be, we hear all of these overtones as related, so much so that it is difficult for us to pick out the individual parts of the sound. It just sounds like a single sound with a certain quality to it, a.k.a. timbre.

When the researchers changed the timbre but preserved the fundamental frequencies of the melody (same melody, different instrument), starlings were again unable to recognize the melodies and performed poorly on the tests.

Original trained sequence:
<audio src="./pnas.1515380113.sa01.wav" controls></audio>

Same pitches, different timbre (all piano):

<div class="flex items-center gap-4"><audio src="./pnas.1515380113.sa06.wav" controls></audio>
<span>❌</span></div>

This is unexpected... to our ears these sequences are very similar. The base frequencies must not be the primary cognitive anchor for the birds. 

>"...human percepts of both pitch and timbre are poor descriptions of the perceptual cues used by birds for melody recognition."

## Spectral shape

Here we go. Spectral shape. I think the easiest way to think about spectral shape is by looking at a spectrogram.

<iframe src="https://macaulaylibrary.org/asset/125582211/embed" height="383" width="100%" frameborder="0" allowfullscreen></iframe>

Visually you can see that each sound has a particular shape. You can interpret the spectrogram in relation to how we hear it: the thin dark lines are more "tone-like" and the rougher blurry looking sounds are more "noisy", lines move up and down as the pitch gets higher or lower, etc. 

When more of the spectral shape is preserved, but the tonal frequencies are obscured using a noise vocoder, the starlings performed very well on the tests!

Original trained sequence:
<audio src="./pnas.1515380113.sa01.wav" controls></audio>

Noise vocoded sequence with periodic frequencies removed:

<div class="flex items-center gap-4"><audio src="./pnas.1515380113.sa09.wav" controls></audio><span>✅</span></div>

As the starling hears it, this sounds the most similar!

If you squint at the spectrograms of these sounds, it starts to make more sense. 

{% image "./spectrograms.png", "Spectrogram of test stimuli" %}

Moving from left to right in each spectrogram, there's a short building, taller building, shorter building, and then the tallest building. The training stimuli have stronger lines, because they are more tonal, while the Noise Vocoded Stimuli are visually more fuzzy and therefore noisy – but the overall spectral shape of the "buildings" is similar. 

>One interpretation of these results is that the percepts of both pitch and timbre provide relatively poor descriptions of the perceptual cues available to starlings. We reasoned instead that starlings may rely on a perception of each tone based on its absolute spectral envelope (i.e., the overall pattern of spectral amplitudes across particular frequency bands) rather than abstracted features derived from the fundamental frequency (AP) or on the relative power in the harmonics (timbre).

## Bird song is not music?

At the end of the paper, there is a tantalizing suggestion:

>In humans, speech recognition is famously robust to the pitch-degrading manipulations introduced by noise vocoders (43), whereas similar manipulations have severe impacts on music perception (44). Our observation that birds rely on spectral shape features to recognize sound sequences suggests a similarity to human speech recognition.

If you run music through a noise vocoder, most people would have a harder time picking out the tune or even recognizing it as music. We are able to understand speech when similarly manipulated though. When someone whispers to you, aside from being quieter, it is like running their normal speaking voice through a noise vocoder. Certain aspects of the spectral shape are preserved and we can still extract meaning. We're still able to understand what is being *said*. 

Bird song cognition seems to be neurologically more closely related to our own speech cognition than music cognition. Bird "song" may be more like speaking than singing. Let that sink in for a moment. 

## Also, bird song is music

Whatever birds' intents may be, that doesn't mean we can't listen to bird song as music. I came across [this talk from Chris Ford](https://www.youtube.com/watch?v=OCYU0LtqRH0) about code, bird song, and music, specifically just-intonation, and even included off-hand references to Steve Reich. Obviously it resonated with me. 

It was given at a tech conference and has live coding throughout, but really it is a music and bird sound talk. Depending on your mood and disposition, there is a very funny/transcendent musical jam at the end. I suggest you check it out. 

Birds are one of the more sonically participatory groups of animals, a large part of why I find them so fascinating. Birds make sound. It seems their experience of sound is wildly different than our own though.

How does the starling hear the world?

<iframe src="https://macaulaylibrary.org/asset/192982631/embed" height="383" width="100%" frameborder="0" allowfullscreen></iframe>


