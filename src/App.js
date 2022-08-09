import './views/assest/css/App.css';
import Routers from "./routers";
import TabBar from  './components/Tabbar'
import {connect} from "react-redux";

function App(props) {
  return (
    <div className="App">
      <Routers>
        {props.isShow && <TabBar></TabBar>}
      </Routers>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    isShow: state.TabbarReducer.show
  }
}
export default connect(mapStateToProps)(App);
