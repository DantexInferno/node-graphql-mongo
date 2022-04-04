"use strict"

const connectDB = require("./db")
const {ObjectId} = require('mongodb')

module.exports = {
  createCourse: async (root, {input}) => {
    const defaults = {
      teacher: "",
      topic: ""
    }

    const newCourse = Object.assign(defaults,input)
    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection("courses").insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.log(error);
    }
    return newCourse
  },
  createPerson: async (root, {input}) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection("students").insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      console.log(error);
    }
    return input
  },

  editCourse: async (root, {_id, input}) => {
    let db
    let course
    try {
      db = await connectDB()
      await db.collection("courses").updateOne(
        {_id: ObjectId(_id)},
        {$set: input}
      )
      course = await db.collection('courses').findOne({ _id: ObjectId(_id)})
    } catch (error) {
      console.log(error);
    }
    return course  
  },
  editPerson: async (root, {_id, input}) => {
    let db
    let student
    try {
      db = await connectDB()
      await db.collection("students").updateOne(
        {_id: ObjectId(_id)},
        {$set: input}
      )
      student = await db.collection('students').findOne({ _id: ObjectId(_id)})
    } catch (error) {
      console.log(error);
    }
    return student  
  },
  addPeople: async (root, {courseID, personID}) => {
    let db 
    let person
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({ _id: ObjectId(courseID)})
      person = await db.collection('students').findOne({ _id: ObjectId(personID)})

      if (!person || !course) throw new Error(`Course or student not found`)

      await db.collection('courses').updateOne(
        {_id: ObjectId(courseID)},
        {$addToSet:{people:ObjectId(personID)}}
      )
    } catch (error) {
      console.log(error);
    }
    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db 
    try {
      db = await connectDB()
      await db.collection('courses').deleteOne({ _id: ObjectId(_id)})
    } catch (error) {
      console.error(error);
    }
    return true
  },
  deleteStudent: async (root, { _id }) => {
    let db 
    try {
      db = await connectDB()
      await db.collection('students').deleteOne({ _id: ObjectId(_id)})
    } catch (error) {
      console.error(error);
    }
    return true
  }
}