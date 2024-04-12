import React, { useState, useEffect } from 'react'; // Import necessary functions from React.
import '../styles/BidPreview.css'; // Import CSS styles for the BidPreview component.

function BidPreview({ selectedAuction, auctionDetails, handleCloseBtn }) {
    const auctionId = selectedAuction.AuctionID; // Unique identifier for the auction.

    // State for bid-related variables.
    const [bidInput, setBidInput] = useState(''); // State for the bid input field.
    const [realtimeHighestBid, setRealtimeHighestBid] = useState(0); // State for the current highest bid.
    const [previousBids, setPreviousBids] = useState([]); // State for previous bids.
    const [error, setError] = useState(''); // State for any error messages.
    const [isAuctionActive, setIsAuctionActive] = useState(true); // State to indicate if the auction is active.

    // Effect function to handle storage and updating of previous bids and highest bid.
    useEffect(() => {
        // Retrieve previous bids from local storage and update state if available.
        const storedPreviousBids = localStorage.getItem(`previousBids_${auctionId}`);
        if (storedPreviousBids) {
            setPreviousBids(JSON.parse(storedPreviousBids));
        }

        // Retrieve the highest bid from local storage and update state if available.
        const storedHighestBid = localStorage.getItem(`highestBid_${auctionId}`);
        if (storedHighestBid) {
            setRealtimeHighestBid(parseFloat(storedHighestBid));
        }
    }, [auctionId]); // Update the effect when the auction ID changes.

    // Effect function to save previous bids to local storage.
    useEffect(() => {
        localStorage.setItem(`previousBids_${auctionId}`, JSON.stringify(previousBids));
    }, [previousBids, auctionId]); // Update the effect when previous bids or the auction ID changes.

    // Effect function to save the highest bid to local storage.
    useEffect(() => {
        localStorage.setItem(`highestBid_${auctionId}`, realtimeHighestBid.toString());
    }, [realtimeHighestBid, auctionId]); // Update the effect when the current highest bid or the auction ID changes.

    // Function to handle bid submission.
    const handleBidSubmit = (e) => {
        e.preventDefault(); // Prevent the default behavior of the form.

        const bidAmount = parseFloat(bidInput); // Convert the bid input value to a float.

        // Validate the bid and display error messages if necessary.
        if (!bidInput.trim()) {
            setError('Please enter a bid amount before placing a bid.');
            return;
        }

        if (!isAuctionActive) {
            setError('The auction is no longer active.');
            return;
        }

        if (bidAmount <= selectedAuction.StartingPrice) {
            setError('Your bid must be higher than the starting price.');
            return;
        }

        if (bidAmount <= realtimeHighestBid) {
            setError('Your bid must be higher than the current highest bid.');
            return;
        }

        // Update previous bids, the current highest bid, and clear the bid input field.
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
                    <h4>Description:</h4>
                    <p className='auctionDetails'>{auctionDetails.Description}</p>
                
                    <h4>End Date:</h4>
                    <p className='endDate'>{selectedAuction.EndDate.split('T')[0]}</p>

                    <h4>Starting Price:</h4>
                    <p className='startingPrice'>{selectedAuction.StartingPrice} Kr</p>

                    {isAuctionActive && (
                        <>
                            <h4>Highest Bid:</h4>
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
                        <button className='BidBtn' type="submit" disabled={!isAuctionActive}>Place Bid</button>
                    </form>
                </div>
            )}

            {isAuctionActive && ( 
                <div className='previousBid'>
                    <h5>Previous Bids:</h5> 
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
