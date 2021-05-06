const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const URL = 'https://api.ipify.org?format=json';

  request(URL, (error, response, body) => {
    const data = JSON.parse(body);
    const ipAd = data.ip;
    
    if (error) {
      return callback(error, null);
    }
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, ipAd);
    

  });
};

const fetchCoordsByIP = (ip, callback) => {
  const URL = `https://freegeoip.app/json/${ip}`;
  request(URL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const coords = { latitude: data.latitude, longitude: data.longitude};
    callback(null, coords);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};