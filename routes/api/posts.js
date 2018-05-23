/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();

//@route    GET api/posts/tests
//@desc     test post route
//@access   public
router.get("/test", (req, res) =>
  res.json({
    msg: "post works"
  })
);
// because i used app.use("/api/users", users), router.get("/tests") renders localhost:xxx/api/users/tests

module.exports = router;
