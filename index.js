const { response } = require('express')
const express = require('express')
const app = express()
const port = 8000
const items = [
    {
        name: "apple",
        price: 10,
        id: "1",
    },
    {
        name: "banana",
        price: 15,
        id: "2",
    },
    {
        name: "cherry",
        price: 8,
        id: "3",
    },
    {
        name: "mango",
        price: 9,
        id: "4",
    },
    {
        name: "pineapple",
        price: 6,
        id: "5",
    },
    {
        name: "peach",
        price: 7,
        id: "6",
    },
    {
        name: "blueberry",
        price: 5,
        id: "7",
    },
    {
        name: "redberry",
        price: 7,
        id: "8",
    },
    {
        name: "papaya",
        price: 20,
        id: "9",
    },
    {
        name: "lime",
        price: 17,
        id: "10",
    },
    {
        name: "kiwi",
        price: 11,
        id: "11",
    },
]


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
app.get('/items/min/:y/max/:x', (request, response) => {
    let between = []
    const max= request.params.x
    const min= request.params.y
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