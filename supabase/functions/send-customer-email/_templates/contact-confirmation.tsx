import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ContactConfirmationEmailProps {
  customerName: string;
  customerEmail: string;
  customerMessage: string;
  subject?: string;
}

export const ContactConfirmationEmail = ({
  customerName,
  customerEmail,
  customerMessage,
  subject,
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting Zwanski Tech - We'll be in touch soon!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank You for Contacting Us!</Heading>
        
        <Text style={text}>
          Hi {customerName},
        </Text>
        
        <Text style={text}>
          Thank you for reaching out to Zwanski Tech. We have successfully received your message and our team will review it carefully.
        </Text>

        <div style={messageBox}>
          <Text style={messageHeader}>Your Message Details:</Text>
          {subject && <Text style={messageDetail}><strong>Subject:</strong> {subject}</Text>}
          <Text style={messageDetail}><strong>Email:</strong> {customerEmail}</Text>
          <Text style={messageDetail}><strong>Message:</strong></Text>
          <Text style={messageContent}>{customerMessage}</Text>
        </div>

        <Text style={text}>
          <strong>What happens next?</strong>
        </Text>
        
        <Text style={text}>
          • Our team typically responds within 24-48 hours<br/>
          • For urgent technical issues, we prioritize faster response times<br/>
          • You'll receive a detailed response at {customerEmail}
        </Text>

        <Text style={text}>
          In the meantime, feel free to explore our services and resources:
        </Text>

        <div style={linkContainer}>
          <Link href="https://zwanski.org/services" style={link}>
            🔧 Our Services
          </Link>
          <Link href="https://zwanski.org/academy" style={link}>
            🎓 Zwanski Academy
          </Link>
          <Link href="https://zwanski.org/jobs" style={link}>
            💼 Job Opportunities
          </Link>
        </div>

        <Text style={text}>
          Thank you for choosing Zwanski Tech for your technology needs!
        </Text>

        <Text style={signature}>
          Best regards,<br/>
          The Zwanski Tech Team<br/>
          <Link href="https://zwanski.org" style={{...link, color: '#666'}}>zwanski.org</Link>
        </Text>

        <Text style={footer}>
          Zwanski Tech - Empowering migrants, students, and underserved communities through technology education and services.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ContactConfirmationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  margin: '40px auto',
  padding: '40px',
  maxWidth: '600px',
}

const h1 = {
  color: '#1a202c',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0 0 24px 0',
}

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const messageBox = {
  backgroundColor: '#f7fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  padding: '20px',
  margin: '24px 0',
}

const messageHeader = {
  color: '#2d3748',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 12px 0',
}

const messageDetail = {
  color: '#4a5568',
  fontSize: '14px',
  margin: '8px 0',
}

const messageContent = {
  color: '#2d3748',
  fontSize: '14px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  padding: '12px',
  margin: '8px 0',
  whiteSpace: 'pre-wrap' as const,
}

const linkContainer = {
  margin: '24px 0',
}

const link = {
  color: '#3182ce',
  fontSize: '16px',
  textDecoration: 'none',
  display: 'block',
  margin: '8px 0',
  padding: '8px 0',
  borderBottom: '1px solid #e2e8f0',
}

const signature = {
  color: '#4a5568',
  fontSize: '16px',
  margin: '32px 0 24px 0',
  paddingTop: '24px',
  borderTop: '1px solid #e2e8f0',
}

const footer = {
  color: '#a0aec0',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '32px 0 0 0',
  textAlign: 'center' as const,
}