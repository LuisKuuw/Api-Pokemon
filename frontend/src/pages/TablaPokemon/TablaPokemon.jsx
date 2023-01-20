import { useState, useEffect } from "react";
import { getPokemon } from "../../controllers/Pokemon";
import { map } from 'lodash';
import axios from "axios";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export default function TablaPokemon() {

    const [dataEntrenador, setDataEntrenador] = useState([]);
    const [dataModal, setDataModal] = useState([]);
    const [paginado, setPaginado] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {

        //Se va a llarmar al api que se creo en el back para recuperar los datos
        paginadoTable(1);

    }, []);

    const paginadoTable = (pagina) => {

        setPaginado([]);
        setDataEntrenador([]);

        axios.post('http://127.0.0.1:8000/api/getEntrenadores', { pagina: pagina, registros_por_pagina: 10 }).then(response => {
            /* console.log(response.data.paginado); */
            //Se agrega el paginado
            let auxPages = [];
            for (let i = 1; i <= response.data.paginado.total_paginas; i++) {
                auxPages.push({
                    pagina: i
                });
            }

            setPaginado({ paginado: response.data.paginado, pages: auxPages });

            //ahora se llama al metodo que nos va acompletar la tabla
            getPokemon(response.data.response).then(response => {
                /* console.log(response); */
                setDataEntrenador(response);
            });
        });
    }

    const ModalShow = (item) => {

        //se activa el modal 
        setShow(true);
        //se llena la data
        setDataModal(item);
    }



    return (
        <div className="container my-5">
            <h3 className="text-center mb-3">Tabla de Entrenadores</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID Usuario</th>
                        <th scope="col">NickName Usuario</th>
                        <th scope="col">Pokemon 1</th>
                        <th scope="col">Pokemon 2</th>
                        <th scope="col">Pokemon 3</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        map(dataEntrenador, item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.pokemones[0]["name"]}</td>
                                <td>{item.pokemones[1]["name"]}</td>
                                <td>{item.pokemones[2]["name"]}</td>
                                <td><button className="btn btn-warning rounded-pill" onClick={() => ModalShow(item)}><FontAwesomeIcon icon={faInfo} /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={() => paginadoTable(paginado.pagina == 1 ? 1 : paginado.pagina - 1)}>Anterior</a></li>
                        {
                            map(paginado.pages, item => (
                                <li key={item.pagina} className="page-item"><a className="page-link" onClick={() => paginadoTable(item.pagina)} >{item.pagina}</a></li>
                            ))
                        }
                        <li className="page-item"><a className="page-link" onClick={() => paginadoTable(paginado.total_paginas == paginado.pagina ? paginado.total_paginas : paginado.pagina + 1)}>Siguiente</a></li>
                    </ul>
                </nav>
            </div>

            <ModalDetalles show={show} setShow={setShow} dataModal={dataModal} setDataModal={setDataModal} />
        </div>
    );
}

function ModalDetalles({ show, setShow, dataModal, setDataModal }) {

    const handleClose = () => {
        setShow(false);
        setDataModal([]);
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Informaciòn entrenador {dataModal.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>ID: {dataModal.id}</span>
                <br />
                <span>Nombre del entrenador: {dataModal.name}</span>

                <div className="mt-4">
                    <p>Equipo Pokemon</p>
                    <div className="row gy-3">
                        {
                            map(dataModal.pokemones, item => (
                                <div key={item.name} className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                    <div className={`card handCard`}>
                                        <img src={item.image} className="card-img-top" alt="imagen pokemon" />
                                        <input type="hidden" value={0} />
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{item.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}