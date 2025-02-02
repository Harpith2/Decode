
import React, { useState } from 'react';
import { Video } from 'lucide-react';

const VideoSection = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="video-section">
      <div className="section-header">
        <span className="section-icon"><Video size={20} /></span>
        <h3 className="font-semibold">Related Videos</h3>
      </div>

      <div className="video-content">
        {selectedVideo && (
          <div className="video-player">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}`}
              title={selectedVideo.title}
              frameBorder="0"
              allowFullScreen
              className="video-iframe"
            />
          </div>
        )}

        <div className="video-list">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`video-card ${selectedVideo?.id === video.id ? 'selected' : ''}`}
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h4 className="video-title">{video.title}</h4>
                <p className="video-channel">{video.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;