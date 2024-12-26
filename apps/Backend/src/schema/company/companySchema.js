import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;;

const CompanySchema = new Schema(
    {
     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    website: String,
    JNFs :[{
        type : Schema.Types.ObjectId,
        ref:"JNF",
    }],
}
)
const Company = model('Company', CompanySchema);

export default Company;