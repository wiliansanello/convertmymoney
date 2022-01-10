const apiConvert = require('./api.currency')

const convert = (cotacao, conversao) => {
  return cotacao * conversao
}

const toMoney = valor => {
  return parseFloat(valor).toFixed(2)
}

const getCoins = () => {

  const moedaCotacao = document.getElementById('moedaCotacao').value
  const moedaConversao = document.getElementById('moedaConversao').value

  console.log(moedaCotacao + ' ' + moedaConversao)

}

module.exports = {
  convert,
  toMoney,
  getCoins
}