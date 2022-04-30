require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes,sync } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())
const sequelize = new Sequelize("postgres://ffojspuk:uiYZFBumovoUrd4nr4WaJjrJqrBArxxh@tai.db.elephantsql.com/ffojspuk", {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})
class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE,
},
  
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'note'
})

class Notez extends Model {}
Notez.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE,
},
  
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'notez'
},
)
sequelize.sync()
app.get('/api/notesz', async (req, res) => {
  const notesz = await Notez.findAll()
  res.json(notesz)
})
app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})
app.post('/api/notesz', async (req, res) => {
  console.log(req.body)
  try{ 
  const note = await Notez.create(req.body)
  console.log(req)
  res.json(note)
} catch(error) {
  return res.status(400).json({ error })
}
})
app.post('/api/notes', async (req, res) => {
    console.log(req.body)
    try{ 
    const note = await Note.create(req.body)
    console.log(req)
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})
app.delete('/api/notes', async (req, res) => {
  console.log(req.body)
  try{ 
  const note = await Note.destroy({
    where: { id: req.body.id },
  })
  
  res.json(req.body.id + ' deleted')
} catch(error) {
  return res.status(400).json({ error })
}
})
app.patch('/api/notes', async (req, res) => {
  console.log(req.body)
  try{ 
  const note = await Note.update(
    { content: req.body.content },
    { where: { id: req.body.id } },
    {createdAt}
  )
  
  res.json(req.body.content )
} catch(error) {
  return res.status(400).json({ error })
}
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})