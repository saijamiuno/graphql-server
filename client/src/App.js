import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query fetchTodos {
    getTodos {
      title
      id
      completed
      user {
        email
        name
        website
      }
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(query);
  console.log({ loading, error, data });
  if (loading) return <h1>Loading....</h1>;
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Todo Title</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Website</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos?.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
              <td>{todo?.user?.email}</td>
              <td>{todo?.user?.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
