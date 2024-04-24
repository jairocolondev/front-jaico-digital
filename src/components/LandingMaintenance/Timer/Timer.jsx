import { useState, useEffect } from "react";
import "./Timer.scss";

const Timer = () => {
  const targetDate = new Date("2024-05-13T00:00:00Z");

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        segs: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerTimeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timerTimeout);
  });

  return (
    <>
      <div className="container__maintenance__content--left__timer-title">
        <span>Abriremos en:</span>
      </div>
      <div className="container__maintenance__content--left__timer">
        {Object.keys(timeLeft).length ? (
          Object.entries(timeLeft).map(([interval, value]) => (
            <div
              key={interval}
              className={`container__maintenance__content--left__timer__${interval}`}
            >
              <span className="value">{value}</span>
              <span className="label">{interval.toUpperCase()}</span>
            </div>
          ))
        ) : (
          <span>¡Tiempo acabado!</span>
        )}
      </div>
    </>
  );
};

export { Timer };
