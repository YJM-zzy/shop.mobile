import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import React from 'react';
import Index from "../views/index";
import Category from "../views/category";
import Cart from "../views/cart";
import Center from "../views/center";
import NotFound from "../views/notfound";
import Login from "../views/login";
import UpdateAvatar from "../views/updateAvatar";
import Register from "../views/register";
import OrderList from "../views/orderList";
import Address from "../views/address";
import UpdateUserInfo from "../views/updateUserInfo";
import AddOrUpdateAddress from "../views/addOrUpdateAddress";

const isAuth = () => {
  return localStorage.getItem('token') ? true : false;
}

const Router = (props) => {
  return (
    <HashRouter>
          {props.children}
          <Switch>
            <Route path={"/index"} component={Index}/>
            <Redirect to={'/index'} from={'/'} exact></Redirect>
            <Route path={"/category"} component={Category}/>
            <Route path={"/cart"} component={Cart}/>
            <Route path={"/updateAvatar"} component={UpdateAvatar}/>
            <Route path={"/center"} render={() =>
              isAuth() ? <Center/> : <Redirect to={'/login'} from='/center'></Redirect>
            }/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/register"} component={Register}/>
            <Route path={"/orderList/:type"} component={OrderList}/>
            <Route path={"/address"} component={Address}/>
            <Route path={"/updateUserInfo"} component={UpdateUserInfo}/>
            <Redirect to={'/orderList/0'} from={'/orderList'} exact></Redirect>
            <Route path={"/addOrUpdateAddress/:id"} component={AddOrUpdateAddress}/>
            <Redirect to={'/addOrUpdateAddress/0'} from={'/addOrUpdateAddress'} exact></Redirect>
            <Route component={NotFound}/>
          </Switch>
   </HashRouter>
  );
};

export default Router;