import { useState, useEffect } from 'react'; 
import auctionImg from '../img/auction-img.jpg.webp'; 
import '../styles/BidPreview.css'; 

// Funktionskomponent för att visa förhandsgranskning av bud
function BidPreview({ selectedAuction, auctionDetails, handleCloseBtn, handleDeleteAuction }) {

    const auctionId = selectedAuction.AuctionID ? selectedAuction.AuctionID : null; // Auktions-ID
    const [bidInput, setBidInput] = useState(''); // Inmatning för budbelopp
    const [realtimeHighestBid, setRealtimeHighestBid] = useState(0); // Realtids högsta bud
    const [previousBids, setPreviousBids] = useState([]); // Tidigare bud
    const [error, setError] = useState(''); // Felmeddelande
    const [isAuctionActive, setIsAuctionActive] = useState(true); // Auktionens aktivitet
    const [auctionDeleted, setAuctionDeleted] = useState(false); // Auktionen är raderad

    // Effektfunktioner för att hantera lokal lagring av tidigare bud och högsta bud
    useEffect(() => {
        const storedPreviousBids = localStorage.getItem(`previousBids_${auctionId}`); // Hämta tidigare bud från lokal lagring
        if (storedPreviousBids) {
            setPreviousBids(JSON.parse(storedPreviousBids)); // Uppdatera tidigare bud i tillståndsvariabeln
        }

        const storedHighestBid = localStorage.getItem(`highestBid_${auctionId}`); // Hämta högsta bud från lokal lagring
        if (storedHighestBid) {
            setRealtimeHighestBid(parseFloat(storedHighestBid)); // Uppdatera högsta bud i tillståndsvariabeln
        }
    }, [auctionId]);

    // Effektfunktion för att uppdatera tidigare bud i lokal lagring
    useEffect(() => {
        localStorage.setItem(`previousBids_${auctionId}`, JSON.stringify(previousBids)); // Spara tidigare bud i lokal lagring
    }, [previousBids, auctionId]);

    // Effektfunktion för att uppdatera högsta bud i lokal lagring
    useEffect(() => {
        localStorage.setItem(`highestBid_${auctionId}`, realtimeHighestBid.toString()); // Spara högsta bud i lokal lagring
    }, [realtimeHighestBid, auctionId]);

    // Effektfunktion för att kontrollera om auktionen är aktiv baserat på slutdatum
    useEffect(() => {
        const isAuctionActive = new Date(selectedAuction.EndDate) > new Date(); // Kontrollera om auktionen är aktiv
        setIsAuctionActive(isAuctionActive); // Uppdatera tillståndsvariabeln för auktionens aktivitet
    }, [selectedAuction.EndDate]);

    // Funktion för att hantera inlämning av bud
    const handleBidSubmit = (e) => {
        e.preventDefault(); // Förhindra standardbeteendet för formulärinlämning

        const bidAmount = parseFloat(bidInput); // Konvertera budinmatning till flyttal

        // Validera budinmatning och hantera fel
        if (!bidInput.trim()) {
            setError('Please enter a bid amount before placing a bid.'); // Felmeddelande om inget budinmatning finns
            return;
        }

        if (!isAuctionActive) {
            setError('The auction is no longer active.'); // Felmeddelande om auktionen inte är aktiv
            return;
        }

        if (bidAmount <= selectedAuction.StartingPrice) {
            setError('Your bid must be higher than the starting price.'); // Felmeddelande om budet är lägre än utgångspriset
            return;
        }

        if (bidAmount <= realtimeHighestBid) {
            setError('Your bid must be higher than the current highest bid.'); // Felmeddelande om budet är lägre än det högsta budet
            return;
        }

        setPreviousBids(prevBids => [...prevBids, bidAmount]); // Uppdatera tidigare bud med det nya budet
        setRealtimeHighestBid(bidAmount); // Uppdatera högsta bud med det nya budet
        setBidInput(''); // Återställ budinmatningen
        setError(''); // Återställ felmeddelandet
    };

    // Funktion för att hantera radering av auktion
    const handleAuctionDelete = () => {
        if (previousBids.length === 0) {
            // Kontrollera om det finns tidigare bud, om inte, radera auktionen
            handleDeleteAuction(auctionId)
                .then(() => {
                    setAuctionDeleted(true); // Markera att auktionen är raderad
                })
                .catch(error => {
                    console.error('Error deleting auction:', error); // Logga felmeddelande om det uppstår ett fel vid radering av auktionen
                });
        }
    };

   
    return (
        <div className={`auctionPreview ${auctionDeleted ? 'deleted' : ''}`}>
            <div className='exit'>
                {/* Knapp för att stänga förhandsgranskningen */}
                <button className='closeBtn' onClick={handleCloseBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
            </div>
    
            {/* Meddelande om att auktionen är raderad */}
            {auctionDeleted && <p className="auctionDeletedMsg">Auktionen är raderad, vänligen återgå till startsidan!</p>}
    
            {!auctionDeleted && (
                <>
                    {/* Rubrik för auktionsnamn */}
                    <h6>{selectedAuction.Title}</h6>
                    <div className='imgContent'>
                        {/* Bild för auktion */}
                        <img className='bidImg' src={auctionImg} alt="" />
                        {auctionDetails && (
                            <div className='auctions'>
                                {/* Beskrivning av auktion */}
                                <h4>Beskrivning:</h4>
                                <p className='auctionDetails'>{auctionDetails.Description}</p>
    
                                {/* Slutdatum för auktion */}
                                <h4>Slutdatum:</h4>
                                <p className='endDate'>{selectedAuction.EndDate.split('T')[0]}</p>
    
                                {/* Utgångspris för auktion */}
                                <h4>Utgångsdatum:</h4>
                                <p className='startingPrice'>{selectedAuction.StartingPrice} Kr</p>
    
                                {/* Högsta bud om auktionen är aktiv */}
                                {isAuctionActive && (
                                    <>
                                        <h4>Högsta bud:</h4>
                                        <p className='highestBid'>{realtimeHighestBid} SEK</p>
                                    </>
                                )}
    
                                {/* Felmeddelande */}
                                {error && <p className='errorMessage'>{error}</p>}
                            </div>
                        )}
                    </div>
    
                    {/* Formulär för att lägga bud om auktionen är aktiv */}
                    {isAuctionActive && (
                        <div className='bidContainer'>
                            <form onSubmit={handleBidSubmit}>
                                <div className='bidComp'>
                                    {/* Inmatningsfält för bud */}
                                    <input className='inputField' value={bidInput} onChange={(e) => setBidInput(e.target.value)} type="text" disabled={!isAuctionActive} />
                                    <p className='sek'>SEK</p>
                                </div>
                                {/* Knapp för att lägga bud */}
                                <button className='BidBtn' type="submit" disabled={!isAuctionActive}>Lägg bud</button>
                            </form>
                        </div>
                    )}
    
                    {/* Lista med tidigare bud om auktionen är aktiv */}
                    {isAuctionActive && (
                        <div className='previousBid'>
                            <h5>Tidigare bud:</h5>
                            <ul>
                                {previousBids.map((bid, index) => (
                                    <li key={index}>{bid} SEK</li>
                                ))}
                            </ul>
                        </div>
                    )}
    
                    {/* Meddelande om att auktionen inte har några tidigare bud */}
                    {isAuctionActive && previousBids.length === 0 && (
                        <div className='noBidSection'>
                            <h5>Auktionen har inga bud, klicka nedan för att radera!</h5>
                            {/* Knapp för att radera auktion */}
                            <button className='deleteAuctionButton' onClick={handleAuctionDelete}>Radera auktion</button>
                        </div>
                    )}
    
                </>
            )}
        </div>
    );

}
    
export default BidPreview; 
