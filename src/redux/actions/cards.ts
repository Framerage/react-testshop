import axios from "axios";
type CardTypes={
    id:string ,
    car:string,
    stockImage:string|undefined,
    stockText:string|undefined,
    tunerText:string|undefined,
    tunerImage:string|undefined,
    stockHP:string|undefined,
    tunerHP:string|undefined,
    drive:string,
    stockPrice:string|undefined,
    tunerPrice:string|undefined,
  }
export const fetchCards=()=>(dispatch:Function)=>{
    axios
    .get("https://631076b736e6a2a04eeef849.mockapi.io/cars")
    .then(({ data }) => {
        dispatch(setCards(data));
    });
}

export const setCards=(items:CardTypes)=>({
    type:'SET_CARS',
    payload:items,
})