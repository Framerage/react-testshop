const initialState={
    cars:[],
}

const cards=(state=initialState,action)=>{
     if(action.type === 'SET_CARS'){
        return {
            ...state,
            cars:action.payload,
        }
     }
     return state;
}
export default cards;