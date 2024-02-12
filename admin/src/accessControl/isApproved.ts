export function isApproved({ req: { user } }) {
    // allow authenticated users
    if (user) {
        return true
    }
    return {
        approved: {
            equals: true,
        },
    }
}