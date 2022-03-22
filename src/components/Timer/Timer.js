import React, { useState } from 'react';
import './timer.scss';
import Banner from "../../Images/1.png";


export default function Timer() {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    let countDownDate = new Date("Apr 11, 2022 00:00:00").getTime();
  
    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();
  
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
  
      // Time calculations for days, hours, minutes and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

  return (
    <>
      <section className="container">
        <div>
            <div>
                <h1>Welcome to the <br></br>
                New world of <span>Technology</span></h1>
            </div>
            <div>
                <h3 className="counterHead">Countdown before launch</h3>
                <div id="ID" className="countdown">
                    <div className="cell days">
                        <div className="digits">{days}</div>
                        <div className="text">DAYS</div>
                    </div>
                    <div className="cell hours">
                        <div className="digits">{hours}</div>
                        <div className="text">HOURS</div>
                    </div>
                    <div className="cell mins">
                        <div className="digits">{minutes}</div>
                        <div className="text">MINUTES</div>
                    </div>
                    <div className="cell secs">
                        <div className="digits">{seconds}</div>
                        <div className="text">SECONDS</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <img src={Banner} 
                 alt="banner_image"
                 className='bannerImg'/>
        </div>
      </section>  
    </>
  )
}
