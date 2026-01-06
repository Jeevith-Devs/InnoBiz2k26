/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';

const BackgroundAudioMinimal: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configure audio for looping
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'auto';

    const tryPlay = async (muted: boolean): Promise<boolean> => {
      audio.muted = muted;
      try {
        // Wait for audio to be ready before playing
        if (audio.readyState < 2) {
          await new Promise<void>((resolve, reject) => {
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              resolve();
            };
            const onError = () => {
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
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
        console.warn('BackgroundAudioMinimal: play attempt failed', { muted, err });
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
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src="/sandhanam.mp3" preload="auto" loop hidden />;
};

export default BackgroundAudioMinimal;
