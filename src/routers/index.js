import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import React from 'react';
import Index from "../views/index";
import Category from "../views/category";
import Cart from "../views/cart";
import Center from "../views/center";
import NotFound from "../views/notfound";
import Login from "../views/login";
import UpdateAvatar from "../views/updateAvatar";

const isAuth = () => {
  return localStorage.getItem('token') ? true : false;
}

const Router = (props) => {
  return (
    <HashRouter>
      {props.children}
      <Switch>
        <Route path={"/index"} component={Index}/>
        <Route path={"/category"} component={Category}/>
        <Route path={"/cart"} component={Cart}/>
        <Route path={"/updateAvatar"} component={UpdateAvatar}/>
        <Route path={"/center"} render={() =>
					isAuth() ? <Center/> : <Redirect to={'/login'} from='/center'></Redirect>
        }/>
        <Route path={"/login"} component={Login}/>
        <Redirect to={'/index'} from={'/'} exact></Redirect>
        <Route component={NotFound}/>
      </Switch>
    </HashRouter>
  );
};

export default Router;