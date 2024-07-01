import React from 'react';

interface PreviewBoxProps {
  selectedClip: string | null;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ selectedClip }) => {
  return (
    <div style={{ width: '80%', height: '400px', backgroundColor: '#000' }}>
      {selectedClip ? (
        <video src={selectedClip} controls style={{ width: '100%', height: '100%' }} />
      ) : (
        <p style={{ color: '#fff', textAlign: 'center', paddingTop: '180px' }}>No clip selected</p>
      )}
    </div>
  );
};

export default PreviewBox;
