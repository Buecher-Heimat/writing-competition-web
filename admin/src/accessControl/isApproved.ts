export function isApproved({ req: { user } }) {
    // allow authenticated users
    if (user) {
        return true
    }
    return {
        approved_by_organizer: {
            equals: true,
        },
    }
}