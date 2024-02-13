export const isAdmin = ({ req: { user } }) => {
    return Boolean(user)
}