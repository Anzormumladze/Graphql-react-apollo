const graphql = require("graphql")
const _ = require("lodash")
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql;

//dummy data

var books = [
    {name:"ვეფხისტყაოსანი",genre:"Fantasy",id:"1",authorId:"1"},
    {name:"გალაქკტიონი",genre:"Fantasy",id:"2",authorId:"2"},
    {name:"პაკოს ცხოვრება",genre:"Sci-Fi",id:"3",authorId:"3"},
    {name:"ჟაკოს ხიზნები",genre:"Sci-Fi",id:"3",authorId:"2"},
    {name:"მეკობრეები",genre:"Sci-Fi",id:"3",authorId:"1"},
    {name:"ორი რეზო",genre:"Sci-Fi",id:"3",authorId:"3"},

]

var authors = [
    {name:"შოთა რუსთაველი",age:400,id:"1"},
    {name:"ტაბიძე",age:500,id:"2"},
    {name:"ანზორ მუმლაძე",age:66,id:"3"},
]


const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() => ({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                // code to get data from db / other source
                  console.log(parent);
                  return _.find(authors,{id:parent.authorId})
               }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:() => ({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryTpye",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // code to get data from db / other source
                console.log(typeof(args.id))
                return _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
             // code to get data from db / other source
                return _.find(authors,{id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})