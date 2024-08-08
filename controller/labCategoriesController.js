const LabCategories = require("../model/labCategories"); // Adjust the path according to your project structure

// Helper function to format responses
const formatResponse = (status, data = null, error = null) => {
  return { status, data, error };
};

// Create a new lab category
exports.createLabCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const newLabCategory = new LabCategories({ name, image });
    await newLabCategory.save();
    res.status(201).json(formatResponse(201, newLabCategory));
  } catch (error) {
    res.status(400).json(formatResponse(400, null, error.message));
  }
};

// Get all lab categories
exports.getLabCategories = async (req, res) => {
  try {
    const labCategories = await LabCategories.find();
    res.status(200).json(formatResponse(200, labCategories));
  } catch (error) {
    res.status(400).json(formatResponse(400, null, error.message));
  }
};

// Get a single lab category by ID
exports.getLabCategoryById = async (req, res) => {
  try {
    const labCategory = await LabCategories.findById(req.params.id);
    if (!labCategory) {
      return res
        .status(404)
        .json(formatResponse(404, null, "Lab Category not found"));
    }
    res.status(200).json(formatResponse(200, labCategory));
  } catch (error) {
    res.status(400).json(formatResponse(400, null, error.message));
  }
};

// Update a lab category by ID
exports.updateLabCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const updatedLabCategory = await LabCategories.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true, runValidators: true }
    );
    if (!updatedLabCategory) {
      return res
        .status(404)
        .json(formatResponse(404, null, "Lab Category not found"));
    }
    res.status(200).json(formatResponse(200, updatedLabCategory));
  } catch (error) {
    res.status(400).json(formatResponse(400, null, error.message));
  }
};

// Delete a lab category by ID
exports.deleteLabCategory = async (req, res) => {
  try {
    const deletedLabCategory = await LabCategories.findByIdAndDelete(
      req.params.id
    );
    if (!deletedLabCategory) {
      return res
        .status(404)
        .json(formatResponse(404, null, "Lab Category not found"));
    }
    res
      .status(200)
      .json(
        formatResponse(200, { message: "Lab Category deleted successfully" })
      );
  } catch (error) {
    res.status(400).json(formatResponse(400, null, error.message));
  }
};
