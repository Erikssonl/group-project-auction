import React from 'react';

// AuctionDetails component to display details of a selected auction
function AuctionDetails({ auction }) {
  return (
    <div>
      {/* Display the name of the auction */}
      <h2>{auction.name}</h2>
      {/* Display the description of the auction */}
      <p>{auction.description}</p>
    </div>
  );
}

export default AuctionDetails;
