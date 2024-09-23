import resend from "@/lib/resend";
import WelcomeEmail from "@/components/email/WelcomeEmail";

export async function sendEmail(email) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to our website",
      react: <WelcomeEmail name="Aayush" />,
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
