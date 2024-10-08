const Parking = require("../models/Parking.js");

exports.getAllParking = async (req, res) => {
  try {
    const parkings = await Parking.find();
    return res.status(200).json({
      success: true,
      data: parkings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.addParking = async (req, res) => {
  try {
    const {
      address,
      location_coordinates,
      photo_URL,
      video_URL,
      owner_id,
      description,
    } = req.body;

    console.log("Request Body: ", req.body);

    let parking = await Parking.findOne({ location_coordinates });

    if (parking) {
      return res.status(409).json({
        success: false,
        message: "Parking already exists",
      });
    }

    parking = await Parking.create({
      address,
      location_coordinates,
      photo_URL,
      video_URL,
      owner_id,
      description,
    });

    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking added successfully",
      data: parking,
    });
  } catch (err) {
    console.error("Error adding parking: ", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.removeParking = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);

    let parking = await Parking.findById(_id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: "Parking does not exist!",
      });
    }

    parking.is_available = false;
    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking is now unavailable",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyParking = async (req, res) => {
  try {
    const { _id } = req.body;

    let parking = await Parking.findById(_id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: "Parking does not exist!",
      });
    }

    parking.is_verified = true;
    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateParking = async (req, res) => {
  try {
    const { _id, newlocation, newaddress } = req.body;

    let parking = await Parking.findById(_id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: "Parking does not exist!",
      });
    }

    parking.address = newaddress || parking.address;
    parking.location = newlocation || parking.location;
    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
