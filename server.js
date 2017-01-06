const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
const MongoClient = require ('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://atherizdb:random2@ds061196.mlab.com:61196/atherizdemo', (err, database)=>{
    if (err) return console.log(err)
    db = database
    app.listen(3000, () =>{
        console.log('listening on 3000')
    })
      })

app.post('/details', (req, res) => {
    db.collection('details').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log ('saved to db')
    var cursor = db.collection('details').find().toArray(function(err,results){
        console.log(results)
          res.redirect('/')
          })
        })
     })

app.get('/', (req, res) => {
    db.collection('details').find().toArray((err, result)=>{
        if (err) return console.log(err)
        res.render('index.ejs', {details: result})
    })
  })