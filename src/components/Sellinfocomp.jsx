import { useState } from "react";
import "../styles/sellcomp-style.css";

const Sellinfocomp = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="info-wrap">
        <h1>Sälj dina prylar via våran auktion!</h1>
        <p>
          Med vår tjänst erbjuds du en enkel och trygg möjlighet att sälja dina
          föremål. Genom våra webbaserade auktioner får du tillgång till en
          global skara av budgivare. Det breda intresset för våra auktioner
          leder vanligtvis till konkurrens om dina varor, vilket ofta resulterar
          i högre slutpriser.
          <br /> <br />
          Vårt auktionsverk står redo att assistera dig med försäljningen av
          allt från konstverk och möbelstycken till samlarobjekt och annat av
          värde.
        </p>
      </div>
      <div className="dropDown-wrap">
        <h2 className="clickable-text" onClick={toggleDropdown}>
          Klicka här för en guide steg för steg
        </h2>
        {showDropdown && (
          <div className="dropDown">
            
            <div className="info-item">
              <img src="src/img/publicera.webp" className="info-image" />
              <p>
                Publicera: Fyll i formuläret nedan för att registrera din
                auktion.
              </p>
            </div>
            <br />
            <div className="info-item">
              <img src="src/img/budgivning.webp" className="info-image" />
              <p>
                Budgivning: När ditt föremål är registrerad kan våran globala
                skara av budgivare börja lägga sina bud.
              </p>
            </div>
            <br />
            <div className="info-item">
              <img src="src/img/betalning.webp" className="info-image" />
              <p>
                Betalning: När föremålet är sålt meddelas du och köparen via
                mejl. Ni får då alla betalningsspecifikationer.{" "}
              </p>
            </div>
            <br />
            <div className="info-item">
              <img src="src/img/leverans.webp" className="info-image" />
              <p>
                Leverans/Upphämtning: Efter betalningen är gjord ordnar vi med
                leverans. Mer info ges i bekräftelsemejlet efter att föremålet
                är sålt.
              </p>
            </div>
            <br />
          </div>
        )}
      </div>
    </>
  );
};
export default Sellinfocomp;
