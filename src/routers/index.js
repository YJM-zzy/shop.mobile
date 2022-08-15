import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import React from 'react';
import LazyLoad from '../components/LazyLoad/index'
import AuthComponent from "../components/AuthComponent";
import Login from "../views/login";
import OrderList from "../views/orderList";
import Register from "../views/register";
import UpdateAvatar from "../views/updateAvatar";
import UpdateUserInfo from "../views/updateUserInfo";
import AddOrUpdateAddress from "../views/addOrUpdateAddress";
import Address from "../views/address";

const Router = (props) => {
  return (
    <HashRouter>
          {props.children}
          <Routes>
            <Route path={"/index"} element={LazyLoad('index')}/>
            <Route path={'/'}  element={<Navigate to={'/index'}></Navigate>}></Route>
            <Route path={"/category"} element={LazyLoad('category')}/>
            <Route path={"/cart"} element={LazyLoad('cart')}/>
            <Route path={"/updateAvatar"} element={LazyLoad(<UpdateAvatar/>)}/>
            <Route path={"/center"} element={<AuthComponent>
              {LazyLoad('center')}
            </AuthComponent>}/>
            <Route path={"/login"} element={<Login></Login>}/>
            <Route path={"/register"} element={<Register></Register>}/>
            <Route path={"/orderList/:type"} element={<OrderList></OrderList>}/>
            <Route path={"/orderList"} element={<Navigate to={'/orderList/0'}/>}/>
            <Route path={"/address"} element={<Address/>}/>
            <Route path={"/updateUserInfo"} element={<UpdateUserInfo/>}/>
            <Route path={"/addOrUpdateAddress/:id"} element={<AddOrUpdateAddress/>}/>
            <Route path={"/addOrUpdateAddress"} element={<Navigate to={'/addOrUpdateAddress/0'}/>}/>
            <Route path={"*"} element={LazyLoad('notfound')}/>
          </Routes>
   </HashRouter>
  );
};

export default Router;