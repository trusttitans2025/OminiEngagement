import React from 'react';
import { useParams } from 'react-router-dom';
import { initialVoiceData } from '../data/initialData';

const VoiceDetailsPage = () => {
  const { id } = useParams();
  const voice = initialVoiceData.find(v => v.id === parseInt(id));

  if (!voice) {
    return <div>Voice call not found</div>;
  }

  return (
    <div>
      <h2>{voice.ticketNumber}</h2>
      <p><strong>Email:</strong> {voice.email}</p>
      <p><strong>Duration:</strong> {voice.duration}</p>
      <p><strong>Summary:</strong> {voice.summary}</p>
    </div>
  );
};

export default VoiceDetailsPage;
