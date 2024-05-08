const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 100;

interface IPokemon {
  id: number,
  name: string;
  image: string;
  type: string;
}

const showPokemon = (pokemon: IPokemon): string => {
  // const time: number = (Math.random() * 10000) + 1;
  // console.log(pokemon.id, (time/1000).toFixed(2));
  let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
  // console.log("showPokemon", pokemon.id);
  // await new Promise(resolve => setTimeout(resolve, time));
  return output;
}

const getPokemon = async (id: number): Promise<IPokemon> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types.map((poke: any) => poke.type.name).join(", ");

  const transformedPokemon: IPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: pokemonType
  }
  return transformedPokemon;
}

const fetchData = async (): Promise<void> => {
  const promises: Promise<IPokemon>[] = [];

  for (let i = 1; i <= pokemons; i++) {
    promises.push(getPokemon(i));
  }

  let pokemonArray: IPokemon[] = [];
  pokemonArray = await Promise.all(promises);

  // Optional: Sort Pokemon array by id or name if needed
  // pokemonArray.sort((a, b) => a.id - b.id);

  container.innerHTML = pokemonArray.map((pokemon: IPokemon) => showPokemon(pokemon)).join("");
}

fetchData();