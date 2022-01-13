const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.currency')
const res = require('express/lib/response')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/currency', async (req, res) => {
  let cotacao = ''
  const { moedaCotacao, moedaConversao } = req.query
  if (moedaCotacao && moedaConversao) {
    if (moedaCotacao !== moedaConversao) {
      cotacao = await apiBCB.getCotacao(moedaCotacao, moedaConversao)
      console.log('cotacao', cotacao)
      res.render('currency', {
        error: false,
        cotacao,
        moedaConversao,
        moedaCotacao
      })
    } else {
      res.render('break', {
        error: 'Dados inválidos para a cotação.'
      })
    }
  }
})


app.get('/result', (req, res) => {
  const { cotacao, moedaCotacao, conversao, moedaConversao } = req.query
  console.log(req.query)
  if (cotacao && conversao) {
    const resultado = convert.convert(cotacao, conversao, moedaCotacao, moedaConversao)
    res.render('result', {
      error: false,
      cotacao: convert.toMoney(cotacao, moedaCotacao),
      moedaCotacao: moedaCotacao,
      conversao: convert.toMoney(conversao),
      moedaConversao: moedaConversao,
      resultado: convert.toMoney(resultado)
    })
  } else {
    res.render('result', {
      error: 'Por favor, preencha todos os dados da cotação'
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