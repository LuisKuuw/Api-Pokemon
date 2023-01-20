import { BrowserRouter, Routes, Route } from "react-router-dom";

//Paginas
import Home from "../../pages/Home/Home";
import TablaPokemon from "../../pages/TablaPokemon/TablaPokemon";

export default function Rutas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="tabla_pokemones" element={<TablaPokemon/>} />
            </Routes>
        </BrowserRouter>
    );
}