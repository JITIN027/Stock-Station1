import { NseIndia } from "stock-nse-india";

const nseIndia = new NseIndia()

//To get equity details for specific symbol
export async function getPrice(symbol){

const info = await nseIndia.getEquityDetails(symbol).then(details => {
  return details;
})
return info;

}
