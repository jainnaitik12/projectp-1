import { mongo } from "mongoose";

const companySchema = new mongoose.Schema(
    {
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    companyName: { type: String, required: true },
    JNFs :[{
        type : mongoose.schema.Types.ObjectId,
        ref:"JNF",
    }],
}
)
export const Company = mongoose.model("Company", companySchema);