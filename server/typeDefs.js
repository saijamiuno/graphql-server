export const typeDefs = `#graphql

type Todo{
    id: ID!    
    title: String!
    completed: Boolean
}

type User {
    id: ID!    
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
}

type Query{
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
}
`;
