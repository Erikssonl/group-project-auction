import '../styles/auctioncomp-style.css'
import auctionImg from '../img/auction-img.jpg.webp';

const Auctionscomp = ({ activeAuctions, handleAuctionClick }) => {

      return (
        <div className='allAuctions-wrap'>

            {activeAuctions.map((auction, idx)=>(
                <div className='auction-wrap' key={idx} onClick={() => handleAuctionClick(auction)}>
                    <img className='auctionImg' src={auctionImg} alt="" />
                    <h2>{auction.Title}</h2>
                    <p>Säljare: {auction.CreatedBy}</p>
                    <p>Utgångspris: {auction.StartingPrice} SEK</p>
                    <p>Auktionen slutar: {auction.EndDate.split('T')[0]}</p>
                </div>
            ))}
        </div>
      )
    }
    export default Auctionscomp