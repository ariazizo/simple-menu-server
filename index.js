const { response } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 8000
const items = []
let i = 0
app.post('/items', (request, response) => {
    const price = request.body.price
    const name = request.body.name
    const item = {
        id: i, name, price
    }
    i++
    items.push(item)
    response.send(item)
})
app.get('/items', (request, response) => {
    response.send(items)
})
// app.get('/items/:id', (request, response) => {
//     const id= request.params.id
//     for (let i = 0; i < items.length; i++) {
//         if (id == items[i].id) {
//             response.send(items[i])
//         }
//     }
// })
app.delete('/items/:id', (request, response) => {
    const id = request.params.id
    for (let i = 0; i < items.length; i++) {
        if (id == items[i].id) {
            const removedElements = items.splice(i, 1)
            response.send(removedElements[0])
        }
    }
    response.send()
})
app.put('/items/:id', (request, response) => {
    const id = request.params.id
    const newPrice = request.body.price
    const newName = request.body.name
    for (let i = 0; i < items.length; i++) {
        if (id == items[i].id) {
            items[i].price = newPrice
            items[i].name = newName
            response.send(items[i])
        }
    }
})
app.get('/items/min/:y/max/:x', (request, response) => {
    let between = []
    const max = request.params.x
    const min = request.params.y
    for (let i = 0; i < items.length; i++) {
        if (items[i].price >= min && items[i].price <= max) {
            between.push(items[i])
        }
    }
    response.send(between)
})

app.listen(port, () => {
    console.log("listening")
})