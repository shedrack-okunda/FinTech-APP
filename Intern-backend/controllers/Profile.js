import Profile from "../models/Profile.js";
// Create or update a profile
export const updateProfile = async (req, res) => {
  try {
    const { user, fullName, address, profilePicture, dateOfBirth } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user },
      { fullName, address, profilePicture, dateOfBirth },
      { new: true, upsert: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile.", error });
  }
};

// Get the user's profile
export const getProfile = async (req, res) => {
  try {
    const { user } = req;
    const profile = await Profile.findOne({ user });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile.", error });
  }
};
