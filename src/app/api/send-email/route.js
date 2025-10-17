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
      // Extract base64 content (remove data:image/...;base64, prefix)
      const base64String = avatar.base64;

      // Check if it starts with data:image
      if (base64String.startsWith("data:image/")) {
        // Find the comma that separates the header from the data
        const commaIndex = base64String.indexOf(",");

        if (commaIndex !== -1) {
          // Extract the header part (e.g., "data:image/png;base64")
          const header = base64String.substring(0, commaIndex);

          // Extract image type (e.g., "png", "jpeg")
          const imageTypeMatch = header.match(/image\/([a-zA-Z]+)/);
          const imageType = imageTypeMatch ? imageTypeMatch[1] : "png";

          // Extract the actual base64 content (after the comma)
          const base64Content = base64String.substring(commaIndex + 1);

          // Use CID (Content-ID) for embedded image
          avatarUrl = "cid:avatar";

          attachments.push({
            filename: `avatar.${imageType}`,
            content: base64Content,
            content_id: "avatar",
            disposition: "inline",
          });

          console.log("✅ Using CID attachment for avatar");
        } else {
          console.log("⚠️ Invalid base64 format, using placeholder");
        }
      } else {
        console.log("⚠️ Not a data URL, using placeholder");
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
