# Dependency-less price formatting


## Installation

```
npm install number-currency-format --save
```

or

```
yarn add number-currency-format
```

## Usage

```
const { format } = require('number-currency-format');

format(1999.99);
// 1 999.99
```

Setting `currency`
```
format(1999.99, {
    currency: '€'
});
// 1 999.99 €
```

Setting other formatting options
```
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
```
format(number, options?: FormattingOptions)
```

* *number*: `number` - number to be formatted
* *options?*: `FormattingOptions`** - Formatting options (optional).

**`FormattingOptions`**

 * *currency?*: `string` - Currency symbol to be printed next to the formatted number. By default: none
 * *thousandSeparator?*: `string` - Symbol separating thousands. By default: `,`
 * *decimalSeparator?*: `string` - Symbol separating decimals. By default: `.`
 * *showDecimals?*: `string` - `ALWAYS`, `IF_NEEDED` or `NEVER`. `IF_NEEDED` does not show the decimal if it is 0. By default: `ALWAYS`
 * *decimalsDigits?*: `number` - Number of decimal digits. By default: `2`
 * *currencyPosition?*: `string` - `LEFT` or `RIGHT`. By default: `RIGHT`
 * *spacing?*: `boolean` - Spacing between currency and price. By default: `true`
 
## Compatibility
This works in every modern browser as well as on the server. This library does not contain and will never contain any dependency at all.

## Why not using `intl` or other packages?

Intl does not offer full flexibility around price formatting and has an overhead of loading all locale files. Additionally it requires polyfill for old browsers and headless testing. This library is bare to the bone and does not contain all possible locales definition and gives you all possible formatting options to support all price known price formats.
