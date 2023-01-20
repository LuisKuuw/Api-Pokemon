import { useState, useEffect } from 'react';
import { getPokemones } from '../../controllers/Pokemon';
import CardPokemon from '../../components/CardPokemon/CardPokemon';
import './home.css';

export default function Home() {

    const [pokemones, setPokemones] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [nameEntrenador, setNameEntrenador] = useState("");

    useEffect(() => {

        getPokemones().then(response => {
            console.log(response);
            setPokemones(response);
            setLoading(true);
        });

    }, []);

    return (
        <div>
            {/* seccion del navbar */}
            <div className='text-center navbar-pokemon'>
                <div className='d-flex justify-content-end'>
                    <a className='btn btn-success btn-tablas' href="/tabla_pokemones">Tabla Entrenadores</a>
                </div>
                <h3>Elige a tus pokemones</h3>
                <label>Nickname: </label>
                <input type="text" value={nameEntrenador} className='input-nickname' onChange={e => setNameEntrenador(e.target.value)} id='name-entrenador' />
            </div>

            <div className='row justify-content-center mt-5'>
                {
                    loading != true
                        ? ("")
                        : (<CardPokemon key={"pokemon"} data={pokemones} entrenador={nameEntrenador} setNameEntrenador={setNameEntrenador} />)
                }
            </div>

        </div>
    );
}