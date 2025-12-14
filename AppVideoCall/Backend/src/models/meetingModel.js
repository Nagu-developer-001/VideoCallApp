import { Schema } from "mongoose";

const meetingSchema = new Schema(
{
    user_id:{type:String},
    meetingCode:{type:String,required:true},
    date:{type:date,default:Date.now,required:true}
}

);

const Meeting = mongoose.model('Meeting', meetingSchema);
export {Meeting};