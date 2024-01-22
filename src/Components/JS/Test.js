import React, { useState, useEffect } from 'react';

function Test() {
  const [ipInfo, setIpInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    // Fetch the current IP address and location information
    fetch('https://ipinfo.io/json')
      .then(response => response.json())
      .then(data => {
        setIpInfo(data);

        // Use the location information to fetch the current time
        const { city, region } = data;
        const timezone = `${region}/${city}`;
        fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
          .then(response => response.json())
          .then(timeData => {
            setCurrentTime(timeData.utc_datetime);
          })
          .catch(error => console.error('Error fetching time data:', error));
      })
      .catch(error => console.error('Error fetching IP info:', error));
  }, []);

  if (!ipInfo || !currentTime) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Current IP Address: {ipInfo.ip}</h2>
      <h2>Location: {ipInfo.city}, {ipInfo.region}</h2>
      <h2>Current Time: {currentTime}</h2>
    </div>
  );
}

export default Test;
