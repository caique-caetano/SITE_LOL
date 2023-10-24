const championInput = document.querySelector("#champion-input");
const searchBnt = document.querySelector("#search");
const nameChampion = document.querySelector("#nameChampion");
const imgChampions = document.querySelector("#imgChampions");
const allContainer = document.querySelector("#container-data");
const titleChampions = document.querySelector("#titleChampion");
const errorMessageContainer = document.querySelector("#error-message");

const cardHabilidades = document.querySelector("#card-habilidades")

const imgHabilityQ = document.querySelector("#imgHabilityQ");
const descHabilityQ = document.querySelector("#descHabilityQ");
const habilityQ = document.querySelector("#habilityQ");

const descHabilityW = document.querySelector("#descHabilityW");
const imgHabilityW = document.querySelector("#imgHabilityW")
const habilityw = document.querySelector("#habilityW");

const habilityE = document.querySelector("#habilityE");
const imgHabilityE = document.querySelector("#imgHabilityE");
const descHabilityE = document.querySelector("#descHabilityE");

const habilityR = document.querySelector("#habilityR");
const imgHabilityR = document.querySelector("#imgHabilityR");
const descHabilityR = document.querySelector("#descHabilityR");

const getChampionsData = async(champion) => {
    const apiChampionsURL = `http://ddragon.leagueoflegends.com/cdn/13.20.1/data/pt_BR/champion/${champion}.json`

    const res = await fetch(apiChampionsURL);
    const data = await res.json();

    return data.data;

};

const showChampionData = async (champion) => {

    hideInformation(); 

    const data = await getChampionsData(champion);

    if(data.cod === "403") {

        showErrorMessage();

        return;
    }

   nameChampion.innerText = data[`${champion}`].id;
   imgChampions.setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`)
   titleChampions.innerText = data[`${champion}`].title
   
   const imgHabilidades = data[`${champion}`].spells.map(function (e) {
       return `${e.description}`
    });
    
    
    imgHabilityQ.setAttribute("src", `https://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/${champion}Q.png`)
    habilityQ.innerText = `${data[`${champion}`].spells[0].name}`;
    descHabilityQ.innerText = `${data[`${champion}`].spells[0].description}`.replace(/<br>/g, '')

   
   imgHabilityW.setAttribute("src",`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/${champion}W.png`)
   habilityW.innerText = `${data[`${champion}`].spells[1].name}`;
   descHabilityW.innerText = `${imgHabilidades[1]}`.replace(/<br>/g, '');



   habilityE.innerText = `${data[`${champion}`].spells[2].name}`;
   imgHabilityE.setAttribute("src", `https://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/${champion}E.png`);
   descHabilityE.innerText = `${imgHabilidades[2]}`.replace(/<br>/g, '');
   


   imgHabilityR.setAttribute("src", `https://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/${champion}R.png`)
   habilityR.innerText = `${data[`${champion}`].spells[3].name}`;
   descHabilityR.innerText = `${imgHabilidades[3]}`.replace(/<br>/g, '');

    // console.log(data[`${champion}`])
    cardHabilidades.classList.remove("hide")
    imgChampions.classList.remove("hide");
    allContainer.classList.remove("hide");
};

//  Eventos
searchBnt.addEventListener("click", (e) => {
    e.preventDefault();

    const champion = championInput.value.charAt(0).toUpperCase() + championInput.value.slice(1);

    showChampionData(champion);

    // console.log(champion);
});

championInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        
        const champion = e.target.value.charAt(0).toUpperCase() + championInput.value.slice(1);
        showChampionData(champion);
    }
});

const toggleLoader = () => {
    loader.classList.toggle("hide");
  };


// Tratamento de erros
const hideInformation = () => {
    cardHabilidades.classList.add("cardHabilidades")
    errorMessageContainer.classList.add("hide");
    allContainer.classList.add("hide");
    imgChampions.classList.add("hide")

};


const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };