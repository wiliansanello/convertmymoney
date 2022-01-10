const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.currency')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  /*const cotacao = await apiBCB.getCotacao()
  const moedaCotacao = moedaCotacao
  const moedaConversao = moedaConversao
  if (moedaCotacao && moedaConversao) {
    console.log(moedaCotacao + ' ' + moedaConversao)
  }*/
  //console.log('cotacao', cotacao)
  res.render('home'/*, {
    cotacao
  }*/)
})

app.get('/cotacao', (req, res) => {
  const { cotacao, moedaCotacao, conversao, moedaConversao } = req.query
  if (cotacao && conversao) {
    const resultado = convert.convert(cotacao, conversao)
    res.render('cotacao', {
      error: false,
      cotacao: convert.toMoney(cotacao),
      moedaCotacao: moedaCotacao,
      conversao: convert.toMoney(conversao),
      moedaConversao: moedaConversao,
      resultado: convert.toMoney(resultado)
    })
  } else {
    res.render('cotacao', {
      error: 'Não há valores informados'
    })
  }
})

app.listen(3000, err => {
  if (err) {
    console.log('Erro ao acessar')
  } else {
    console.log('ConvertMyMoney está online')
  }
})