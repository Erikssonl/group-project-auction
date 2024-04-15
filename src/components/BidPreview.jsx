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
    const [auctionDeleted, setAuctionDeleted] = useState(false);

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

    useEffect(() => {
        const isAuctionActive = new Date(selectedAuction.EndDate) > new Date();
        setIsAuctionActive(isAuctionActive);
    }, [selectedAuction.EndDate]);

    const handleBidSubmit = (e) => {
        e.preventDefault();

        const bidAmount = parseFloat(bidInput);

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
                });
        } else {
            setError('Cannot delete the auction because there are bids.');
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

            {auctionDeleted && <p className="auctionDeletedMsg">The auction has been deleted. Please close the preview to return to the homepage!</p>}

            {!auctionDeleted && (
                <>
                    <h6>{selectedAuction.Title}</h6>
                    <section className='imgContent'>
                        <img className='bidImg' src={auctionImg} alt="" />
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
                    </section>

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

                    {isAuctionActive && previousBids.length === 0 && (
                        <div className='noBidSection'>
                            <h5>The auction has no bids, click below to delete!</h5>
                            <button className='deleteAuctionButton' onClick={handleAuctionDelete}>Delete Auction</button>
                        </div>
                    )}

                </>
            )}
        </div>
    );
}

export default BidPreview;
