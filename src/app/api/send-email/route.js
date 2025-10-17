import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import ConferenceTicketEmail from "@/emails/conference-ticket";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { fullName, email, github, avatar } = await request.json();

    // Debug logging
    console.log("📧 Sending email with avatar data:");
    console.log("- Avatar received:", avatar ? "Yes" : "No");
    console.log("- Has base64:", avatar?.base64 ? "Yes" : "No");

    let avatarUrl = "https://via.placeholder.com/150";
    let attachments = [];

    // If we have a base64 image, attach it with CID
    if (avatar?.base64) {
      const base64Match = avatar.base64.match(
        /^data:image\/([a-zA-Z]+);base64,(.+)$/
      );

      if (base64Match) {
        const imageType = base64Match[1];
        const base64Content = base64Match[2];

        const filename = `avatar.${imageType}`;

        // Use CID (Content-ID) for embedded image - reference by filename
        avatarUrl = `cid:${filename}`;

        attachments.push({
          filename: filename,
          content: base64Content,
        });

        console.log("✅ Using CID attachment for avatar");
        console.log(`   Filename: ${filename}, CID: cid:${filename}`);
      } else {
        console.log("⚠️ Could not parse base64, using placeholder");
      }
    }

    // Render the email template
    const emailHtml = await render(
      ConferenceTicketEmail({
        fullName,
        email,
        github,
        ticketNumber: `#${Math.floor(10000 + Math.random() * 90000)}`,
        avatarUrl: avatarUrl,
      })
    );

    // Prepare email options
    const emailOptions = {
      from: "Coding Conf <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Your Coding Conf 2026 Ticket is Ready!",
      html: emailHtml,
    };

    // Add attachments if we have them
    if (attachments.length > 0) {
      emailOptions.attachments = attachments;
    }

    // Send the email
    const data = await resend.emails.send(emailOptions);

    console.log("✅ Email sent successfully:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
