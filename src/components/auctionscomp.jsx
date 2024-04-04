import '../styles/auctioncomp-style.css'

const Auctionscomp = ({ activeAuctions }) => {


  return (
    <div className='allAuctions-wrap'>

        {activeAuctions.map((auction, idx)=>(
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