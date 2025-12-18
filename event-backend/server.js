require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const userRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(express.json());  
app.use(cors());          

// Connect DB
connectDB();

// Routes (example)
app.get('/', (req, res) => {
  res.send('Event Management Backend Running');
});

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);


app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ ROUTES
// const authRoutes = require('./routes/auth');    // <-- Import auth routes
// const eventRoutes = require('./routes/events'); // <-- Import event routes

// app.use('/api/auth', authRoutes);  // <-- Use auth routes
// app.use('/api/events', eventRoutes); // <-- Use event routes

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
