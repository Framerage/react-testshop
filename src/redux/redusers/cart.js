const initialState={
    cartItems:[],
    isLoaded:false,
}

const cartItems=(state=initialState,action)=>{
     if(action.type === 'SET_CART'){
        return {
            ...state,
            cartItems:action.payload,
            //isLoaded:true,
        }
     }
     return state;
}
export default cartItems;