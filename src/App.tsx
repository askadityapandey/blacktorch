import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null); // Reference to MediaRecorder instance

  const handleStartRecording = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true, // Change to false if you don't want audio
      });
      const recorder = new MediaRecorder(displayStream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        // Store recorded video data (event.data)
        console.log('Recorded video data:', event.data);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing screen and audio:', error);
    }
  };

  const handleStopRecording = async () => {
    recorderRef.current.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    // Cleanup function to release resources when component unmounts
    return () => {
      if (recorderRef.current) {
        recorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>Welcome to your Minimal Video Editor!</h1>
      <button onClick={handleStartRecording} disabled={isRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default App;
