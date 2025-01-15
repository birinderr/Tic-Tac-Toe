import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {StreamChat} from 'stream-chat'
import Cookies from "universal-cookie"

function App() {
  const api_key = "8qhycckxhwfj"
  const client = StreamChat.getInstance( api_key)
  const cookies = new Cookies()
  const token = cookies.get("token")
  
  if(token){
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    token
    ).then((user) => {
      console.log(user);
    })
  }
  return (
    <div className="App">
      <Signup />
      <Login />
    </div>
  );
}

export default App;
