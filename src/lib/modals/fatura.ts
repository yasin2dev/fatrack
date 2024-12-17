import {Schema, model, models} from "mongoose";


const FaturaSchema = new Schema(
    {
        title: {type: "string", required: true},
        fatura_no: {type: "string", required: true},
        fat_type: {type: "string", required: true},
        origin: {type: "string", require: true},
        root_amount: {type: "number", require: false},
        fat_date: {type: Date, require: true},
        fat_edit_date: {type: Date, require: true},
        tax_rat: {type: "number", require: true},
        tax_val: {type: "number", require: false},
        total: {type: "number", require: true},
        owner: {type: "string", require: false},
        to_who: {type: "string", require: true},
        user: { type: Schema.Types.ObjectId, ref: "User" },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
    },
    {
        timestamps: true
    }
)

const Fatura = models.Fatura || model("Fatura", FaturaSchema);

export default Fatura;