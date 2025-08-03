import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.js';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/notes', notesRoutes); // Minimal router here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
