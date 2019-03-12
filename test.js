const { format, unformat } = require('./index');

let testIndex = 0;
let successes = 0;
let verbose = true;
suite('FORMAT');

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
assert(format(123.1, { showDecimals: 'AS_IS' }), '123.1', 'AS_IS does not change the decimal places');
assert(format('123.0', { showDecimals: 'AS_IS' }), '123.0', 'AS_IS preserves the number exactly');
assert(format(123, { showDecimals: 'AS_IS' }), '123', 'AS_IS works also without decimals');
assert(format(123333.4567, { showDecimals: 'AS_IS' }), '123,333.4567', 'AS_IS does the formating but does not round the decimal places');
assert(format(123.123, { decimalsDigits: 5, showDecimals: 'AS_IS' }), '123.123', 'AS_IS also ignores any decimalsDigits setting');

suite('Decimal rounding with tie breaking');
assert(format(0.005), '0.01', '0.005 -> 0.01 [up]');
assert(format(0.015), '0.01', '0.015 -> 0.01 [down]');
assert(format(0.025), '0.03', '0.025 -> 0.03 [up]');
assert(format(0.035), '0.04', '0.035 -> 0.04 [up]');
assert(format(0.045), '0.04', '0.045 -> 0.04 [down]');
assert(format(0.055), '0.06', '0.055 -> 0.06 [up]');
assert(format(0.065), '0.07', '0.065 -> 0.07 [up]');
assert(format(0.075), '0.07', '0.075 -> 0.07 [down]');
assert(format(0.085), '0.09', '0.085 -> 0.09 [up]');
assert(format(0.095), '0.10', '0.095 -> 0.10 [up]');

suite('Decimal rounding half-ups with arithmetical rounding enforced');
assert(format(0.005, { arithmeticalRounding: true }), '0.01', '0.005 -> 0.01 [up]');
assert(format(0.015, { arithmeticalRounding: true }), '0.02', '0.015 -> 0.02 [up]');
assert(format(0.025, { arithmeticalRounding: true }), '0.03', '0.025 -> 0.03 [up]');
assert(format(0.035, { arithmeticalRounding: true }), '0.04', '0.035 -> 0.04 [up]');
assert(format(0.045, { arithmeticalRounding: true }), '0.05', '0.045 -> 0.05 [up]');
assert(format(0.055, { arithmeticalRounding: true }), '0.06', '0.055 -> 0.06 [up]');
assert(format(0.065, { arithmeticalRounding: true }), '0.07', '0.065 -> 0.07 [up]');
assert(format(0.075, { arithmeticalRounding: true }), '0.08', '0.075 -> 0.08 [up]');
assert(format(0.085, { arithmeticalRounding: true }), '0.09', '0.085 -> 0.09 [up]');
assert(format(0.095, { arithmeticalRounding: true }), '0.10', '0.095 -> 0.10 [up]');

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
assert(format(10, {decimalsDigits: 8, currency: '฿'}), '10.00000000 ฿', 'Handle floating arythmetics right (without dangling 1)');
assert(format(0), '0.00','Zero format');
assert(format('0'), '0.00', 'Zero format from string');
assert(format(0, {}), '0.00', 'Zero format with empty config');
assert(format('124.22'), '124.22', 'From string as number');
assert(format('five'), 'five', 'Invalid string should be passed through');
assert(format(), undefined, 'If nothing is provided, return undefined');
assert(format(-234.56, { thousandSeparator: ','}), '-234.56', 'Thousand separator works fine with negative number');

suite('Diacritics and actual language examples');
assert(format(1999.99, { currency: 'zł', thousandSeparator: '', decimalSeparator: ','}), '1999,99 zł', 'Poland');
assert(format(1999.99, { currency: '$', spacing: false, currencyPosition: 'LEFT'}), '$1,999.99', 'US');
assert(format(1999.99, { currency: 'Rp', thousandSeparator: '.', spacing: false, currencyPosition: 'LEFT', showDecimals: 'NEVER'}), 'Rp2.000', 'Indonesian');

suite('UNFORMAT');

assert(unformat('123'), 123., 'Unformat integer number');
assert(unformat('123.'), 123., 'Unformat integer number with a trailing separator');
assert(unformat('.55'), .55, 'Unformat only decimal part');
assert(unformat(',55'), .55, 'Unformat only decimal part with different separator');
assert(unformat('.456'), .456, 'Unformat only decimal part that is a bit longer');
assert(unformat('.1'), .1, 'Unformat size one decimal part');
assert(unformat('0,0'), .0, 'Zero trailing decimals');
assert(unformat('0.123'), .123, 'Zero trailing decials 2');
assert(unformat('.1'), .1, 'Unformat size one decimal part');
assert(unformat('123,456,789'), 123456789., 'Unformat integer number with thousands separators');
assert(unformat('123.456'), 123456, 'Unformat integer number with thousand separator');
assert(unformat('123.12'), 123.12, 'Unformat integer number with decimal separator');
assert(unformat('123,12'), 123.12, 'Unformat integer number with decimal separator (different separator character)');
assert(unformat('123,456.78'), 123456.78, 'Unformat integer number with decimal separator and thousand separator when decimals length is known');
assert(unformat('123,456.789'), 123456.789, 'Unformat integer number with decimal separator and thousand separator when decimals length is unknown but it can be deducted from the types of separators');
assert(unformat('-123,456.789'), -123456.789, 'Unformat negative number');
assert(unformat('123,456:789', { decimalSeparator: ':'}), 123456.789, 'Unformat with regard of custom decimal separator');
assert(unformat('123,456:789', { decimalSeparator: '.'}), 123456789, 'Unformat with regard of custom decimal separator and ignoring decimal guesser');

suite('Currencies and real-life examples');
assert(unformat('kr. 55'), 55, 'Does not treat non-single character separators as decimal separator');
assert(unformat('kr 250,162'), 250162, 'Does not treat non-single character separators as decimal separator');
assert(unformat('14$'), 14, 'Handles simple currency case');
assert(unformat('$14'), 14, 'Handles simple currency case (currency before the number)');
assert(unformat('$123.45'), 123.45, 'Handles a bit trickier currency case');
assert(unformat('$-123,456.7'), -123456.7, 'Handles a bit trickier price+currency case');
assert(unformat('$-123 456.78'), -123456.78, 'Handles a bit trickier price+currency case');
assert(unformat('123.456.789$'), 123456789, 'Handles a bit trickier price+currency case');
assert(unformat('123.456.789$', { decimalSeparator: '.'}), 123456.789, 'Handles a bit trickier price+currency case');

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
