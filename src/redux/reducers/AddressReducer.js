const AddressReducer = (prevState = {
	addressInfo: {}
}, action) => {
	const newState = {...prevState};
	switch (action.type)
	{
		case 'getAddress':
			newState.addressInfo = action.payload;
			return newState;
		default:
			return prevState;
	}
}
export default AddressReducer;