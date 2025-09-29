import React from 'react';
import { initialVoiceData } from '../data/initialData';
import VoiceTile from '../components/VoiceTile';
import '../styles/Tile.css';

const VoicePage = () => {
  return (
    <div>
      <h2>Voice Tickets</h2>
      <div className="grid-container">
        {initialVoiceData.map(voice => (
          <VoiceTile key={voice.id} voice={voice} />
        ))}
      </div>
    </div>
  );
};

export default VoicePage;