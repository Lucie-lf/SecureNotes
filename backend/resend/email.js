import { resend } from "./config.js";
import { verificationTokenEmailTemplate, WELCOME_EMAIL_TEMPLATE } from "./email-templates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "SecureNotes <onboarding@sharedfolders.online>",
            to: [email],
            subject: "Verification de votre compte",
            html: verificationTokenEmailTemplate.replace("{verificationToken}", verificationToken),
        });
    } catch (error) {
        console.log("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "SecureNotes <onboarding@sharedfolders.online>",
            to: [email],
            subject: "Welcome to SecureNotes",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
        });
    } catch (error) {
        console.log("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }
}