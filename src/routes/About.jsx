import "../styles/aboutcomp-style.css";

function About() {
  return (
    <div className="about-wrapper">
      <div>
        <h1> <br />Om Auctioneer</h1>
        <br />
      </div>
      <div className="about-info">
        <p>
          Välkommen till vår auktionsplattform, en digital mötesplats för
          älskare av unika föremål och kvalitetsfynd. Vi är en bro mellan
          prestigefyllda europeiska auktionshus och entusiaster som söker det
          exceptionella inom konst, design, antika möbler, samlarobjekt och
          mycket annat.
          <br /> <br />
          Vår filosofi grundar sig på en tro att varje föremål har en historia
          att berätta. Därför ser vi till att allt som listas på vår webbplats
          har genomgått en noggrann granskning av våra experter. Varje artikel
          är detaljerat beskriven och professionellt fotograferad för att du som
          köpare ska känna dig helt trygg i ditt beslut. Vi lovar inte bara
          kvalitet; vi garanterar den.
          <br /> <br />
          Vi är övertygade om att magin i att upptäcka och förvärva unika
          föremål inte bara berikar våra hem, utan även våra liv. Oavsett om du
          är en inbiten samlare eller på jakt efter det där speciella tillägget
          till ditt hem, erbjuder vi en plattform som förenar tradition med
          modern bekvämlighet. Upptäck, buda och förvandla ditt hem med oss.
          Välkommen till en värld av unika fynd och tidlösa skatter.
          <br /> <br />
        </p>
      </div>
      
      <div className="contact-info">
        <h1>Kontakta oss!</h1>
        <br />
        <p>
          Har du frågor? Tveka inte på att kontakta oss! <br />
          <br />
        </p>
        <p>
          Våra telefontider är: <br />
          Mån-fre 9-18 <br />
          Lör-Sön STÄNGT
          <br />
          <br />
        </p>
        <p>
          Telefonnummer: 073-637 73 82 <br />
          <br />
        </p>
        <p>
          Du kan även kontakta oss på mail:{" "}
          <a href="mailto:auctioneer@gmail.com">auctioneer@gmail.com</a> <br />
          <br />{" "}
        </p>
        <h2>
          Här finns vi <br />
          <br />
        </h2>
        <p>Kistavägen 47, 164 74 Kista</p>
      </div>
    </div>
  );
}
export default About;
