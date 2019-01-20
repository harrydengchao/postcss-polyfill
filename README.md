# PostCSS Polyfill [![Build Status][ci-img]][ci]

[PostCSS] plugin polyfill.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://img.shields.io/npm/v/postcss-polyfill.svg
[ci]:      https://npmjs.org/package/postcss-polyfill

---

## Install

```bash
$ npm i -D postcss-polyfill
```

---

## Usage

```js
postcss([require('postcss-polyfill')({
  'overflow-scrolling': false,
  'filter-gradient': true,
  'filter-opacity': true,
  'filter-background': true,
  'inline-block': true,
})])

```

---

## Options

| prop                   | value          | default |
| ---                    | ---            | ---     |
| `'overflow-scrolling'` | `true` `false` | `false` |
| `'filter-gradient'`    | `true` `false` | `false` |
| `'filter-opacity'`     | `true` `false` | `false` |
| `'filter-background'`  | `true` `false` | `false` |
| `'inline-block'`       | `true` `false` | `false` |

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

.test-filter-gradient_2 {
  width: 200px;
  height: 100px;
  background-image: linear-gradient(to right, #f36b6f 0%, #e4393c 100%);
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
  background-color: rgba(238,153,34,0.502);
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
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#FF0000, endColorstr=#7db9e8, GradientType=0);
  background: linear-gradient(to bottom, rgb(255, 0, 0), #7db9e8);
}

.test-filter-gradient_2 {
  width: 200px;
  height: 100px;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#f36b6f, endColorstr=#e4393c, GradientType=1);
  background-image: linear-gradient(to right, #f36b6f 0%, #e4393c 100%);
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
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#80EE9922, endColorstr=#80EE9922, GradientType=0);
  background-color: rgba(238,153,34,0.502);
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
