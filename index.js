const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(cors());
// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let rooms = [];
let bookedRooms = [];
// CREATE ROOM
app.post('/createRoom', (req, res) => {
  const { name, amenities, seats, price } = req.body;

  // Create a new room object
  const room = {
    id: rooms.length + 1,
    name,
    amenities,
    seats,
    price,
  };

  // Add the room to the local variable
  rooms.push(room);

  res.status(201).json({ 
    success:true,
    message: 'Room created successfully!!!.',
    room
});
});
// book room
app.post("/bookRoom",(req,res)=>{
  const{customerName,date,startTime,endTime,roomID,booked}=req.body;
  // Check if the required fields are provided
  if (!customerName || !date || !startTime || !endTime || !roomID) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Create a new booking object
  const booking = {
    customerName,
    date,
    startTime,
    endTime,
    roomID,
    booked
  };

  // Add the booking to the local variable
  bookedRooms.push(booking);

  // Return the created booking
  res.status(201).json({ message: 'Booking created successfully.', booking });
})
//BOOKED ROOMS
app.get("/bookedRooms",(req,res)=>{
    res.status(200).json(bookedRooms);
})
//COUNT OF BOOKED ROOMS
app.get("/count",(req,res)=>{
    const totalBookings = bookedRooms.length;
    res.json({count: totalBookings });
})

const port=4000;
app.listen(port,()=>{
    console.log("Server Started on port",port)
})
