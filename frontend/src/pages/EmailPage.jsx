import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './EmailPage.css';
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
  ThumbUp,
  ThumbDown,
  ViewModule,
  ViewList,
} from '@mui/icons-material';
import { TextField, IconButton, List } from '@mui/material';
import EmailListItem from '../components/EmailListItem';



const EmailPage = () => {
  const [view, setView] = useState('tile');
  const [filter, setFilter] = useState('');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://email-agent-631872245250.us-central1.run.app/conversations');
        const data = await response.json();
        setEmails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emails:', error);
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
    (email.id && email.id.toString().includes(filter)) || email.ticketId.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* <CircularProgress /> */}
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
            <Link to={`/emails/${email.id || email.ticketId}`} state={{ email }} key={email.id || email.ticketId} className="email-tile-link">
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
            <EmailListItem key={email.id || email.ticketId} email={email} />
          ))}
        </List>
      )}
    </div>
  );
};

export default EmailPage;