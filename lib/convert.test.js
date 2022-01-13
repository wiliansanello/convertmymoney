const convert = require('./convert')

test('Convert 4 to 4', () => {
  expect(convert.convert(4, 4, 'EUR', 'BRL')).toBe(16)
})
test('convert cotacao 0 and quantidade 4', () => {
  expect(convert.convert(0, 4, 'USD', 'BRL')).toBe(0)
})
test('toMoney converts value from Bitcoin to Real', () => {
  expect(convert.convert(123.456, 2, 'BTC', 'BRL')).toBe(246912)
})
test('toMoney converts float', () => {
  expect(convert.toMoney(2, 'EUR')).toBe('2.00')
})
test('toMoney converts string', () => {
  expect(convert.toMoney('2', 'USD')).toBe('2.00')
})
test('toMoney converts value in Bitcoin', () => {
  expect(convert.toMoney(123.456, 'BTC')).toBe(123.456)
})