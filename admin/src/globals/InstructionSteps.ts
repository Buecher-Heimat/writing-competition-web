import { GlobalConfig } from "payload/types";
import { isAdmin } from "../accessControl/isAdmin";

const InstructionSteps: GlobalConfig = {
    slug: "instruction_steps",
    label: "Instruction steps",
    admin: {
        description: "These are the general instruction steps for the user. They are displayed on the start page. Each competition then has its own steps.",
    },
    access: {
        read: () => true,
        update: isAdmin,
    },
    fields: [
        {
            name: "steps",
            label: "Steps",
            type: "array",
            required: true,
            fields: [
                {
                    name: "title",
                    type: "text",
                    label: "Title",
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    label: "Description",
                    required: true,
                }
            ]
        }
    ],
};

export default InstructionSteps;