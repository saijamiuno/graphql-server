export const typeDefs = `#graphql

type User {
    _id: ID!    
    userId: String!
    firstName: String!
    lastName: String!
}

type Todo {
    id: ID!    
    title: String!
    completed: Boolean
    user: User!
}

type Query {
    getTodos: [Todo!]!
    getAllUsers: [User!]!
    getUser(id: ID!): User
    getContext: String!
}
`;
