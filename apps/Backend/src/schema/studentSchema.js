import { Schema as _Schema, model, Schema } from "mongoose";

const schema = _Schema;

const StudentSchema = new schema({
    userid: { type: Schema.Types.ObjectId, required: true },
    first_name: {},
    last_name: {},
    
}, { timestamp: true });

const Student = model("Student", StudentSchema);
export default Student;