import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import * as C from "./styles";
import { MenuArea } from '../../components/menu';
import { InputArea } from "./InputArea";
import { TableArea } from "./TableArea";

import { AlunosModel } from "../../types/AlunosModel";
import { ResultadosModel } from "../../types/ResultadosModel";
import { CriteriosModel } from "../../types/CriteriosModel";

const initialAlunosModel: AlunosModel[] = [{nome: '', sobreNome: '', cpf: '', sexo: '' }]

export const Resultados = () => {
    const [aluno, setaluno] = useState(initialAlunosModel);
    const [listResultados, setlistResultados] = useState<ResultadosModel[]>([]);
    const [listCriterios, setlistCriterios] = useState<CriteriosModel[]>([]);

    const getAluno = async () => {
        try {
            const response = await axios.get<AlunosModel[]>("/api/v1/Alunos");
            const newAluno: AlunosModel[] = response.data;
            setaluno(newAluno);

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const handleSelect = (alunoSelect: AlunosModel) => {

        buscaResultado(alunoSelect);
    }

    const buscaResultado = async (alunoSelect: AlunosModel) => {
        try {
              await axios.get<ResultadosModel[]>("/api/v1/Resultado/GetByAlunoId/" + alunoSelect.id)
              .then(resultado => setlistResultados(resultado.data));

             await axios.get<CriteriosModel[]>("/api/v1/Criterio")
             .then(criterios =>  setlistCriterios(criterios.data));
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    useEffect(() => {
        getAluno();
    }, []);


    return (
        <C.Container>
            <C.Header>
                <C.HeaderInfo>Escola de idiomas</C.HeaderInfo>
            </C.Header>

            <C.Body>
                <MenuArea />
                <InputArea onSelect={handleSelect} aluno={aluno} />
                <TableArea resultado={listResultados} criterios={listCriterios} />
            </C.Body>
        </C.Container>
    );
}

