const axios = require('axios')

const moedasConvert = (moedaCota, moedaConv) => {
  return {
    endLink: moedaCota + '-' + moedaConv,
    nomeObj: moedaCota + moedaConv
  }
}
console.log('Moedas envolvidas: ' + moedasConvert('BTC', 'BRL').endLink)
console.log('Nome objeto da API: ' + moedasConvert('BTC', 'BRL').nomeObj)
const cota = moedasConvert('BTC', 'BRL').endLink
const key = moedasConvert('BTC', 'BRL').nomeObj
const url = `https://economia.awesomeapi.com.br/last/${cota}`

axios
  .get(url)
  .then(res => console.log(res.data[key].ask))
  .catch(err => console.log(err))