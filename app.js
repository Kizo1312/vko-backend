import express from "express"
import dotenv from "dotenv"
import korisniciRoutes from './routes/korisniciRoutes.js';
import koncertiRoutes from './routes/koncertiRoutes.js';



dotenv.config()
const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/api/korisnici', korisniciRoutes);
app.use('/api/koncerti', koncertiRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})