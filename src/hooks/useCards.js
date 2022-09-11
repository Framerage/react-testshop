import { useMemo } from "react";

export const useSortedCards=(cards,sortValue)=>{
    const sortedCards = useMemo(()=>{
        if(sortValue){
          if (sortValue==='car'){
            if(cards.some(el=>el.car)){
              alert("Some car's name is undefined")
              //console.log(cards.indexOf(el=>el.car===undefined))
              return [...cards].filter(el=>el.car!==undefined).sort((a,b)=>a[sortValue].localeCompare(b[sortValue]));
            }
            else{
              return [...cards].sort((a,b)=>a[sortValue].localeCompare(b[sortValue]));
            }
          }
          else return [...cards].sort((a,b)=>Number(a[sortValue])-Number(b[sortValue]));
        }
        else return cards;
      },[sortValue,cards])

      return sortedCards;
}
export const useCards=(cards,sortValue,filterValue)=>{
    const sortedCards=useSortedCards(cards,sortValue)
    const sortedAndFilteredCards=useMemo(()=>{
        if(filterValue){
        return sortedCards.filter((el)=>el.drive===filterValue)}
        else return sortedCards;
      },[filterValue,sortedCards])

      return sortedAndFilteredCards;
}