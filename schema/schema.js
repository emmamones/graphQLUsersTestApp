const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;


const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: {
            id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt }
        }
    }
);

const CompanyType = new GraphQLObjectType(
    {
        name: 'Company',
        fields: {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            description: { type: GraphQLString }

        }
    }
);

//use to allowed grapql to enter our applications data graph
//resolve function its use to return the data from DB.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:5000/users/${args.id}`).then(response => {
                    return response.data;
                })

            }
        }
    }
});

//merge the objects into one schema
module.exports = new GraphQLSchema({
    query: RootQuery
})