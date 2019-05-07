# rc-mentions
---

React Mentions

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies](https://img.shields.io/david/react-component/mentions.svg?style=flat-square)](https://david-dm.org/react-component/mentions)
[![DevDependencies](https://img.shields.io/david/dev/react-component/mentions.svg?style=flat-square)](https://david-dm.org/react-component/mentions?type=dev)
[![npm download][download-image]][download-url]
[![Storybook](https://gw.alipayobjects.com/mdn/ob_info/afts/img/A*CQXNTZfK1vwAAAAAAAAAAABjAQAAAQ/original)](https://github.com/react-component/mentions)

[Storybook]: https://github.com/storybooks/press/blob/master/badges/storybook.svg
[npm-image]: http://img.shields.io/npm/v/rc-mentions.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-mentions
[travis-image]: https://img.shields.io/travis/react-component/mentions.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/mentions
[coveralls-image]: https://img.shields.io/coveralls/react-component/mentions.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/mentions?branch=maste
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-mentions.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-mentions

## Screenshots

<img src="https://user-images.githubusercontent.com/5378891/57270721-17b03880-70bf-11e9-9a5d-67ebf501aef1.png" />

## Feature

* support ie9,ie9+,chrome,firefox,safari

### Keyboard

* Open mentions (focus input || focus and click)
* KeyDown/KeyUp/Enter to navigate menu

## install

[![rc-mentions](https://nodei.co/npm/rc-mentions.png)](https://npmjs.org/package/rc-mentions)

## Usage

### basic use

```js
import Mentions from 'rc-mentions';

const { Option } = Mentions;

var Demo = (
  <Mentions>
    <Option value="light">Light</Option>
    <Option value="bamboo">Bamboo</Option>
    <Option value="cat">Cat</Option>
  </Mentions>
);
React.render(<Demo />, container);
```

## API

### Mentions props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
| defaultValue | Default value | string | - |
| value | Set value of mentions | string | - |
| prefix | Set trigger prefix keyword | string \| string[] | '@' |
| autoFocus | Auto get focus when component mounted | boolean | `false` |
| split | Set split string before and after selected mention | string | ' ' |
| validateSearch | Customize trigger search logic | (text: string, props: MentionsProps) => void | - |
| filterOption | Customize filter option logic | false \| (input: string, option: OptionProps) => boolean | - |
| onChange | Trigger when value changed |(text: string) => void | - |
| onSelect | Trigger when user select the option | (option: OptionProps, prefix: string) => void | - |
| onSearch | Trigger when prefix hit | (text: string, prefix: string) => void | - |
| onFocus | Trigger when mentions get focus | React.FocusEventHandler<HTMLTextAreaElement> | - |
| onBlur | Trigger when mentions lose focus | React.FocusEventHandler<HTMLTextAreaElement> | - |

### Methods

| name     | description    |
|----------|----------------|
| focus() | Component get focus |
| blur() | Component lose focus |

## Development

```
npm install
npm start
```

## Example

http://localhost:9001/

online example: http://react-component.github.io/mentions/

## Test Case

```
npm test
```

## Coverage

```
npm run coverage
```


## License

rc-mentions is released under the MIT license.
