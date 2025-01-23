export const typeDefs = `#graphql



type User {
    _id: ID!    
    userId: String!
    firstName: String!
    lastName: String!
    email: String!
    tasks: [Task!]!
    notifications: [Notification!]!
}

type Task {
  id: ID!
  title: String!
  description: String
  users: [User!]!
}

type Notification {
  id: ID!
  message: String!
  createdAt: String!
  user: User!
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
    getTasks: [Task!]!
    task(id: ID!): Task
    notifications: [Notification!]!
    notification(id: ID!): Notification
}

type userSiginAuthResponse {
  token: String!
  message: String!
}
type userSigUpAuthResponse {
  message: String!
}

type Mutation {
  signIn(userId: String!, password: String!): userSiginAuthResponse
  signUp(userId: String!, password: String!, firstName: String!, lastName: String!): userSigUpAuthResponse
  createTask(title: String!, description: String): Task!
  assignTaskToUser(userId: ID!, taskId: ID!): Task!
  createNotification(userId: ID!, message: String!): Notification!
  createTodo(input: TodoInput): Todo
  updateTodo(id: ID!, input: TodoInput, completed: Boolean): Todo
  deleteTodo(id: ID!): String
  }

`;
