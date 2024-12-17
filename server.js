const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

// Servir les fichiers statiques
app.use('/Assets', express.static(path.join(__dirname, 'Assets')))

// Endpoint pour lister les fichiers dans un dossier
app.get('/list-files', (req, res) => {
  const directoryPath = path.join(__dirname, 'Assets/Documents/Enseignements')
  const result = {}

  fs.readdir(directoryPath, (err, folders) => {
    if (err) {
      return res.status(500).send('Impossible de lire le dossier.')
    }

    // Lire chaque dossier
    folders.forEach((folder) => {
      const folderPath = path.join(directoryPath, folder)
      if (fs.statSync(folderPath).isDirectory()) {
        result[folder] = fs.readdirSync(folderPath)
      }
    })

    res.json(result)
  })
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
