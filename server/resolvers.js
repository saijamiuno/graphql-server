import axios from "axios";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dataBase = client.db(process.env.DATABASE_DEV);
const usersCollection = dataBase.collection("testUsers");

export const resolvers = {
  Todo: {
    user: async (parent, args, contextValue, info) => {
      try {
        const result = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${parent.userId}`
        );
        return result.data;
      } catch (error) {
        throw new Error("Failed to fetch todos");
      }
    },
  },
  Query: {
    getTodos: async () => {
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        return result.data;
      } catch (error) {
        throw new Error("Failed to fetch todos");
      }
    },
    getAllUsers: async () => {
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        return result.data;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    getUser: async (parent, args, contextValue, info) => {
      try {
        const result = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${args.id}`
        );
        return result.data;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    getContext: (parent, args, contextValue, info) => {
      return "OK";
    },
    // DB
    getUsers: async (parent, args, context, info) => {
      try {
        const result = await usersCollection.find().toArray();
        return result;
      } catch (error) {
        throw new Error("Failed to fetch db users");
      }
    },
  },
};
