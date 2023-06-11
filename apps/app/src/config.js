const convict = require('convict')

const config = convict({
  ENV: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4001,
    env: 'PORT'
  },
  SECRET_JWT: {
    doc: 'Secret key for JWT',
    format: String,
    default: 'esgin-secret-key',
    env: 'SECRET_JWT'
  }
})

module.exports = config
