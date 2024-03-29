import { CollectionConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";
import { isApproved } from "../accessControl/isApproved";
import { afterChangeHook } from "../hooks/sendConfirmation";
import { slugField } from "../fields/slug";

const Posts: CollectionConfig = {
    slug: "posts",
    admin: {
        useAsTitle: "title",
    },
    timestamps: true,
    access: {
        create: () => true,
        read: isApproved,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        afterChange: [afterChangeHook],
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        slugField(),
        {
            name: "author",
            label: "Author",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            access: {
                read: isAdmin
            }
        },
        {
            name: "location",
            label: "Location",
            type: "text",
            required: true,
            access: {
                read: isAdmin
            }
        },
        {
            name: "_verified",
            label: "Verified",
            type: "checkbox",
            access: {
                read: isAdmin,
                update: isAdmin,
                create: isAdmin
            }
        },
        {
            name: "phone",
            label: "Phonenumber",
            type: "text",
            access: {
                read: isAdmin
            }
        },
        {
            name: "age_author",
            label: "Author Age",
            type: "number",
            access: {
                read: isAdmin
            },
            required: true,
        },
        {
            name: "agegroup",
            label: "Age group",
            type: "group",
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
            name: "delete_after_competition",
            label: "Delete after competition",
            admin: {
                description: "Indicates if the user wants the post to be deleted after the competition is over."
            },
            access: {
                read: isAdmin
            },
            type: "checkbox",
            required: true
        },
        {
            name: "keep_if_winner",
            label: "Keep if winner",
            admin: {
                description: "Only relevant if delete after competition is checked. Indicates if the user wants their data to be kept if it wins."
            },
            access: {
                read: isAdmin
            },
            type: "checkbox",
            required: true
        },
        {
            name: "approved_by_organizer",
            label: "Approved by organizer",
            type: "checkbox",
            access: {
                read: () => true,
                update: isAdmin,
                create: isAdmin
            }
        },
        {
            name: "content",
            label: "Content",
            type: "textarea",
            required: true,
        },
        {
            name: "winner",
            label: "Winner",
            type: "checkbox",
            access: {
                read: () => true,
                update: isAdmin,
                create: isAdmin
            }
        },
        {
            name: "competition",
            required: true,
            label: "Competition",
            type: "relationship",
            relationTo: "competitions",
            hasMany: false,
        }
    ]
}

export default Posts;