

module.exports = [{
  apps: {
    name    : "node-app",
    script  : "npm",
    args    : "start"
  },
  name: 'abhi-demo-app',
  script: 'server.js',
  error_file: 'log/err.log',
  out_file: 'log/out.log',
  log_file: 'log/combined.log',
  time: true,
  instances: 1,
  autorestart: true,
  watch: false,
  log_date_format: "YYYY-MM-DD HH:mm Z",
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'development'
  },
  env_production: {
    NODE_ENV: 'production'
  }
}];