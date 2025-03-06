// email.service.ts
import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

class EmailService {
  private transporter!: Transporter;
  private initialized: boolean = false;
  
  constructor() {
    // Defer initialization until needed and environment variables are available
  }
  
  private async initialize() {
    if (this.initialized) return;
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.");
    }
    
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Optional security settings
      tls: {
        rejectUnauthorized: true,
      }
    });
    
    // Verify connection
    await this.transporter.verify();
    this.initialized = true;
  }
  
  async sendEmail(to: string, subject: string, templateName: string, context: any) {
    await this.initialize();
    
    // Read the template file
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    
    // Compile template
    const template = handlebars.compile(templateSource);
    const html = template(context);
    
    // Send email
    const result = await this.transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: this.htmlToPlainText(html), // Fallback plain text version
    });
    
    return result;
  }
  
  async sendPasswordResetEmail(to: string, otp: string) {
    return this.sendEmail(to, "Password Reset OTP", "password-reset", {
      otp,
      expires: "10 minutes",
      appName: "Your App Name",
      year: new Date().getFullYear(),
    });
  }
  
  async sendVerificationEmail(to: string, verificationUrl: string) {
    return this.sendEmail(to, "Verify Your Email", "email-verification", {
      verificationUrl,
      expires: "24 hours",
      appName: "Your App Name",
      year: new Date().getFullYear(),
    });
  }
  
  // Simple HTML to plaintext converter for text version of emails
  private htmlToPlainText(html: string): string {
    return html
      .replace(/<style[^>]*>.*<\/style>/g, '')
      .replace(/<script[^>]*>.*<\/script>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

export const emailService = new EmailService();