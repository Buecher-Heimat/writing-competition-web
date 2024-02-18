import { CollectionConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";

import {
    HTMLConverterFeature,
    lexicalEditor,
    lexicalHTML
} from '@payloadcms/richtext-lexical'

const Competitions: CollectionConfig = {
    slug: "competitions",
    admin: {
        useAsTitle: "title"
    },
    timestamps: true,
    access: {
        create: isAdmin,
        read: () => true,
        update: isAdmin,
        delete: isAdmin
    },
    fields: [
        {
            name: "title",
            admin: {
                description: "The title of your competition"
            },
            label: "Title",
            type: "text",
            required: true
        },
        {
            name: "image_hero",
            label: "Hero image",
            admin: {
                description: "The image that is used as the primary advertising image on the website. It should clearly show which target group the competition is aimed at."
            },
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "date_start",
            admin: {
                description: "The date on which people can start making submissions"
            },
            label: "Start date",
            type: "date",
            required: true
        },
        {
            name: "date_end",
            admin: {
                description: "The date until which people can make submissions"
            },
            label: "End date",
            type: "date",
            required: true
        },
        {
            name: "date_winner_announcement",
            label: "Date of announcement of the winners",
            admin: {
                description: "As soon as it is known, enter the date of the winner announcement or award ceremony here"
            },
            type: "date"
        },
        {
            name: "sponsor_string",
            label: "All sponsors sentence",
            admin: {
                description: "A sentence that summarises all sponsors. For example: 'In Kooperation mit der Öffentlichen Versicherung Braunschweig und der Stadtbücherei Bad Harzburg."
            },
            type: "text"
        },
        {
            name: "sponsors",
            admin: {
                description: "A list of the sponsors of the competition",
            },
            labels: {
                singular: "Sponsor",
                plural: "Sponsors"
            },
            type: "array",
            fields: [
                {
                    name: "name",
                    admin: {
                        description: "The name of the sponsor"
                    },
                    label: "Name",
                    type: "text",
                    required: true
                },
                {
                    name: "link",
                    label: "Link",
                    admin: {
                        description: "A link to the sponsor's website"
                    },
                    type: "text"
                },
                {
                    name: "logo",
                    label: "Logo",
                    admin: {
                        description: "The sponsors's logo"
                    },
                    type: "upload",
                    relationTo: "media",
                    required: true
                }
            ]
        },
        {
            name: "agegroups",
            labels: {
                singular: "Age group",
                plural: "Age groups"
            },
            type: "array",
            minRows: 1,
            required: true,
            fields: [
                {
                    name: "age_start",
                    label: "Start",
                    type: "number"
                },
                {
                    name: "age_end",
                    label: "End",
                    type: "number"
                }
            ]
        },
        {
            name: "instruction_steps",
            labels: {
                singular: "Instruction step",
                plural: "Instruction steps"
            },
            type: "array",
            required: true,
            fields: [
                {
                    name: "title",
                    label: "Title",
                    type: "text"
                },
                {
                    name: "description",
                    label: "Description",
                    type: "textarea"
                }
            ]
        },
        {
            name: "text_min_length",
            label: "Minimum text length",
            admin: {
                description: "The minimum length of the text that can be submitted"
            },
            type: "number",
            defaultValue: 280,
            required: true
        },
        {
            name: "text_max_length",
            label: "Maximum text length",
            admin: {
                description: "The maximum length of the text that can be submitted"
            },
            type: "number",
            defaultValue: 11000,
            required: true
        },
        {
            name: "terms_conditions",
            label: "Terms and conditions",
            admin: {
                description: "The terms and conditions of the competition"
            },
            type: "richText",
            required: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('terms_conditions', { name: 'terms_conditions_html' }),
    ]
}

export default Competitions