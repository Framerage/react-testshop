const initialState={
    category:null,
    sortBy:''
}

const filters=(state=initialState,action: { type: string; payload: string; })=>{
     if(action.type === 'SET_SORT_BY'){
        return {
            ...state,
            sortBy:action.payload,
        }
     }
     if(action.type === 'SET_FILTER_BY'){
        return{
            ...state,
            category:action.payload
        }
     }
     return state;
}
export default filters;