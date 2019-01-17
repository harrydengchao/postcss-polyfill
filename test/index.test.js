var postcss = require('postcss')
var fs = require('fs')
var path = require('path')

var plugin = require('../index')

function run (input, output, opts) {
  fs.readFile(input, (err, css) => {
    postcss([plugin(opts)])
      .process(css, { from: input, to: output })
      .then(result => {
        fs.writeFile(output, result.css, () => true)
        if (result.map) {
          fs.writeFile(`${output}.map`, result.map, () => true)
        }
      })
      .catch(error => {
        console.error(error.message)
      })
  })
}

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

run(resolve('test/src.css'), resolve('test/dist.css'), {
  'overflow-scrolling': true,
  'filter-gradient': true,
  'filter-opacity': true,
  'filter-background': true,
  'inline-block': true,
})
