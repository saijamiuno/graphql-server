import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query fetchTodos {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(query);
  console.log({ loading, error, data });
  if (loading) return <h1>Loading....</h1>;
  return <div className="App"></div>;
}

export default App;
