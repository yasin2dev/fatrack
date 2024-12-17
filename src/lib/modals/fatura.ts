import {Schema, model, models} from "mongoose";


const FaturaSchema = new Schema(
    {
        title: {type: "string", required: true},
        fatura_no: {type: "string", required: true},
        origin: {type: "string", require: true},
        root_amount: {type: "number", require: false},
        tax_rat: {type: "number", require: false},
        tax_val: {type: "number", require: false},
        total: {type: "number", require: true},
        owner: {type: "string", require: false},
        user: { type: Schema.Types.ObjectId, ref: "User" },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
    },
    {
        timestamps: true
    }
)

const Fatura = models.Fatura || model("Fatura", FaturaSchema);

export default Fatura;