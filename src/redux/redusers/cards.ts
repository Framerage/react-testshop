const initialState={
    cars:[],
}

const cards=(state=initialState,action: { type: string; payload: any; })=>{
     if(action.type === 'SET_CARS'){
        return {
            ...state,
            cars:action.payload,
        }
     }
     return state;
}
export default cards;