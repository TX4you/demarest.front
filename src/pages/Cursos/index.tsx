import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import * as C from "./styles";
import { MenuArea } from '../../components/menu';
import { InputArea } from "./InputArea";
import { TableArea } from "./TableArea";

import { CursosModel } from "../../types/CursosModel";

export const Cursos = () => {
    const [listCursos, setlistCursos] = useState<CursosModel[]>([]);

    const getCursosAll = async () => {
        try {
            await axios.get<CursosModel[]>("/api/v1/Cursos").then(cursos =>  setlistCursos(cursos.data))
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    useEffect(() => {
        getCursosAll();
    }, []);

    const handleAdd = (curso: CursosModel) => {
        addCursos(curso);
    }

    const addCursos = async (curso: CursosModel) => {
        try {
            let data = JSON.stringify(curso);
            await axios.post<CursosModel[]>("/api/v1/Cursos", data);

            getCursosAll();
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return (
        <C.Container>
            <C.Header>
                <C.HeaderInfo>Escola de idiomas</C.HeaderInfo>
            </C.Header>
            <C.Body>
                <MenuArea />
                <InputArea onAdd={handleAdd} cursosCadastrados={listCursos}/>
                <TableArea cursos={listCursos} />
            </C.Body>
        </C.Container>
    );
}

