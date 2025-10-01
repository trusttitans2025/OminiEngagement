import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './EmailDetailsPage.css';

const EmailDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  const [replyText, setReplyText] = useState('');

  const handleBack = () => {
    navigate('/emails');
  };

  const handleCopySuggestion = () => {
    setReplyText(email.reply);
  };

  const summary = `This is a summary of the conversation between you and ${email.sender}. The original email was about "${email.subject}" and the AI suggested a reply.`;

  return (
    <div className="email-details-page">
      <div className="page-header">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <h2>Email Details</h2>
      </div>
      <Paper className="summary-card">
        <h3>Summary of Conversation</h3>
        <p>{summary}</p>
      </Paper>
      <div className="content-layout">
        <Paper className="email-content-card">
          <h3>{email.subject}</h3>
          <p><strong>From:</strong> {email.sender}</p>
          <p><strong>Original Email:</strong> {email.original_email}</p>
        </Paper>
        <Paper className="reply-suggestion-card">
          <div className="suggestion-section">
            <h4>Suggestion</h4>
            <TextField
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              value={email.reply}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button onClick={handleCopySuggestion} variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#206e6b' }}>Copy Suggestion</Button>
          </div>
          <div className="reply-section">
            <h4>Reply</h4>
            <TextField
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#206e6b' }}>Send Reply</Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default EmailDetailsPage;
