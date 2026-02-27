const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/get-product", async (req, res) => {
  try {
    const url = req.query.url;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('meta[property="og:title"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");
    const description = $('meta[property="og:description"]').attr("content");

    res.json({
      title,
      image,
      description,
    });
  } catch (err) {
    res.status(500).json({ error: "Không lấy được sản phẩm" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
