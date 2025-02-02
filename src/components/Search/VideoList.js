

import React from 'react';

const VideoList = ({ videos, onVideoSelect, selectedVideo }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video.id}
          className={`video-card ${
            selectedVideo?.id === video.id ? 'selected' : ''
          }`}
          onClick={() => onVideoSelect(video)}
        >
          <img
            className="video-thumbnail"
            src={video.thumbnail}
            alt={video.title}
          />
          <div className="video-info">
            <h3 className="video-title">{video.title}</h3>
            <p className="video-channel">{video.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;