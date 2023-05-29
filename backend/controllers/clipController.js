const Clip = require("../model/Clip");
const asyncHandler = require("express-async-handler");

// Handler function for creating new clips
const postClips = asyncHandler(async (req, res) => {
  var currentDate = new Date(); // Get the current date
  const { urlExtension, content, expiresIn } = req.body; // Destructure the required data from the request body
  var expiresAt = new Date(currentDate.getTime() + expiresIn * 60000); // Calculate the expiration based on the provided expiresIn value
  // Check if a clip with the same urlExtension already exists in the database
  const existingClip = await Clip.findOne({ urlExtension: urlExtension });
  if (existingClip === null) {
    // If no existing clip is found, create a new clip in the database
    const clip = await Clip.create({
      urlExtension,
      content,
      expiresAt: expiresAt,
    });
    res.status(201).json(clip); // Respond with the created clip object
  } else {
    res.status(400); // Set the response status code to 400 (Bad Request)
    throw new Error("Clip already exists"); // Throw an error indicating that the clip already exists
  }
});

// Handler function for retrieving clips
const getClips = asyncHandler(async (req, res) => {
  const urlExtension = req.params.url; // Get the urlExtension parameter from the request
  const clip = await Clip.findOne({ urlExtension: urlExtension }); // Find the clip in the database with the specified urlExtension
  if (clip) {
    res.status(200).json(clip); 
  } else {
    res.status(400).json({ message: "url extension is not registered." }); 
  }
});

module.exports = {
  getClips,
  postClips,
};
