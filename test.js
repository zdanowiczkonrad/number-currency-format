const { format } = require('./index');

let testIndex = 0;
let successes = 0;
let verbose = true;

suite('Integer number formatting');
assert(format(parseInt(123)), '123.00', 'Integer number');
assert(format(parseInt(123), { showDecimals: 'NEVER' }), '123', 'Integer number without decimals, never showing decimals');
assert(format(parseInt(123), { showDecimals: 'IF_NEEDED' }), '123', 'Integer number without decimals, showing decimals only if needed');
assert(format(parseInt(123), { showDecimals: 'ALWAYS' }), '123.00', 'Integer number without decimals, enforcing decimals always');

suite('Integer number formatting');
assert(format(123.45), '123.45', 'Simple number with decimals');
assert(format(123.45, { showDecimals: 'NEVER' }), '123', 'Floating price without decimals shown');
assert(format(123.45, { showDecimals: 'IF_NEEDED' }), '123.45', 'Floating price with decimals only if needed');
assert(format(123.45, { showDecimals: 'ALWAYS' }), '123.45', 'Floating number enforcing decimals');


suite('Custom decimals length');
assert(format(123.456), '123.46', 'Long decimals should be rounded to the precision of two by default');
assert(format(123.456, { decimalsDigits: 3 }), '123.456', 'Decimals should follow custom decimals digits');
assert(format(123.4), '123.40', 'Decimals should follow the decimal precision for input that has less decimal digits');
assert(format(123.45, { decimalsDigits: 5 }), '123.45000', 'Custom decimal digits should work for larger decimal and padding');
assert(format(123, { decimalsDigits: 5, showDecimals: 'ALWAYS' }), '123.00000', 'Custom decimal digits should be respected when no decimals but showing decimals is forced');

suite('Decimal separator');
assert(format(123.45, { decimalSeparator: '.' }), '123.45', 'Decimal separator is by default a dot');
assert(format(123.45, { decimalSeparator: ',' }), '123,45', 'Decimal separator can be customized');

suite('Thousand separators');
assert(format(1234.56), '1,234.56', 'Thousand number should be separated from hundred digit with a comma');
assert(format(123412345123456.89), '123,412,345,123,456.89', 'Thousand separator should divide every 10^3 digit');
assert(format(1234.56, { thousandSeparator: ' '}), '1 234.56', 'Thousand separator is customizable');
assert(format(1234.56, { thousandSeparator: ''}), '1234.56', 'Thousand separator can be disabled');
assert(format(123456789.00, { thousandSeparator: '__'}), '123__456__789.00', 'Thousand separator can have more than one character');

suite('Currency options');
assert(format(123, { currency: 'Kr' }), '123.00 Kr', 'Simple number with currency');
assert(format(123, { currency: 'Kr.', currencyPosition: 'LEFT' }), 'Kr. 123.00', 'Simple number with currency in front');
assert(format(123, { currency: '$', spacing: false }), '123.00$', 'Spacing between currency can be disabled');
assert(format(123, { currency: '$', spacing: false, currencyPosition: 'LEFT' }), '$123.00', 'Currency settings should be respected altogether');

suite('API edge cases');
assert(format(0), '0.00','Zero format');
assert(format('0'), '0.00', 'Zero format from string');
assert(format(0, {}), '0.00', 'Zero format with empty config');
assert(format('124.22'), '124.22', 'From string as number');
assert(format('five'), 'five', 'Invalid string should be passed through');
assert(format(), undefined, 'If nothing is provided, return undefined');

suite('Diacritics and actual language examples');
assert(format(1999.99, { currency: 'zł', thousandSeparator: '', decimalSeparator: ','}), '1999,99 zł', 'Poland');
assert(format(1999.99, { currency: '$', spacing: false, currencyPosition: 'LEFT'}), '$1,999.99', 'US');
assert(format(1999.99, { currency: 'Rp', thousandSeparator: '.', spacing: false, currencyPosition: 'LEFT', showDecimals: 'NEVER'}), 'Rp2.000', 'Indonesian');

function suite(suiteName) {
    console.log(`\n${suiteName}\n${(() => {let line = ''; for(let i = 0;i<suiteName.length;i++){line+='-'} return line;})()}`);
}
function assert(actual, expected, msg) {
    const passed = actual === expected;
    testIndex++;
    if (passed) {
        successes++;
        if (verbose) {
            console.log(`+ [success] ${msg} - ${actual}`)
        } else {
            process.stdout.write('.');
        }
    } else {
        if (verbose) {
            console.log('');
            console.log(`✘ ${msg}`);
            console.log(`>>> Expected <${expected}> but got <${actual}>`);
        } else {
            console.log('x');
        }
    }
}

const failedTests = testIndex - successes;

console.log(`\nFailed: ${failedTests}, total: ${testIndex}`);
if (failedTests > 0) {
    process.exit(1);
} 