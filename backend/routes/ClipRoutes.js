const express = require("express");
const router = express.Router(); // Create a router object using Express Router
const { postClips, getClips } = require("../controllers/clipController"); // Import postClips and getClips functions from clipController module

router
  .route("/:url")
  .get(getClips)
  .post(postClips); /* Define a route for the specified URL pattern ("/:url").
When a GET request is made to this route, the getClips function from clipController will be executed.
When a POST request is made to this route, the postClips function from clipController will be executed.
*/

module.exports = router;
