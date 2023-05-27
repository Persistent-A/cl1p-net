const Clip = require("../model/Clip");
const asyncHandler = require("express-async-handler");

const postClips = asyncHandler(async (req, res) => {
  var currentDate = new Date();
  const { urlExtension, content, expiresIn } = req.body;
  var expiresAt = new Date(currentDate.getTime() + expiresIn * 60000);
  const existingClip = await Clip.findOne({ urlExtension: urlExtension });
  if (existingClip === null) {
    const clip = await Clip.create({
      urlExtension,
      content,
      expiresAt: expiresAt,
    });
    res.status(201).json(clip);
  } else {
    res.status(400)
    throw new Error('Clip already exists');
  }
});

const getClips = asyncHandler(async (req, res) => {
  const urlExtension = req.params.url;
  const clip = await Clip.findOne({ urlExtension: urlExtension });
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
