import { useState, useEffect } from 'react'
import Auctionscomp from '../components/auctionscomp'
import SearchComp from '../components/SearchComp'
import BidPreview from '../components/BidPreview'

const Home = () => {
    const [activeAuctions, setActiveAuctions] = useState([])
    const [expiredAuctions, setExpiredAuctions] = useState([])
    const [allAuctions, setAllAuctions] = useState([])
    const [selectedAuction, setSelectedAuction] = useState(null)//bidpreviw
    const [auctionDetails, setAuctionDetails] = useState(null)
    const [highestBid, setHighestBid] = useState(0); // State for highest bid
   
   
    useEffect (() => {
        const getFromAuctionAPI = () => {

            fetch("https://auctioneer2.azurewebsites.net/auction/3tsr")
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
                    setAllAuctions([])
                })
        }
        getFromAuctionAPI()
    }, []);
 // Function to handle selecting an auction when clicked
const handleAuctionClick = auction => {
    setSelectedAuction(auction.auction); // Sätt den valda auktionens ID
    setAuctionDetails(auction); // Uppdatera detaljer om den valda auktionen
    setHighestBid(auction.HighestBid); // Uppdatera det högsta budet för den valda auktionen
};

// Function to handle closing the bid preview
const handleCloseBtn = () => {
    setSelectedAuction(null); // Återställ den valda auktionen till null
    setHighestBid(null); // Återställ det högsta budet till null när auktionen stängs
};


  return (
    <div>
        <SearchComp allAuctions={allAuctions} handleAuctionClick={handleAuctionClick}/>
        <Auctionscomp activeAuctions={activeAuctions} handleAuctionClick={handleAuctionClick}/>

        {/*bidpreview*/}
        { selectedAuction && ( 
        <BidPreview 
        key={selectedAuction.Id}
        selectedAuction={selectedAuction}
        auctionDetails={auctionDetails}
        handleCloseBtn={handleCloseBtn}
        highestBid={highestBid}
        setHighestBid={setHighestBid}
        />
        )}
    </div>
  )
}
export default Home