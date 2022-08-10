const getAddress = (addressInfo) => {
	return {
		type: 'getAddress',
		payload: addressInfo
	}
}
export {
	getAddress
}