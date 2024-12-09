/*
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken(),
  },
});

// Generate Google Meet link
async function generateMeetLink() {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const event = {
    summary: 'Project Meeting',
    description: 'Automatically generated meeting for the project',
    start: {
      dateTime: new Date().toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      timeZone: 'UTC',
    },
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(7),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });
    return res.data.hangoutLink;
  } catch (error) {
    console.error('Error generating Meet link:', error);
    return null;
  }
}

// Send meeting invitation
async function sendMeetingInvitation(projectId, meetLink) {
  const Project = require('../models/Project');
  const User = require('../models/User');

  try {
    const project = await Project.findById(projectId).populate('members', 'email');
    if (!project) {
      throw new Error('Project not found');
    }

    const emailPromises = project.members.map(async (member) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: member.email,
        subject: `Meeting Invitation for ${project.name}`,
        html: `
          <h1>Meeting Invitation</h1>
          <p>You are invited to a meeting for the project: ${project.name}</p>
          <p>Please join using this Google Meet link: <a href="${meetLink}">${meetLink}</a></p>
        `,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    console.log('Meeting invitations sent successfully');
  } catch (error) {
    console.error('Error sending meeting invitations:', error);
  }
}

module.exports = { generateMeetLink, sendMeetingInvitation };

*/