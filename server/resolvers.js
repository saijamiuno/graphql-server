import axios from "axios";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const uri = process.env.MONGO_URL;
const secretKey = process.env.SECRET_KEY;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dataBase = client.db(process.env.DATABASE_DEV);
const usersCollection = dataBase.collection("testUsers");
const collection = dataBase.collection("products");

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
    getProducts: async (parent, args, context, info) => {
      try {
        const result = await collection.find().toArray();
        return result.splice(0, 200);
      } catch (error) {
        console.log(`ERROR : ${error}`);
      }
    },
  },
  Mutation: {
    signIn: async (parent, { userId, password }, context, info) => {
      try {
        // Fetch all users from the database
        const users = await usersCollection.find().toArray();
        // Find the user by userId
        const existingUser = users.find((user) => user.userId === userId);
        // If user is found and password matches
        if (
          existingUser &&
          bcrypt.compareSync(password, existingUser.password)
        ) {
          const token = jwt.sign(
            {
              userId: existingUser.userId,
            },
            secretKey,
            { expiresIn: "1h" }
          );
          return {
            message: "success",
            token: token,
          };
        } else {
          return {
            message: "Invalid username or password.",
            token: null,
          };
        }
      } catch (error) {
        return {
          message: error,
          token: null,
        };
      }
    },
  },
};
