import React, { useState, useEffect } from 'react';
import TrimSlider from './trimeslider'

interface PreviewBoxProps {
  selectedClip: string | null;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ selectedClip }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.ondurationchange = () => {
        setDuration(videoRef.current?.duration || 0);
      };
    }
  }, [selectedClip]);

  const handleTrimChange = (start: number, end: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.ontimeupdate = () => {
        if (videoRef.current!.currentTime >= end) {
          videoRef.current!.pause();
        }
      };
    }
  };

  return (
    <div style={{ width: '80%', height: '400px', backgroundColor: '#000', position: 'relative' }}>
      {selectedClip ? (
        <div>
          <video ref={videoRef} src={selectedClip} controls style={{ width: '100%', height: '100%' }} />
          {duration > 0 && <TrimSlider duration={duration} onTrimChange={handleTrimChange} />}
        </div>
      ) : (
        <p style={{ color: '#fff', textAlign: 'center', paddingTop: '180px' }}>No clip selected</p>
      )}
    </div>
  );
};

export default PreviewBox;
