import { state } from "./state.js";

export async function getDataFromAPI() {
    const phonesResponse = fetch("https://dummyjson.com/products/category/smartphones?limit=0");
    const laptopResponse = fetch("https://dummyjson.com/products/category/laptops?limit=0");
    const tabletResponse = fetch("https://dummyjson.com/products/category/tablets?limit=0");
    const accessoriesResponse = fetch("https://dummyjson.com/products/category/mobile-accessories?limit=0");

    const responses = await Promise.all([phonesResponse, laptopResponse, tabletResponse, accessoriesResponse]);
    const data = await Promise.all(responses.map(res => { return res.json() }));
    let dataArray = [];
    data.forEach(categoryProductObj => {
        dataArray = dataArray.concat(categoryProductObj.products);
    })
    state.allProducts = dataArray;
    console.log(state.allProducts);
    
}