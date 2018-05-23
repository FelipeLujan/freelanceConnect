/*this file hoolds personal info, location, bio, pretty muchh everything from the rofile model*/
/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();

//@route    GET api/profile/tests
//@desc     test post route
//@access   public
router.get("/test", (req, res) =>
  res.json({
    msg: "profile works"
  })
);
// because i used app.use("/api/users", users), router.get("/tests") renders localhost:xxx/api/users/tests

module.exports = router;
