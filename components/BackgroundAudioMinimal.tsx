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

    const tryPlay = async (muted: boolean): Promise<boolean> => {
      audio.muted = muted;
      try {
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
          }
        };
        window.addEventListener('click', onInteraction, true);
        window.addEventListener('keydown', onInteraction, true);
        return;
      }
      console.error('BackgroundAudioMinimal: unable to autoplay (audible or muted).');
    })();

    // Quick check for 404s
    fetch('/sandhanam.mp3', { method: 'HEAD' }).then(res => {
      if (!res.ok) console.warn('BackgroundAudioMinimal: sandhanam.mp3 not found (HTTP ' + res.status + ')');
    }).catch(() => console.warn('BackgroundAudioMinimal: HEAD check failed'));

    return () => {
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src="/sandhanam.mp3" preload="auto" loop hidden />;
};

export default BackgroundAudioMinimal;
