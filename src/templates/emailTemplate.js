const confirmationEmailTemplate = (confirmationUrl) => `
  <h1>Welcome to Project Manager!</h1>
  <p>Thank you for registering. Please confirm your email by clicking on the link below:</p>
  <a href="${confirmationUrl}">Confirm your email</a>
  <p>If you did not request this, please ignore this email.</p>
`;

module.exports = confirmationEmailTemplate;