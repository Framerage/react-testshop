const initialState={
    car:'',
}

const descripPage=(state=initialState,action: { type: string; payload: string; })=>{
     if(action.type === 'SET_DESCRIP'){
        return {
            ...state,
            car:action.payload,
        }
     }
     return state;
}
export default descripPage;