import { GlobalConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";

import {
    HTMLConverterFeature,
    lexicalEditor,
    lexicalHTML
} from '@payloadcms/richtext-lexical'

const PrivacyCompetition: GlobalConfig = {
    slug: "privacy_competition",
    label: "Privacy statement for competitions",
    access: {
        read: () => true,
        update: isAdmin,
    },
    fields: [
        {
            name: "privacy",
            type: "richText",
            label: "Privacy statement",
            required: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('privacy', { name: 'privacy_html' }),
    ],
};

export default PrivacyCompetition;