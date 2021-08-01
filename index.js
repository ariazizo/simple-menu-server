const { response } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 8000
const items = []
let i = 1
let cat = 1
let code = 1
const menuList = [
    {
        category: "sandwich",
        id: cat++,
        foods: [
            {
                name: "hot dog",
                price: 23,
                id: code++,
            },
            {
                name: "jambon",
                price: 20,
                id: code++,
            },
            {
                name: "baken",
                price: 30,
                id: code++,
            },
        ],
    },
    {
        category: "pizza",
        id: cat++,
        foods: [
            {
                name: "peperoni",
                price: 49,
                id: code++,
            },
            {
                name: "especial",
                price: 47,
                id: code++,
            },
            {
                name: "gorme",
                price: 53,
                id: code++,
            },
        ],
    },
    {
        category: "deser",
        id: cat++,
        foods: [
            {
                name: "ice cream",
                price: 12,
                id: code++,
            },
            {
                name: "pooding",
                price: 8,
                id: code++,
            },
            {
                name: "cace",
                price: 18,
                id: code++,
            },
        ],
    }
]
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
// http verb/methode
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

// from here ......................
app.get('/menuList', (request, response) => {
    response.send(menuList)
})

app.get('/menu/categories', (request, response) => {
    const categories = []
    for (let i = 0; i < menuList.length; i++) {
        const getCat = menuList[i].category
        categories.push(getCat)
    }
    response.send(categories)
})


app.get('/items/:id/category', (request, response) => {
    const id = request.params.id
    let category = null
    for (let m = 0; m < menuList.length; m++) {
        const foods = menuList[m].foods;
        for (let f = 0; f < foods.length; f++) {
            if (id == foods[f].id) {
                category = menuList[m].category
            }
        }
    }
    response.send(category)
})


app.get('/categories/:id/items', (request, response) => {
    const id = request.params.id
    const result = null
    for (let i = 0; i < menuList.length; i++) {
        const currentCategoryId = menuList[i].id
        if (id == currentCategoryId) {
            result = menuList[i].foods
            break
        }
    }
    response.send(result)
})

app.post('/categories/:id/items', (request, response) => {
    const id = request.params.id
    const name = request.body.name
    const newCode = code++
    food = {
        name, newCode
    }
    for (let i = 0; i < menuList.length; i++) {
        const categoryId = menuList[i]
        if (id == menuList[i].id) {
            categoryId.foods.push(food)
            break
        }
    }
    response.send(menuList)
})
app.delete('/categories/:categoryId/items/:itemId', (request, response) => {
    const categoryId = request.params.categoryId
    const itemId = request.params.itemId
    for (let i = 0; i < menuList.length; i++) {
        const menuId = menuList[i].id
        if (categoryId == menuId) {
            const food = menuList[i].foods
            for (let f = 0; f < food.length; f++) {
                if (itemId == food[f].id) {
                    menuList[i].foods.splice(f, 1)
                    break
                }
            }
        }
    }
    response.send(menuList)
})
app.put('/categories/:categoryId/items/:itemId', (request, response) => {
    const categoryId = request.params.categoryId
    const itemId = request.params.itemId
    const newName = request.body.name
    for (let i = 0; i < menuList.length; i++) {
        const menuId = menuList[i].id
        if (categoryId == menuId) {
            const food = menuList[i].foods
            for (let f = 0; f < food.length; f++) {
                if (itemId == food[f].id) {
                    food[f].name = newName
                    break
                }
            }
        }
    }
    response.send(menuList)
})

///////////////////////////////////////// end point.....//////\\\\\\
app.post('/categories', (request, response) => {
    const category = request.body.category
    const newId = cat++
    const newObject = {
        category, id: newId,
    }
    menuList.push(newObject)
    response.send(menuList)
})

app.get('/foods-price/min/:m/max/:x', (request, response) => {
    const result = []
    const max = request.params.x
    const min = request.params.m
    for (let i = 0; i < menuList.length; i++) {
        const food = menuList[i].foods
        for (let f = 0; f < food.length; f++) {
            if (food[f].price >= min && food[f].price <= max) {
                result.push(food[f])
            }
        }
    }
    response.send(result)
})

app.get('/items/categories/:categoryId/min/:m/max/:x', (request, response) => {
    const result = []
    const id = request.params.categoryId
    const categoryId = menuList[id-1].foods
    const max = request.params.x
    const min = request.params.m
    for (let f = 0; f < categoryId.length; f++) {
        if (categoryId[f].price >= min && categoryId[f].price <= max) {
            result.push(categoryId[f])
        }
    }
    response.send(result)
})