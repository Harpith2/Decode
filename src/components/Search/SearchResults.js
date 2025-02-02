

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Book, Search, Link, Video } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';

const SearchResults = ({ response, onQueryClick }) => {
  const [expandedSections, setExpandedSections] = useState({
    answer: true,
    related: false,
    sources: false,
    videos: true
  });

  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (response.videos && response.videos.length > 0) {
      setSelectedVideo(response.videos[0]);
    }
  }, [response.videos]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleQueryClick = async (query) => {
    // Reset sections to their default states
    setExpandedSections({
      answer: true,
      related: false,
      sources: false,
      videos: true
    });

    // Trigger the new search
    await onQueryClick(query);
  };

  const Section = ({ title, icon, isExpanded, onToggle, children }) => (
    <div className="mb-4">
      <div
        onClick={onToggle}
        className="section-header"
      >
        <span className="section-icon">{icon}</span>
        <h3 className="font-semibold">{title}</h3>
        <span className="ml-auto">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>
      <div
        className="section-content"
        style={{
          maxHeight: isExpanded ? '3000px' : '0',
          padding: isExpanded ? '12px' : '0',
          opacity: isExpanded ? 1 : 0,
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div>
      <Section
        title="Main Answer"
        icon={<Book size={20} />}
        isExpanded={expandedSections.answer}
        onToggle={() => toggleSection('answer')}
      >
        <div className="prose">
          <ReactMarkdown>{response.answer}</ReactMarkdown>
        </div>
      </Section>

      {response.videos && response.videos.length > 0 && (
        <Section
          title="Related Videos"
          icon={<Video size={20} />}
          isExpanded={expandedSections.videos}
          onToggle={() => toggleSection('videos')}
        >
          <div className="video-section">
            {selectedVideo && (
              <div className="video-player-section">
                <VideoPlayer video={selectedVideo} />
              </div>
            )}
            <div className="video-list-section">
              <VideoList
                videos={response.videos}
                onVideoSelect={setSelectedVideo}
                selectedVideo={selectedVideo}
              />
            </div>
          </div>
        </Section>
      )}

      {response.relatedQueries?.length > 0 && (
        <Section
          title="Related Queries"
          icon={<Search size={20} />}
          isExpanded={expandedSections.related}
          onToggle={() => toggleSection('related')}
        >
          <div className="flex flex-wrap gap-2">
            {response.relatedQueries.map((query, index) => (
              <button
                key={index}
                className="query-bubble"
                onClick={() => handleQueryClick(query)}
              >
                {query}
              </button>
            ))}
          </div>
        </Section>
      )}

      {response.sources?.length > 0 && (
        <Section
          title="Sources"
          icon={<Link size={20} />}
          isExpanded={expandedSections.sources}
          onToggle={() => toggleSection('sources')}
        >
          <ul className="space-y-2">
            {response.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  {source.icon && (
                    <img
                      src={source.icon}
                      alt=""
                      className="source-icon"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <span>{source.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
};

export default SearchResults;