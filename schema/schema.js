const graphql = require('graphql');
const _ = require('lodash');//help to walk through collections of Data
const { GraphQLObjectType, GraphQLString, GraphQLInt,GraphQLSchema} = graphql;
const users = [
    { id: '23', firstName: 'Bill', age:'20' },
    { id: '47', firstName: 'Samantha', age:'21' }
];

const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: {
            id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt }
        }
    },
    {
        name: 'Company',
        fields: {
            id: { type: GraphQLString },
            name: { type: GraphQLString }
        }
    });

//use to allowed grapql to enter our applications data graph
//resolve function its use to return the data from DB.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return users.find(user => user.id == args.id);
                //using loadash
                //_.find(users,{id:args.id});
            }
        }
    }
})

//merge the objects into one schema
module.exports= new GraphQLSchema({
    query:RootQuery
})