import { create } from 'zustand'
import axios from 'axios' 


const showStore = create((set) => ({
    graphData: [],
    data:null,
    fetchData: async(id) => {
        
        const [graphRes,dataRes] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=120`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
        ]);

        
        const graphData = graphRes.data.prices.map((price) =>{
            const [timeStamp,p] = price;
            const date = new Date(timeStamp).toLocaleDateString("en-in");
            return{
                Date: date,
                Price: p,
                
            };
        });
        console.log(dataRes);
        console.log(graphRes);
        
        set({graphData});
        set({ data: dataRes.data });
        
        
    },
}));
export default showStore;