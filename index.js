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
mongoose.connect(
    'mongodb://localhost/uwa_motorsports', 
    {useNewUrlParser:true, useUnifiedTopology:true}
)

// @desc multer setup + upload location
const storage = GridFsStorage({
    url:'mongodb://localhost/uwa_motorsports',
    file: (req,file) => {
        const type = file.mimetype
        return {
            bucketName: type === 'image/jpeg' ? 'photos' : null,
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

// @desc http request handlers
app.get('/', (req,res) => {
    res.json({message:'hello world'})
})

app.post('/upload', upload.single('payload'), (req,res) => {
    res.json(req.file)
})

// @desc app listeners
app.listen(3000, () => console.log('listening on port:3000'))