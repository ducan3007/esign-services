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
    default: 4002,
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
    default: '10d',
    env: 'JWT_EXPIRATION_TIME'
  },

  /* -----------  REDIS ---------------  */

  REDIS_HOST: {
    doc: 'Redis host',
    format: String,
    default: 'redis-17563.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    env: 'REDIS_HOST'
  },

  REDIS_PORT: {
    doc: 'Redis port',
    format: Number,
    default: 17563,
    env: 'REDIS_PORT'
  },

  REDIS_USERNAME: {
    doc: 'Redis username',
    format: String,
    default: 'default',
    env: 'REDIS_USERNAME'
  },

  REDIS_PASSWORD: {
    doc: 'Redis password',
    format: String,
    default: 'oTOCsQP06WgITsUWdpHd9pP93l4twYvX',
    env: 'REDIS_PASSWORD'
  },

  REDIS_DEFAULT_TTL: {
    doc: 'Redis default TTL',
    format: Number,
    default: 60,
    env: 'REDIS_DEFAULT_TTL'
  },

  /* -----------  IPFS  ---------------  */

  IPFS_HOST: {
    doc: 'IPFS host',
    format: String,
    default: '0.0.0.0',
    env: 'IPFS_HOST'
  },
  IPFS_PORT: {
    doc: 'IPFS port',
    format: Number,
    default: 5001,
    env: 'IPFS_PORT'
  },
  IPFS_PROTOCOL: {
    doc: 'IPFS protocol',
    format: String,
    default: 'http',
    env: 'IPFS_PROTOCOL'
  }
})
