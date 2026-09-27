const express = require('express');
const router = express.Router();
let students = require('../data/students');

// 1. GET /students - Saare students fetch karna
router.get('/', (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// 2. GET /students/:id - Specific student by ID
router.get('/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// 3. POST /students - Naya student add karna
router.post('/', (req, res) => {
  try {
    const { name, course } = req.body;

    // Input Validation
    if (!name || !course || name.trim() === "" || course.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid input. 'name' and 'course' are required fields."
      });
    }

    // Auto-generate unique ID
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const newStudent = {
      id: newId,
      name: name.trim(),
      course: course.trim()
    };

    students.push(newStudent);

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// 4. PUT /students/:id - Student data update karna
router.put('/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { name, course } = req.body;

    const studentIndex = students.findIndex((s) => s.id === studentId);

    // Agar student exist nahi karta
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    // Input Validation
    if (!name && !course) {
      return res.status(400).json({
        success: false,
        message: "Please provide 'name' or 'course' to update."
      });
    }

    // Update fields
    if (name && name.trim() !== "") {
      students[studentIndex].name = name.trim();
    }
    if (course && course.trim() !== "") {
      students[studentIndex].course = course.trim();
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: students[studentIndex]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// 5. DELETE /students/:id - Student delete karna
router.delete('/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;