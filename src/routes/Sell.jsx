import '../styles/sellcomp-style.css'
import Sellinfocomp from "../components/Sellinfocomp"

const Sell = () => {
  return (
    <div className='sell-wrap'>
      <Sellinfocomp/>

      <div className='sellForm'>
        <h2 className='sell-title'>Vad vill du sälja?</h2>
        <p>Title</p>
        <input type="text" placeholder='Ange föremålets titel...' />
        <p>Beskrivning</p>
      </div>
    </div>
  )
}
export default Sell