"use strict";

const connectDB = require("./db")
const {ObjectId} = require('mongodb')

module.exports = {
  Courses: {
    people: async ({people}) => {
      let db
      let peopleData
      let ids
      try {
        db = await connectDB()
        ids = people ? people.map(id => ObjectId(id)) : []
        peopleData = ids.length > 0 ? await db.collection("students").find(
          {_id: {$in: ids}}
        ).toArray() : []
      } catch (error) {
        console.log(error);
      }
      return peopleData
    }
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return "Monitor"
      }

      return "Students"
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) return "Courses"

      if (item.phone) return "Monitor"

      return "Students"
    }
  }
}