const router = require("express").Router();

router.route("/").get((req, res) => {
  res.status(200).json({ error: false, data: { message: "Excellent Job!" } });
});

module.exports = router;
