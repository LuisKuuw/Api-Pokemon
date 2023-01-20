import { useState } from "react";
import Swal from 'sweetalert2';
import { map } from 'lodash';
import axios from "axios";

export default function CardPokemon(props) {

    const { data, entrenador, setNameEntrenador } = props;

    const [arrPokemon, setArrPokemon] = useState([]);

    const onSelected = (id, url, name) => {

        var elements = arrPokemon;
        console.log(elements.length);

        for (const index in elements) {
            /* console.log("id:" + elements[index]["id"]); */
            if (elements[index]["id"] === id) {
                //en caso de que se encuentre una coincidencia se va a eliminar el elemento
                elements = elements.filter(el => id !== el.id);
                const classRemove = document.getElementById(`${id}`);
                classRemove.classList.remove("selectedPokemon");
                setArrPokemon(elements);
            }
        }

        if (elements.length >= 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo se pueden escojer 6 pokemones',
            });
        }
        else {
            elements.push({
                id: id,
                name: name,
                url: url
            });

            const addClass = document.getElementById(`${id}`);
            addClass.classList.add("selectedPokemon");

            setArrPokemon(elements);
        }

        /* console.log(id);
        console.log(name);
        console.log(arrPokemon); */

    }

    const onSubmit = () => {

        if (name.length <= 200) {
            axios.post('http://127.0.0.1:8000/api/saveInformacion', { entrenador: entrenador, pokemones: arrPokemon }).then(response => {
                console.log(response.data);
                if (response.data.response == "ok") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Informacion salvada con exito',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    /* se limpia el array de los pokemones */
                    const allRemove = document.querySelectorAll(".handCard");
                    allRemove.forEach((element) => {
                        element.classList.remove('selectedPokemon');
                    });
                    setNameEntrenador("");
                    setArrPokemon([]);
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrio un error al subir la informaciòn',
                    });
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'el nombre sobrepasa el limite permitido',
            });
        }


    }

    return (

        <div className="row gy-3">
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center'>
                <button className='btn btn-outline-secondary rounded-pill' onClick={() => onSubmit()}>Registrar</button>
            </div>
            {
                map(data, item => (
                    <div key={item.forms.name} className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                        <div id={item.id} className={`card handCard`} onClick={() => onSelected(item.id, item.forms[0].url, item.forms[0].name)}>
                            <img src={item.sprites.front_default} className="card-img-top" alt="imagen pokemon" />
                            <input type="hidden" value={0} />
                            <div className="card-body">
                                <h5 className="card-title text-center">{item.forms[0].name}</h5>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>


    );
}