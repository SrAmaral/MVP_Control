'use strict';

/**
 * outro service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::outro.outro');
