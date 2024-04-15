import { useState, useEffect } from 'react';
import Auctionscomp from '../components/auctionscomp';
import SearchComp from '../components/SearchComp';
import BidPreview from '../components/BidPreview';

const Home = () => {
    const [activeAuctions, setActiveAuctions] = useState([]);
    const [expiredAuctions, setExpiredAuctions] = useState([]);
    const [allAuctions, setAllAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null); // Bid preview
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [highestBid, setHighestBid] = useState(0); // State for highest bid

    useEffect(() => {
        const getFromAuctionAPI = () => {
            fetch("https://auctioneer2.azurewebsites.net/auction/3tsr")
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();

                    const activeAuctions = data.filter(auction => {
                        const endDate = new Date(auction.EndDate);
                        return currentDate <= endDate;
                    });

                    const expiredAuctions = data.filter(auction => {
                        const endDate = new Date(auction.EndDate);
                        return currentDate > endDate;
                    });

                    setAllAuctions(data);
                    setActiveAuctions(activeAuctions);
                    setExpiredAuctions(expiredAuctions);
                })
                .catch((error) => {
                    console.error("Fetching error:", error);
                    setAllAuctions([]);
                });
        };
        getFromAuctionAPI();
    }, []);

    // Function to handle selecting an auction when clicked
    const handleAuctionClick = auction => {
        setSelectedAuction(auction.auction); // Set the selected auction's ID
        setAuctionDetails(auction); // Update details about the selected auction
        setHighestBid(auction.HighestBid); // Update the highest bid for the selected auction
    };

    // Function to handle closing the bid preview
    const handleCloseBidPreview = () => {
        setSelectedAuction(null); // Reset the selected auction to null
        setHighestBid(null); // Reset the highest bid to null when the auction is closed
    };

    // Function to handle deleting an auction
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
            <SearchComp allAuctions={allAuctions} handleAuctionClick={handleAuctionClick} />
            <Auctionscomp activeAuctions={activeAuctions} handleAuctionClick={handleAuctionClick} />

            {/* Bid preview */}
            {selectedAuction && (
                <BidPreview
                    key={selectedAuction.Id}
                    selectedAuction={selectedAuction}
                    auctionDetails={auctionDetails}
                    handleCloseBtn={handleCloseBidPreview}
                    handleDeleteAuction={handleDeleteAuction}
                />
            )}
        </div>
    );
};

export default Home;
