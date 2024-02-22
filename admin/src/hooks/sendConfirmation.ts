import payload from "payload"
import { CollectionAfterChangeHook } from "payload/types"
import jwt from "jsonwebtoken"
import { Post } from "payload/generated-types"

export const afterChangeHook: CollectionAfterChangeHook = async ({
    doc, // full document data
    req, // full express request
    previousDoc, // document data before updating the collection
    operation, // name of the operation ie. 'create', 'update'
}) => {
    console.log("After change hook fired")
    const from = `"Bücher-Heimat Schreibwettbewerb" ${process.env.SMTP_EMAIL || process.env.SMTP_USER}`
    const post = doc as Post
    const previousPost = previousDoc as Post

    try {
        const competition = typeof post.competition === "string" ? await payload.findByID({
            collection: "competitions",
            id: post.competition
        }) : post.competition;

        const link = `${process.env.PUBLIC_USER_URL}/texte/${post.slug}`

        if (operation === 'create' && !post._verified) {
            console.log("Sending verification email")
            const token = jwt.sign({ id: post.id }, process.env.PAYLOAD_SECRET, { expiresIn: "180d" })
            payload.sendEmail({
                to: post.email,
                subject: "Bestätigung Deiner E-Mail-Adresse für den Schreibwettbewerb der Bücher-Heimat",
                text: `
Hallo ${post.author},

Dein Beitrag zum Schreibwettbewerb "${competition.title}" der Bücher-Heimat ist schon bei uns eingegangen. Jetzt musst Du nur noch in einem letzten Schritt Deine E-Mail-Adresse bestätigen, damit wir auch wissen, dass wir mit der richtigen Person schreiben.

Klick zum Bestätigen Deiner E-Mail-Adresse einfach auf den folgenden Link: ${process.env.PUBLIC_USER_URL}/email-bestaetigung?token=${token}

Vielen Dank für Deine Teilnahme und viel Erfolg 
Dein Bücher-Heimat Team!


P.S.: Wenn Du Dich nie zu einem Schreibwettbewerb angemeldet hast, kannst Du diese Mail einfach ignorieren (wobei wir Dir nur empfehlen können, mal bei uns vorbei zu schauen).
                `,
                from
            })
        }
        else if (operation === 'update' && !previousPost._verified && post._verified) {
            console.log("Sending confirmation email")
            payload.sendEmail({
                to: post.email,
                subject: "Herzlich Willkommen beim Schreibwettbewerb der Bücher-Heimat",
                text: `
Hallo ${post.author}, 

nachdem Du Deine E-Mail-Adresse bestätigt hast, jetzt nochmal ein offzielles, herzliches Willkommen zum Schreibwettbewerb "${competition.title}" der Bücher-Heimat. Wir freuen uns sehr, dass Du mitmachst!

Wir werden im nächsten Schritt Deinen Text prüfen. Das kann einige Zeit dauern. Wir werden Dir eine weitere E-Mail schicken, sobald die Überprüfung abgeschlossen ist und Du Deinen Text auf unserer Online-Plattform finden kannst. 

Mit fleißig prüfenden Grüßen
Dein Bücher-Heimat Team!
                `,
                from
            })
        }
        else if ((operation === 'update' && !previousPost.approved_by_organizer && post.approved_by_organizer) || (operation === 'create' && post.approved_by_organizer)) {
            console.log("Sending email")
            payload.sendEmail({
                to: post.email,
                subject: "Dein Beitrag zum Schreibwettbewerb der Bücher-Heimat wurde freigeschaltet",
                text: `
Hallo ${post.author},

danke für Deinen tollen Text! Wir haben ihn geprüft und er ist ab sofort auf unserer Online-Plattform unter folgendem Link abrufbar: ${link}

Am ${new Date(competition.date_end).toLocaleDateString("de-DE")} endet der Wettbewerb und unsere Jury wird entscheiden, wer gewonnen hat. 

Mit gespannten Grüßen
Dein Bücher-Heimat Team!
                `,
                from
            })
        }
        else if (operation === 'update' && !previousPost.winner && post.winner) {
            console.log("Sending winner email")
            payload.sendEmail({
                to: post.email,
                subject: "Dein Beitrag zum Schreibwettbewerb der Bücher-Heimat wurde prämiert",
                text: `
Herzlichen Glückwunsch ${post.author}!

Du hast den Schreibwettbewerb "${competition.title}" in Deiner Altersgruppe gewonnen! Dein Text war wirklich sehr gut. 

Zum weiteren Ablauf werden wir uns nochmal mit Dir in Verbindung setzen. 

Bis dahin
Dein Bücher-Heimat Team!

P.S.: Zur Erinnerung: Deinen und alle anderen Texte kannst Du unter folgendem Link abrufen: ${link}
                `,
                from
            })
        }
    } catch (error) {
        console.error(error)
    }

    return doc
}