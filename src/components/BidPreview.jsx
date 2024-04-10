import React, { useState } from 'react';
import '../styles/BidPreview.css';

function BidPreview({ selectedAuction, auctionDetails, handleCloseBtn }) {
    const [bidInput, setBidInput] = useState('');
    const [highestBid, setHighestBid] = useState(0);

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const bidAmount = parseFloat(bidInput);
        if (bidAmount > highestBid) {
            setHighestBid(bidAmount);
        }
        setBidInput('');
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
                    <h5>Beskrivning:</h5>
                    <p className='auctionDetails'>{auctionDetails.Description}</p>
                    
                    <h5>Slutdatum:</h5>
                    <p className='selectedAuction'>{selectedAuction.EndDate.split('T')[0]}</p>
                    
                    <h5>Högsta bud:</h5>
                    <p className='highestBid'>SEK {highestBid}</p>
                </div>
            )}

            <div className='bidContainer'> 

            <form onSubmit={handleBidSubmit}>
                <div className='bidComp'> 
                    <input className='inputField' value={bidInput} onChange={(e) => setBidInput(e.target.value)} type="text" />
                    <p className='sek'>SEK</p>
                </div>
                <button className='BidBtn' type="submit">Lägg Bud</button>
            </form>
            </div>
        </div>
    );
}

export default BidPreview;
