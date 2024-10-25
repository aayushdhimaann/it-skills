import resend from "@/lib/resend";
import WelcomeEmail from "@/components/email/WelcomeEmail";
import { mailOption, transporter } from "@/config/nodemailer";

import ContactMail from "@/components/email/ContactMail";
/*
export async function sendEmail(email, username) {
  console.log(email);

  try {
    const res = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to our website",
      react: <WelcomeEmail name={`${username}`} />,
    });

    console.log(res);

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
*/
export async function sendContactQuery(name, no, bio) {
  try {
    const htmlContent = ContactMail(name, no, bio);

    await transporter.sendMail({
      ...mailOption,
      subject: "Welcome to our website",
      text: "This is a test string",
      html: htmlContent, // Use the rendered HTML content here
    });
    return {
      success: true,
      message: `Email sent successfully to SuperAdmin`,
    };
  } catch (error) {
    console.error(`Failed to send email to SuperAdmin:`, error);
    return {
      success: false,
      message: `Email delivery failed: ${error.message}`,
    };
  }
}
