// File: students.js

// Require the StudentModel module.
var Student = require('../models/students');

// Controller for inital (home) page listing all query buttons.
// end point: /api/
module.exports.index = function(req, res) {
    // This controller will provide the data for each of the query buttons
    res.render('indexApi', {
        title: "Using Mongoose Demo",
        pageHeader: "Student Transcript Queries",

        queries: [ 
            { text: "List Students",              url: "/api/students"                },
            { text: "List Student",               url: "/api/students/800/list"       },
            { text: "List Transcripts",           url: "/api/students/transcript"     },
            { text: "List Student Transcript",    url: "/api/students/800/transcript" },
            { text: "Add Student",                url: "/api/students/new"            },
            { text: "Add Course",                 url: "/api/students/803/course/new" },
            { text: "Change grade",               url: "/api/students/803/edit"       },
            { text: "Delete Student",             url: "/api/students/803/delete"     }
        ]
    });
};

// Controller for listing all student personal info.
// end point: /api/students
module.exports.listStudents = function( req, res ) {
    Student.find(
        {},
        { semester: false },
        function(err, students) {
            if (err) { res.status(400).send(err);                                                     }
            else     { res.render('queryResults', { pageHeader: "All Students", students: students}); }
        }
    );
};

// Controller for listing a student's personal info.
// end point: /api/students/800/list
module.exports.listStudent = function( req, res ) {
    Student.find(
        { sid: 800 },
        { semester: false },
        function(err, students) {
            if (err) { res.status(400).send(err);                                                     }
            else     { res.render('queryResults', { pageHeader: "Student Record", students: students}); }
        }
    );
};

// Controller for listing all student transcripts.
// end point: /api/students/transcript
module.exports.listStudentTranscripts = function( req, res ) {
    Student.find(
        {},
        function(err, students) {
            if (err) { res.status(400).send(err);                                                     }
            else     { res.render('queryResults', { pageHeader: "Student Transcripts", students: students}); }
        }
    );
};

// Controller for listing a student's transcript.
// end point: /api/students/800/transcript
module.exports.listStudentTranscript = function( req, res ) {
    Student.find(
        { sid: 800 },
        function(err, students) {
            if (err) { res.status(400).send(err);                                                     }
            else     { res.render('queryResults', { pageHeader: "Student Record", students: students}); }
        }
    );
};

// Controller for adding a new student (803)
// end point: /api/students/new
module.exports.addStudent = function( req, res ) {
    var student = new Student({
        title: "Placeholder title",
        firstSentence: "This is the first sentence",
        articleId: 123,
        articleCategory: "News",
        author: "Stephen Smart",
        timeStamp: 1524145972,
        firstParagraph: "This is the first paragraph text. Keep in mind this should be a continuation of the paragraph AFTER the first sentence, which is displayed separately, underneat the title.",
        remainingParagraphs: "Here are the remaining paragraphs, which I am not doing much with at the moment",
        imageFileName: "placeholder.png",
        sid: 803,
        first: "Paul",
        last: "Doe",
        semester: [
            {
                term: "Fall 16",
                courseGrade: [
                    { course: { code: "CS140", desc: "Intro I", hours: 4.0 }, grade: "A" },
                    { course: { code: "CS111", desc: "Computer Concepts", hours: 3.0 }, grade: "B" }
                ]
            },
            {
                term: "Spring 17",
                courseGrade: [
                    { course: { code: "CS150", desc: "Intro II", hours: 3.0 }, grade: "C" }
                ]
            }
        ]
    });

    student.save( function(err, student) {
        res.send( "Student with sid: " + student.sid + " created. ");
    });
};

// Controller for adding a new course course for student 803
// end point: /api/students/803/course/new
module.exports.addCourse = function( req, res ) {
    Student.update(
        { sid: 803 }, 
        { 
            $push: { 
                "semester.1.courseGrade": { 
                    course: { code: "CS234", desc: "Web Dev", hours: 3.0 }, 
                    grade: "B" 
                }
            } 
        },
        function(err, status) {
            if (err) { res.status(400).send(err);    }
            else     { res.send("New CS234 course added."); }
        }
    );
};

// Controller for editing a student (803)
// end point: /api/students/803/edit
module.exports.editStudent = function( req, res ) {
    Student.update(
        { sid: 803 }, 
        { $set: { "semester.1.courseGrade.1.grade": "A"  } },
        function(err, status) {
            if      (err)               { res.status(400).send(err);        }
            else if (status.n === 0)    { res.send("CS234 not found.");     }
            else                        { res.send("CS234 grade changed."); }
        }
    );
};

// Controller for deleting a student (803)
// end point: /api/students/803/delete
module.exports.deleteStudent = function( req, res ) {
    Student.remove(
        { sid: 803 }, 
        function(err, status) {
            if      (err)              { res.status(400).send(err);          }
            else if (status.n === 0)   { res.send("Student 803 not found."); }
            else                       { res.send("Student 803 deleted.");   }
        }
    );
};