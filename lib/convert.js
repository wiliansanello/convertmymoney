const apiConvert = require('./api.currency')

const convert = (cotacao, conversao, moedaCotacao, moedaConversao) => {
  let valor = 0
  if (moedaCotacao === 'BTC' && moedaConversao === 'BRL') {
    valor = (cotacao * conversao) * 1000
  } else {
    valor = cotacao * conversao
  }
  return valor
}

const toMoney = (cotacao, moedaCotacao) => {
  let valor = 0
  if (moedaCotacao === 'BTC') {
    valor = cotacao
  } else {
    valor = parseFloat(cotacao).toFixed(2)
  }
  return valor
}

module.exports = {
  convert,
  toMoney
}