const api = require('./api.currency')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
  const res = {
    data: {
      USDBRL: [
        { ask: 5.64 }
      ]
    }
  }
  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('url').then(resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})
test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
      USDBRL:
        { ask: 5.64 }
    }
  })
  expect(cotacao).toBe(5.64)
})

test('getCoins', () => {
  const param = api.getCoins('USD', 'BRL')
  expect({ endLink: 'USD-BRL', nomeObj: 'USDBRL' }).toBe({ endLink: 'USD-BRL', nomeObj: 'USDBRL' })
})

test('getUrl', () => {
  const url = api.getUrl('USD-BRL')
  expect(url).toBe('https://economia.awesomeapi.com.br/last/USD-BRL')
})

test('getCotacao', () => {
  const res = {
  }

  const getCoins = jest.fn()
  getCoins.mockReturnValue({ endLInk: 'USD-BRL', nomeObj: 'USDBRL' })

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockReturnValue(Promise.reject('err'))

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(5.64)

  api.pure
    .getCotacao({ getUrl, getCotacaoAPI, getCoins, extractCotacao })('USD', 'BRL')
    .then((res, key) => {
      expect(res, key).toBe('', '')
    })
})

test('getCotacao', () => {
  const key = 'USDBRL'
  const res = {
    data: {
      [key]:
        { ask: 5.64 }

    }
  }

  const getCoins = jest.fn()
  getCoins.mockReturnValue({ endLInk: 'USD-BRL', nomeObj: 'USDBRL' })

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockResolvedValue(res)

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(5.64)

  api.pure
    .getCotacao({ getUrl, getCotacaoAPI, getCoins, extractCotacao })('USD', 'BRL')
    .then((res, key) => {
      expect(res, key).toBe(5.64)
    })
})

