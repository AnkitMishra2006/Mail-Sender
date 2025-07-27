// Email Sender App - Usage Examples

// Base URL - change this for different environments
const BASE_URL = "https://mail-sender-snowy.vercel.app";

// Example 1: Basic email sending with fetch
const sendEmail = async (toEmail, emailContent, subject = null, fromName = null) => {
  try {
    const response = await fetch(`${BASE_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toEmail: toEmail,
        emailContent: emailContent,
        subject: subject,
        fromName: fromName,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Email sent successfully!");
      console.log("Details:", result.details);
      return result;
    } else {
      console.error("❌ Failed to send email:", result.message);
      return result;
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return { success: false, error: error.message };
  }
};

// Example 2: Send HTML email
const sendHtmlEmail = async () => {
  const htmlContent = `
    <h1>Welcome to our service!</h1>
    <p>Thank you for signing up. Here are your details:</p>
    <ul>
      <li><strong>Account:</strong> Premium</li>
      <li><strong>Started:</strong> ${new Date().toLocaleDateString()}</li>
    </ul>
    <p>Best regards,<br>The Team</p>
  `;

  return await sendEmail(
    "user@gmail.com",
    htmlContent,
    "Welcome to our service!",
    "Welcome Team"
  );
};

// Example 3: Send plain text email
// const sendPlainTextEmail = async () => {
//   const textContent = `
// Hello!

// This is a plain text email sent from the Email Sender App.

// You can include line breaks and regular text formatting.

// Best regards,
// Email Sender App
//   `;

//   return await sendEmail(
//     "recipient@example.com",
//     textContent,
//     "Plain Text Message"
//   );
// };

// // Example 4: Using axios (alternative to fetch)
// const sendEmailWithAxios = async (toEmail, emailContent, subject) => {
//   try {
//     const axios = require("axios"); // Make sure to install: npm install axios

//     const response = await axios.post("http://localhost:3000/api/send-email", {
//       toEmail: toEmail,
//       emailContent: emailContent,
//       subject: subject,
//     });

//     console.log("✅ Email sent successfully!");
//     console.log("Details:", response.data.details);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Error sending email:",
//       error.response?.data || error.message
//     );
//     return { success: false, error: error.response?.data || error.message };
//   }
// };

// // Example 5: React component for email sending
// const EmailSenderComponent = () => {
//   const [formData, setFormData] = React.useState({
//     toEmail: "",
//     subject: "",
//     emailContent: "",
//   });
//   const [loading, setLoading] = React.useState(false);
//   const [status, setStatus] = React.useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);

//     try {
//       const result = await sendEmail(
//         formData.toEmail,
//         formData.emailContent,
//         formData.subject
//       );

//       if (result.success) {
//         setStatus({ type: "success", message: "Email sent successfully!" });
//         setFormData({ toEmail: "", subject: "", emailContent: "" });
//       } else {
//         setStatus({
//           type: "error",
//           message: result.message || "Failed to send email",
//         });
//       }
//     } catch (error) {
//       setStatus({ type: "error", message: "Failed to send email" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{ maxWidth: "500px", margin: "0 auto" }}
//     >
//       <div style={{ marginBottom: "15px" }}>
//         <label>To Email:</label>
//         <input
//           type="email"
//           value={formData.toEmail}
//           onChange={(e) =>
//             setFormData({ ...formData, toEmail: e.target.value })
//           }
//           required
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label>Subject (optional):</label>
//         <input
//           type="text"
//           value={formData.subject}
//           onChange={(e) =>
//             setFormData({ ...formData, subject: e.target.value })
//           }
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label>Email Content:</label>
//         <textarea
//           value={formData.emailContent}
//           onChange={(e) =>
//             setFormData({ ...formData, emailContent: e.target.value })
//           }
//           required
//           rows="6"
//           style={{ width: "100%", padding: "8px" }}
//           placeholder="Enter your email content here (HTML is supported)"
//         />
//       </div>

//       <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
//         {loading ? "Sending..." : "Send Email"}
//       </button>

//       {status && (
//         <div
//           style={{
//             marginTop: "15px",
//             padding: "10px",
//             backgroundColor: status.type === "success" ? "#d4edda" : "#f8d7da",
//             color: status.type === "success" ? "#155724" : "#721c24",
//             borderRadius: "4px",
//           }}
//         >
//           {status.message}
//         </div>
//       )}
//     </form>
//   );
// };

// // Example 6: Bulk email sending (with delay to respect rate limits)
// const sendBulkEmails = async (emails) => {
//   const results = [];
//   const delay = 1000; // 1 second delay between emails

//   for (let i = 0; i < emails.length; i++) {
//     const { toEmail, emailContent, subject } = emails[i];

//     console.log(`Sending email ${i + 1} of ${emails.length} to ${toEmail}...`);

//     const result = await sendEmail(toEmail, emailContent, subject);
//     results.push({ toEmail, result });

//     // Add delay between emails (except for the last one)
//     if (i < emails.length - 1) {
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }

//   return results;
// };

// // Example 7: Test the email configuration
// const testEmailConfiguration = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/test");
//     const result = await response.json();

//     if (result.success) {
//       console.log("✅ Email configuration is valid");
//       console.log("Config:", result.config);
//     } else {
//       console.error("❌ Email configuration failed:", result.message);
//     }

//     return result;
//   } catch (error) {
//     console.error("❌ Error testing configuration:", error);
//     return { success: false, error: error.message };
//   }
// };

// Example usage calls (uncomment to test):

// Test configuration first
// testEmailConfiguration();

// Send a simple email
// sendEmail("test@example.com", "Hello from Email Sender App!", "Test Email");

// Send HTML email
// sendHtmlEmail();

// Send plain text email
// sendPlainTextEmail();

// Send bulk emails
// const bulkEmails = [
//   {
//     toEmail: "user1@example.com",
//     subject: "Welcome User 1",
//     emailContent: "<h1>Welcome User 1!</h1><p>Thank you for joining us.</p>"
//   },
//   {
//     toEmail: "user2@example.com",
//     subject: "Welcome User 2",
//     emailContent: "<h1>Welcome User 2!</h1><p>Thank you for joining us.</p>"
//   }
// ];
// sendBulkEmails(bulkEmails);

// module.exports = {
//   sendEmail,
//   sendHtmlEmail,
//   sendPlainTextEmail,
//   sendEmailWithAxios,
//   sendBulkEmails,
//   testEmailConfiguration,
// };

sendHtmlEmail();
