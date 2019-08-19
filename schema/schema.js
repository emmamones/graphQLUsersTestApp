const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema } = graphql;
const _serverUrl = 'http://localhost:5000';

//Resolving Circular References...

const CompanyType = new GraphQLObjectType(
    {
        name: 'Company',
        fields: () => ({
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            users: {
                type: new GraphQLList(UserType),
                resolve(parentValue, args) {
                    return axios.get(`${_serverUrl}/companies/${parentValue.id}/users`).then(response => {
                        return response.data;
                    })
                }
            }
        })
    }
);

//resolve function helps to teach graphQl how to get some data to populate a proportie
//betweebn the incoming json and the actual data type.
const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt },
            company: {
                type: CompanyType,
                resolve(parentValue, args) {
                    return axios.get(`${_serverUrl}/companies/${parentValue.companyId}`).then(response => {
                        return response.data;
                    })
                }
            }
        })
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
                return axios.get(`${_serverUrl}/users/${args.id}`).then(response => {
                    return response.data;
                })
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${_serverUrl}/companies/${args.id}`).then(response => {
                    return response.data;
                })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post(`${_serverUrl}/users`, { firstName, age }).then(response => {
                    return response.data;
                })
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`${_serverUrl}/users/${id}`).then(response => {
                    return response.data;
                })
            }
        }
        ,
        addCompany: {
            type: UserType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLString) },
                companyId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { userId, companyId }) {
                return axios.patch(`${_serverUrl}/users/${userId}`, { companyId }).then(response => {
                    return response.data;
                })
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { userId, args }) {
                return axios.patch(`${_serverUrl}/users/${args.id}`,  args).then(response => {
                    return response.data;
                })
            }
        }
    }
})
//merge the objects into one schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})