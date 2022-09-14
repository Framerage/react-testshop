import { useMemo } from "react";

export const useSortedCards=(cards:[{car:string,drive:string}|any],sortValue:string)=>{
    const sortedCards = useMemo(()=>{
        if(sortValue){
          if (sortValue==='car'){
            if(cards.some(el=>el.car)){
              alert("Some car's name is undefined")
              //console.log(cards.indexOf(el=>el.car===undefined))
              return [...cards].filter(el=>el.car!==undefined).sort((a,b)=>a[sortValue].localeCompare(b[sortValue]));
            }
            else{
                      if(sortValue)
              return [...cards].sort((a,b)=>a[sortValue].localeCompare(b[sortValue]));
            }
          }
          else return [...cards].sort((a,b)=>Number(a[sortValue])-Number(b[sortValue]));
        }
        else return cards;
      },[sortValue,cards])

      return sortedCards;
}
export const useCards=(cards:[{drive:string}],sortValue:string,filterValue:string)=>{
    const sortedCards=useSortedCards(cards as [{car:string;drive:string}],sortValue as string)
    const sortedAndFilteredCards=useMemo(()=>{
        if(filterValue){
          if(sortedCards){
            return sortedCards.filter((el)=>el.drive===filterValue)}
          }
        else return sortedCards;
      },[filterValue,sortedCards])

      return sortedAndFilteredCards;
}