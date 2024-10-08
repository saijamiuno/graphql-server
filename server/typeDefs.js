export const typeDefs = `#graphql



type User {
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
    description: String
    completed: Boolean!
    createdAt: String!
  }
  input TodoInput {
    title: String!
    description: String
  }

type Query {
    getUsers: [User]!
    getProducts: [Product]!
    getTodos: [Todo]
    getTodoById(id: ID!): Todo
}

type AuthPayload {
  token: String!
  message: String!
}

type Mutation {
  signIn(userId: String!, password: String!): AuthPayload
  signUp(userId: String!, password: String!, firstName: String!, lastName: String!): AuthPayload
  createTodo(input: TodoInput): Todo
  updateTodo(id: ID!, input: TodoInput, completed: Boolean): Todo
  deleteTodo(id: ID!): String
  }

`;
