const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const data = JSON.parse(body);
  return request(`https://freegeoip.app/json/${data.ip}`)
};

const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body);
  const coords = { latitude: data.latitude, longitude: data.longitude};
  return request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}&alt=1650`);
};

const nextISSTimesForMyLocation = (body) => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = {
  nextISSTimesForMyLocation
};