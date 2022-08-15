import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import * as C from "./styles";
import { MenuArea } from '../../components/menu';
import { InputArea } from "./InputArea";
import { TableArea } from "./TableArea";

import { AlunosModel } from "../../types/AlunosModel";

export const Alunos = () => {
    const [listAlunos, setListAlunos] = useState<AlunosModel[]>([]);
    
    const getAlunosAll = async () => {
        try {
            const response = await axios.get<AlunosModel[]>("/api/v1/Alunos");
            const newlistAlunos: AlunosModel[] = response.data;
           
            setListAlunos(newlistAlunos);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    useEffect(() => {
        getAlunosAll();
      }, []);
    
    const handleAdd = (aluno: AlunosModel) => {
        addAlunos(aluno);
    }

    const addAlunos = async (aluno: AlunosModel) => {
        try {
            let data = JSON.stringify(aluno);
           await axios.post<AlunosModel[]>("/api/v1/Alunos", data);
        
            getAlunosAll();
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
                <InputArea onAdd={handleAdd} />
                <TableArea alunos={listAlunos} />
            </C.Body>
        </C.Container>
    );
}

