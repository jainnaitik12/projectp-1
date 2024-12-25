import { Schema as _Schema, model } from "mongoose";

const schema = _Schema;

const eventSchema =new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
}, { timestamp: true });

const Event = model("Event", eventSchema);

export default Event;