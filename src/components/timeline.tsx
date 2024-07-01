import React, { useState } from 'react';

interface TimelineProps {
  setSelectedClip: (clip: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ setSelectedClip }) => {
  const [clips, setClips] = useState<string[]>([]);

  const handleAddClip = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newClip = URL.createObjectURL(event.target.files[0]);
      setClips([...clips, newClip]);
    }
  };

  const handleClipClick = (clip: string) => {
    setSelectedClip(clip);
  };

  return (
    <div style={{ width: '80%', marginTop: '20px' }}>
      <input type="file" accept="video/*" onChange={handleAddClip} />
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
    </div>
  );
};

export default Timeline;
