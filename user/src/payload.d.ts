/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
    id: string;
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
    id: string;
    title: string;
    author: string;
    email: string;
    phone?: string | null;
    age_author: number;
    agegroup?: {
        age_start?: number | null;
        age_end?: number | null;
    };
    permission_publish_forever: boolean;
    approved_by_organizer?: boolean | null;
    content: string;
    winner?: boolean | null;
    competition?: (string | null) | Competition;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "competitions".
 */
export interface Competition {
    id: string;
    title: string;
    image_hero: string | Media;
    date_start: string;
    date_end: string;
    date_winner_announcement?: string | null;
    sponsor_string?: string | null;
    sponsors?:
    | {
        name: string;
        link?: string | null;
        logo: string | Media;
        id?: string | null;
    }[]
    | null;
    agegroups: {
        age_start?: number | null;
        age_end?: number | null;
        id?: string | null;
    }[];
    instruction_steps: {
        title?: string | null;
        description?: string | null;
        id?: string | null;
    }[];
    text_min_length: number;
    text_max_length: number;
    terms_and_conditions: string;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
    id: string;
    alt?: string | null;
    updatedAt: string;
    createdAt: string;
    url?: string | null;
    filename?: string | null;
    mimeType?: string | null;
    filesize?: number | null;
    width?: number | null;
    height?: number | null;
    sizes?: {
        thumbnail?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
        card?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
        tablet?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
    };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
    id: string;
    user: {
        relationTo: 'users';
        value: string | User;
    };
    key?: string | null;
    value?:
    | {
        [k: string]: unknown;
    }
    | unknown[]
    | string
    | number
    | boolean
    | null;
    updatedAt: string;
    createdAt: string;
}