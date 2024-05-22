'use strict';

/**
 * teste service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::teste.teste');
