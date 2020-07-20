const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var books = [
    {
        name: 'Book 1',
        id: '1',
        genre: 'Sci-Fi',
        autorID: '1'
    },
    {
        name: 'Book 2',
        id: '2',
        genre: 'History',
        autorID: '1'
    },
    {
        name: 'Book 3',
        id: '3',
        genre: 'Fantasy',
        autorID: '3'
    }
];

var autor = [
    {
        name: 'autor 1',
        age: 20,
        id: '1'
    },
    {
        name: 'autor 2',
        age: 45,
        id: '2'
    },
    {
        name: 'autor 3',
        age: 56,
        id: '3'
    }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        autor: {
            type: autorType,
            resolve(parent, args) {
                return _.find(autor, { id: parent.autorID });
            }
        }
    })
});

const autorType = new GraphQLObjectType({
    name: 'autor',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { autorID: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        autor: {
            type: autorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(autor, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
