import axios from "axios";

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
      console.log(contextValue, "contextValue");
      return "OK"
    },
  },
};
