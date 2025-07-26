# 📧 Email Sender App

A simple, lightweight email sending API built with Node.js and Express. Just provide a recipient email address and your email content, and the app will send it for you!

**🌐 Live Demo:** [https://mail-sender-snowy.vercel.app](https://mail-sender-snowy.vercel.app)

## ✨ Features

- **🚀 Simple API**: Just 2 required parameters - `toEmail` and `emailContent`
- **🎨 HTML & Plain Text**: Support for both HTML and plain text emails with CSS styling
- **📱 Beautiful UI**: Interactive API documentation with live testing interface
- **🛡️ Rate Limiting**: Built-in protection against spam (10 emails per 15 minutes per IP)
- **✅ Input Validation**: Server-side validation for email addresses and content
- **🔒 Security**: Helmet, CORS, and input sanitization included
- **⚙️ Easy Configuration**: Works with Gmail, Outlook, and custom SMTP servers
- **☁️ Serverless**: Deployed on Vercel for global availability and performance
- **🖥️ Dual Interface**: JSON API for developers, HTML UI for browsers

## 🌐 **Live API Documentation**

Visit **[https://mail-sender-snowy.vercel.app](https://mail-sender-snowy.vercel.app)** in your browser to see:

- 📊 **Interactive API Documentation** with live examples
- 🧪 **Built-in Testing Interface** - test emails directly from the browser
- 📱 **Responsive Design** - works on desktop, tablet, and mobile
- 🎯 **Real-time Examples** with your deployed API endpoints
- 📋 **Copy-paste code snippets** in multiple languages

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

## 🌐 **Live Demo & Documentation**

The app is deployed and ready to use! Visit the interactive documentation:

### **🎯 Try It Now:**

- **📖 Interactive API Docs:** [https://mail-sender-snowy.vercel.app](https://mail-sender-snowy.vercel.app)
- **❤️ Health Check:** [https://mail-sender-snowy.vercel.app/api/health](https://mail-sender-snowy.vercel.app/api/health)
- **🔧 Test Email Config:** [https://mail-sender-snowy.vercel.app/api/test](https://mail-sender-snowy.vercel.app/api/test)

### **📱 Beautiful UI Features:**

- 🎨 Modern, responsive design with gradient backgrounds
- 📊 Real-time API testing interface
- 🔗 Interactive endpoint documentation
- 💻 Copy-paste ready code examples
- 📈 Status indicators and health monitoring

## 📧 API Usage

### **Live API Endpoints:**

| Endpoint          | Method | Description                  | Live URL                                                           |
| ----------------- | ------ | ---------------------------- | ------------------------------------------------------------------ |
| `/`               | GET    | Interactive UI Documentation | [🌐 Open UI](https://mail-sender-snowy.vercel.app)                 |
| `/api/send-email` | POST   | Send an email                | `https://mail-sender-snowy.vercel.app/api/send-email`              |
| `/api/health`     | GET    | Health check                 | [🔍 Check Status](https://mail-sender-snowy.vercel.app/api/health) |
| `/api/test`       | GET    | Test email configuration     | [🧪 Test Config](https://mail-sender-snowy.vercel.app/api/test)    |

### Send Email

**Endpoint:** `POST https://mail-sender-snowy.vercel.app/api/send-email`

**Required Parameters:**

- `toEmail` - Recipient email address
- `emailContent` - The email content (supports HTML)

**Optional Parameters:**

- `subject` - Email subject line

**Example:**

```javascript
// Using fetch with live API
const response = await fetch(
  "https://mail-sender-snowy.vercel.app/api/send-email",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      toEmail: "recipient@example.com",
      emailContent: "<h1>Hello!</h1><p>This is a test email.</p>",
      subject: "Test Email",
    }),
  }
);

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

- `GET /` - **Interactive API Documentation** (Beautiful UI + JSON for API calls)
- `GET /api/health` - Health check and status monitoring
- `GET /api/test` - Test email configuration and credentials

## � Usage Examples

### Basic Email

```javascript
const sendEmail = async (toEmail, emailContent, subject) => {
  try {
    const response = await fetch(
      "https://mail-sender-snowy.vercel.app/api/send-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail, emailContent, subject }),
      }
    );
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

## 🏗️ **Project Structure**

```
Portfolio MailSender/
├── app.js                 # Main Express application
├── package.json          # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
├── views/
│   └── api-docs.html     # Beautiful UI documentation
├── .env.example          # Environment variables template
├── .gitignore           # Git exclusions
├── README.md            # Project documentation
└── usageExample.js      # Code examples and usage patterns
```

### **Key Features of the UI Documentation:**

- 🎨 **Modern Design**: Gradient backgrounds and responsive layout
- 📱 **Mobile Friendly**: Works perfectly on all devices
- 🔗 **Interactive**: Live API testing directly from the browser
- 📋 **Copy-Paste Ready**: Code examples with proper formatting
- 📊 **Status Monitoring**: Real-time health and configuration checks

## ⚙️ Configuration Options

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
curl https://mail-sender-snowy.vercel.app/api/test
```

### Test Email Sending

```bash
curl -X POST https://mail-sender-snowy.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "toEmail": "test@example.com",
    "emailContent": "Test message from Email Sender App",
    "subject": "Test Email"
  }'
```

### Health Check

```bash
curl https://mail-sender-snowy.vercel.app/api/health
```

## 🛡️ Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Email format validation and content length limits
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers middleware
- **Input Sanitization**: Prevents injection attacks

## 🔍 Troubleshooting

**Common Issues:**

### **1. 404 NOT_FOUND Error**

- **Cause:** Vercel can't find the `views/api-docs.html` file
- **Solution:** Ensure `vercel.json` includes `"includeFiles": "views/**"`
- **Fix:** Redeploy after updating `vercel.json`

### **2. "Email configuration failed"**

- Check your email credentials in Vercel environment variables
- Verify 2FA is enabled for Gmail
- Ensure App Password is correct (not your regular password)
- Test with: [🧪 Test Config](https://mail-sender-snowy.vercel.app/api/test)

### **3. "Validation failed"**

- Check email format is valid
- Ensure email content is not empty
- Subject line should be under 200 characters
- Use the [🌐 Interactive UI](https://mail-sender-snowy.vercel.app) to test

### **4. "Too many email requests"**

- Rate limit reached (10 emails per 15 minutes per IP)
- Wait 15 minutes or use different IP
- Check current limits in the UI

### **5. UI Not Loading**

- Clear browser cache and cookies
- Try incognito/private browsing mode
- Check if [🔍 Health Check](https://mail-sender-snowy.vercel.app/api/health) works

### **6. CORS Issues**

- App includes CORS middleware for all origins
- If using from a specific domain, headers should work automatically
- Test API calls from the browser UI first

## 🚀 **Fix Deployment Issue**

If you're seeing a 404 error, you need to redeploy with the updated `vercel.json`:

### **Quick Fix Steps:**

1. **Commit the updated files:**

   ```bash
   git add .
   git commit -m "Fix 404: Include views folder in Vercel deployment"
   git push origin main
   ```

2. **Vercel will auto-redeploy** (if connected to GitHub)
3. **Or manually redeploy:** Go to Vercel dashboard → Redeploy

4. **Verify fix:** Visit [https://mail-sender-snowy.vercel.app](https://mail-sender-snowy.vercel.app)

---

## 🚀 Deployment

### **✨ Current Deployment: Vercel**

This app is currently deployed on **Vercel** with all features working:

- 🌐 **Live URL:** https://mail-sender-snowy.vercel.app
- 📱 **Interactive UI:** Beautiful documentation interface
- ⚡ **Serverless:** Fast, scalable, and reliable
- 🔒 **Secure:** Environment variables properly configured

### **Deploy Your Own Copy:**

#### **Vercel (Recommended)**

1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Set environment variables:
   - `EMAIL_SERVICE=gmail`
   - `EMAIL_USER=your-email@gmail.com`
   - `EMAIL_PASSWORD=your-app-password`
4. Deploy automatically

#### **Other Platforms:**

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

## 🎯 **What Makes This Special**

### **🏗️ Clean, Modular Architecture**

- **Separation of Concerns**: UI documentation is separate from API logic
- **Maintainable**: HTML templates in `views/` folder for easy updates
- **Scalable**: Easy to add new features and endpoints
- **Production Ready**: Proper error handling and environment management

### **📱 Dual Interface Design**

- **API Calls**: Returns clean JSON for programmatic access
- **Browser Visits**: Shows beautiful UI documentation for human users
- **Smart Detection**: Automatically serves the right content based on request type

### **🔧 Developer Friendly**

- **Comprehensive Examples**: Real code snippets you can copy-paste
- **Interactive Testing**: Test all endpoints directly from the browser
- **Clear Documentation**: Every feature explained with examples
- **Open Source**: MIT license for free use in any project

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

**Made with ❤️ by [AnkitMishra2006](https://github.com/AnkitMishra2006)**
