import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

export default function ConferenceTicketEmail({
  fullName = "John Doe",
  email = "john.doe@example.com",
  github = "johndoe",
  ticketNumber = "#77517",
  avatarUrl = "https://via.placeholder.com/150",
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Congrats, {fullName}! 🎉</Heading>

          <Text style={text}>
            Your ticket for <strong>Coding Conf 2025</strong> is ready!
          </Text>

          <Text style={text}>
            We're excited to see you at the conference on{" "}
            <strong>January 31, 2026</strong> in <strong>Austin, TX</strong>.
          </Text>

          <Section style={ticketSection}>
            <Section style={ticketHeader}>
              <Text style={ticketTitle}>Your Conference Ticket</Text>
              <Text style={ticketNumberText}>{ticketNumber}</Text>
            </Section>

            <Section style={ticketContent}>
              <Row>
                <Column style={avatarColumn}>
                  <Img
                    src={avatarUrl}
                    width="80"
                    height="80"
                    alt={fullName}
                    style={avatar}
                  />
                </Column>
                <Column style={ticketInfo}>
                  <Text style={attendeeName}>{fullName}</Text>
                  <Text style={attendeeEmail}>{email}</Text>
                  <Text style={attendeeGithub}>@{github}</Text>
                </Column>
              </Row>
            </Section>

            <Section style={ticketFooter}>
              <Text style={eventDetails}>📅 Jan 31, 2026 | 📍 Austin, TX</Text>
            </Section>
          </Section>

          <Text style={text}>
            Keep this email safe - you'll need it to check in at the event.
          </Text>

          <Text style={footer}>
            Questions? Reply to this email or visit our{" "}
            <Link href="https://your-conference-site.com/help" style={link}>
              Help Center
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 32px",
  textAlign: "center",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 32px",
};

const ticketSection = {
  backgroundColor: "#f8f9fa",
  border: "2px solid #e9ecef",
  borderRadius: "12px",
  overflow: "hidden",
  margin: "32px",
};

const ticketHeader = {
  backgroundColor: "#FF8C42",
  padding: "20px",
  textAlign: "center",
};

const ticketTitle = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0",
};

const ticketNumberText = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "8px 0 0 0",
};

const ticketContent = {
  padding: "32px",
};

const avatarColumn = {
  width: "100px",
  verticalAlign: "middle",
};

const avatar = {
  borderRadius: "12px",
  display: "block",
  width: "80px",
  height: "80px",
  objectFit: "cover",
};

const ticketInfo = {
  verticalAlign: "middle",
  paddingLeft: "20px",
};

const attendeeName = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
};

const attendeeEmail = {
  color: "#666",
  fontSize: "16px",
  margin: "4px 0",
};

const attendeeGithub = {
  color: "#666",
  fontSize: "14px",
  margin: "4px 0",
};

const ticketFooter = {
  borderTop: "1px solid #e9ecef",
  padding: "20px",
  textAlign: "center",
};

const eventDetails = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 32px",
  marginTop: "32px",
};

const link = {
  color: "#FF8C42",
  textDecoration: "underline",
};
