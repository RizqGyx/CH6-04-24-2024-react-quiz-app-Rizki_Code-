import React, { useEffect, useState } from "react";

const Questiontimer = ({ timeOut, onTimeOut }) => {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    setRemainingTime(timeOut);
  }, [timeOut]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeOut();
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [remainingTime, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <progress id="question-time" max={timeOut} value={remainingTime} />;
};

export default Questiontimer;
