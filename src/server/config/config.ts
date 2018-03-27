const env = process.env.NODE_ENV || 'development';
console.log('Environment', env);
// Dont forget to include the JWT_SECRET environment variable
// See NodeJS Practice 08 REAMDME file
if (env === 'development' || env === 'test') {
    const config = require('./config.json');
    const envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}