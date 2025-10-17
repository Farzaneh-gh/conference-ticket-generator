# 🎟️ Conference Ticket GeneratorThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

A modern Next.js application for generating and emailing conference tickets with custom avatars. Built with Next.js 14, Tailwind CSS, and Resend for email delivery.## Getting Started

## ✨ FeaturesFirst, run the development server:

- 📝 **Registration Form** with React Hook Form validation```bash

- 🖼️ **Avatar Upload** with base64 conversionnpm run dev

- 📧 **Email Delivery** using Resend API with CID attachments# or

- 🎨 **Beautiful Email Templates** built with React Emailyarn dev

- 📱 **Responsive Design** with Tailwind CSS# or

- ⚡ **Next.js App Router** for optimal performancepnpm dev

- 🚀 **Ready for Vercel** deployment# or

bun dev

## 🛠️ Tech Stack```

- **Framework:** Next.js 14 (App Router)Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Language:** JavaScript

- **Styling:** Tailwind CSSYou can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

- **Form Handling:** React Hook Form

- **Email Service:** ResendThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Email Templates:** React Email Components

## Learn More

## 📦 Installation

To learn more about Next.js, take a look at the following resources:

1. **Install dependencies:**

   ```bash- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

   npm install- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

   ```

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

2. **Set up environment variables:**

   ## Deploy on Vercel

   Create or edit the `.env.local` file:

   ````envThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

   RESEND_API_KEY=your_resend_api_key_here

   ```Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


   Get your API key from [Resend](https://resend.com/api-keys)

   ````

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
conference-ticket-generator/
├── src/
│   └── app/
│       ├── api/
│       │   └── send-email/
│       │       └── route.js       # API endpoint for sending emails
│       ├── globals.css            # Global styles
│       ├── layout.js              # Root layout
│       └── page.js                # Main registration page
├── components/
│   ├── Avatar.jsx                 # Avatar upload component
│   └── Input.jsx                  # Form input component
├── emails/
│   └── conference-ticket.jsx      # Email template
├── public/                        # Static assets
├── .env.local                     # Environment variables (create this)
├── package.json
└── README.md
```

## 🚀 Deployment to Vercel

### Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Add environment variable:
   - Key: `RESEND_API_KEY`
   - Value: Your Resend API key
5. Click "Deploy"

### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add RESEND_API_KEY

# Deploy to production
vercel --prod
```

## 🔑 Environment Variables

| Variable         | Description                            | Required |
| ---------------- | -------------------------------------- | -------- |
| `RESEND_API_KEY` | Your Resend API key for sending emails | Yes      |

## 📧 Email Configuration

The app uses **CID (Content-ID) attachments** for embedding avatars in emails, which ensures:

- ✅ Compatibility with all major email clients (Gmail, Outlook, Apple Mail)
- ✅ No base64 size limitations
- ✅ Proper image display in emails

To change the sender email, edit `app/api/send-email/route.js`:

```javascript
from: "Your Conference <onboarding@resend.dev>",
```

**Note:** For production, verify your domain in Resend to send from your own email address.

## 🎨 Customization

### Update Conference Details

Edit `/emails/conference-ticket.jsx` to update:

- Conference name
- Date and location
- Event details
- Styling

### Modify Form Fields

Edit `src/app/page.js` to add/remove form fields

### Change Theme Colors

Update Tailwind classes in components

## 📝 How It Works

1. User fills out the registration form with:
   - Full Name
   - Email Address
   - GitHub Username
   - Avatar (image upload)

2. Avatar is converted to base64 on the client side

3. Form data is sent to `/api/send-email` API route

4. Server renders the email template with user data

5. Avatar is attached as inline CID attachment

6. Email is sent via Resend API

7. User sees confirmation and ticket preview

## 🐛 Troubleshooting

### Avatar not showing in email

- The app uses CID attachments which work with all email clients
- Check console logs for base64 conversion errors
- Verify the Resend API response

### Email not sending

- Check your `RESEND_API_KEY` is correct in `.env.local`
- Verify you're using a verified email domain in production
- Check API route console logs for errors

### Development server not starting

- Make sure all dependencies are installed: `npm install`
- Check that port 3000 is not in use
- Delete `.next` folder and restart

## 📄 License

MIT License - feel free to use this project for your own conferences!

## 💡 Next.js + Vercel Benefits

✅ **Single Deployment** - No separate backend needed
✅ **Serverless API Routes** - Automatic scaling
✅ **No CORS Issues** - Same-origin requests
✅ **Environment Variables** - Easy configuration
✅ **Zero Config** - Deploy with one click
