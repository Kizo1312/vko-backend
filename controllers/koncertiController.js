import { createKoncert, getKoncerti, editKoncert, getKoncertById, deleteKoncert  } from "../models/koncertiModel.js";
import jwt from 'jsonwebtoken'

export async function napraviKoncert(req, res){
    try {
        const {naslov, datum, lokacija, program, link_za_karte} = req.body
        const slika_url = req.file ? `/uploads/${req.file.filename}` : null;
        const koncert = await createKoncert({naslov, datum, lokacija, program, slika_url, link_za_karte})
        res.json(koncert)
       

    } catch (err) {
        console.error(err)
         res.status(500).json({ error: "Greška pri kreiranju koncerta." });
    }
}
export async function prikaziKoncerte(req, res) {
  try {
   const koncerti = await getKoncerti()
   res.json(koncerti)
    
  } catch (err) {
     console.error(err)
         res.status(500).json({ error: "Greška pri prikazu koncerta." });
    
  }
}
export async function izbrisiKoncert(req, res) {
  try {
    const id = req.params.id;

    const existing = await getKoncertById(id);
    if (!existing) {
      return res.status(404).json({ error: "Koncert ne postoji." });
    }
    
    const koncert = deleteKoncert(id)
    res.json("Koncert izbrisan")
  } catch (err) {
    console.error(err)
         res.status(500).json({ error: "Greška pri brisanju koncerta." });
    
    
  }
}

export async function urediKoncert(req, res) {
  try {
    const { naslov, datum, lokacija, program, link_za_karte } = req.body;
    const id = req.params.id;

    const existing = await getKoncertById(id);
    if (!existing) {
      return res.status(404).json({ error: "Koncert ne postoji." });
    }

    
    const slika_url = req.file
      ? `/uploads/${req.file.filename}`
      : existing.slika_url;

    const koncert = await editKoncert({
      naslov,
      datum,
      lokacija,
      program,
      slika_url,
      link_za_karte,
      id,
    });

    res.json(koncert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri uređivanju koncerta." });
  }
}
