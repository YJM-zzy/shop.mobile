import {fromJS} from "immutable";

const TabbarReducer = (prevState = {
	show: true
}, action) => {
	const newState = fromJS(prevState);
	switch (action.type)
	{
		case 'show':
			return newState.set('show', true).toJS();
		case 'hide':
			return newState.set('show', false).toJS();
		default:
			return prevState;
	}
}
export default  TabbarReducer;