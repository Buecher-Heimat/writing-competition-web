import { GlobalConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";

const WritingTips: GlobalConfig = {
    slug: "writing_tips",
    label: "Writing tips",
    access: {
        read: () => true,
        update: isAdmin,
    },
    fields: [
        {
            name: "tips",
            type: "array",
            fields: [
                {
                    name: "tip",
                    type: "textarea",
                    label: "Tip",
                    required: true,
                }
            ]
        }
    ],
};

export default WritingTips;