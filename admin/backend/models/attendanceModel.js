const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    students: [
        {
            studentId : {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            status: {
                type: String,
                enum: ['present', 'absent'],
                required: true
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Attendance', attendanceSchema);