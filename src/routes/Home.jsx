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
    
//bidpreview
const handleAuctionClick = auction => {
    setSelectedAuction(auction);
    setAuctionDetails(auction);
    setHighestBid(auction.HighestBid);
};

const handleCloseBidPreview = () => {
    setSelectedAuction(null);
    setAuctionDetails(null);
    setHighestBid(0);
};

const handleDeleteAuction = auctionId => {
    return new Promise((resolve, reject) => {
        if (!auctionId) {
            console.error('No auction ID found.');
            reject('No auction ID found.');
        }

        fetch(`https://auctioneer2.azurewebsites.net/auction/3tsr/${auctionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log('Auction deleted successfully');
                resolve();
            } else {
                console.error('Failed to delete auction');
                reject('Failed to delete auction');
            }
        })
        .catch(error => {
            console.error('Error deleting auction:', error);
            reject(error);
        });
    });
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
        handleCloseBtn={handleCloseBidPreview}
        handleDeleteAuction={handleDeleteAuction}
        />
        )}

    </div>
  )
}
export default Home