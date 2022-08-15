import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import * as C from "./styles";
import { MenuArea } from '../../components/menu';
import { InputArea } from "./InputArea";
import { TableArea } from "./TableArea";

import { AlunosModel } from "../../types/AlunosModel";
import { ResultadosModel } from "../../types/ResultadosModel";
import { CriteriosModel } from "../../types/CriteriosModel";

export const Resultados = () => {
    const formDataAluno: AlunosModel[] = [{ nome: "", sobreNome: "", cpf: "", sexo: "" }]

    const [aluno, setaluno] = useState<AlunosModel[]>(formDataAluno);
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
            const response = await axios.get<ResultadosModel[]>("/api/v1/Resultado/GetByAlunoId/" + alunoSelect.id);
            const newlistResultado: ResultadosModel[] = response.data;
            setlistResultados(newlistResultado);

            const responseCriterio = await axios.get<CriteriosModel[]>("/api/v1/Criterio");
            const newlistCriterios: CriteriosModel[] = responseCriterio.data;
            setlistCriterios(newlistCriterios);

            console.log(newlistCriterios)

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

