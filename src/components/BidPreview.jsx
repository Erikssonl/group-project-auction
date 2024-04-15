import { useState, useEffect } from 'react';
import auctionImg from '../img/auction-img.jpg.webp';
import '../styles/BidPreview.css'; 

function BidPreview({ selectedAuction, auctionDetails, handleCloseBtn, handleDeleteAuction }) {
    const auctionId = selectedAuction.AuctionID ? selectedAuction.AuctionID : null;
    
    const [bidInput, setBidInput] = useState('');
    const [realtimeHighestBid, setRealtimeHighestBid] = useState(0);
    const [previousBids, setPreviousBids] = useState([]);
    const [error, setError] = useState('');
    const [isAuctionActive, setIsAuctionActive] = useState(true);
    const [auctionDeleted, setAuctionDeleted] = useState(false); // Local state to track if auction is deleted

    useEffect(() => {
        const isAuctionActive = new Date(selectedAuction.EndDate) > new Date();
        setIsAuctionActive(isAuctionActive);
    }, [selectedAuction.EndDate]);

    useEffect(() => {
        const storedPreviousBids = localStorage.getItem(`previousBids_${auctionId}`);
        if (storedPreviousBids) {
            setPreviousBids(JSON.parse(storedPreviousBids));
        }

        const storedHighestBid = localStorage.getItem(`highestBid_${auctionId}`);
        if (storedHighestBid) {
            setRealtimeHighestBid(parseFloat(storedHighestBid));
        }
    }, [auctionId]);

    useEffect(() => {
        localStorage.setItem(`previousBids_${auctionId}`, JSON.stringify(previousBids));
    }, [previousBids, auctionId]);

    useEffect(() => {
        localStorage.setItem(`highestBid_${auctionId}`, realtimeHighestBid.toString());
    }, [realtimeHighestBid, auctionId]);

    const handleBidSubmit = (e) => {
        e.preventDefault();

        const bidAmount = parseFloat(bidInput);

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

        setPreviousBids(prevBids => [...prevBids, bidAmount]);
        setRealtimeHighestBid(bidAmount);
        setBidInput('');
        setError('');
    };

    const handleAuctionDelete = () => {
        if (previousBids.length === 0) {
            handleDeleteAuction(auctionId)
                .then(() => {
                    setAuctionDeleted(true);
                })
                .catch(error => {
                    console.error('Error deleting auction:', error);
                    // Handle error if needed
                });
        } else {
            setError('Kan inte radera auktionen eftersom det finns bud.');
        }
    };

    return (
        <div className={`auctionPreview ${auctionDeleted ? 'deleted' : ''}`}>
            <div className='exit'> 
                <button className='closeBtn' onClick={handleCloseBtn}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
            </div>

            {auctionDeleted && <p className="auctionDeletedMsg">Auktionen har tagits bort. Vänligen stäng förhandsgranskningen för att återgå till startsidan!</p>}

            {!auctionDeleted && (
                <>
                    <h6>{selectedAuction.Title}</h6> 
                    <section className='imgContent'> 
                        <img className='bidImg' src={auctionImg} alt="" />
                        {auctionDetails && (
                            <div className='auctions'>
                                <h4>Beskrivning:</h4>
                                <p className='auctionDetails'>{auctionDetails.Description}</p>
                                
                                <h4>Slutdatum:</h4>
                                <p className='endDate'>{selectedAuction.EndDate.split('T')[0]}</p>
                                
                                <h4>Utgångspris:</h4>
                                <p className='startingPrice'>{selectedAuction.StartingPrice} Kr</p>
                                
                                <h4>Högsta budet:</h4>
                                <p className='highestBid'>{realtimeHighestBid} SEK</p>
                            </div>
                        )}
                    </section>

                    {isAuctionActive && ( 
                        <div className='bidContainer'>
                            {error && <p className='errorMessage'>{error}</p>}
                            <form onSubmit={handleBidSubmit}>
                                <div className='bidComp'>
                                    <input className='inputField' value={bidInput} onChange={(e) => setBidInput(e.target.value)} type="number" disabled={!isAuctionActive} />
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

                    {!isAuctionActive && (
                        <div className='winningBid'>
                            <p><strong>Auktion avslutad, vinnande bud: </strong>{realtimeHighestBid} SEK!</p> 
                        </div>
                    )}

                    {/* Conditionally render the delete auction button */}
                    {isAuctionActive && previousBids.length === 0 && (
                        <div className='noBidSection'>
                            <h5>Auktionen saknar bud, klicka nedan för att radera!</h5>
                            <button className='deleteAuctionButton' onClick={handleAuctionDelete}>Radera auktion</button>
                        </div>
                    )}

                </>
            )}
        </div>
    );
}

export default BidPreview;
