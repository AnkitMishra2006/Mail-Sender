// Email Sender App
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 email requests per windowMs
  message: {
    error: "Too many email requests from this IP, please try again later.",
  },
});

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail", // gmail, outlook, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
    // Alternative SMTP configuration
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT || 587,
    // secure: false, // true for 465, false for other ports
  });
};

// Validation rules for simple email sending
const emailValidation = [
  body("toEmail")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid recipient email address")
    .normalizeEmail(),

  body("emailContent")
    .trim()
    .notEmpty()
    .withMessage("Email content is required")
    .isLength({ min: 1, max: 50000 })
    .withMessage("Email content must be between 1 and 50000 characters"),

  body("subject")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Subject must be less than 200 characters"),
];

// Main email sending route
app.post("/api/send-email", emailLimiter, emailValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { toEmail, emailContent, subject } = req.body;

    // Create transporter and send email
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Email Sender App" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject || "Message from Email Sender App",
      html: emailContent,
      text: emailContent.replace(/<[^>]*>/g, ""), // Strip HTML tags for plain text version
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      details: {
        to: toEmail,
        subject: mailOptions.subject,
        sentAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Test route to verify email configuration
app.get("/api/test", async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    res.status(200).json({
      success: true,
      message: "Email configuration is valid",
      config: {
        service: process.env.EMAIL_SERVICE || "gmail",
        user: process.env.EMAIL_USER
          ? process.env.EMAIL_USER.replace(/(.{2}).*(@.*)/, "$1***$2")
          : "Not configured",
      },
    });
  } catch (error) {
    console.error("Email configuration error:", error);
    res.status(500).json({
      success: false,
      message: "Email configuration failed",
      error: error.message,
    });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Email Sender App is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API documentation route
app.get("/", (req, res) => {
  res.json({
    name: "Email Sender App",
    version: "1.0.0",
    description:
      "Simple email sender API - just provide recipient email and content",
    endpoints: {
      "POST /api/send-email": {
        description: "Send an email",
        required: ["toEmail", "emailContent"],
        optional: ["subject"],
        example: {
          toEmail: "recipient@example.com",
          emailContent: "Your email content here (can include HTML)",
          subject: "Optional subject line",
        },
      },
      "GET /api/test": "Test email configuration",
      "GET /api/health": "Health check",
    },
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://mail-sender-snowy.vercel.app"
      : `http://localhost:${PORT}`;

  console.log(`🚀 Email Sender App is running`);
  console.log(`📧 API Documentation: ${baseUrl}/`);
  console.log(`❤️  Health check: ${baseUrl}/api/health`);
  console.log(`🔧 Email test: ${baseUrl}/api/test`);
  console.log(`📮 Send email: POST ${baseUrl}/api/send-email`);
});

module.exports = app;
