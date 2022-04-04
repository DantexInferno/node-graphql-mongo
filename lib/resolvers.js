'use strict'


const mutation = require('./mutation')
const queries = require('./queries')
const types = require('./types')


module.exports = {
  Query: queries,
  Mutation: mutation,
  ...types  
}
