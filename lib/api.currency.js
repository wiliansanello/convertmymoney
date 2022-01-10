const axios = require('axios')

const moedasConvert = (moedaCota, moedaConv) => {
  return {
    endLink: moedaCota + '-' + moedaConv,
    nomeObj: moedaCota + moedaConv
  }
}
const getUrl = data => `https://economia.awesomeapi.com.br/last/${data}`
const getCotacaoAPI = url => axios.get(url)
const key = moedasConvert(moedaCota, moedaConv).nomeObj
const extractCotacao = res => res.data[key].ask

const getCotacao = ({ getUrl, getCotacaoAPI, moedasConvert, extractCotacao }) => async () => {
  try {
    const currencyPath = moedasConvert(moedaCota, moedaConv).endLink
    const url = getUrl(currencyPath)
    const res = await getCotacaoAPI(url)
    //console.log(res)

    const cotacao = extractCotacao(res)
    return cotacao
  } catch (err) {
    return ''
  }

}

module.exports = {
  getCotacaoAPI,
  getCotacao: getCotacao({ moedasConvert, getUrl, getCotacaoAPI, extractCotacao }),
  moedasConvert,
  extractCotacao,
  getUrl,
  pure: {
    getCotacao
  }
}
