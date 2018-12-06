const environment = process.env.TEST_TASK_ENVIRONMENT || 'development';
const config = require(`./configs/${environment}`);

module.exports = config;