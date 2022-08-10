import './views/assest/css/app.module.css';
import Routers from "./routers";
import TabBar from  './components/Tabbar'
import {connect} from "react-redux";
import style from './views/assest/css/app.module.css'

function App(props) {
  return (
    <div className={style.app}>
      <Routers>
        {props.isShow && <div className={style.tabbarfixed}>
          <TabBar></TabBar>
        </div>}
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
