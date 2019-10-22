// @desc dependancies
const app = require('express')()
const mongoose = require('mongoose')
const morgan = require('morgan')
const multer = require('multer')
const bodyParser = require('body-parser')
const GridFsStorage = require('multer-gridfs-storage')
const shortid = require('shortid')
const Grid = require('gridfs-stream')

// @desc mongoose setup
const conn = mongoose.createConnection(
    'mongodb://localhost/uwa_motorsports', 
    {useNewUrlParser:true, useUnifiedTopology:true}
)
let gfs = null
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})

// @desc multer setup + upload location
const storage = GridFsStorage({
    url:'mongodb://localhost/uwa_motorsports',
    file: (req,file) => {
        const type = file.mimetype
        return {
            filename: shortid.generate()
        }
    }
})
const upload = multer({ storage:storage, useUnifiedTopology:true })

// @desc mongoose schemas
const Schemas = require('./schemas/Schemas')
const User = mongoose.model('User', Schemas.User)
const Image = mongoose.model('Image', Schemas.Image)

// @desc express middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

// @desc http request handlers
app.get('/', (req,res) => {
    res.json({message:'hello world'})
})

// @desc add photos here
app.post('/upload', upload.single('payload'), (req,res) => {
    res.json(req.file)
})

// @desc get images list
app.get('/files', (req,res) => {
    gfs.files.find().toArray((err,files) => {
        res.json(files)
    })
})

// @desc get images here
app.get('/files/:id', (req,res) => {
    gfs.files.findOne({filename:req.params.id}, (err,file) => {
        if (err) {throw err}
        const readstream = gfs.createReadStream(file.filename)
        readstream.pipe(res)
    })
})

// @desc app listeners
app.listen(3000, () => console.log('listening on port:3000'))