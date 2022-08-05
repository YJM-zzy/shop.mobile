import './views/assest/css/App.css';
import {useEffect} from "react";
import {getToken} from "./network";
import Routers from "./routers";
import TabBar from  './components/Tabbar'

function App() {
  useEffect(  () => {
     getToken({
      query: "admin",
      password: "123456"
    }).then(res => {
       console.log(res);
    })
  }, [])
  return (
    <div className="App">
      <Routers>
        <TabBar></TabBar>
      </Routers>
    </div>
  );
}

export default App;
