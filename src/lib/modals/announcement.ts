import { Schema, model, models } from "mongoose";

const AnnSchema = new Schema(
    {
        title: {type: "string", required: true},
        content: {type: "string", required: true},
        status: {type: "string", require: true}
    },
    {
        timestamps: true,
    }
)

const Announcement = models.Announcement || model("Announcement", AnnSchema);

export default Announcement;