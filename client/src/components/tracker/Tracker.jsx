import React from 'react'

function Tracker() {
  return (
    <div className='text-center'>


  <iframe
    src="https://calendar.google.com/calendar/embed?height=800&wkst=1&ctz=Asia%2FKolkata&bgcolor=%238E24AA&title=Monthly%20Attendance&showPrint=0&showTz=0&showDate=0&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%2333B679"
    style={{ border: "solid 1px #777" }}
    width={800}
    height={800}
    frameBorder={0}
    scrolling="no"
  />

    </div>
  )
}

export default Tracker