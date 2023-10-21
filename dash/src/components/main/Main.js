import "./Main.css";
import hello from "../../assets/hello.svg";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // If using React Router
const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalRewardPoints, setTotalRewardPoints] = useState(560);
  const handleRedeemClick = (card) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
  };
  
  
  const handleRedeem = () => {
    if (selectedCard.rewardPoints <= totalRewardPoints) {
      // Deduct reward points
      setTotalRewardPoints(totalRewardPoints - selectedCard.rewardPoints);

      // Simulate an API request (replace this with your actual API call)
      fetch('https://api.example.com/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website: selectedCard.name, // Pass the website name or ID to the API
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(`Voucher redeemed successfully for ${selectedCard.name}`);
            setIsPopupOpen(false); // Close the pop-up after successful redemption
          } else {
            alert(`Failed to redeem voucher for ${selectedCard.name}`);
          }
        })
        .catch((error) => {
          console.error('Redemption error:', error);
          alert(`Failed to redeem voucher for ${selectedCard.name}`);
        });
    } else {
      alert('Insufficient balance to redeem this card');
    }
  };
  const history = useHistory();

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello UpConnector</h1>
            <p>Welcome to our reward dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
            <p className="text-primary-p">Total reward points</p>
              <span className="font-bold text-title">{totalRewardPoints}</span>
            </div>
          </div>

         


          
        </div>

        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
            <div>
                <h1>FOOD REWARDS</h1>
                <p></p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
               <div className="card1" onClick={() => handleRedeemClick('McDonalds')}>
                  <h1>Mc Donald's</h1>
                  <p>Click to redeem</p>
                  <p>reward points : 100 pts</p>
                </div>
              <div className="card2" onClick={() => handleRedeemClick('StarBucks')}>
                <h1>StarBucks</h1>
                <p>Click to redeem</p>
                <p>reward points : 75 pts</p>
              </div>

              <div className="card3"onClick={() => handleRedeemClick('StarBucks')}>
                <h1>KFC</h1>
                <p>Click to redeem</p>
                <p>reward points : 60 pts</p>
              </div>

              <div className="card4"onClick={() => handleRedeemClick('StarBucks')}>
                <h1>Dominos</h1>
                <p>Click to redeem</p>
                <p>reward points : 60 pts</p>
              </div>
            </div>
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>E-COMMERCE AND GAMES</h1>
                <p></p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1" onClick={() => handleRedeemClick('StarBucks')}>
                <h1>Amazon</h1>
                <p>Click to redeem</p>
                <p>reward points : 100 pts</p>
              </div>

              <div className="card2"onClick={() => handleRedeemClick('StarBucks')}>
                <h1>Robolox</h1>
                <p>Click to redeem</p>
                <p>reward points : 110 pts</p>
              </div>

              <div className="card3"onClick={() => handleRedeemClick('StarBucks')}>
                <h1>Myntra</h1>
                <p>Click to redeem</p>
                <p>reward points : 60 pts</p>
              </div>

              <div className="card4"onClick={() => handleRedeemClick('StarBucks')}>
                <h1>Steam</h1>
                <p>Click to redeem</p>
                <p>reward points : 90 pts</p>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Pop-up */}
        {isPopupOpen && selectedCard && (
          <div className="popup">
            <h2>{selectedCard.name}</h2>
            {/* Add card description and reward points here */}
            <button className="redeem-button" onClick={handleRedeem}>
              Redeem
            </button>
            <button className="close-button" onClick={() => setIsPopupOpen(false)}>
              Close
            </button>
          </div>
        )}
        
      </div>
      
    </main>
  );
};

export default Main;