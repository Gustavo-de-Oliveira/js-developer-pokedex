const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const details = document.getElementById('detalhesDiv')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="details">
                <button id="verMais" type="button" onclick=pokemonDetalhe(${pokemon.number})>
                    Ver mais
                </button>
            </div>
        </li>
    `
}

function convertPokemonToLi_details(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="name">Height: ${pokemon.height} | weight: ${pokemon.weight}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <ol class="types">
                    ${pokemon.abilities.map((ability) => `<li class="type ${pokemon.type}">${ability}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

function pokemonDetalhe(valor){
    var item = document.getElementById(valor)
    pokeApi.getPokemonDetailById(valor).then((pokemon) => {
        var html = convertPokemonToLi_details(pokemon)
        item.innerHTML = html
    })
}