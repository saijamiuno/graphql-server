import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Add the decoded user info to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user, // Add user info to the context
    }),
  });

  app.use(bodyParser.json());
  app.use(cors());

  // Apply the authMiddleware before the GraphQL middleware

  await server.start();
  app.use("/graphql", authMiddleware, expressMiddleware(server));
  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
