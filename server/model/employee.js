import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    careerStartDate: { type: Date, required: true },
    joiningDate: { type: Date, required: true },
    projects: {
        type: [String],
        default: []
    },
    onBench: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
})

export default mongoose.model('Employee', employeeSchema)
