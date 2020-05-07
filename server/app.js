const express = require('express')
const graphqlHTTP = require("express-graphql")
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://anzor:anzor@cluster0-ybu0p.mongodb.net/test?retryWrites=true&w=majority")
mongoose.connection.once("open",()=>{
    console.log("connected to database")
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log('now listening for requests on port 4000')
})