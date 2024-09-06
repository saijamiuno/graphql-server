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
    "/graphql",
    expressMiddleware(await server, {
      context: async ({ req, res }) => {
        const token = req.headers["authorization"];
        console.log(token, "token");
      },
    })
  );
  app.listen(7000, () => console.log("Serevr Started at PORT 7000"));
}

startServer();
