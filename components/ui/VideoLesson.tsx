"use client";

import "@mux/mux-player";
import React from "react";

const VideoLesson = () => {
  const playbackId = "Ys01rL65mPmdWKj4qhfC244SeBCd2Kl9ixVWtZ1WnteU";

  return (
    <div className="w-full overflow-hidden rounded-2xl border-none border-white relative">
      {React.createElement("mux-player", {
        "playback-id": playbackId,
        "stream-type": "on-demand",
        autoplay: true, // autoplay video
        muted: true, // muted for autoplay
        loop: true, // loop video
        controls: true, // show controls (we hide fullscreen via CSS)
        width: "100%",
        height: "auto",
        style: { display: "block" },
      })}
      <div className="flex items-center gap-2 absolute z-10 bg-[#0C0F2133]/20 top-1.5 left-1.5 backdrop-blur-[24px] py-[10px] rounded-[40px] px-[12px]">
        <div className="w-3 h-3 rounded-full bg-[#52CE91]"></div>
        <span className="text-xs leading-4 font-helveticaneue-regular text-white">
          კარგი კავშირი
        </span>
      </div>
    </div>
  );
};

export default VideoLesson;
