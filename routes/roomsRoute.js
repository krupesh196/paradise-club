const express = require("express");
const router = express.Router();

const Room = require('../models/room.js')

router.get("/getallrooms", async (req, res) => {

    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

});

router.post("/getroombyid", async (req, res) => {

    const roomid = req.body.roomid

    try {
        const room = await Room.findOne({ _id: roomid });
        res.send(room);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

});


router.post("/addroom", async (req, res) => {

    try {

        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Room Added Successfully')

    } catch (error) {

        return res.status(400).json({ error })

    }

})


module.exports = router;
