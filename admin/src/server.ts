import express from 'express'
import payload from 'payload'
import jwt from 'jsonwebtoken'

require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const decoded: { id: string } = jwt.verify(token, process.env.PAYLOAD_SECRET) as { id: string };

    if (!decoded || !decoded.id) {
      res.send("Der Token ist ungültig. Bitte überprüfe den Link und versuche es erneut.")
      return
    };

    await payload.update({
      collection: "posts",
      id: decoded.id,
      data: {
        _verified: true
      }
    })

    // TODO: Make this response nicer (Think about if you want to redirect to a static success page or if that would open an attack vector)
    res.send("Du hast den Post erfolgreich verifiziert! Du kannst die Seite jetzt schließen.")
  }
  catch (error) {
    console.error("Error verifying token", error);
    res.send("Es gab einen Fehler beim Verifizieren deines Posts. Bitte versuche es später erneut.")
  }
})



const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    email: {
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      // Due to a bug in Payload, the fromName and fromAddress are not used. The fromName and fromAddress are hardcoded in the sendEmail function in the sendConfirmation.ts hook.
      fromName: 'Bücher-Heimat Schreibwettbewerb',
      fromAddress: process.env.SMTP_EMAIL || process.env.SMTP_USER,
    },
  })

  // Add your own express routes here

  app.listen(3000)
}

start()
