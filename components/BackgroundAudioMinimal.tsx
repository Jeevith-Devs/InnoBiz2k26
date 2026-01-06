/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';

const BackgroundAudioMinimal: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Use absolute path for Vercel deployment
  // Try multiple path resolutions to ensure it works
  const getAudioSrc = () => {
    // Try BASE_URL first (for subdirectory deployments)
    const baseUrl = (import.meta as any).env?.BASE_URL || '';
    // Ensure we have a leading slash
    const path = baseUrl.endsWith('/') ? `${baseUrl}sandhanam.mp3` : `${baseUrl}/sandhanam.mp3`;
    return path.replace(/\/\//g, '/');
  };
  
  const audioSrc = getAudioSrc();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Log the audio source for debugging
    console.debug('BackgroundAudioMinimal: audio source', audioSrc);

    // Configure audio for looping
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'auto';

    // Try alternative paths if the main one fails
    const alternativePaths = [
      audioSrc,
      '/sandhanam.mp3',
      './sandhanam.mp3',
      `${window.location.origin}/sandhanam.mp3`
    ];
    let currentPathIndex = 0;

    // Add error handler to log loading issues and try alternatives
    const handleError = async (e: Event) => {
      console.error('BackgroundAudioMinimal: audio error', {
        error: e,
        src: audio.src,
        readyState: audio.readyState,
        networkState: audio.networkState
      });

      // Try next alternative path
      currentPathIndex++;
      if (currentPathIndex < alternativePaths.length) {
        console.log(`Trying alternative path: ${alternativePaths[currentPathIndex]}`);
        audio.src = alternativePaths[currentPathIndex];
        audio.load();
      } else {
        console.error('BackgroundAudioMinimal: All audio paths failed');
      }
    };
    audio.addEventListener('error', handleError);

    const tryPlay = async (muted: boolean): Promise<boolean> => {
      audio.muted = muted;
      try {
        // Wait for audio to be ready before playing
        if (audio.readyState < 2) {
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              reject(new Error('Audio load timeout'));
            }, 10000); // 10 second timeout

            const onCanPlay = () => {
              clearTimeout(timeout);
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              resolve();
            };
            const onError = (e: Event) => {
              clearTimeout(timeout);
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              console.error('BackgroundAudioMinimal: audio load error', e);
              reject(new Error('Audio load failed'));
            };
            audio.addEventListener('canplay', onCanPlay);
            audio.addEventListener('error', onError);
            // Start loading if not already
            audio.load();
          });
        }
        
        await audio.play();
        setIsMuted(muted);
        setIsPlaying(true);
        console.debug('BackgroundAudioMinimal: play succeeded', { muted });
        return true;
      } catch (err) {
        console.warn('BackgroundAudioMinimal: play attempt failed', { muted, err, src: audioSrc });
        return false;
      }
    };

    // Verify file exists before attempting to play
    const verifyAndPlay = async () => {
      // Try to verify the file exists with a HEAD request
      try {
        const response = await fetch(audioSrc, { method: 'HEAD' });
        if (!response.ok) {
          console.warn(`BackgroundAudioMinimal: File not found at ${audioSrc}, trying alternatives...`);
          // Try first alternative
          if (alternativePaths.length > 1) {
            audio.src = alternativePaths[1];
            audio.load();
          }
        }
      } catch (err) {
        console.warn('BackgroundAudioMinimal: File verification failed, proceeding anyway', err);
      }

      // Start loading immediately
      audio.load();

      // Try to autoplay: audible first, then muted fallback
      const audibleOk = await tryPlay(false);
      if (audibleOk) return;
      
      const mutedOk = await tryPlay(true);
      if (mutedOk) {
        // Unmute on user interaction
        const onInteraction = async () => {
          const unmutedOk = await tryPlay(false);
          if (unmutedOk) {
            window.removeEventListener('click', onInteraction, true);
            window.removeEventListener('keydown', onInteraction, true);
            window.removeEventListener('touchstart', onInteraction, true);
          }
        };
        window.addEventListener('click', onInteraction, true);
        window.addEventListener('keydown', onInteraction, true);
        window.addEventListener('touchstart', onInteraction, true);
        return;
      }
      console.error('BackgroundAudioMinimal: unable to autoplay (audible or muted).');
    };

    verifyAndPlay();

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [audioSrc]);

  return <audio ref={audioRef} src={audioSrc} preload="auto" loop hidden />;
};

export default BackgroundAudioMinimal;
