import express from 'express';
import cors from 'cors';
import uploadsRoutes from './routes/uploads.js';
import galleryRoutes from './routes/gallery.js';
import deleteRoutes from './routes/delete.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads/originals', express.static('uploads/originals'))
app.use('/uploads/thumbnails', express.static('uploads/thumbnails'))

app.use('/uploads', uploadsRoutes)
app.use('/uploads', galleryRoutes)
app.use('/uploads', deleteRoutes)

app.listen(5000, ()=> console.log('server is running on http://localhost:5000')
)