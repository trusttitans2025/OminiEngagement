import React, { useState } from 'react';
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

const emailData = [
    {
      "id": 1,
      "original_email": "Hi team, How is weather in Pune ? Thanks Amit",
      "reply": "This is an AI-generated reply to: Hi team, How is weather in Pune ? Thanks Amit",
      "sender": "Amit Kumar <jamitkumar31@gmail.com>",
      "subject": "Test",
      "sentiment_score": 0.8,
      "response_quality": 0.9
    },
    {
      "id": 2,
      "original_email": "The restrictions on your account are removed. ",
      "reply": "This is an AI-generated reply to: The restrictions on your account are removed. ",
      "sender": "Google Cloud <googlecloud@google.com>",
      "subject": "You have activated your full account",
      "sentiment_score": 0.6,
      "response_quality": 0.7
    },
    {
      "id": 3,
      "original_email": "Google Cloud Platform & APIs Payment received Your payment of 1000.00 was applied to Google Cloud Platform & APIs on Sep 16, 2025. Help center Help center Contact us Contact us Google Cloud",
      "reply": "This is an AI-generated reply to: Google Cloud Platform & APIs Payment received Your payment of 1000.00 was applied to Google Cloud Platform & APIs on Sep 16, 2025. Help center Help center Contact us Contact us Google Cloud",
      "sender": "Google Payments <payments-noreply@google.com>",
      "subject": "Google Cloud Platform & APIs: We've received your payment for 016964-A5632F-E55CEA",
      "sentiment_score": 0.9,
      "response_quality": 0.95
    },
    {
      "id": 4,
      "original_email": "Get started fast - and see what's always free on Google Cloud. Google Cloud Go to my console Welcome to Google Cloud. Learn the fundamentals with this tutorial - and see what else you can do for",
      "reply": "This is an AI-generated reply to: Get started fast - and see what's always free on Google Cloud. Google Cloud Go to my console Welcome to Google Cloud. Learn the fundamentals with this tutorial - and see what else you can do for",
      "sender": "Google Cloud <CloudPlatform-noreply@google.com>",
      "subject": "Account confirmation: Your Google Cloud free trial",
      "sentiment_score": 0.85,
      "response_quality": 0.88
    },
    {
      "id": 5,
      "original_email": "Google Cloud Platform & APIs Prepayment successful Your one-time prepayment requirement has been successfully met. Payments profile ID 8017-9129-8261 Billing account ID 016964-A5632F-E55CEA Sign in",
      "reply": "This is an AI-generated reply to: Google Cloud Platform & APIs Prepayment successful Your one-time prepayment requirement has been successfully met. Payments profile ID 8017-9129-8261 Billing account ID 016964-A5632F-E55CEA Sign in",
      "sender": "Google Payments <payments-noreply@google.com>",
      "subject": "Google Cloud Platform & APIs: Your prepayment was successful",
      "sentiment_score": 0.92,
      "response_quality": 0.96
    },
    {
      "id": 6,
      "original_email": "Google Cloud Platform & APIs Update your tax information To make sure the correct taxes are applied to the Google services you use, please update your tax information for Trust Titans as soon as",
      "reply": "This is an AI-generated reply to: Google Cloud Platform & APIs Update your tax information To make sure the correct taxes are applied to the Google services you use, please update your tax information for Trust Titans as soon as",
      "sender": "Google Payments <payments-noreply@google.com>",
      "subject": "Google Cloud Platform & APIs: Update your tax info",
      "sentiment_score": 0.7,
      "response_quality": 0.8
    },
    {
      "id": 7,
      "original_email": "Product is nice Thanks",
      "reply": "Error generating reply: io.grpc.StatusRuntimeException: UNAVAILABLE: Credentials failed to obtain metadata",
      "sender": "Amit Kumar <jamitkumar31@gmail.com>",
      "subject": "Feedback",
      "sentiment_score": 0.5,
      "response_quality": 0.2
    },
    {
      "id": 8,
      "original_email": "Good work",
      "reply": "Error generating reply: io.grpc.StatusRuntimeException: UNAVAILABLE: Credentials failed to obtain metadata",
      "sender": "Shubham Deshmukh <shubhamdeshmukh121@gmail.com>",
      "subject": "Good work",
      "sentiment_score": 0.9,
      "response_quality": 0.1
    },
    {
      "id": 9,
      "original_email": "Hi testing",
      "reply": "Generated reply based on the email body: Hi testing",
      "sender": "kajal sanchela <kajalsanchela23@gmail.com>",
      "subject": "Test",
      "sentiment_score": 0.6,
      "response_quality": 0.75
    },
    {
      "id": 10,
      "original_email": "What is weather in Pune Thanks",
      "reply": "I do not have access to real-time information, including current weather conditions. To get the current weather in Pune, India, I recommend checking a reliable weather website or app such as Google Weather, AccuWeather, or another local weather service.",
      "sender": "Amit Kumar <jamitkumar31@gmail.com>",
      "subject": "",
      "sentiment_score": 0.7,
      "response_quality": 0.85
    },
    {
      "id": 11,
      "original_email": "Thanks for the information . Amit",
      "reply": "You're welcome, Amit! Is there anything else I can help you with?",
      "sender": "Amit Kumar <jamitkumar31@gmail.com>",
      "subject": "Test",
      "sentiment_score": 0.95,
      "response_quality": 0.98
    },
    {
      "id": 12,
      "original_email": "Verify your Google Cloud account by Jan 17, 2026 Verify your Google Cloud account by Jan 17, 2026 8017-9129-8261 Google is required to verify certain Google Cloud accounts to protect against fraud and",
      "reply": "This message is a **potential phishing attempt**. Legitimate Google Cloud verification requests will not be sent via SMS or email with a random verification code like \"8017-9129-8261\". Google will never ask you to verify your account using such a method.\n\n**Do not click any links or respond to this message.**\n\nIf you are concerned about the security of your Google Cloud account, you should:\n\n* **Log in directly to the Google Cloud Console** using your usual method (do not use links provided in suspicious messages).\n* **Check your Google Cloud account's security settings** within the console.\n* **Report the message** as spam or phishing.\n\nIf you believe you may have already provided sensitive information, change your Google Cloud password immediately and contact Google Cloud support directly through their official channels. Do not use contact information found in suspicious messages.",
      "sender": "Google Cloud Platform <CloudPlatform-noreply@google.com>",
      "subject": "[Action required] Help Google verify your account by Jan 17, 2026",
      "sentiment_score": 0.1,
      "response_quality": 0.99
    },
    {
      "id": 13,
      "original_email": "Product is good Thanks",
      "reply": "You're welcome! I'm glad you like the product. Is there anything else I can help you with?",
      "sender": "Amit Kumar <jamitkumar31@gmail.com>",
      "subject": "Test",
      "sentiment_score": 0.9,
      "response_quality": 0.92
    }
];

const EmailPage = () => {
  const [view, setView] = useState('tile');
  const [filter, setFilter] = useState('');

  const getSentimentIcon = (score) => {
    if (score >= 0.8) return <SentimentSatisfiedAlt style={{ color: '#4CAF50' }} />;
    if (score >= 0.6) return <SentimentNeutral style={{ color: '#FFC107' }} />;
    return <SentimentVeryDissatisfied style={{ color: '#F44336' }} />;
  };

  const getQualityIcon = (score) => {
    if (score >= 0.8) return <ThumbUp style={{ color: '#4CAF50' }} />;
    return <ThumbDown style={{ color: '#F44336' }} />;
  };

  const filteredEmails = emailData.filter((email) =>
    email.id.toString().includes(filter)
  );

  return (
    <div>
      <div className="email-page-header">
        <h2>Email Conversations</h2>
        <div className="controls">
          <TextField
            label="Filter by ID"
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
                <h3>{email.subject}</h3>
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
