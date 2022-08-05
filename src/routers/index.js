import { HashRouter , Route , Redirect, Switch} from "react-router-dom";
import React from 'react';
import Index from "../views/index";
import Category from "../views/category";
import Cart from "../views/cart";
import Center from "../views/center";
import NotFound from "../views/notfound";

const Router = (props) => {
	return (
		<HashRouter>
			{props.children}
			<Switch>
				<Route path={"/index"} component={Index} />
				<Route path={"/category"} component={Category} />
				<Route path={"/cart"} component={Cart} />
				<Route path={"/center"} component={Center} />
				<Redirect to={'/index'} from={'/'} exact></Redirect>
				<Route component={NotFound}/>
			</Switch>
		</HashRouter>
	);
};

export default Router;