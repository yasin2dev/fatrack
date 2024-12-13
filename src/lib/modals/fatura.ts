import {Schema, model, models} from "mongoose";


const FaturaSchema = new Schema(
    {
        title: {type: "string", required: true},
        origin: {type: Number, require: true},
        root_amount: {type: Number, require: false},
        tax_val: {type: Number, require: false},
        total: {type: Number, require: true},
    },
    {
        timestamps: true
    }
)

const Fatura = models.Fatura || model("Fatura", FaturaSchema);

export default Fatura;