// @desc dependancies
const app = require('express')()
const mongoose = require('mongoose')
const morgan = require('morgan')
const multer = require('multer')
const bodyParser = require('body-parser')
const GridFsStorage = require('multer-gridfs-storage')
const shortid = require('shortid')

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

// @desc express middleware
app.use(morgan('dev'))

// @desc http request handlers
app.get('/', (req,res) => {
    res.json({message:'hello world'})
})

// @desc multer img upload test
app.post('/', upload.single('payload'), (req,res,next) => {
    
    const mongoPayload = {
        file:req.file,
        body:req.body
    }
    
    res.json(mongoPayload)
})

// @desc app listeners
app.listen(3000, () => console.log('listening on port:3000'))