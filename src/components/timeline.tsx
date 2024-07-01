import React, { useState } from 'react';

interface TimelineProps {
  setSelectedClip: (clip: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ setSelectedClip }) => {
  const [clips, setClips] = useState<string[]>([]);
  const [audio, setAudio] = useState<string | null>(null);

  const handleAddClip = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newClip = URL.createObjectURL(event.target.files[0]);
      setClips([...clips, newClip]);
    }
  };

  const handleAddAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newAudio = URL.createObjectURL(event.target.files[0]);
      setAudio(newAudio);
    }
  };

  const handleClipClick = (clip: string) => {
    setSelectedClip(clip);
  };

  return (
    <div style={{ width: '80%', marginTop: '20px' }}>
      <input type="file" accept="video/*" onChange={handleAddClip} />
      <input type="file" accept="audio/*" onChange={handleAddAudio} style={{ marginTop: '10px' }} />
      <div style={{ display: 'flex', overflowX: 'scroll', marginTop: '10px' }}>
        {clips.map((clip, index) => (
          <div
            key={index}
            style={{
              width: '120px',
              height: '80px',
              margin: '0 5px',
              backgroundColor: '#333',
              cursor: 'pointer',
            }}
            onClick={() => handleClipClick(clip)}
          >
            <video src={clip} style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
      </div>
      {audio && (
        <div style={{ marginTop: '10px', backgroundColor: '#ccc', padding: '10px' }}>
          <audio src={audio} controls style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Timeline;
