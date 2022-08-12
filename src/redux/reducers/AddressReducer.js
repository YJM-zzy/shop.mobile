import {fromJS} from "immutable";

const AddressReducer = (prevState = {
	addressInfo: {}
}, action) => {
	const newState = fromJS(prevState);
	switch (action.type)
	{
		case 'getAddress':
			// newState.addressInfo = action.payload;
			return newState.set('addressInfo', action.payload).toJS();
		default:
			return prevState;
	}
}
export default AddressReducer;