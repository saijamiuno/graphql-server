import axios from "axios";

export const resolvers = {
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
  },
};
