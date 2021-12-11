const fetch = require("node-fetch");

const info = async(by) => {
  try {
    const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
    const data = await api.json();

    let base = [...data.results];

    let pokemonInfo = [];
    for (i = 0; i < base.length; i++) {
        if (!base[i]) return pokemonInfo;
        if (base[i].url) {
           const pokemon = await fetch(base[i].url);
           const info = await pokemon.json();

           pokemonInfo.push({
           id: info.id,
           name: info.name,
           type: info.types.map((t) => t.type.name),
           img: info.sprites.versions["generation-v"]["black-white"].animated
               .front_default,
           fuerza: info.stats[1].base_stat,
      });
    } else {
      pokemonInfo.push({
        id: base[i].id,
        idPoke: base[i].idPoke,
        name: base[i].name,
        type: base[i].tipos.map((t) => t.name),
        fuerza: base[i].fuerza,
        img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
      });
    }
  }
  // const poke = await Pokemon.findAll({ include: Tipo });
  // pokemonInfo.push({ ...poke });
  return pokemonInfo;
  } catch (error) {
    console.log(error);
  }
};

    


const porNombre = async(name) => {
  try {

    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await api.json();
    const pokemonName = [
      {
        id: data.id,
        name: data.name,
        type: data.types.map((t) => t.type.name),
        img: data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      },
    ];
    return pokemonName;
  }catch (error) {
    return [];
  }


};

const forId = async (id) => {
  try {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await api.json();

    const pokemonId = {
      id: data.id,
      name: data.name,
      type: data.types.map((t) => t.type.name),
      img: data.sprites.versions["generation-v"]["black-white"].animated
        .front_default,
      vida: data.stats[0].base_stat,
      fuerza: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      velocidad: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };

    return pokemonId;
  } catch (error) {
    return [];
  }
};
module.exports = {
    info,
    porNombre,
    forId,
};
