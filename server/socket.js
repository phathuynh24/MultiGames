const socketIo = require("socket.io");
const Message = require("./models/Message");
const User = require("./models/Users");
const Room = require("./models/Rooms");

// Store clients per room
const rooms = {};
const chatHistory = {};

const socketSetup = (server) => {
  const io = socketIo(server, {
    path: "/api/whiteBoard/",
  });

  io.on("connection", (socket) => {
    const joinHandler = (room) => {
      socket.join(room);
      console.log(`A user joined ${room}`);

      if (!rooms[room]) {
        rooms[room] = [];
      }

      rooms[room].push(socket);
      // emit to others in the room
      socket.to(room).emit("join", room);

      // Remove any existing listeners to avoid memory leaks
      socket.removeAllListeners("selectKeyword");
      socket.removeAllListeners("draw");
      socket.removeAllListeners("message");
      socket.removeAllListeners("boardBackgroundUrl");

      socket.on("selectKeyword", (keyword) => {
        socket.to(room).emit("selectKeyword", keyword);
      });

      socket.on("draw", (data) => {
        socket.to(room).emit("draw", data);
      });

      socket.on("message", (message) => {
        console.log(message);

        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }

        chatHistory[room].push(message);
        io.to(room).emit("message", message);
      });

      socket.on("boardBackgroundUrl", (url) => {
        socket.to(room).emit("boardBackgroundUrl", url);
      });
    };

    const leaveHandler = async ({ room, userId }) => {
      console.log(`${userId} leaved from ${room}`);

      socket.to(room).emit("leave", { userId: userId });

      if (rooms[room] === undefined) {
        return;
      }

      const index = rooms[room].indexOf(socket);

      if (index !== -1) {
        rooms[room].splice(index, 1);
      }

      if (rooms[room].length === 0) {
        delete rooms[room];
        delete chatHistory[room];
        await Room.findByIdAndUpdate(room, { status: "active" });
      }
    };

    const readyHandler = async (room) => {
      if (!rooms[room]["noReady"]) {
        rooms[room]["noReady"] = 0;
      }

      rooms[room]["noReady"]++;
      console.log(
        rooms[room]["noReady"] + " out of " + rooms[room].length + " are ready"
      );

      if (rooms[room]["noReady"] === rooms[room].length) {
        socket.emit("startGame");
        await Room.findByIdAndUpdate(room, { status: "playing" });
        socket.to(room).emit("startGame");
      }
    };

    const inviteHandler = ({ room, friendId }) => {
      console.log(`Inviting ${friendId} to ${room}`);
      socket.to(friendId).emit("invite", room);
    };

    const onlineHandler = async (userId) => {
      console.log("User connected", userId);
      console.log("Socket id", socket.id);

      const res = await User.updateOne(
        { _id: userId },
        { socketId: socket.id }
      );

      if (res.modifiedCount === 0) {
        console.log("Failed to update socket id");
      }
    };

    const offlineHandler = async ({ socket }) => {
      const res = await User.findOneAndUpdate(
        { socketId: socket.id },
        { socketId: null }
      );

      if (!res) {
        console.log("Failed to remove socket id");
      }
    };

    socket.on("online", onlineHandler);

    socket.on("invite", inviteHandler);

    socket.on("ready", readyHandler);

    const getMessages = async ({ userId, friendId }) => {
      try {
        const messages = await Message.find({
          $or: [
            { senderId: userId, recipientId: friendId },
            { senderId: friendId, recipientId: userId },
          ],
        }).sort({ timestamp: 1 });
        socket.emit("messages", messages);
      } catch (err) {
        console.error(err);
        socket.emit("messages", []);
      }
    };

    socket.on("getMessages", getMessages);

    socket.on("sendMessage", async (message) => {
      const newMessage = new Message(message);
      const savedMessage = await newMessage.save();
      io.emit("notification", savedMessage);
      io.emit("receiveMessage", savedMessage);
    });

    socket.on("disconnect", async () => {
      // find the room that the user is in
      await offlineHandler({ socket: socket });
      let room = null;

      for (const key in rooms) {
        if (rooms[key].includes(socket)) {
          room = key;
          break;
        }
      }

      if (room) {
        leaveHandler(room);
      }
    });

    socket.on("leave", leaveHandler);
    socket.on("join", joinHandler);
  });
};

module.exports = socketSetup;
