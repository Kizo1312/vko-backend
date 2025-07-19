import pool from "../db/index.js";

export async function getUsers() {
  const result = await pool.query("SELECT * FROM korisnici ORDER BY id ASC");
  return result.rows;
}

export async function createUser({ ime, email, lozinka }) {
  const result = await pool.query(
    "INSERT INTO korisnici (ime, email, lozinka) VALUES ($1, $2, $3) RETURNING * ",
    [ime, email, lozinka]
  );
  return result.rows[0];
}

export async function findUser( email ) {
  const result = await pool.query(
    "SELECT * FROM korisnici WHERE email = $1",
    [email]
  );
  return result.rows[0];
}
