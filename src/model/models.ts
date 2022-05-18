import { string } from "joi";
import mongoose, { model } from "mongoose";
// import { buffer } from "stream/consumers";



export const schema = mongoose.Schema;


const studentSchema = new schema ({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    },
    tech: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})
const studentModel = model('models', studentSchema);
export default studentModel;


