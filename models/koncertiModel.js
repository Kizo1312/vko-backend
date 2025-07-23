import pool from "../db/index.js";

export async function createKoncert({
  naslov,
  datum,
  lokacija,
  program,
  slika_url,
  link_za_karte,
}) {
  const result = await pool.query(
    "INSERT INTO koncerti (naslov, datum, lokacija, program, slika_url, link_za_karte) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ",
    [naslov, datum, lokacija, program, slika_url, link_za_karte]
  );
  return result.rows[0];
}

export async function getKoncerti() {
  const result = await pool.query("SELECT * FROM koncerti ORDER BY datum ASC");
  return result.rows;
}

export async function editKoncert({
  naslov,
  datum,
  lokacija,
  program,
  slika_url,
  link_za_karte,
  id,
}) {
  const result = await pool.query(
    "UPDATE koncerti SET  naslov = $1,  datum = $2,  lokacija = $3,  program = $4,  slika_url = $5,   link_za_karte = $6,  datum_azuriranja = CURRENT_TIMESTAMP WHERE id = $7 RETURNING * ",
    [naslov, datum, lokacija, program, slika_url, link_za_karte, id]
  );
  return result.rows[0]
}

export async function deleteKoncert(id) {
  const result = await pool.query("DELETE FROM koncerti WHERE id = $1", [id])
  return result.rows[0]
}


export async function getKoncertById(id) {
  const result = await pool.query(
    "SELECT * FROM koncerti WHERE id = $1",
    [id]
  );
  return result.rows[0];
}
