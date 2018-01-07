const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        }, 
        age: {
            type: GraphQLInt
        }
    })
});

const users = [
    {id: '12', firstName:'Sam', age:42},
    {id: '13', firstName:'Ben', age:26},
    {id: '14', firstName:'Ali', age:90},
    {id: '15', firstName:'Dori', age:45},
    {id: '16', firstName:'Nemo', age:36},
    {id: '17', firstName:'Can', age:22},
    {id: '18', firstName:'Sun', age:11}
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args){
                return _.find(users, { id:  args.id });
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})