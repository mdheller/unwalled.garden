const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

fs.watch(path.join(__dirname, '..'), {recursive: true}, function (eventType, filename) {
  if (filename.endsWith('.md')) {
    hit()
  }
})

function run () {
  console.log('Change detected, generating...')
  exec(`node ${path.join(__dirname, 'build-site.js')}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

var to = 0
function hit () {
  clearTimeout(to)
  to = setTimeout(run, 500)
}