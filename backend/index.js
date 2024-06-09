const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const multer = require('multer');
const path = require('path');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "learning_management"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Home route
app.get("/", (req, res) => {
    res.send("Hello, this is the backend.");
});
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newUser });
    });
});

app.get('/api/courses', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/courses', (req, res) => {
    const newCourse = req.body;
    console.log(newCourse);
    const sql = 'INSERT INTO courses SET ?';
    db.query(sql, newCourse, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newCourse });
    });
});

app.get('/api/myCourses', (req, res) => {
    const userEmail = req.query.email; // Assuming the email is sent as a query parameter
    
    // SQL query to fetch courses by email
    const sql = 'SELECT * FROM courses WHERE email = ?';
    
    // Execute the SQL query
    db.query(sql, [userEmail], (err, results) => {
        if (err) {
            console.error('Error retrieving courses:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        // Send the retrieved courses as a response
        res.json(results);
    });
});
app.delete('/api/courses/:id', (req, res) => {
    const sql = 'DELETE FROM courses WHERE course_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ 
            deleted: true,
            message: 'Course deleted' 
        });
    });
});

app.put('/api/courses/:id', (req, res) => {
    const updatedCourse = req.body;
    const courseId = req.params.id;
    const sql = 'UPDATE courses SET ? WHERE course_id = ?';
    db.query(sql, [updatedCourse, courseId], (err, result) => {
        if (err) throw err;
        // Fetch the updated course details to return
        const selectSql = 'SELECT * FROM courses WHERE course_id = ?';
        db.query(selectSql, [courseId], (err, updatedCourses) => {
            if (err) throw err;
            res.json(updatedCourses[0]);
        });
    });
});

app.post('/api/enrollments', (req, res) => {
    const { email, course_id } = req.body;
    const sql = 'INSERT INTO enrollments (email, course_id) VALUES (?, ?)';
    db.query(sql, [email, course_id], (err, result) => {
        if (err) throw err;
        res.json({ enrollment_id: result.insertId, email, course_id });
    });
    
});

app.get('/api/enrollments', (req, res) => {
    const email = req.query.email;
    const sql = `
        SELECT enrollments.enrollment_id, courses.course_id, courses.course_name, courses.course_description, enrollments.enrolled_at 
        FROM enrollments
        JOIN courses ON enrollments.course_id = courses.course_id
        WHERE enrollments.email = ?
    `;
    db.query(sql, [email], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Delete an enrollment by enrollment_id
app.delete('/api/enrollments/:id', (req, res) => {
    const enrollmentId = req.params.id;
    const sql = 'DELETE FROM enrollments WHERE enrollment_id = ?';
    db.query(sql, [enrollmentId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Enrollment deleted', enrollmentId });
    });
});

app.post('/api/assignment', (req, res) => {
    const newAssignment = req.body;
    const sql = 'INSERT INTO assignments SET ?';
    db.query(sql, newAssignment, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newAssignment });
    });
});

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('questionFile');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Files of type jpeg, jpg, png, pdf, doc, and docx only!');
    }
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload assignment question
app.post('/api/assignments/questions', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected!' });
            } else {
                const { title, description, instructorEmail } = req.body;
                const filePath = req.file.path;
                const sql = 'INSERT INTO assignment_questions (title, description, instructor_email, file_path) VALUES (?, ?, ?, ?)';
                db.query(sql, [title, description, instructorEmail, filePath], (err, result) => {
                    if (err) throw err;
                    res.json({ id: result.insertId, title, description, instructorEmail, filePath });
                });
            }
        }
    });
});
app.get('/api/assignments/questions/uploads/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    res.sendFile(path.join(__dirname, 'uploads', fileName));
});
app.get('/api/assignments/questions', (req, res) => {
    const sql = 'SELECT * FROM assignment_questions';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(result);
        }
    });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
