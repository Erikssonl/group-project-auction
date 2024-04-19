import { useNavigate } from 'react-router-dom';
import '../styles/sellcomp-style.css'
import '../styles/sellform-style.css'
import Sellinfocomp from "../components/Sellinfocomp"
import { useState } from 'react'

const Sell = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleNavigate = () => {
    navigate('/')
  }

  const publishHandler = (e) => {
    e.preventDefault();

    setIsPending(true);

    fetch('https://auctioneer2.azurewebsites.net/auction/3tsr', {
      method: 'POST',
      headers: { 'Content-Type':  'application/json'  },
      body: JSON.stringify({
        Title: title,
        GroupCode: '3tsr',
        Description: description,
        StartDate: startDate,
        EndDate: endDate,
        StartingPrice: startingPrice,
        CreatedBy: createdBy
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setIsPending(false)
        setTimeout(handleNavigate, 2000);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className='sell-wrap'>
      <Sellinfocomp/>

      <div className='sellForm-Wrap'>
        <h2 className='sell-title'>Vad vill du sälja?</h2>
        <form onSubmit={publishHandler} className='sellForm'>
          <label>Title</label>
          <input type="text"
          placeholder='Ange föremålets titel...'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
          <label>Beskrivning</label>
          <textarea
          placeholder='Beskriv föremålet...'
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="date-inputs">
            <div>
              <label>Startdatum</label>
              <input 
              type="datetime-local"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>Slutdatum</label>
              <input 
              type="datetime-local" 
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <label>Utgångspris</label>
          <input 
          type="number"
          placeholder='Ange föremålets utgångpris...'
          required
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          />
          <label>Namn</label>
          <input 
          type="text"
          placeholder='Ange ditt namn...'
          required
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          />
          { !isPending && <button>Publicera auktion</button> }
          { isPending && <button disabled>Publicerar...</button> }
        </form>
      </div>

    </div>
  )
}
export default Sell