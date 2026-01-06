/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';

const BackgroundAudioMinimal: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Use BASE_URL for proper path resolution in Vercel
  // Fallback to absolute path if BASE_URL is not available
  const baseUrl = (import.meta as any).env?.BASE_URL || '/';
  const audioSrc = `${baseUrl}sandhanam.mp3`.replace(/\/\//g, '/');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Log the audio source for debugging
    console.debug('BackgroundAudioMinimal: audio source', audioSrc);

    // Configure audio for looping
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'auto';

    // Add error handler to log loading issues
    const handleError = (e: Event) => {
      console.error('BackgroundAudioMinimal: audio error', {
        error: e,
        src: audioSrc,
        readyState: audio.readyState,
        networkState: audio.networkState
      });
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

    // Start loading immediately
    audio.load();

    // Try to autoplay: audible first, then muted fallback
    (async () => {
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
    })();

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [audioSrc]);

  return <audio ref={audioRef} src={audioSrc} preload="auto" loop hidden />;
};

export default BackgroundAudioMinimal;
