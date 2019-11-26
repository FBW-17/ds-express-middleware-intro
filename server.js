const express = require("express")
const api = express()

api.listen(3000, console.log("Started on 3000"))

api.use(express.urlencoded({extended: false}))


api.use("/person", (req, res, next) => {
    console.log("Middleware called...", req.url)
    req.fullname = req.body.firstname + " " + req.body.lastname
    next()
})

api.get("/person", (req, res) => {
    res.send(`
        <form action='/person' method='POST'>
            <label>Firstname:</label>
            <input type="text" name="firstname" /><br />
            <label>Lastname:</label>
            <input type="text" name="lastname" /><br />
            <button type="submit">Submit</button>
        </form>
    `)
})

api.post("/person", (req, res) => {
    console.log(req.fullname)
    res.send(`Hey ${req.fullname}, how is it going?`)
})
