import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <div className="App">
      <h1>Simple Video Editor</h1>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoSrc && (
        <div className="video-container">
          <video controls src={videoSrc} className="video-player" />
          <div className="timeline">Timeline will go here</div>
        </div>
      )}
    </div>
  );
};

export default App;
