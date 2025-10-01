import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmailPage.css';
import {
  ViewModule,
  ViewList,
} from '@mui/icons-material';
import { TextField, IconButton, List, CircularProgress, Typography } from '@mui/material';
import EmailListItem from '../components/EmailListItem';
// const emailData = [
//   {
//     "id": "04kBkTuJhOng6Raqr8Su",
//     "ticketId": "WAI-20250929183432",
//     "original_email": "I have problem in find the right banking information.\r\n\r\nThanks\r\n",
//     "reply": "Error: Could not generate a reply.",
//     "sender": "Amit Kumar <jamitkumar31@gmail.com>",
//     "subject": "Banking information",
//     "sentiment_score": 0,
//     "response_quality": 0,
//     "timestamp": "2025-09-29T18:22:10.893487Z"
//   },
//   {
//     "id": "0BslGeLpDzmwrXJoFaYZ",
//     "ticketId": "WAI-20250930054934",
//     "original_email": "I have problem in find the right banking information.\r\n\r\nThanks\r\n",
//     "reply": "Error: Could not generate a reply.",
//     "sender": "Amit Kumar <jamitkumar31@gmail.com>",
//     "subject": "Banking information",
//     "sentiment_score": 0,
//     "response_quality": 0,
//     "timestamp": "2025-09-30T05:48:25.326402Z"
//   }
   
// ];

const EmailPage = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('tile');
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://email-agent-631872245250.us-central1.run.app/conversations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmails(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const getSentimentIcon = (score) => {
    if (score >= 0.8) return <SentimentSatisfiedAlt style={{ color: '#4CAF50' }} />;
    if (score >= 0.6) return <SentimentNeutral style={{ color: '#FFC107' }} />;
    return <SentimentVeryDissatisfied style={{ color: '#F44336' }} />;
  };

  const getQualityIcon = (score) => {
    if (score >= 0.8) return <ThumbUp style={{ color: '#4CAF50' }} />;
    return <ThumbDown style={{ color: '#F44336' }} />;
  };

  const filteredEmails = emails.filter((email) =>
    email.id.toString().includes(filter) || email.ticketId.toLowerCase().includes(filter.toLowerCase())
  );

  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}><CircularProgress /></div>;
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Typography color="error">Error fetching data: {error}</Typography>
      </div>
    );
  }

  return (
    <div>
      <div className="email-page-header">
        <h2>Email Conversations</h2>
        <div className="controls">
          <TextField
            label="Filter by ID or Ticket ID"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <IconButton onClick={() => setView(view === 'tile' ? 'list' : 'tile')}>
            {view === 'tile' ? <ViewList /> : <ViewModule />}
          </IconButton>
        </div>
      </div>

      {view === 'tile' ? (
        <div className="email-grid">
          {filteredEmails.map((email) => (
            <Link to={`/emails/${email.id}`} state={{ email }} key={email.id} className="email-tile-link">
              <div className="email-tile">
                <div className="scores">
                  <div className="score">
                    {getSentimentIcon(email.sentiment_score)}
                    <span className="score-value">{email.sentiment_score}</span>
                  </div>
                  <div className="score">
                    {getQualityIcon(email.response_quality)}
                    <span className="score-value">{email.response_quality}</span>
                  </div>
                </div>
                <h3>{email.ticketId}</h3>
                <p><strong>{email.subject}</strong></p>
                <p><strong>From:</strong> {email.sender}</p>
                <p>{email.original_email}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <List>
          {filteredEmails.map((email) => (
            <EmailListItem key={email.id} email={email} />
          ))}
        </List>
      )}
    </div>
  );
};

export default EmailPage;