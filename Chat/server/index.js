import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import cors from 'cors'

// dotenv.config()

const port = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // Permitir solicitudes desde tu cliente Angular
    methods: ['GET', 'POST']
  },
  connectionStateRecovery: {}
})

// Middleware de CORS
app.use(cors({
  origin: 'http://localhost:4200' // Permitir solicitudes desde tu cliente Angular
}))

// Inicializa la base de datos SQLite
const dbPromise = open({
  filename: './chat.db',
  driver: sqlite3.Database
});

// Configura la base de datos
(async () => {
  const db = await dbPromise
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      user TEXT
    )
  `)
})()

io.on('connection', async (socket) => {
  console.log('A user has connected!')

  socket.on('disconnect', () => {
    console.log('A user has disconnected')
  })

  socket.on('chat message', async (msg) => {
    const db = await dbPromise
    const username = socket.handshake.auth.username ?? 'anonymous'
    let result

    try {
      result = await db.run('INSERT INTO messages (content, user) VALUES (?, ?)', [msg, username])
    } catch (e) {
      console.error(e)
      return
    }

    // Broadcast del mensaje a todos los clientes
    io.emit('chat message', msg, result.lastID.toString(), username)
  })

  if (!socket.recovered) { // Recupera los mensajes sin conexión
    try {
      const db = await dbPromise
      const rows = await db.all('SELECT id, content, user FROM messages WHERE id > ?', socket.handshake.auth.serverOffset ?? 0)

      rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user)
      })
    } catch (e) {
      console.error(e)
    }
  }
})

app.use(logger('dev'))

// Servir archivos estáticos desde la carpeta "client"
app.use(express.static('client'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

// EndPoints para el login

app.post('/login', (req, res) => {

})

app.post('/register', (req, res) => {

})

app.post('/logout', (req, res) => {

})

app.get('/protected', (req, res) => {

})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
