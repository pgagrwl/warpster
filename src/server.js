const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
// const { getPoapCount, getNFTCount } = require("./../airstack/utils");
const { getUserData } = require("./../pinata/utils");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//Follower-rank
app.post("/api/following-rank", async (req, res) => {
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

    res.json(response.data);
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

//Engagement-rank
app.post("/api/engagement-rank", async (req, res) => {
  try {
    const response = await axios.post(
      "https://graph.cast.k3l.io/scores/global/engagement/handles",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
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

app.post("/api/suggestion-extended-following", async (req, res) => {
  try {
    const response = await axios.post(
      "https://graph.cast.k3l.io/scores/personalized/following/handles?k=2&limit=10",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
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

app.post("/api/suggestion-extended-engagement", async (req, res) => {
  try {
    const response = await axios.post(
      "https://graph.cast.k3l.io/scores/personalized/engagement/handles?k=2&limit=10",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
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

app.get("/api/user-data/:fid", async (req, res) => {
  try {
    const fid = req.params.fid;
    const data = await getUserData(fid);
    // const NFTCount = await getNFTCount(fid);
    // const PoAPCount = await getPoapCount(fid);
    // data["NFTData"] = NFTCount;
    // data["PoApData"] = PoAPCount;
    console.log(data);

    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
