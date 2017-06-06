'use strict'

const path = require('path')
const chai = require('chai')

const expect = chai.expect

const TEST_APP = path.join(__dirname, 'test-server')
const app = require(path.join(TEST_APP, 'server/server.js'))

const Person = app.models.Person

describe('Component', function() {
  describe('Initialization', function() {
    it('should apply model customizations from subdirectories', function() {
      expect(Person).to.itself.respondTo('testMethod')
      expect(Person).to.itself.respondTo('override')
    })
  })
})
