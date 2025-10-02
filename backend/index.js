import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 4000;

// Reemplaza esta URL con tu cadena de conexión de Neon PostgreSQL
const pool = new Pool({
  connectionString: 'TU_URL_DE_CONEXION_NEON',
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

// Ruta de prueba para consultar la base de datos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
