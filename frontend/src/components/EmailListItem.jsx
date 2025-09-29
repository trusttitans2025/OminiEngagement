import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
  ThumbUp,
  ThumbDown,
} from '@mui/icons-material';

const EmailListItem = ({ email }) => {
  const getSentimentIcon = (score) => {
    if (score >= 0.8) return <SentimentSatisfiedAlt style={{ color: '#4CAF50' }} />;
    if (score >= 0.6) return <SentimentNeutral style={{ color: '#FFC107' }} />;
    return <SentimentVeryDissatisfied style={{ color: '#F44336' }} />;
  };

  const getQualityIcon = (score) => {
    if (score >= 0.8) return <ThumbUp style={{ color: '#4CAF50' }} />;
    return <ThumbDown style={{ color: '#F44336' }} />;
  };

  return (
    <ListItem
      button
      component={Link}
      to={`/emails/${email.id}`}
      state={{ email }}
      divider
    >
      <ListItemIcon>{getSentimentIcon(email.sentiment_score)}</ListItemIcon>
      <ListItemIcon>{getQualityIcon(email.response_quality)}</ListItemIcon>
      <ListItemText
        primary={email.subject}
        secondary={`From: ${email.sender}`}
      />
    </ListItem>
  );
};

export default EmailListItem;
