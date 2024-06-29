import React, { useState } from 'react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedVideo(selectedFile);
  };

  return (
    <div className="App">
      <h1>Welcome to your Video Editor!</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {/* Rest of your component */}
    </div>
  );
}
