const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const multer = require('multer')
const path = require('path')


// app.use(express.json())
// app.use(express.urlencoded({extended:true,}))

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null, 'uploads/')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            done(null, filename)
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})


app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.use((req,res,next)=>{
    next()
})

app.get('/single',(req,res)=>{
    res.render('single')
})

app.get('/array',(req,res)=>{
    res.render('array')
})

app.get('/uploads',(req,res)=>{
    res.render('uploads')
})

app.get('/axios',(req,res)=>{
    res.render('axios')
})


app.post('/upload',upload.single('upload'),(req,res)=>{
    console.log(req.file)
    res.send('upload')
})

app.post('/upload2',upload.array('upload'),(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    res.send('upload')
})

app.post('/upload3',upload.fields([{name:'upload1'},{name:'upload2'},{name:'upload3'},{name:'upload4'}]),(req,res)=>{
    console.log(req.files.upload1)
    console.log(req.files.upload2)
    console.log(req.files.upload3)
    console.log(req.files.upload4)
    console.log(req.body)
    res.send('upload')
})

app.listen(3000,()=>{
    console.log('서버시작')
})