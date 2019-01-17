# PostCSS Polyfill [![Build Status][ci-img]][ci]

[PostCSS] plugin polyfill.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/harrydengchao/postcss-polyfill.svg
[ci]:      https://travis-ci.org/harrydengchao/postcss-polyfill

---

## Install

```bash
$ npm i -D postcss-polyfill
```

---

## Usage

```js
postcss([ require('postcss-polyfill') ])
```

---

## Options

| prop                   | value          | default |
| ---                    | ---            | ---     |
| `'overflow-scrolling'` | `true` `false` | `true` |
| `'filter-gradient'`    | `true` `false` | `true` |
| `'filter-opacity'`     | `true` `false` | `true` |
| `'filter-background'`  | `true` `false` | `true` |
| `'inline-block'`       | `true` `false` | `true` |

---

```css
/* Input example */
.test-overflow-scrolling {
  overflow-x: scroll;
  width: 200px;
  height: 100px;
}

.test-filter-gradient {
  width: 200px;
  height: 100px;
  background: linear-gradient(to bottom, rgb(255, 0, 0), #7db9e8);
}

.test-filter-opacity {
  width: 200px;
  height: 100px;
  background-color: #000000;
  opacity: 0.5;
  color: #ff0000;
}

.test-filter-background {
  width: 200px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
}

.test-inline-block {
  width: 200px;
  height: 100px;
  display: inline-block;
  background-color: #ff00ff;
}
```

```css
/* Output example */
.test-overflow-scrolling {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  width: 200px;
  height: 100px;
}

.test-filter-gradient {
  width: 200px;
  height: 100px;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ff0000, endColorstr=#7db9e8, GradientType=0);
  background: linear-gradient(to bottom, rgb(255, 0, 0), #7db9e8);
}

.test-filter-opacity {
  width: 200px;
  height: 100px;
  background-color: #000000;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
  opacity: 0.5;
  color: #ff0000;
}

.test-filter-background {
  width: 200px;
  height: 100px;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#80000000, endColorstr=#80000000, GradientType=0);
  background-color: rgba(0, 0, 0, 0.5);
}

.test-inline-block {
  width: 200px;
  height: 100px;
  display: inline-block;
  *zoom: 1;
  *display: inline;
  background-color: #ff00ff;
}
```

See [PostCSS] docs for examples for your environment.
