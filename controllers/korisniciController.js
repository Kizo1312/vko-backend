import { getUsers, createUser, findUser } from "../models/korisniciModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getKorisnici(req, res) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvaćanju korisnika." });
  }
}

export async function createKorisnik(req, res) {
  try {
    const { ime, email, lozinka } = req.body;
    const hashed = await bcrypt.hash(lozinka, 10);
    const user = await createUser({ ime, email, lozinka: hashed });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri kreiranju korisnika." });
  }
}

export async function LoginUser(req, res) {
  try {
    const { email, lozinka } = req.body;
    const user = await findUser(email);
    if (!user) {
      return res.status(401).json({ error: "Nepostojeći korisnik." });
    }
    const isValid = await bcrypt.compare(lozinka, user.lozinka);

    if (!isValid) {
      return res.status(401).json({ error: "Neispravna lozinka." });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, ime: user.ime },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri prijavi korisnika." });
  }
}
