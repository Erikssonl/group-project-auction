import { useState, useEffect } from 'react'
import Auctionscomp from '../components/auctionscomp'

const Home = () => {
    const [activeAuctions, setActiveAuctions] = useState([])
    const [expiredAuctions, setExpiredAuctions] = useState([])
    const [allAuctions, setAllAuctions] = useState([])

    useEffect (() => {
        const getFromAuctionAPI = () => {

            fetch("https://auctioneer.azurewebsites.net/auction/3tsr")
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();

                    const allAuctions = data

                    const activeAuctions = data.filter(auction => {
                        const endDate = new Date(auction.EndDate);
                        return currentDate <= endDate;
                    });

                    const expiredAuctions = data.filter(auction => {
                        const endDate = new Date(auction.EndDate);
                        return currentDate > endDate;
                    });

                    setAllAuctions(data)
                    setActiveAuctions(activeAuctions)
                    setExpiredAuctions(expiredAuctions)
                })
    
                .catch((error) => {
                    console.error("Fetching error:", error)
                })
        }
        getFromAuctionAPI()
    }, []);

  return (
    <div>
        <Auctionscomp activeAuctions={activeAuctions}/>
    </div>
  )
}
export default Home