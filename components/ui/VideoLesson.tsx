"use client";

import "@mux/mux-player";
import React, { useRef, useState, useEffect } from "react";
import { NoteBook, VolumeOff, VolumeOn } from "./Icons";

interface MuxPlayerElement extends HTMLElement {
  muted: boolean;
  play: () => Promise<void>;
  pause: () => void;
}

const VideoLesson = () => {
  const playbackId = "Ys01rL65mPmdWKj4qhfC244SeBCd2Kl9ixVWtZ1WnteU";
  const playerRef = useRef<MuxPlayerElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.muted = muted;
      playerRef.current.play();
    }
  }, [muted]);

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.muted = !muted;
    }
    setMuted((prev) => !prev);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl relative">
      {React.createElement("mux-player", {
        ref: playerRef,
        "playback-id": playbackId,
        "stream-type": "on-demand",
        autoplay: true,
        muted: muted,
        loop: true,
        controls: false,
        width: "100%",
        height: "auto",
        style: { display: "block" },
      })}

      <div className="absolute inset-0 z-20 pointer-events-auto"></div>

      <div className="flex items-center gap-2 absolute z-30 bg-[#000000]/20 top-4 left-4 backdrop-blur-[24px] py-[10px] rounded-[40px] px-[12px]">
        <div className="w-3 h-3 rounded-full bg-[#52CE91]"></div>
        <span className="text-xs leading-4 font-helveticaneue-regular text-white">
          კარგი კავშირი
        </span>
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-4 left-4 z-30 bg-[#000000]/20 backdrop-blur-[24px] px-3 py-2 rounded-[40px]"
      >
        {muted ? <VolumeOff /> : <VolumeOn />}
      </button>

      <div className="absolute bottom-4 right-4 z-30 bg-[#000000]/20 backdrop-blur-[24px] flex items-center gap-2 px-3 py-2 rounded-[40px]">
        <NoteBook />
        <span className="text-xs leading-4 text-white font-helveticaneue-regular">
          ჩვენი რეპეტიტორი
        </span>
      </div>
    </div>
  );
};

export default VideoLesson;
