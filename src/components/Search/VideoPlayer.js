

import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) return null;

  return (
    <div className="video-player">
      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
          className="w-full aspect-video rounded-lg"
        />
      </div>
      <div className="video-details">
        <h2 className="video-title">{video.title}</h2>
        <p className="video-channel">{video.channelTitle}</p>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;