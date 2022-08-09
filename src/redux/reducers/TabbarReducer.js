const TabbarReducer = (prevState = {
	show: true
}, action) => {
	const newState = {...prevState};
	switch (action.type)
	{
		case 'show':
			newState.show = true;
			return newState;
		case 'hide':
			newState.show = false;
			return newState;
		default:
			return prevState;
	}
}
export default  TabbarReducer;