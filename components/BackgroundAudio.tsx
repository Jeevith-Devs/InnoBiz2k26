/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';

const BackgroundAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [visibleBanner, setVisibleBanner] = useState(false);























  // Autoplay muted so browsers will allow playback without user interaction.
  // The audio element is hidden and loops indefinitely.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = true;

    // we'll attempt playback in a single, consolidated routine below (audible first, then muted fallback).

    return () => {
      if (!audio) return;
      audio.pause();
    };
  }, []);

  // Autoplay muted — try to start muted playback and surface a banner on failure.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Quick HEAD check to ensure file exists (helps debug 404s)
    fetch('/sandhanam.mp3', { method: 'HEAD' }).then(res => {
      if (!res.ok) {
        console.warn('BackgroundAudio: sandhanam.mp3 not found (HTTP ' + res.status + ')');
        setVisibleBanner(true);
        setAutoplayFailed(true);
      }
    }).catch(err => {
      console.warn('BackgroundAudio: HEAD check failed', err);
    });

    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = true;

    const onPlay = () => {
      console.debug('BackgroundAudio: play event');
      setIsPlaying(true);
      setIsMuted(audio.muted);
      setAutoplayFailed(false);
      setVisibleBanner(false);
    };

    const onError = (ev: Event) => {
      console.error('BackgroundAudio: audio error', ev);
      setAutoplayFailed(true);
      setVisibleBanner(true);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('error', onError);

    (async () => {
      try {
        await audio.play();
        console.debug('BackgroundAudio: autoplay succeeded (muted)');
        setIsPlaying(true);
        setAutoplayFailed(false);
      } catch (err) {
        console.warn('BackgroundAudio: autoplay failed', err);
        setIsPlaying(false);
        setAutoplayFailed(true);
        setVisibleBanner(true);
      }
    })();

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('error', onError);
      audio.pause();
    };
  }, []);

  const enableSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    setIsMuted(false);
    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayFailed(false);
      setVisibleBanner(false);
      console.debug('BackgroundAudio: playback started (audible)');
    } catch (err) {
      console.error('BackgroundAudio: enableSound failed', err);
      setAutoplayFailed(true);
      setVisibleBanner(true);
    }
  };

  const dismissBanner = () => setVisibleBanner(false);

  return (
    <>
      <audio ref={audioRef} src="/sandhanam.mp3" preload="auto" loop hidden />

      {visibleBanner && (
        <div className="fixed bottom-4 right-4 z-50 bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-md shadow-md flex items-center gap-3">
          <div className="text-sm">
            {autoplayFailed ? 'Audio failed to autoplay. Click to enable sound.' : 'Background audio unavailable.'}
          </div>
          <button className="px-3 py-1 rounded bg-orange-500 text-white text-sm" onClick={enableSound}>
            Enable sound
          </button>
          <button className="px-2 py-1 rounded border" onClick={dismissBanner}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default BackgroundAudio;