import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import axios from "axios";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

async function startServer(params) {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();

  app.use(
    "/",
    expressMiddleware(await server, {
      context: async ({ req, res }) => {
        const token = req.headers["authorization"];
      },
    })
  );
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
}

startServer();
