/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../style"

import { useEffect, useState } from "react"

import { end } from "../constants"

import { snowtop } from "../assets/img"

const getReturnValues = (countDown) => {
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;
  const millisecondsInMonth = millisecondsInDay * 30.44;

  const months = Math.floor(countDown / millisecondsInMonth);
  const days = Math.floor((countDown % millisecondsInMonth) / millisecondsInDay);
  const hours = Math.floor((countDown % millisecondsInDay) / millisecondsInHour);
  const minutes = Math.floor((countDown % millisecondsInHour) / millisecondsInMinute);
  const seconds = Math.floor((countDown % millisecondsInMinute) / millisecondsInSecond);

  return { months: months, days: days, hours: hours, minutes: minutes, seconds: seconds }
}

const Countdown = () => {
  const countDownDate = end.getTime()

  const [countDown, setCountDown] = useState(new Date().getTime() - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      if ((countDownDate - new Date().getTime()) > 0) {
        setCountDown(countDownDate - new Date().getTime())
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate]);

  const countDownValues = getReturnValues(countDown)

  return (
    <div className="border mt-6 mb-4 mx-6 rounded-lg ss:rounded-lg ss:rounded-t-2xl border-secondary">
      <div className="relative">
        <img id="snowtop" src={snowtop} className="absolute -top-8 rounded-t-[30px]" />
        <div id="countdown" className={`flex flex-wrap gap-y-2 ss:gap-x-8 gap-x-4 ${styles.flexCenter} font-normal my-4 mx-6 text-center`}>
          <div id="line1" className={`flex flex-row ss:gap-x-10 gap-x-4`}>
            <div id="months">
              <div id="monthsNum" className={`ss:text-[40px] text-[28px]`}>
                {countDownValues.months < 10 ? ("0" + countDownValues.months) : countDownValues.months}
              </div>
              <div id="monthsText" className={`ss:text-[20px] text-[16px]`}>
                Meses
              </div>
            </div>
            <div id="days">
              <div id="daysNum" className={`ss:text-[40px] text-[28px]`}>
                {countDownValues.days < 10 ? ("0" + countDownValues.days) : countDownValues.days}
              </div>
              <div id="daysText" className={`ss:text-[20px] text-[16px]`}>
                Días
              </div>
            </div>
            <div id="hours">
              <div id="hoursNum" className={`ss:text-[40px] text-[28px]`}>
                {countDownValues.hours < 10 ? ("0" + countDownValues.hours) : countDownValues.hours}
              </div>
              <div id="hoursText" className={`ss:text-[20px] text-[16px]`}>
                Horas
              </div>
            </div>
          </div>

          <div id="line2" className={`flex flex-row gap-x-4`}>
            <div id="minutes">
              <div id="minutesNum" className={`ss:text-[40px] text-[28px]`}>
                {countDownValues.minutes < 10 ? ("0" + countDownValues.minutes) : countDownValues.minutes}
              </div>
              <div id="minutesText" className={`ss:text-[20px] text-[14px]`}>
                Minutos
              </div>
            </div>
            <div id="seconds">
              <div id="secondsNum" className={`ss:text-[40px] text-[28px]`}>
                {countDownValues.seconds < 10 ? ("0" + countDownValues.seconds) : countDownValues.seconds}
              </div>
              <div id="secondsText" className={`ss:text-[20px] text-[16px]`}>
                Segundos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countdown