const axios = require('axios')

const getUrl = data => `https://economia.awesomeapi.com.br/last/${data}`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = (res, key) => res.data[key].ask

const getCoins = (moedaCota, moedaConv) => {
  return {
    endLink: moedaCota + '-' + moedaConv,
    nomeObj: moedaCota + moedaConv
  }
}

const getCotacao = ({ getUrl, getCotacaoAPI, getCoins, extractCotacao }) => async (cota, conv) => {
  try {
    const keyCurr = getCoins(cota, conv).nomeObj
    const currencyPath = getCoins(cota, conv).endLink
    const url = getUrl(currencyPath)
    const res = await getCotacaoAPI(url)
    //console.log(res)

    const cotacao = extractCotacao(res, keyCurr)
    return cotacao
  } catch (err) {
    return ''
  }

}

module.exports = {
  getCotacaoAPI,
  getCotacao: getCotacao({ getCoins, getUrl, getCotacaoAPI, extractCotacao }),
  getCoins,
  extractCotacao,
  getUrl,
  pure: {
    getCotacao
  }
}
