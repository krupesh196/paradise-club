const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const stripe = require("stripe")('sk_test_51OmZRFSDo4RCNv1uEITIHh82ytcsqs7qtwhdUEzW05lTF99nsV7FQftjeYCB4g4wxW8yWX6Tsy4Bt475qP51j0Ec00HqGKXYDY');
const { v4: uuidv4 } = require('uuid');

router.use(bodyParser.json());

router.post("/bookroom", async (req, res) => {
    const { room, userid } = req.body;

    try {

        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            bed: room.bed,
            type: room.type,
            totalamount: room.rentperday,
            transactionId: '1234'
        });

        console.log("New booking object:", newbooking);

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });

        roomtemp.currentbookings.push({ bookingid: booking._id, userid: userid, status: booking.status });

        await roomtemp.save()

        res.send('Room Booked Successfully');
    } catch (error) {
        console.error('Error booking room:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/getbookingsbyuserid", async (req, res) => {

    const userid = req.body.userid;

    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ error })
    }

});

router.post("/cancelbooking", async (req, res) => {

    const { bookingid, roomid } = req.body

    try {
        const bookingitem = await Booking.findOne({ _id: bookingid })

        bookingitem.status = 'cancelled'
        await bookingitem.save()

        const room = await Room.findOne({ _id: roomid })

        const bookings = room.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)

        room.currentbookings = temp

        await room.save()

        res.send('Your Booking cancelled successfully')

    } catch (error) {

        return res.status(400).json({ error })

    }

});

router.post("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

