export const setSortBy=(value:string)=>({
    type:'SET_SORT_BY',
    payload:value,
});
export const setFilterBy=(catValue:string|null)=>({
    type:'SET_FILTER_BY',
    payload:catValue,
})