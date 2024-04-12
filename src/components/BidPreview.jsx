    import React, { useState, useEffect } from 'react'; 

    import '../styles/BidPreview.css'; 

    function BidPreview({ selectedAuction, auctionDetails, handleCloseBtn }) {
        const auctionId = selectedAuction.AuctionID; // Unik identifierare för auktionen.

        // Tillstånd för budrelaterade variabler.
        const [bidInput, setBidInput] = useState(''); // Tillstånd för budinmatningsfältet.
        const [realtimeHighestBid, setRealtimeHighestBid] = useState(0); // Tillstånd för det aktuella högsta budet.
        const [previousBids, setPreviousBids] = useState([]); // Tillstånd för tidigare bud.
        const [error, setError] = useState(''); // Tillstånd för eventuella felmeddelanden.
        const [isAuctionActive, setIsAuctionActive] = useState(true); // Tillstånd för att indikera om auktionen är aktiv.

        // Effektfunktion för att hantera lagring och uppdatering av tidigare bud och högsta bud.
        useEffect(() => {
            // Hämta tidigare bud från lokal lagring och uppdatera state om det finns.
            const storedPreviousBids = localStorage.getItem(`previousBids_${auctionId}`);
            if (storedPreviousBids) {
                setPreviousBids(JSON.parse(storedPreviousBids));
            }

            // Hämta det högsta budet från lokal lagring och uppdatera state om det finns.
            const storedHighestBid = localStorage.getItem(`highestBid_${auctionId}`);
            if (storedHighestBid) {
                setRealtimeHighestBid(parseFloat(storedHighestBid));
            }
        }, [auctionId]); // Uppdatera effekten när auktionens ID ändras.

        // Effektfunktion för att spara tidigare bud i lokal lagring.
        useEffect(() => {
            localStorage.setItem(`previousBids_${auctionId}`, JSON.stringify(previousBids));
        }, [previousBids, auctionId]); // Uppdatera effekten när tidigare bud eller auktionens ID ändras.

        // Effektfunktion för att spara högsta bud i lokal lagring.
        useEffect(() => {
            localStorage.setItem(`highestBid_${auctionId}`, realtimeHighestBid.toString());
        }, [realtimeHighestBid, auctionId]); // Uppdatera effekten när det aktuella högsta budet eller auktionens ID ändras.

        // Funktion för att hantera inskickande av bud.
        const handleBidSubmit = (e) => {
            e.preventDefault(); // Förhindra standardbeteendet för formulär.

            const bidAmount = parseFloat(bidInput); // Konvertera budinmatningsvärdet till ett flyttal.

            // Validera bud och visa felmeddelanden vid behov.
            if (!bidInput.trim()) {
                setError('Ange ett budbelopp innan du lägger bud.');
                return;
            }

            if (!isAuctionActive) {
                setError('Auktionen är inte aktiv längre.');
                return;
            }

            if (bidAmount <= selectedAuction.StartingPrice) {
                setError('Ditt bud måste vara högre än utgångspriset.');
                return;
            }

            if (bidAmount <= realtimeHighestBid) {
                setError('Ditt bud måste vara högre än det högsta budet.');
                return;
            }

            // Uppdatera tidigare bud, det aktuella högsta budet och rensa budinmatningsfältet.
            setPreviousBids(prevBids => [...prevBids, bidAmount]);
            setRealtimeHighestBid(bidAmount);
            setBidInput('');
            setError('');
        };

        return (
            <div className='auctionPreview'> 
                <div className='exit'> 
                    <button className='closeBtn' onClick={handleCloseBtn}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>

                <h6>{selectedAuction.Title}</h6> 

                {auctionDetails && (
    <div className='auctions'>
        <h4>Beskrivning:</h4>
        <p className='auctionDetails'>{auctionDetails.Description}</p>
        
        <h4>Slutdatum:</h4>
        <p className='endDate'>{selectedAuction.EndDate.split('T')[0]}</p>

        <h4>Utgångspris:</h4>
        <p className='startingPrice'>{selectedAuction.StartingPrice} Kr</p>

        {isAuctionActive && (
            <>
                <h4>Högsta budet:</h4>
                <p className='highestBid'>{realtimeHighestBid} SEK</p>
            </>
        )}

        {error && <p className='errorMessage'>{error}</p>}
    </div>
)}


                {isAuctionActive && ( 
                    <div className='bidContainer'>
                        <form onSubmit={handleBidSubmit}>
                            <div className='bidComp'>
                                <input className='inputField' value={bidInput} onChange={(e) => setBidInput(e.target.value)} type="text" disabled={!isAuctionActive} />
                                <p className='sek'>SEK</p>
                            </div>
                            <button className='BidBtn' type="submit" disabled={!isAuctionActive}>Lägg Bud</button>
                        </form>
                    </div>
                )}

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
                </div>
            );
        }

    export default BidPreview;
