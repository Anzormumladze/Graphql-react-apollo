const graphql = require("graphql")
const _ = require("lodash")

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

//dummy data

var books = [
    {name:"ვეფხისტყაოსანი",genre:"Fantasy",id:"1"},
    {name:"გალაქკტიონი",genre:"Fantasy",id:"2"},
    {name:"პაკოს ცხოვრება",genre:"Sci-Fi",id:"3"},
]


const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() => ({
        id:{type: GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryTpye",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                // code to get data from db / other source
                _.find(books,{id:args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})