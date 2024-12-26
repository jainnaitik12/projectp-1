import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;;

const CompanySchema = new Schema(
    {
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    website: String,
    JNFs :[{
        type : mongoose.schema.Types.ObjectId,
        ref:"JNF",
    }],
}
)
const Company = model('Company', CompanySchema);

export default Company;