# Email Sender App

A simple, lightweight email sending API built with Node.js and Express. Just provide a recipient email address and your email content, and the app will send it for you!

## ✨ Features

- **Simple API**: Just 2 required parameters - `toEmail` and `emailContent`
- **HTML & Plain Text**: Support for both HTML and plain text emails
- **Rate Limiting**: Built-in protection against spam (10 emails per 15 minutes per IP)
- **Input Validation**: Server-side validation for email addresses and content
- **Security**: Helmet, CORS, and input sanitization included
- **Easy Configuration**: Works with Gmail, Outlook, and custom SMTP servers

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download the project
cd email-sender-app

# Install dependencies
npm install
```

### 2. Configure Email

Create a `.env` file (copy from `.env.example`):

```bash
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**For Gmail:**

1. Enable 2-Factor Authentication
2. Generate an App Password: Google Account → Security → 2-Step Verification → App passwords
3. Use the generated password in `EMAIL_PASSWORD`

### 3. Run the App

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

The app will run on `http://localhost:3000`

## 📧 API Usage

### Send Email

**Endpoint:** `POST /api/send-email`

**Required Parameters:**

- `toEmail` - Recipient email address
- `emailContent` - The email content (supports HTML)

**Optional Parameters:**

- `subject` - Email subject line

**Example:**

```javascript
// Using fetch
const response = await fetch("http://localhost:3000/api/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    toEmail: "recipient@example.com",
    emailContent: "<h1>Hello!</h1><p>This is a test email.</p>",
    subject: "Test Email",
  }),
});

const result = await response.json();
console.log(result);
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully",
  "details": {
    "to": "recipient@example.com",
    "subject": "Test Email",
    "sentAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Other Endpoints

- `GET /` - API documentation
- `GET /api/health` - Health check
- `GET /api/test` - Test email configuration

## � Usage Examples

### Basic Email

```javascript
const sendEmail = async (toEmail, emailContent, subject) => {
  try {
    const response = await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toEmail, emailContent, subject }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

// Send a simple email
await sendEmail("user@example.com", "Hello from Email Sender App!", "Welcome");
```

### HTML Email

```javascript
const htmlContent = `
  <h1>Welcome!</h1>
  <p>Thank you for signing up.</p>
  <ul>
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
`;

await sendEmail("user@example.com", htmlContent, "Welcome to our service!");
```

### Plain Text Email

```javascript
const textContent = `
Hello!

This is a plain text email.

Best regards,
The Team
`;

await sendEmail("user@example.com", textContent, "Plain Text Message");
```

## � Configuration Options

### Email Services

**Gmail (default):**

```bash
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Outlook:**

```bash
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

**Custom SMTP:**

```bash
EMAIL_SERVICE=
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASSWORD=your-password
```

### Rate Limiting

Default: 10 emails per 15 minutes per IP. To modify, edit the `emailLimiter` configuration in `app.js`.

## 🧪 Testing

### Test Configuration

```bash
curl http://localhost:3000/api/test
```

### Test Email Sending

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "toEmail": "test@example.com",
    "emailContent": "Test message from Email Sender App",
    "subject": "Test Email"
  }'
```

### Health Check

```bash
curl http://localhost:3000/api/health
```

## 🛡️ Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Email format validation and content length limits
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers middleware
- **Input Sanitization**: Prevents injection attacks

## � Troubleshooting

**Common Issues:**

1. **"Email configuration failed"**

   - Check your email credentials
   - Verify 2FA is enabled for Gmail
   - Ensure App Password is correct

2. **"Validation failed"**

   - Check email format is valid
   - Ensure email content is not empty
   - Subject line should be under 200 characters

3. **"Too many email requests"**

   - Rate limit reached (10 emails per 15 minutes)
   - Wait or adjust rate limiting settings

4. **Connection timeout**
   - Check internet connection
   - Verify SMTP settings
   - Check firewall settings

## 🚀 Deployment

### Heroku

```bash
# Install Heroku CLI and login
heroku create your-email-sender-app
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
git push heroku main
```

### Railway/Render

1. Connect your repository
2. Set environment variables
3. Deploy

### VPS/Server

```bash
# Install PM2 for process management
npm install -g pm2
pm2 start app.js --name "email-sender"
pm2 startup
pm2 save
```

## � License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
