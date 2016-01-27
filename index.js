'use strict'

let path = require('path')
let Quark = require('proton-quark')
let _ = require('lodash')

module.exports = class ServicesQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  configure() {
    if (!this.proton.app.services)
      this.proton.app.services = {}
    return true
  }

  initialize() {
    let servicesPath = path.join(this.proton.app.path, '/services')
    let services = require('require-all')(servicesPath)
    _.forEach(services, Service => new Service(this.proton))
  }

}
