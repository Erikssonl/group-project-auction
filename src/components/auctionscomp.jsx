import { useState, useEffect } from 'react'
import '../styles/auctioncomp-style.css'

const Auctionscomp = () => {
    const [allAuctions, setAllAuctions] = useState([])

    useEffect (() => {
        fetch("https://auctioneer.azurewebsites.net/auction/3tsr")
            .then(response => response.json())
            .then(data => setAllAuctions(data))

            .catch((error) => {
                console.error("Fetching error:", error)
                setAllAuctions([]); 
            })
    }, []);

  return (
    <div className='allAuctions-wrap'>

        {allAuctions.map((auction, idx)=>(
            <div className='auction-wrap' key={idx}>
                <h2>{auction.Title}</h2>
                <p>{auction.Description}</p>
                <p>{auction.EndDate.split('T')[0]}</p>
            </div>
        ))}
    </div>
  )
}
export default Auctionscomp