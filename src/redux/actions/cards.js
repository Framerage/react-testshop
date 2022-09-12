import axios from "axios";

export const fetchCards=()=>(dispatch)=>{
    axios
    .get("https://631076b736e6a2a04eeef849.mockapi.io/cars")
    .then(({ data }) => {
        dispatch(setCards(data));
    });
}

export const setCards=(items)=>({
    type:'SET_CARS',
    payload:items,
})