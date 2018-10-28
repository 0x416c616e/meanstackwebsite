// File: students.js

// Require the db file to establish the connection to the db.
var db = require('./db');

// Create the Student schema
var Schema = db.Schema;

var StudentSchema = new Schema({
    title: {type: String},
    firstSentence: {type: String},
    articleId: {type: Number},
    articleCategory: {type: String},
    author: {type: String},
    timeStamp: {type: Number},
    firstParagraph: {type: String},
    remainingParagraphs: {type: String},
    imageFileName: {type: String},
    sid:    { type: Number, required: true },
    first:  { type: String, required: true },
    last:   { type: String, required: true },
    semester:   [{
        term:   { type: String, required: true },
        courseGrade: [{
            course: {
                code: { type: String, required: true },
                desc: { type: String, required: true },
                hours: { type: Number, min: 1.0, max: 5.0, required: true },
            },
            grade: { type: String, required: true }
        }]
    }]
});

// Create a model from the Student schema.
// Note: the collection name accessed is going to be students (plural, lowercase)
var StudentModel = db.model("Student", StudentSchema);

module.exports = StudentModel;


// var joe = new StudentSchema({
//     title: "this is my title",
//     firstSentence: "this is my sentence",
//     articleId: 555,
//     articleCategory: "News",
//     author: "authorname",
//     timeStamp: 12345,
//     firstParagraph: "hello",
//     remainingParagraphs: "more text",
//     imageFileName: "placeholder.png",
//     sid: 801,
//     first: "joe",
//     last: "smith",
//     semester:[{
//         term: "Spring 2018",
//         courseGrade: [{
//             course: {
//                 code: "blah",
//                 desc: "something",
//                 hours: 3.0,
//             },
//             grade: "A",
//         }]
//     }]
// })
