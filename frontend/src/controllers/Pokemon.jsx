import axios from 'axios';

export async function getPokemones() {

    let arr = [];

    for (let index = 1; index <= 150; index++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then(response => {
            /* console.log(response.data); */
            arr.push(response.data);
        });

    }

    return arr;
}

export async function getPokemon(data) {

    let dataFinal = [];
    let dataPokemones = [];

    for (let i = 0; i < data.length ; i++) {

        let auxData = data[i]["pokemones"];
        for (let j = 0; j < auxData.length ; j++) {
            /* console.log(auxData[j]["id"]); */
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${auxData[j]["id"]}`).then(response => {
                /* console.log(response.data); */
                dataPokemones.push({
                    name:response.data.name,
                    image:response.data.sprites.front_default,
                    tipos:response.data.types
                });
            });
        }

        //se va rellenar la data
        dataFinal.push({
            id:data[i]["id"],
            name:data[i]["name"],
            pokemones:dataPokemones
        });
        //se va a limpirar el array de los pokemones
        dataPokemones = [];

    }

    return dataFinal;
}
