import Candidate from "../models/Candidate.js";

export const createCandidate = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullName,
      mobile,
      address,
      education,
      experience,
      skills,
    } = req.body;

    const candidateExists = await Candidate.findOne({
      $or: [{ email }, { username }],
    });
    if (candidateExists) {
      return res.status(400).json({
        success: false,
        message:
          candidateExists.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    const candidate = await Candidate.create({
      username,
      email,
      password,
      fullName,
      mobile,
      address,
      education: education || [],
      experience: experience || [],
      skills: skills || [],
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: candidate._id,
        username: candidate.username,
        email: candidate.email,
        fullName: candidate.fullName,
        mobile: candidate.mobile,
        address: candidate.address,
      },
    });
  } catch (error) {
    console.error("Create candidate error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .select("-password")
      .sort("-createdAt");

    res.json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    if (!candidateId) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID is required",
      });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    await Candidate.deleteOne({ _id: candidateId });

    res.json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    console.error("Delete candidate error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting candidate",
    });
  }
};
