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
        // TODO Refactor emails!!
        const competition = typeof post.competition === "string" ? await payload.findByID({
            collection: "competitions",
            id: post.competition
        }) : post.competition;

        // TODO: What is the link?
        const link = "TODOTODOTODO"

        if (operation === 'create') {
            console.log("Sending verification email")
            const token = jwt.sign({ id: post.id }, process.env.PAYLOAD_SECRET, { expiresIn: "10min" })
            payload.sendEmail({
                to: post.email,
                subject: "Verifikation deines Beitrags zum Schreibwettbewerb der Bücher-Heimat",
                text: `Hallo ${post.author},\n\nvielen Dank für deine Teilnahme am Schreibwettbewerb "${competition.title}" der Bücher-Heimat. Bitte klicke auf den folgenden Link, um deinen Beitrag zu verifizieren: ${process.env.PUBLIC_BACKEND_URL}/verify/${token}\n\nViele Grüße\n\nDein Bücher-Heimat Team`,
                from
            })
        }
        else if (operation === 'update' && !previousPost._verified && post._verified) {
            console.log("Sending confirmation email")
            payload.sendEmail({
                to: post.email,
                subject: "Teilnahmebestätigung Schreibwettbewerb der Bücher-Heimat",
                text: `Hallo ${post.author},\n\nvielen Dank für deine Teilnahme am Schreibwettbewerb "${competition.title}" der Bücher-Heimat. Wir werden deinen Beitrag in Kürze prüfen und dich über das Ergebnis informieren.\n\nViele Grüße\n\nDein Bücher-Heimat Team`,
                from
            })
        }
        else if (operation === 'update' && !previousPost.approved_by_organizer && post.approved_by_organizer) {
            console.log("Sending email")
            payload.sendEmail({
                to: post.email,
                subject: "Dein Beitrag zum Schreibwettbewerb der Bücher-Heimat wurde freigeschaltet",
                text: `Hallo ${post.author},\n\nvielen Dank für deine Teilnahme am Schreibwettbewerb "${competition.title}" der Bücher-Heimat. Wir haben deinen Beitrag geprüft und freigeschaltet. Du kannst ihn hier einsehen: ${link}\n\nViele Grüße\n\nDein Bücher-Heimat Team`,
                from
            })
        }
        else if (operation === 'update' && !previousPost.winner && post.winner) {
            console.log("Sending winner email")
            payload.sendEmail({
                to: post.email,
                subject: "Dein Beitrag zum Schreibwettbewerb der Bücher-Heimat wurde prämiert",
                text: `Hallo ${post.author},\n\nDu hast den Schreibwettbewerb "${competition.title}" in deiner Altergruppe gewonnen! Du kannst deinen Text hier einsehen: ${link}\n\nViele Grüße\n\nDein Bücher-Heimat Team`,
                from
            })
        }
    } catch (error) {
        console.error(error)
    }

    return doc
}