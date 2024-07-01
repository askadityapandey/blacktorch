import React, { useState } from 'react';
import PreviewBox from './components/previewbox';
import Timeline from './components/timeline';

const App = () => {
  const [selectedClip, setSelectedClip] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PreviewBox selectedClip={selectedClip} />
      <Timeline setSelectedClip={setSelectedClip} />
    </div>
  );
};

export default App;
