const express = require('express');
const Attendance = require('../models/attendanceModel');

const router = express.Router();

// router.get('/', async (req, res) => {
//         try {
//             const users = await Attendance.find({});
//             res.status(200).json(users);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     });

router.post('/data', async (req, res) => {
    let { date, subject } = req.body;

    try {
        const data = await Attendance.findData(date, subject);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/studata', async (req, res) => {
    let { date, subject, studentId } = req.body;

    try {
        const data = await Attendance.findOne({ date, subject });
        if (!data) {
            return res.status(404).json({ error: "No attendance record found" });
        }
        const studentRecord = data.students.find(student => student.studentId.toString() === studentId);
        if (!studentRecord) {
            return res.status(404).json({ error: "Student not found in attendance" });
        }
        res.json({ status: studentRecord.status });
    } 
    catch (err) {
        console.error("Error fetching attendance:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post('/total', async (req, res) => {
    const { studentId, subject } = req.body;

    try {
        
        if (!studentId || !subject) {
            return res.status(400).json({ message: "Student ID and Subject are required" });
        }

        // Fetch all attendance records for the given subject
        const attendanceRecords = await Attendance.find({ subject });

        // Extract unique dates where attendance was recorded
        const uniqueDates = [...new Set(attendanceRecords.map(record => record.date))];
        const totalDays = uniqueDates.length; // Total conducted days for this subject

        // Count the number of days the student was marked present
        let presentDays = 0;
        attendanceRecords.forEach(record => {
            const studentAttendance = record.students.find(s => s.studentId.toString() === studentId);
            if (studentAttendance && studentAttendance.status === 'present') {
                presentDays++;
            }
        });

        res.json({ totalDays, presentDays });

    } catch (error) {
        console.error("Error fetching monthly attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/weekly', async (req, res) => {
    const { dates, subject } = req.body;
    try {
        if (!dates || !Array.isArray(dates) || !subject) {
            return res.status(400).json("An array of dates and subject is required.");
        }

        // Aggregation pipeline
        const data = await Attendance.aggregate([
            {
                $match: {
                    date: { $in: dates }, // Filter by dates
                    subject: subject     // Filter by subject
                }
            },
            {
                $unwind: "$students"  // Flatten the 'students' array to process each student's attendance
            },
            {
                $group: {
                    _id: { date: "$date", subject: "$subject" },  // Group by date and subject
                    present: {
                        $sum: {
                            $cond: [{ $eq: ["$students.status", "present"] }, 1, 0]  // Count present students
                        }   
                    },
                    absent: {
                        $sum: {
                            $cond: [{ $eq: ["$students.status", "absent"] }, 1, 0]  // Count absent students
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,  // Exclude _id field from the result
                    date: "$_id.date",  
                    subject: "$_id.subject",
                    present: 1,
                    absent: 1
                }
            }
        ]);

        res.json(data);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/studentsAData', async (req,res) => {
    const { subject } = req.body;

    try {
        if (!subject) {
            res.status(400).json({ messge: "select the subject"})
        }

        const studentsData = await Attendance.aggregate(
            [
                {
                  "$match": {
                    "subject": subject
                  }
                },
                {
                  "$unwind": "$students"
                },
                {
                  "$group": {
                    "_id": "$students.studentId",  // Group by student name (change to "_id" if using student ID)
                    "presentCount": {
                      "$sum": {
                        "$cond": [{ "$eq": ["$students.status", "present"] }, 1, 0]
                      }
                    },
                    "absentCount": {
                      "$sum": {
                        "$cond": [{ "$eq": ["$students.status", "absent"] }, 1, 0]
                      }
                    }
                  }
                }
              ]              
        )
        res.json(studentsData);
    }
    catch (error) {
        res.status(500).json({ message: "server error"})
    }
})

module.exports = router;
