/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    posts: Post;
    competitions: Competition;
    media: Media;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    privacy_competition: PrivacyCompetition;
    privacy_website: PrivacyWebsite;
    writing_tips: WritingTip;
    instruction_steps: InstructionStep;
  };
}
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
  slug: string;
  author: string;
  email: string;
  location: string;
  _verified?: boolean | null;
  phone?: string | null;
  age_author: number;
  agegroup?: {
    age_start?: number | null;
    age_end?: number | null;
  };
  delete_after_competition: boolean;
  keep_if_winner: boolean;
  approved_by_organizer?: boolean | null;
  content: string;
  winner?: boolean | null;
  competition: string | Competition;
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
  slug: string;
  image_hero: string | Media;
  date_start: string;
  date_end: string;
  date_winner_announcement?: string | null;
  sponsor_string?: string | null;
  sponsors?:
    | {
        name?: string | null;
        link?: string | null;
        logo?: string | Media | null;
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
  terms_conditions: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  };
  terms_conditions_html?: string | null;
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "privacy_competition".
 */
export interface PrivacyCompetition {
  id: string;
  privacy: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  };
  privacy_html?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "privacy_website".
 */
export interface PrivacyWebsite {
  id: string;
  privacy: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  };
  privacy_html?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "writing_tips".
 */
export interface WritingTip {
  id: string;
  tips?:
    | {
        tip: string;
        id?: string | null;
      }[]
    | null;
  last_updated: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "instruction_steps".
 */
export interface InstructionStep {
  id: string;
  steps: {
    title: string;
    description: string;
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}