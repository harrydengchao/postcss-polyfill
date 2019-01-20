const postcss = require('postcss')
const rgbx2hex = require('rgbx2hex')

// 判断给定的属性是都已经在选择器块中
function hasProp(rule, prop) {
  return rule.some(function(i) {
    return i.prop === prop
  })
}

// 判断选择器中的值，是给定值
function hasValue(rule, value) {
  return rule.some(function(i) {
    return i.value === value
  })
}

// 判断选择器中的值，是以给定值为前缀
function hasValuePrefix(rule, prefix) {
  return rule.some(function(i) {
    return (new RegExp(`^${prefix}`)).test(i.value)
  })
}

module.exports = postcss.plugin('postcss-polyfill', function (opts = {}) {
  opts = {
    // -webkit-overflow-scrolling: touch;
    'overflow-scrolling': false,
    // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff1e5799', endColorstr='#ff7db9e8', GradientType=0);
    'filter-gradient': false,
    // filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=xx);
    'filter-opacity': false,
    // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#80000000, endColorstr=#80000000, GradientType=0);
    'filter-background': false,
    // *display: inline;
    // *zoom: 1;
    'inline-block': false,
    ...opts
  }
  // Work with options here

  return function (root, result) {
    // Transform CSS AST here
    root.walkRules(function(rule) {

      if (opts['overflow-scrolling']) {
        rule.walkDecls(/^overflow-?/, function(decl) {
          if (decl.value === 'scroll' && !hasProp(rule, '-webkit-overflow-scrolling')) {
            rule.insertAfter(decl, {
              prop: '-webkit-overflow-scrolling',
              value: 'touch'
            })
          }
        })
      }

      if (opts['filter-gradient']) {
        rule.walkDecls(/^(background|background-image)$/, function(decl) {
          if (hasValuePrefix(rule, 'linear-gradient') && !hasProp(rule, 'filter')) {
            // 属性值列表
            let tokens = /linear-gradient\(\s*(to\s+\w+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/.exec(decl.value)
            tokens[1] = tokens[1].replace(/^(to)\s+(\w+)$/, ($0, $1, $2) => (`${$1}_${$2}`))
            tokens[2] = tokens[2].replace(/^(#[0-9A-z]+|rgba?\(.+\))\s*([0-9%]+)?$/, ($0, $1) => ($1))
            tokens[3] = tokens[3].replace(/^(#[0-9A-z]+|rgba?\(.+\))\s*([0-9%]+)?$/, ($0, $1) => ($1))
            let gradient = {}
            switch (tokens[1]) {
              case 'to_bottom':
                gradient = {
                  startColorstr: tokens[2],
                  endColorstr: tokens[3],
                  GradientType: 0
                }
                break
              case 'to_top':
                gradient = {
                  startColorstr: tokens[3],
                  endColorstr: tokens[2],
                  GradientType: 0
                }
                break
              case 'to_right':
                gradient = {
                  startColorstr: tokens[2],
                  endColorstr: tokens[3],
                  GradientType: 1
                }
                break
              case 'to_right':
                gradient = {
                  startColorstr: tokens[3],
                  endColorstr: tokens[2],
                  GradientType: 1
                }
                break
              default:
                break
            }
            rule.insertBefore(decl, {
              prop: 'filter',
              value: `progid:DXImageTransform.Microsoft.gradient(startColorstr=${rgbx2hex(gradient.startColorstr)}, endColorstr=${rgbx2hex(gradient.endColorstr)}, GradientType=${gradient.GradientType})`
            })
          }
        })
      }

      if (opts['filter-opacity']) {
        rule.walkDecls(/^opacity$/, function(decl) {
          let opacityValue = parseFloat(decl.value) * 100
          if (!hasProp(rule, 'filter')) {
            rule.insertBefore(decl, {
              prop: 'filter',
              value: `progid:DXImageTransform.Microsoft.Alpha(Opacity=${opacityValue})`
            })
          }
        })
      }

      if (opts['filter-background']) {
        rule.walkDecls(/^(background|background-color)$/, function(decl) {
          if (hasValuePrefix(rule, 'rgba') && !hasProp(rule, 'filter')) {
            let gradientColor = rgbx2hex(decl.value)
            rule.insertBefore(decl, {
              prop: 'filter',
              value: `progid:DXImageTransform.Microsoft.gradient(startColorstr=${gradientColor}, endColorstr=${gradientColor}, GradientType=0)`
            })
          }
        })
      }

      if (opts['inline-block']) {
        rule.walkDecls(/^display$/, function(decl) {
          if (hasValue(rule, 'inline-block') && !hasProp(rule, '*display') && !hasProp(rule, '*zoom')) {
            rule.insertAfter(decl, {
              prop: '*display',
              value: 'inline'
            })
            rule.insertAfter(decl, {
              prop: '*zoom',
              value: '1'
            })
          }
        })
      }

    })
  }
})
