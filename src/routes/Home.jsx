import { useState, useEffect } from 'react'; 
import Auctionscomp from '../components/auctionscomp'; 
import SearchComp from '../components/SearchComp'; 
import BidPreview from '../components/BidPreview'; 

const Home = () => {
    const [activeAuctions, setActiveAuctions] = useState([]);
    const [expiredAuctions, setExpiredAuctions] = useState([]);
    const [allAuctions, setAllAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null); // Tillståndsvariabel för den valda auktionen för budförhandsgranskning
    const [auctionDetails, setAuctionDetails] = useState(null); // Tillståndsvariabel för detaljer om auktionen
    const [highestBid, setHighestBid] = useState(0); // Tillståndsvariabel för högsta bud

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

    // Funktion för att hantera val av auktion för budförhandsgranskning
    const handleAuctionClick = auction => {
            setSelectedAuction(auction); // Sätt den valda auktionen i tillståndsvariabeln
            setAuctionDetails(auction); // Uppdatera detaljer om den valda auktionen
            setHighestBid(auction.HighestBid); // Uppdatera högsta bud för den valda auktionen
    };

     // Funktion för att stänga budförhandsgranskningen
     const handleCloseBidPreview = () => {
        setSelectedAuction(null); // Återställ den valda auktionen till null
        setHighestBid(null); // Återställ högsta bud till null när budförhandsgranskningen stängs
    };

    // Funktion för att hantera radering av auktion
    const handleDeleteAuction = auctionId => {
        return new Promise((resolve, reject) => {
            if (!auctionId) {
                console.error('No auction ID found.');
                reject('No auction ID found.');
            }

            // Anropa API för att ta bort auktionen med det angivna ID:t
            fetch(`https://auctioneer2.azurewebsites.net/auction/3tsr/${auctionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    console.log('Auction deleted successfully'); // Logga meddelande om auktionen har raderats
                    resolve();
                } else {
                    console.error('Failed to delete auction'); // Logga felmeddelande om radering misslyckas
                    reject('Failed to delete auction');
                }
            })
            .catch(error => {
                console.error('Error deleting auction:', error); // Logga felmeddelande om det uppstår ett fel
                reject(error);
            });
        });
    };

    return (
        <div>
            {/* Rendera sökkomponenten för att visa alla auktioner och aktiva auktioner */}
            <SearchComp allAuctions={allAuctions} handleAuctionClick={handleAuctionClick} />
            <Auctionscomp activeAuctions={activeAuctions} handleAuctionClick={handleAuctionClick} />

            {/* Rendera budförhandsgranskningen om en auktion är vald */}
            {selectedAuction && (
                <BidPreview
                    key={selectedAuction.Id}
                    selectedAuction={selectedAuction}
                    auctionDetails={auctionDetails}
                    handleCloseBtn={handleCloseBidPreview}
                    handleDeleteAuction={handleDeleteAuction}
                    handleAuctionClick={handleAuctionClick}
                />
            )}
        </div>
    );
};

export default Home;
