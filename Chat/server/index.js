import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
import connection from './db.js'

const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  },
  connectionStateRecovery: {}
})

app.use(cors({
  origin: 'http://localhost:4200'
}))

connection.connect(err => {
  if (err) throw err
  console.log('Database connected!')
})

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName)
    console.log('User joined room', roomName)

    // Recupera los mensajes históricos de la base de datos
    connection.query('SELECT * FROM messages WHERE roomName = ?', [roomName], (err, results) => {
      if (err) {
        console.error('Error retrieving messages:', err)
        return
      }
      console.log('Messages retrieved for room', roomName)
      socket.emit('joinedRoom', { messages: results })
    })
  })

  socket.on('chatMessage', (data) => {
    const { message, roomName, username } = data
    console.log('Received chatMessage:', data)

    // Guardar mensaje en la base de datos
    connection.query('INSERT INTO messages (roomName, username, message) VALUES (?, ?, ?)', [roomName, username, message], (err) => {
      if (err) throw err

      console.log('Message saved and emitted:', { text: message, username })
      io.to(roomName).emit('receiveMessage', { text: message, username, serverOffset: Date.now(), roomName })
    })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    // Manejo de desconexión si es necesario
  })

  socket.on('leaveRoom', (data) => {
    const { roomName } = data
    socket.leave(roomName)
    console.log(`User left room: ${roomName}`)
  })
})

app.use(logger('dev'))

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
