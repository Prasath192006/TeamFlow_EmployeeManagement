import React, { useState, useEffect } from "react";

const CountdownTimer = ({ dueDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(dueDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  
  const timerComponents = [];
//  console.log(timeLeft.days)
  if(timeLeft.days > 0){
    timerComponents.push(
      timeLeft.days + ' days left'
    )
  }else{
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
      
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });
  
  }
  
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

const Timer = (props) => {
  //const dueDate = "2025-02-08T23:59:59"; // Set your due date here

  return (
    <div>
      <CountdownTimer dueDate={props.due} />
    </div>
  );
};

export default Timer;