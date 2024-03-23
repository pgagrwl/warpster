const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//Follower-rank
app.post("/api/follower-rank", async (req, res) => {
  try {
    const response = await axios.post(
      "https://graph.cast.k3l.io/scores/global/following/handles",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.json(response.data.result[0].rank);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.log(error.request);
      res.status(500).send("No response received from the external API");
    } else {
      console.log("Error", error.message);
      res.status(500).send("Error making the request");
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
