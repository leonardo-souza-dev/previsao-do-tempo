const express = require('express')
const app = express()
const http = require('http');

const port = process.env.PORT || 3001
const extApiCaraCoroa = process.env.EXT_API_CARA_COROA

app.get('/api/previsao-do-tempo', (req, res) => {

  http.get(extApiCaraCoroa, (resp) => {
    let data = ''

    resp.on('data', (chunk) => { data += chunk })
    
    resp.on('end', () => {
      let resultado = JSON.parse(data)
      res.send(resultado == 'cara' ? 'chuva' : 'sol')
    })  
  }).on("error", (err) => {
    res.send("Error: " + err.message);
  })  
})

app.listen(port, () => {
  console.log(`app previsao-do-tempo escutando na porta ${port}`);
})