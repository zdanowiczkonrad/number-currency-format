[![npm version](https://badge.fury.io/js/number-currency-format.svg)](https://badge.fury.io/js/number-currency-format)
[![Build Status](https://travis-ci.org/zdanowiczkonrad/number-currency-format.svg?branch=master)](https://travis-ci.org/zdanowiczkonrad/number-currency-format)

# Number currency format

Zero-dependency, cross-browser, lightweight and flexible utility for number/price formatting **that you control**.

## Installation

```
npm i number-currency-format
```

or

```
yarn add number-currency-format
```

## Usage

```js
const { format } = require('number-currency-format');

format(1999.99);
// 1,999.99
```

### Setting `currency`
```js
format(1999.99, {
    currency: '€'
});
// 1,999.99 €
```

### Setting other formatting options
```js
format(1999.99, {
    currency: '$',
    spacing: false,
    currencyPosition: 'LEFT'
})
//'$1,999.99'
```

To see all supported usecases and example usages, run `npm test` or `yarn test`.

## API

### `format`
```ts
format(number, options?: FormattingOptions)
```

* *number*: `number` - Number to be formatted
* *options?*: `FormattingOptions` - Formatting options (optional)

**`FormattingOptions`**

 * **currency**: `string` - Currency symbol to be printed next to the formatted number. By default: none
 * **thousandSeparator**: `string` - Symbol separating thousands. By default: `,`
 * **decimalSeparator**: `string` - Symbol separating decimals. By default: `.`
 * **decimalsDigits**: `number` - Number of decimal digits. By default: `2`
 * **showDecimals**: `string` - `ALWAYS`, `IF_NEEDED`, `AS_IS` or `NEVER`. `IF_NEEDED` does not show the decimal if it is 0 (and if it is different than 0, shows exactly `{decimalsDigits}` decimal digits). AS_IS preserves the decimal depth of the source number. By default: `ALWAYS`
 * **currencyPosition**: `string` - `LEFT` or `RIGHT`. By default: `RIGHT`
 * **spacing**: `boolean` - Spacing between currency and price. By default: `true`
 * **arithmeticalRounding**: `boolean` - Use arithmetical rounding (always half-up) instead of tie break rounding. By default: `false` (so: the rounding will include tie-breaking)

All configuration is optional.

## Compatibility
This works in every modern browser as well as on the server. This module does not contain and will never contain any dependency at all. This module does not use any 3rd party bundler, transpiler, compiler or test runner. Vanilla all the way 😎.

## Why not using `intl` or other packages?

Intl does not offer full flexibility around price formatting and has an overhead of loading all locale files. Additionally it requires polyfill for old browsers and headless testing. This library is bare to the bone and does not contain all possible locales definition and gives you all possible formatting options to support all known price formats.
