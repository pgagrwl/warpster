const axios = require("axios");
require("dotenv").config();

async function getUserData(fid) {
  try {
    const response = await axios.get(
      `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_BEARER_TOKEN}`,
        },
      }
    );

    console.log(JSON.stringify(response.data));
    return JSON.stringify(response.data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
}

module.exports = { getUserData };
