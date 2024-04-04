

import { useState, useRef } from 'react';

function SearchComp({allAuctions}) {

    const [filterSearch, setFilterSearch] = useState(allAuctions);

    const searchInput = useRef('');

    const handelFilter = () => {
        const search = searchInput.current.value.toLowerCase();
        const filtered = allAuctions.filter(allAuction => allAuction.Title.toLowerCase().includes(search));
        setFilterSearch(filtered);
    }

  return (
    <>

        <div>
            <input ref={searchInput} type="text" placeholder="Search for an auction..." />
            <button onClick={handelFilter}>Search</button>
        </div>
        <div>
            {filterSearch.map((auction, idx) =>
                <div key={idx}>
                    <h2>{auction.Title}</h2>
                    <p>{auction.Description}</p>
                    <p>{auction.EndDate.split('T')[0]}</p>
                </div>
            )}
        </div>
    </>

    );

}

export default SearchComp;