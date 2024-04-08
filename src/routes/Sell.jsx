import '../styles/sellcomp-style.css'
import Sellinfocomp from "../components/Sellinfocomp"
import { useState } from 'react'

const Sell = () => {
  const [titel, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [name, setName] = useState("");

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
        <button>Publicera auction</button>
      </div>
    </div>
  )
}
export default Sell