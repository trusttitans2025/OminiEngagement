import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper } from '@mui/material';

const ChatSuggestionBox = ({ suggestion: initialSuggestion, onCopy, onSend }) => {
  const [editableSuggestion, setEditableSuggestion] = useState(initialSuggestion);

  useEffect(() => {
    setEditableSuggestion(initialSuggestion);
  }, [initialSuggestion]);

  if (!initialSuggestion) {
    return null;
  }

  return (
    <Paper className="chat-suggestion-box">
      <h4>🤖 AI-Powered Suggestion</h4>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={editableSuggestion}
        onChange={(e) => setEditableSuggestion(e.target.value)}
        sx={{ mb: 1 }}
      />
      <Button
        variant="contained"
        size="small"
        sx={{ mt: 1, mr: 1, backgroundColor: '#206e6b' }}
        onClick={() => onCopy(editableSuggestion)}
      >
        Copy Text
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{ mt: 1, backgroundColor: '#206e6b' }}
        onClick={() => onSend(editableSuggestion)}
      >
        Send Reply
      </Button>
    </Paper>
  );
};

export default ChatSuggestionBox;