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
        <input type="text" placeholder='Beskriv föremålet...' />
        <p>Startdatum</p>
        <input type="datetime-local" />
        <p>Sludatum</p>
        <input type="datetime-local"/>
        <p>Utgångspris</p>
        <input type="number" />
        <p>Namn</p>
        <input type="text" placeholder='Ange ditt namn...' />
      </div>
    </div> 
  )
}
export default Sell