import { useState, useRef } from 'react'; 
import auctionImg from '../img/auction-img.jpg.webp';

import "../styles/searchcomp-style.css"; 

function SearchComp({ allAuctions }) { // Functional component SearchComp with props allAuctions
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [filterSearch, setFilterSearch] = useState([]); // State hook to manage filtered search results

    const searchInput = useRef(''); // Ref hook to reference the search input field

    const handelFilter = () => { // Function to handle filtering based on search input
        const search = searchInput.current.value.toLowerCase(); // Get the value of the search input and convert to lowercase
        const filtered = allAuctions.filter(allAuction => search && allAuction.Title.toLowerCase().includes(search)); // Filter allAuctions based on search input
        console.log(filtered)
        setFilterSearch(filtered); // Update filterSearch state with filtered results
        setSearchAttempted(true)
    }


  return (
    <> {/* React fragment shorthand for returning multiple elements */}
        {/* Search input field and button */}
        <div className='search'>
            <input ref={searchInput} type="text" placeholder="Sök auktion här..." /> {/* Input field with a ref */}
            <button className='searchBtn' onClick={handelFilter}>Sök</button> 
        </div>

        <div  > {/* Container for displaying search results */}

            {/* Conditional rendering based on filterSearch length */}
            {filterSearch?.length > 0 ? (
                <div>
                    <h2 className='searchTitle'>Sökresultat:</h2>
                    <div className='searchResult-wrap'>
                        {filterSearch.map((auction, idx) => ( // Map over filterSearch array and render auction details
                                <div className='search-result' key={idx}> {/* Unique key for each rendered auction */}
                                    <img className='auctionImg' src={auctionImg} alt="" />
                                    <h2>{auction.Title}</h2>
                                    <p>Säljare: {auction.CreatedBy}</p>
                                    <p>Utgångspris: {auction.StartingPrice} SEK</p>
                                    <p>Auktionen slutar: {auction.EndDate.split('T')[0]}</p> 
                                </div>
                        ))}
                    </div>
                </div> // If filterSearch has items
            ) : (
                searchAttempted &&
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
