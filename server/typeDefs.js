export const typeDefs = `#graphql

type User {
    id: ID!    
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
}

type LoginUser {
    _id: ID!    
    userId: String!
    firstName: String!
    lastName: String!
}

type Product {
    _id: ID!    
    productNumber: String!
    productName: String!
    manufacturerName: String!
    qty: Int!
    regularCost: Int!
    buildingType: String
    buildingSubType: String
    storageLocation: String
    description: String
    category: String
    finish: String
    active: String
    warehouseLocation: String
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
    getUsers: [LoginUser]!
    getProducts: [Product]!
}

type AuthPayload {
  token: String!
  message: String!
}

type Mutation {
  signIn(userId: String!, password: String!): AuthPayload
  signUp(userId: String!, password: String!, firstName: String!, lastName: String!): AuthPayload
}

`;
