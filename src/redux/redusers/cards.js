const initialState={
    cars:[],
    isLoaded:false,
}

const cards=(state=initialState,action)=>{
     if(action.type === 'SET_CARS'){
        return {
            ...state,
            cars:action.payload,
            //isLoaded:true,
        }
     }
     return state;
}
export default cards;