export const typeDefs = `#graphql

type Todo{
    id: ID!    
    title: String!
    completed: Boolean
}

type Query{
    getTodos: [Todo]
}
`;
