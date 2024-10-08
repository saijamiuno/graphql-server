import axios from "axios";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import { Todo } from "./models/Todo.js";
dotenv.config();
// DB config
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

mongoose
  .connect(
    `mongodb+srv://saijami:EcUpT3Et6dpojJz3@atlascluster.iotmmxp.mongodb.net/todo-app-1`
  )
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("Mongo Error", err);
  });

// Middleware
const verifyTokenMiddleware = (context) => {
  // Extract the authorization token from the headers
  const token = context.req.headers["authorization"];

  // Check if the token is provided
  if (!token) {
    throw new GraphQLError("Authorization token is missing.", {
      extensions: {
        code: "FORBIDDEN",
        http: {
          status: 403,
        },
      },
    });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user information to the context
    context.user = decoded;
  } catch (err) {
    // Handle token verification errors
    throw new GraphQLError("Invalid or expired token.", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: {
          status: 401,
        },
      },
    });
  }
};

export const resolvers = {
  Query: {
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
        verifyTokenMiddleware(context);
        const result = await collection.find().toArray();
        return result.splice(0, 200);
      } catch (error) {
        console.log(`ERROR : ${error}`);
        throw new Error("Failed to fetch products.");
      }
    },
    getTodos: async (parent, args, context, info) => {
      try {
        verifyTokenMiddleware(context);
        return await Todo.find();
      } catch (error) {
        console.log(`ERROR : ${error}`);
        throw new Error("Failed to fetch Todos.");
      }
    },
    getTodoById: async (parent, { id }, context, info) => {
      try {
        verifyTokenMiddleware(context);
        return await Todo.findById(id);
      } catch (error) {
        console.log(`ERROR : ${error}`);
        throw new Error("Failed to get todo.");
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
    signUp: async (parent, { userId, password, firstName, lastName }) => {
      try {
        if (!userId || !password || !firstName || !lastName) {
          throw new GraphQLError("Invalid data. Please provide valid data.", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ userId });
        if (existingUser) {
          throw new GraphQLError(
            "Username already exists. Choose another one.",
            {
              extensions: {
                code: "CONFLICT",
              },
            }
          );
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const result = await usersCollection.insertOne({
          userId,
          firstName,
          lastName,
          password: hashedPassword,
        });

        console.log(`Saved user with ID: ${result.insertedId}`);

        // Optionally, create a JWT for the user upon signup
        // const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

        return {
          message: "User registered successfully",
          // token,
        };
      } catch (error) {
        console.error("Error", error);
        throw new GraphQLError(`Internal Server Error: ${error.message}`, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
    createTodo: async (parent, { input }) => {
      const todo = new Todo(input);
      return await todo.save();
    },
    updateTodo: async (parent, { id, input, completed }) => {
      const todo = await Todo.findById(id);
      if (!todo) throw new Error("Todo not found");
      todo.title = input.title || todo.title;
      todo.description = input.description || todo.description;
      todo.completed = completed !== undefined ? completed : todo.completed;
      return await todo.save();
    },
    deleteTodo: async ({ id }) => {
      await Todo.findByIdAndDelete(id);
      return "Todo deleted";
    },
  },
};
