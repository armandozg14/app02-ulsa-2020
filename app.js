const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonImages = document.getElementById('pokemon-images');

const GetPokemon = async url=>{
    const data= await fetch(url);
    const dataJson = await data.json();
    const{sprites, name, types, abilities}= dataJson;
    // types.forEach(element => { //forEach para recorrer arreglos
    //      const {type} = element;
    //      console.log(type.name);
    //      pokemon.types.innerHTML += `<li>${type.name}</li>`;
    //  });

    //  abilities.forEach(element => {
    //      const{ability}= element;
    //      //pokemon.abilities.innerHTML += `<li>${ability.name}</li>`;
    //      //console.log(ability.url);
    //      GetAbilityInfo(ability.url, ability.name);
    // })
    // console.log(await abilities);
    // pokemon.sprite.src = await dataJson.sprites['front_default'];
    // pokemon.name.innerHTML= await `Name: ${name}`;
    return await sprites.front_default;
}

const GetPokemonList = async ()=>{
    const url = `${baseUrl}/pokemon`;
    fetch(url).then(data => data.json()).then(json =>{
        //console.log(json.results);
        const urlList = json.results.map(element => element.url);
        //console.log(urlList);
        const spriteList = urlList.map(pokemonUrl => GetPokemon(pokemonUrl));
        spriteList.forEach(async sprite => {
            await sprite;
            const currentPokemonImg = document.createElement('img');
            currentPokemonImg.src = await sprite;
            currentPokemonImg.className = 'pokemonImage';
            pokemonImages.appendChild(currentPokemonImg);

            currentPokemonImg.onclick = ()=> {
                sessionStorage.setItem('urlList', JSON.stringify(urlList));
                sessionStorage.setItem('sprite', currentPokemonImg.src);
                window.location.href = 'file:///D:/Documentos/programacion-hipermedia/app02/pokemon.htm';
            }

        });
    });
}

const GetAbilityInfo= async (url, abilityName)=>{
    const data= await fetch(url);
    const dataJson= await data.json();
    const{effect_entries}= dataJson;

    let effectsList='';

    effect_entries.forEach(element => {

        const{effect, language} = element;

        if(language.name === 'en'){
            //console.log(effect);
            effectsList += `<li>${effect}</li>`;
        }
    });

    pokemon.abilities.innerHTML += 
    `<li>
        ${abilityName}
        <div>effect</div>
        <ul>
            ${effectsList}
        </ul>
    </li> `;

    //console.log(await dataJson);
}

GetPokemon('https://pokeapi.co/api/v2/pokemon/jigglypuff');
GetPokemonList();