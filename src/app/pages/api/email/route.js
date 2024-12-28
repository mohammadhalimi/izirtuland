import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
});

export async function POST(req) {
    const { name, email, message } = await req.json();

    const mailOptions = {
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      from: email, 
      replyTo: email,
      subject: `Message from ${name}`,
      text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}


