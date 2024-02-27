import { GlobalConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";

const PrivacyWebsite: GlobalConfig = {
    slug: "privacy_website",
    label: "Privacy statement for the website",
    access: {
        read: () => true,
        update: isAdmin,
    },
    fields: [
        {
            name: "privacy_url",
            label: "Privacy URL",
            type: "text",
            required: true,
            admin: {
                description: "The URL of the privacy statement",
            },
        },
    ],
};

export default PrivacyWebsite;