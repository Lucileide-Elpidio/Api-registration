import express from "express"

import mongoose from "mongoose"

import User from "./Models/User.js"

import cors from "cors"

const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())
app.use(cors())


app.get("/users", async (request, response) => {
   const users = await User.find()
   return response.status(200).json(users)
})

app.post("/users", async (request, response) => {
   const user = request.body
   const newUser = await User.create(user)

   return response.status(201).json(newUser)
})

app.delete("/users/:id", async (request, response) => {

   const id = request.params.id

   await User.findByIdAndDelete({ _id: id })
   return response.status(200).json({response:`User deleted` })
})

mongoose.connect("mongodb+srv://lucileideelpidio:lucilleide28@cluster0.6ig4yv3.mongodb.net/?retryWrites=true&w=majority")
   .then(() => console.log('Banco de dados conectado'))
   .catch((error) => console.log(error))

app.listen(port, () => {
   console.log(`Server started on port 3000`)
})