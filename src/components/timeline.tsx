import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Clip {
  id: string;
  url: string;
  start: number;
  end: number;
}

interface TimelineProps {
  setSelectedClip: (clip: Clip) => void;
}

const Timeline: React.FC<TimelineProps> = ({ setSelectedClip }) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [audio, setAudio] = useState<string | null>(null);

  const handleAddClip = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newClip: Clip = {
        id: URL.createObjectURL(event.target.files[0]),
        url: URL.createObjectURL(event.target.files[0]),
        start: 0,
        end: 0
      };
      setClips([...clips, newClip]);
    }
  };

  const handleAddAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newAudio = URL.createObjectURL(event.target.files[0]);
      setAudio(newAudio);
    }
  };

  const handleClipClick = (clip: Clip) => {
    setSelectedClip(clip);
  };

  const handleTrimChange = (clipId: string, start: number, end: number) => {
    setClips(clips.map(clip => clip.id === clipId ? { ...clip, start, end } : clip));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(clips);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setClips(items);
  };

  return (
    <div style={{ width: '80%', marginTop: '20px' }}>
      <input type="file" accept="video/*" onChange={handleAddClip} />
      <input type="file" accept="audio/*" onChange={handleAddAudio} style={{ marginTop: '10px' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="clips" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex', overflowX: 'scroll', marginTop: '10px' }}
            >
              {clips.map((clip, index) => (
                <Draggable key={clip.id} draggableId={clip.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '0 5px',
                        ...provided.draggableProps.style,
                      }}
                      onClick={() => handleClipClick(clip)}
                    >
                      <div
                        style={{
                          width: '120px',
                          height: '80px',
                          backgroundColor: '#333',
                          cursor: 'pointer',
                        }}
                      >
                        <video src={clip.url} style={{ width: '100%', height: '100%' }} />
                      </div>
                      <div>
                        <label>
                          Start: 
                          <input
                            type="number"
                            value={clip.start}
                            onChange={(e) => handleTrimChange(clip.id, Number(e.target.value), clip.end)}
                          />
                        </label>
                        <label>
                          End: 
                          <input
                            type="number"
                            value={clip.end}
                            onChange={(e) => handleTrimChange(clip.id, clip.start, Number(e.target.value))}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {audio && (
        <div style={{ marginTop: '10px', backgroundColor: '#ccc', padding: '10px' }}>
          <audio src={audio} controls style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Timeline;
