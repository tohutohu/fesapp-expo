var http = require('http')
var createHandler = require('node-gitlab-webhook')
var {execSync} = require('child_process')
var handler = createHandler([ // multiple handlers
  { path: '/', secret: process.env.SECRET }
])

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(8080)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )

  execSync('git fetch', {cwd: 'client', bash: '/bin/bash'})
  execSync('git reset --hard origin/master', {cwd: 'client', bash: '/bin/bash'})
})
