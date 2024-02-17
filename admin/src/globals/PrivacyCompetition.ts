import { GlobalConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";

const PrivacyCompetition: GlobalConfig = {
    slug: "privacy-competition",
    label: "Privacy statement for competitions",
    access: {
        read: () => true,
        update: isAdmin,
    },
    fields: [
        {
            name: "privacy",
            type: "textarea",
            label: "Privacy statement",
            required: true,
        },
        {
            name: "last_updated",
            type: "date",
            label: "Last updated",
            required: true,
        }
    ],
};

export default PrivacyCompetition;