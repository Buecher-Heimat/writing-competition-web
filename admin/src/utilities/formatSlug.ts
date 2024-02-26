import type { FieldHook } from 'payload/types'

const format = (val: string): string => {
    return (val
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase()) + '-' + randomNumber()
}

const formatSlug =
    (fallback: string): FieldHook =>
        ({ data, operation, originalDoc, value }) => {
            if (typeof value === 'string') {
                return format(value)
            }

            if (operation === 'create') {
                const fallbackData = data?.[fallback] || originalDoc?.[fallback]

                if (fallbackData && typeof fallbackData === 'string') {
                    return format(fallbackData)
                }
            }

            return value
        }

const randomNumber = (): number => {
    return Math.floor(Math.random() * 1000)
}

export default formatSlug