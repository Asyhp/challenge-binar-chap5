require('dotenv').config()
const express = require('express')
const req = require('express/lib/request')
const app = express()
const PORT = 4003
const fs = require('fs')
const { uuid } = require('uuidv4')


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(express.static('assets'))

const apiRouter = express.Router()
const v1 = express.Router()
app.use("/api", apiRouter)
apiRouter.use("/v1", v1)


app.set('view engine', 'ejs')
app.set('views', './views')

app.get("/", (req, res) => {
    res.status(200)
    res.render('main')
})

app.get("/login", (req, res) => {
    res.status(200)
    res.render('login')
})

app.get("/register", (req, res) => {
    res.status(200)
    res.render('register')
})

app.get("/the-game", (req, res) => {
    res.render('the-game')
})

v1.post("/register", (req, res) => {
    const { username, email, password } = req.body
    const fileUser = fs.readFileSync('data/data.json')
    const parsedFileUser = JSON.parse(fileUser)
    const newUser = {
        
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    parsedFileUser.push(newUser)
    fs.writeFileSync('data/data.json', JSON.stringify(parsedFileUser), 'utf-8')
    res.redirect('/')
    return;
})

v1.post("/login", (req, res) => {
    const { username, password } = req.body
    const dataUser = fs.readFileSync('data/data.json')
    const parsedData = JSON.parse(dataUser)
    const userFound = parsedData.find((user) => user.name == username)
    
    if (!userFound) {
        console.log('user nggak ada')
        return;
    }
    if (userFound.password != password) {
        console.log('salah passwordnya')
        return;
    }
    if (userFound.password == password) {
        res.redirect("/the-game")
        return;
    }
    
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);})