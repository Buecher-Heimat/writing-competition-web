import payload from "payload"
import { CollectionAfterChangeHook } from "payload/types"

export const afterChangeHook: CollectionAfterChangeHook = async ({
    doc, // full document data
    req, // full express request
    previousDoc, // document data before updating the collection
    operation, // name of the operation ie. 'create', 'update'
}) => {
    console.log("After change hook fired")
    try {
        // TODO implement sending email

        // if (operation === 'create') {
        //     console.log("Sending email")
        //     payload.sendEmail({
        //         to: doc.email,
        //         subject: "Teilnahmebestätigung Schreibwettbewerb der Bücher-Heimat",
        //         text: `Hallo ${doc.author},\n\nvielen Dank für deine Teilnahme am Schreibwettbewerb der Bücher-Heimat. Wir werden deinen Beitrag in Kürze prüfen und dich über das Ergebnis informieren.\n\nViele Grüße\n\nDein Bücher-Heimat Team`,
        //     })
        // } else if (operation === 'update' && !previousDoc.approved && doc.approved) {
        //     console.log("Sending email")
        //     payload.sendEmail({
        //         to: doc.email,
        //         subject: "Dein Beitrag zum Schreibwettbewerb der Bücher-Heimat wurde freigeschaltet",
        //         text: `Hallo ${doc.author},\n\nvielen Dank für deine Teilnahme am Schreibwettbewerb der Bücher-Heimat. Wir haben deinen Beitrag geprüft und freigeschaltet. Du kannst ihn hier einsehen: https://buecher-heimat.de/schreibwettbewerb\n\nViele Grüße\n\nDein Bücher-Heimat Team`,
        //     })
        // }
    } catch (error) {
        console.error(error)
    }
    // if (!previousDoc) {
    //     sendMail({
    //         to: doc.email,
    //         subject: "Thank you for your submission",
    //         text: "Thank you for your submission. We will review it shortly.",
    //         html: "Thank you for your submission. We will review it shortly.",
    //     })
    // }

    // if (previousDoc && !previousDoc.approved && doc.approved) {
    //     sendMail({
    //         to: doc.email,
    //         subject: "Your submission has been approved",
    //         text: "Your submission has been approved. Thank you for your contribution.",
    //         html: "Your submission has been approved. Thank you for your contribution.",
    //     })
    // }

    return doc
}