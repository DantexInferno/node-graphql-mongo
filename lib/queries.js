"use strict"

const connectDb = require('./db')
const {ObjectId} = require('mongodb')

module.exports = {
  getCourses: async () => {
    let db 
    let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      console.error(error);
    }
    return courses
  },
  getCourse: async (root, { _id }) => {
    let db 
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectId(_id)})
      console.log(course);
    } catch (error) {
      console.error(error);
    }
    return course
  },
  getPeople: async () => {
    let db 
    let student = []
    try {
      db = await connectDb()
      student = await db.collection('students').find().toArray()
    } catch (error) {
      console.error(error);
    }
    return student
  },
  getPerson: async (root, { _id }) => {
    let db 
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({ _id: ObjectId(_id)})
      console.log(course);
    } catch (error) {
      console.error(error);
    }
    return student
  },
  searchItems: async (root, { keyword }) => {
    let db, people, courses, items
    try {
      db = await connectDb()

      courses = await db.collection('courses').find(
        {$text: {$search: keyword}}
      ).toArray()

      people = await db.collection('students').find(
        {$text: {$search: keyword}}
      ).toArray()
      items = [...courses, ...people]
    } catch (error) {
      console.error(error);
    }
    return items
  }
}