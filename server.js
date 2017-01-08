const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
const MongoClient = require ('mongodb').MongoClient

var db


MongoClient.connect('mongodb://atherizdb:random2@ds061196.mlab.com:61196/atherizdemo', (err, database)=>{
    if (err) return console.log(err)
    db = database
     app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
    })
      })

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
    db.collection('details').find().toArray((err, result)=>{
        if (err) return console.log(err)
        res.render('index.ejs', {details: result})
    })
  })

  app.post('/details', (req, res) => {
    db.collection('details').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log ('saved to db')
          res.redirect('/')
        })
     })

  app.put('/details', (req, res) => {
  db.collection('details')
  .findOneAndUpdate({name: 'NewName'}, {
    $set: {
      name: req.body.name,
      detail: req.body.detail
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/details', (req, res) => {
  db.collection('details').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Last one is deleted')
  })
})
