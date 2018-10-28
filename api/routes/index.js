// File: index.js

var express = require('express');
var router = express.Router();

var studentsController = require('../controllers/students');

router.get('/', studentsController.index);
router.get('/students', studentsController.listStudents);
router.get('/students/:sid/list', studentsController.listStudent);
router.get('/students/transcript', studentsController.listStudentTranscripts);
router.get('/students/:sid/transcript', studentsController.listStudentTranscript);

// This next route should be a .post, but since I am not using a form to collect data
// it is a .get.
router.get('/students/new', studentsController.addStudent);

// The next two should be .put, since we are updating resourses. However, to do that
// we will need to look at ajax (later on)
router.get('/students/:sid/course/new', studentsController.addCourse);
router.get('/students/:sid/edit', studentsController.editStudent);

// This one should be .delete, but again, we need ajax.
router.get('/students/:sid/delete', studentsController.deleteStudent);

module.exports = router;