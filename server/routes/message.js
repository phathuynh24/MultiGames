const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.getAllMessages);
router.get("/getMessages/:userId/:friendId", messageController.getMessages);
router.post("/sendMessage", messageController.sendMessage);
router.delete("/", messageController.deleteAllMessages);

module.exports = router;
