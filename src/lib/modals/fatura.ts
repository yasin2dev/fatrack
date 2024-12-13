import {Schema, model, models} from "mongoose";


const FaturaSchema = new Schema(
    {
        title: {type: "string", required: true},
        origin: {type: "number", require: true},
        root_amount: {type: "number", require: false},
        tax_val: {type: "number", require: false},
        total: {type: "number", require: true},
        owner: {type: Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true
    }
)

const Fatura = models.Fatura || model("Fatura", FaturaSchema);

export default Fatura;