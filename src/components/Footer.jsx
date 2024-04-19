import React from 'react';
import '../styles/Footer.css'; // Import CSS for styling
import facebookImg from '../img/facebook.png';
import instagramImg from '../img/instagram.png';
import twitterImg from '../img/twitter.png';



const Footer = () => {
  
  console.log('facebookImg:', facebookImg);
  console.log('instagramImg:', instagramImg);
  console.log('twitterImg:', twitterImg);
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="TIMcontact-info">
          <h2>Kontakta oss</h2>
          <p>Telefon: 073-637 73 82</p>
          <p>E-post: mail@gmail.com</p>
          <p>Telefontider:</p>
          <p>Mån-Fre 9-18 </p>
          <p>Lör-Sön <strong>Stängt</strong></p>
        </div>
        <div className="address-info">
          <h2>Hitta hit</h2>
          <p>Address:</p>
          <p>Kistavägen 47, 164 74 Kista</p>
          <p><strong>Postaddress:</strong></p>
          <p>Box 802, 164 74 Kista</p>
        </div>
        <div className="social-media">
          <h2>Sociala Medier</h2>
          <div className="social-icons">
            <img src={facebookImg} alt="Facebook" />
            <img src={instagramImg} alt="Instagram" />
            <img src={twitterImg} alt="Twitter" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
