import { useState, useRef } from 'react'; 
import auctionImg from '../img/auction-img.jpg.webp';

import "../styles/searchcomp-style.css"; 

function SearchComp({ allAuctions, handleAuctionClick}) {
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [filterSearch, setFilterSearch] = useState([]);
    const searchInput = useRef('');

    const handelFilter = () => { // Function för hantering av filtrering baserat på sök resultat
        const search = searchInput.current.value.toLowerCase(); 
        const filtered = allAuctions.filter(allAuction => search && allAuction.Title.toLowerCase().includes(search)); 
        console.log(filtered)
        setFilterSearch(filtered); // Updatera filterSearch state med filtrerade resultat
        setSearchAttempted(true)
    }


  return (
    <>
        {/* Search input och buton */}
        <div className='search'>
            <input ref={searchInput} type="text" placeholder="Sök auktion här..." /> 
            <button className='searchBtn' onClick={handelFilter}>Sök</button> 
        </div>

        <div  > {/* Container för att visa sökresultat */}

            {/* Resultat om sökning har gjorts */}
            {filterSearch?.length > 0 ? (
                <div>
                    <h2 className='searchTitle'>Sökresultat:</h2>
                    <div className='searchResult-wrap'>
                        {filterSearch.map((auction, idx) => ( // Visar auktionsdetaljer för varje element
                                <div className='search-result' key={idx} onClick={() => handleAuctionClick(auction)}> {/* ID för varje auktion */}
                                    <img className='auctionImg' src={auctionImg} alt="" />
                                    <h2>{auction.Title}</h2>
                                    <p>Säljare: {auction.CreatedBy}</p>
                                    <p>Utgångspris: {auction.StartingPrice} SEK</p>
                                    <p>Auktionen slutar: {auction.EndDate.split('T')[0]}</p> 
                                </div>
                        ))}
                    </div>
                </div> 
            ) : (
                searchAttempted &&
                // Error ifall maträtten inte finns
                <div className='error'> 
                    <p className='errorSymbol'> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                    </svg> 
                    </p>
                    <p className='errorMessage'>No auctions found. Please search for something else.</p>
                </div>
            )}
        </div>
    </>
    )

}

export default SearchComp; 
