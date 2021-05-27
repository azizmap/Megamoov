import './App.css';
import 'antd/dist/antd.css'
import {UserProvider} from "./Context/UserContext"
import Main from "./Layouts/Main"

function App() {
  return (
      <>
      <UserProvider>
        <Main/>
      </UserProvider>
      </>
  );
}

export default App;
