// Créer les éléments HTML

const calculatrice = document.createElement('div');
calculatrice.className = 'calculatrice';

const ecran = document.createElement('div');
ecran.className = 'ecran';

const touches = document.createElement('div');
touches.className = 'touches';


const boutons = [
    { key: '8', text: 'C' },
    { key: '53', text: '(' },
    { key: '219', text: ')' },
    { key: '111', text: '/' },
    { key: '103', text: '7' },
    { key: '104', text: '8' },
    { key: '105', text: '9' },
    { key: '106', text: '*' },
    { key: '100', text: '4' },
    { key: '101', text: '5' },
    { key: '102', text: '6' },
    { key: '109', text: '-' },
    { key: '97', text: '1' },
    { key: '98', text: '2' },
    { key: '99', text: '3' },
    { key: '107', text: '+' },
    { key: '96', text: '0' },
    { key: '110', text: '.' },
    { key: '13', text: '=' }
];

boutons.forEach(({ key, text }) => {
    const bouton = document.createElement('button');
    bouton.className = 'bouton';
    bouton.dataset.key = key;
    bouton.textContent = text;
    touches.appendChild(bouton);
});
  
// Ajouter les éléments au DOM

  calculatrice.appendChild(ecran);
  calculatrice.appendChild(touches);
  document.body.appendChild(calculatrice);


/**************************CALCULER***********************************/

// TABLEAUX BOUTONS recupérer les boutons dans un tableau TOUCHES 

const tabTouches = [...document.querySelectorAll('.bouton')]
console.log(tabTouches)

// TABLEAU KEYCODE recupérer le key des boutons  

const listKeycode = tabTouches.map( button => button.dataset.key);
console.log(listKeycode)

// récupérer l'écran 

const ecrancalcul = document.querySelector('.ecran');

/*********************************EVENEMENTS*********************************/


// évènement keydown , on récupère le keycode de la touche appuyé et on calcul 

document.addEventListener('keydown', (e) => {

    const valeur = e.Keycode.tostring();
    calculer(valeur);

})

// évènement click , on récupère le keycode de la touche cliqué et on calcul 

document.addEventListener('click',(e) => {
    const valeur = e.target.dataset.key;
    calculer(valeur);
})


/*********************************CALCULER*********************************/

// function pour calculer 

const calculer = (valeur) => {

    // Si la valeur (Keycode appuyé ou cliqué) se trouve inclu dans le tableau KEYCODE
    if( listKeycode.includes(valeur)) {
        switch(valeur){

            case '8':
                ecran.textContent = "";
                lireAvecSyntheseVocale("Effacer");
                break;
            case '13':
                const calcul = eval(ecran.textContent);
                ecran.textContent = calcul;
                lireAvecSyntheseVocale("est égal à " + calcul);
                break;

            default:
                // récupérer l'index de la valeur-keycode dans le tableau KEYCODE
                const indexKeycode = listKeycode.indexOf(valeur);

                // récupérer le numéro de la touche le tableau TOUCHES grâce à l'index du keycode
                const touche = tabTouches[indexKeycode];

                // ajouter à l'écran le numéro 
                ecran.textContent += touche.innerHTML;
                lireAvecSyntheseVocale(touche.innerHTML);

        }
    }

}

/*****************************EVAL**************************************/

/*function calculey(chaine) {
  if (chaine.includes("+")) {
    var elements = chaine.split("+");
    var resultat = parseFloat(elements[0]) + parseFloat(elements[1]);
  } else if (chaine.includes("-")) {
    var elements = chaine.split("-");
    var resultat = parseFloat(elements[0]) - parseFloat(elements[1]);
  } else if (chaine.includes("*")) {
    var elements = chaine.split("*");
    var resultat = parseFloat(elements[0]) * parseFloat(elements[1]);
  } else  (chaine.includes("/")) {
    var elements = chaine.split("/");
    var resultat = parseFloat(elements[0]) / parseFloat(elements[1]);
  } 
  return resultat;
}

/*********************************LIRE*********************************/

// function pour lire 

function lireAvecSyntheseVocale(chaine) {
    // Vérifier si l'API Web Speech est disponible
    if ('speechSynthesis' in window) {
      // Créer un objet Utterance avec la chaîne de caractères en entrée
      var ennoncer = new SpeechSynthesisUtterance(chaine);
      // Lire la chaîne de caractères à haute voix
      window.speechSynthesis.speak(ennoncer);
    } else {
      console.log("L'API Web Speech n'est pas disponible sur ce navigateur");
    }
}

/*********************************ERREUR********************************/
window.addEventListener("error", (e) => {
    lireAvecSyntheseVocale("Vérifier votre calcul une erreur est survenue"+ e.error.message);
    alert("Vérifier votre calcul une erreur est survenue"+ e.error.message);
});


