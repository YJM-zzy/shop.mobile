import './views/assest/css/App.css';
import Routers from "./routers";
import TabBar from  './components/Tabbar'

function App() {
  return (
    <div className="App">
      <Routers>
        <TabBar></TabBar>
      </Routers>
    </div>
  );
}

export default App;
