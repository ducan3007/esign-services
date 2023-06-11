const convict = require('convict')

export const config = convict({
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

  JWT_SECRET: {
    doc: 'Secret key for JWT',
    format: String,
    default: 'esgin-secret-key',
    env: 'JWT_SECRET'
  },

  JWT_EXPIRATION_TIME: {
    doc: 'Expiration time for JWT',
    format: String,
    default: '1d',
    env: 'JWT_EXPIRATION_TIME'
  }
})
