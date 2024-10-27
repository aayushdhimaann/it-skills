import resend from "@/lib/resend";
import WelcomeEmail from "@/components/email/WelcomeEmail";
import { mailOption, transporter } from "@/config/nodemailer";

export async function sendEmail(email, subject, content) {
  try {
    await transporter.sendMail({
      ...mailOption,
      subject: subject,
      // text: "This is a test string",
      html: content,
    });
    return {
      success: true,
      message: `Email sent successfully to ${email}`,
    };
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    return {
      success: false,
      message: `Email delivery failed: ${error.message}`,
    };
  }
}
