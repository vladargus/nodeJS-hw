const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green('Note was added'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(chalk.blue(note.id, note.title))
  })
}

async function removeNote(id) {
  const notes = await getNotes()

  const noteWithId = notes.find(note => note.id === id)

  if (noteWithId) {
    await fs.writeFile(
      notesPath,
      JSON.stringify(notes.filter(note => note.id !== id))
    )
    console.log(chalk.green(`Note with id: ${id} was removed`))
  } else {
    console.log(chalk.red(`Note with id: ${id} not found`))
  }
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
}
