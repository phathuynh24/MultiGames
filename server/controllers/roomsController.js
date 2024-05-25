const Room = require("../models/Rooms");

const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(200).json("Created room");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create room", error: error.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json("Failed to retrieve room", error);
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to retrieve rooms", error);
  }
};

const getActiveRoom = async (req, res) => {
  try {
    const rooms = await Room.findOne({ status: "active" });

    // check if there is no active room
    if (!rooms) {
      // response with null
      res.status(200).json(null);
      return;
    }

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to retrieve room active games", error);
  }
};

const getRoomsOwner = async (req, res) => {
  try {
    const rooms = await Room.find({ owner: req.params.id });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to retrieve rooms owner", error);
  }
};

const getRoomsGuest = async (req, res) => {
  try {
    const rooms = await Room.find({ list_guest: req.params.id });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to retrieve rooms guest", error);
  }
};

const updateRoom = async (req, res) => {
  try {
    // find room
    const room = await Room.findById(req.params.id);

    // if room is not found
    if (!room) {
      res.status(404).json("Room not found");
      return;
    }

    // update room
    await room.updateOne({ $set: req.body });
    res.status(200).json("Room updated");
  } catch (error) {
    res.status(500).json("Failed to update room", error);
  }
};

const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted");
  } catch (error) {
    res.status(500).json("Failed to delete room", error);
  }
};

const isRoomFull = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room.list_guest.length === room.capacity) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json("Failed to check room full", error);
  }
};

module.exports = {
  createRoom,
  getRoom,
  getRooms,
  getActiveRoom,
  getRoomsOwner,
  getRoomsGuest,
  updateRoom,
  deleteRoom,
  isRoomFull,
};
