import React from 'react';
import { Link } from 'react-router-dom';

const VoiceTile = ({ voice }) => {
  return (
    <Link to={`/voice/${voice.id}`} className="tile-link">
      <div className="tile">
        <h3>{voice.ticketNumber}</h3>
        <p>{voice.email}</p>
      </div>
    </Link>
  );
};

export default VoiceTile;
