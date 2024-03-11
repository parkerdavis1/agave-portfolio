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
draft: true
eleventyExcludeFromCollections: false
---
I saw a [post](https://bsky.app/profile/mehr.nz/post/3kneyz3ouye2p) on Bluesky yesterday about a fascinating 2016 paper, ["Songbirds use spectral shape, not pitch, for sound pattern recognition"](https://www.pnas.org/doi/abs/10.1073/pnas.1515380113).  

>Past work characterizes songbirds as having a strong bias to rely on absolute pitch for the recognition of tone sequences. In a series of behavioral experiments, we find that the human percepts of both pitch and timbre are poor descriptions of the perceptual cues used by birds for melody recognition. We suggest instead that auditory sequence recognition in some species reflects more direct perception of acoustic spectral shape. Signals that preserve this shape, even in the absence of pitch, allow for generalization of learned patterns.

The study design was essentially asking a starling to determine whether a sequence of musical sounds was ascending or descending in pitch. They would get a treat if they chose the correct "response port". 

{% image "./starlingtest.png", "Staring Study Design" %}

## Transposition

When tested with sequences that preserve the melody and timbre of a learned sequence but were transposed up or down, the starlings performed poorly on the tests.

Here is one of the musical sequences the starlings were trained on (from the [Supporting Materials](https://www.pnas.org/doi/suppl/10.1073/pnas.1515380113/suppl_file/pnas.201515380si.pdf)): 

<audio src="./pnas.1515380113.sa01.wav" controls></audio>

Here is a sequence where the relative changes in pitch and timbre are the same but transposed down:

<div class="flex items-center gap-4"><audio src="./pnas.1515380113.sa03.wav" controls></audio>
<span>❌</span></div>



This seems to support bird cognition based on absolute pitch as was previously thought. 
## Timbre

However, when the researchers changed the timbre but preserved the fundamental frequencies of the melody (same melody, different instrument), starlings were similarly unable to recognize the melodies and performed poorly on the tests.

Original trained sequence:
<audio src="./pnas.1515380113.sa01.wav" controls></audio>

Same pitches, different timbre:

<div class="flex items-center gap-4"><audio src="./pnas.1515380113.sa06.wav" controls></audio>
<span>❌</span></div>

This is unexpected... the base frequencies must not be the primary cognitive anchor for the birds. 
## Spectral shape

Now here is where it gets interesting. When more of the spectral shape and content is preserved (higher frequencies and harmonics), but the base frequencies are removed using a noise vocoder, the starlings performed very well on the tests!

Original trained sequence:
<audio src="./pnas.1515380113.sa01.wav" controls></audio>

Noise vocoded sequence with fundamental periodic frequencies removed:

<div class="flex items-center gap-4"><audio src="./pnas.1515380113.sa09.wav" controls></audio><span>✅</span></div>

As the starling hears it, this sounds the most similar!



>One interpretation of these results is that the percepts of both pitch and timbre provide relatively poor descriptions of the perceptual cues available to starlings. We reasoned instead that starlings may rely on a perception of each tone based on its absolute spectral envelope (i.e., the overall pattern of spectral amplitudes across particular frequency bands) rather than abstracted features derived from the fundamental frequency (AP) or on the relative power in the harmonics (timbre).

## Bird song is not music?

At the end of the paper, there is a tantalizing suggestion:

>In humans, speech recognition is famously robust to the pitch-degrading manipulations introduced by noise vocoders (43), whereas similar manipulations have severe impacts on music perception (44). Our observation that birds rely on spectral shape features to recognize sound sequences suggests a similarity to human speech recognition.

Bird song cognition could be neurologically more closely related to our own speech cognition than music cognition. As in, bird "song" is more like speaking than singing. 

## Also, bird song is music

Whatever the birds intent may be, that doesn't mean we can't listen to bird song as music. I came across [this talk from Chris Ford](https://www.youtube.com/watch?v=OCYU0LtqRH0) about bird song, music (specifically just-intonation), and code that obviously resonated with me. It was given at a tech conference and has live coding throughout, but really it is a music and bird sound talk. Depending on your mood and disposition, there is a very funny/transcendent musical jam at the end. I suggest you check it out. 

Birds are very sonically participatory and attuned, a large part of why I find them so fascinating. It seems their experience of sound is wildly different than our own. 

How does the starling hear the world?

<iframe src="https://macaulaylibrary.org/asset/192982631/embed" height="383" width="640" frameborder="0" allowfullscreen></iframe>



