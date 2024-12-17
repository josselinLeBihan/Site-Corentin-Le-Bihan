async function initializeSection() {
  try {
    const section = 'Enseignements' // Nom de la section
    const directory = 'Assets/Documents/' + section
    const outputElement = document.getElementById('output')

    // Vider l'affichage précédent (utile si rechargé)
    outputElement.innerHTML = ''

    // création d'un H2 pour chaque éléments dans le dossier
    const files = await listFile(directory)
    if (files.length === 0) {
      outputElement.innerHTML = '<p>Aucun fichier trouvé dans ce dossier.</p>'
      return
    }

    //création de H2 pour chaque éléments
    files.forEach((dossier) => {
      createTitreSection(dossier, outputElement, section)
    })
  } catch (err) {
    console.error('Erreur : ', err)
  }
}

function createTitreSection(name, outputElement, section) {
  //création du conteneur de la section
  const divSection = document.createElement('div')
  divSection.className = 'section__content'

  //Titre de la section
  const titleP = document.createElement('p')
  titleP.text = name
  divSection.appendChild(titleP)

  //Liste des sous-fichiers
  const divSousSection = document.createElement('div')
  listFile(`Assets/Documents/${section}/${name}`).then((listFichier) => {
    listFichier.forEach((fichier) => {
      const p = createP(fichier)
      divSousSection.appendChild(p)
    })
  })

  divSection.appendChild(divSousSection)
  outputElement.appendChild(divSection)
}

function createP(text) {
  // Création d'un élément <p> avec style
  const p = document.createElement('p')
  p.className = 'text__bold'
  p.textContent = text

  return p
}

async function listFile(directory) {
  //récupération des sous dossiers ou fichier d'un dossier
  const listOutput = directory.entries()
  return listOutput
}

// Lancer la fonction au chargement
document.addEventListener('DOMContentLoaded', initializeSection)
