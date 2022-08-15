import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

import * as C from "./styles";
import { MenuArea } from '../../components/menu';
import { InputArea } from "./InputArea";
import { TableArea } from "./TableArea";

import { CursosModel } from "../../types/CursosModel";
import { AlunosModel } from "../../types/AlunosModel";
import { MatriculasModel } from "../../types/MatriculasModel";

export const Matriculas = () => {
    const formDataAluno: AlunosModel = { nome: "", sobreNome: "", cpf: "", sexo: "" }
    const formDataCursos: CursosModel[] = [{ id: "", descricao: "", exclusivo: "", avaliacoes: "", frequenciaMinima: "", quantidadeAulas: "" }]

    const [aluno, setaluno] = useState<AlunosModel>(formDataAluno);
    const [listCursos, setlistCursos] = useState<CursosModel[]>(formDataCursos);
    const [listCursosAluno, setlistCursosAluno] = useState<CursosModel[]>(formDataCursos);
    const params = useParams();

    const getCursosAll = async () => {
        try {
            const response = await axios.get<CursosModel[]>("/api/v1/Cursos");
            const newlistCursos: CursosModel[] = response.data;
            setlistCursos(newlistCursos);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getCursosAluno = async (alunoId: any) => {
        try {
            const response = await axios.get<CursosModel[]>("/api/v1/Cursos/GetByAlunoId/" + alunoId);
            const newlistCursos: CursosModel[] = response.data;
            setlistCursosAluno(newlistCursos);

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getAluno = async (id: any) => {
        try {
            const response = await axios.get<AlunosModel>("/api/v1/Alunos/" + id);
            const newlistAluno: AlunosModel = response.data;
            setaluno(newlistAluno);

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    useEffect(() => {
        getAluno(params.id);
        getCursosAluno(params.id);
        getCursosAll();
    }, []);

    const handleAdd = (matricula: MatriculasModel) => {
      
        addMatriculas(matricula);
    }

    const addMatriculas = async (matricula: MatriculasModel) => {
        try {
            let data = JSON.stringify(matricula);
            await axios.post<MatriculasModel[]>("/api/v1/AlunosCursos", data);

            getCursosAluno(params.id);
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
                <InputArea onAdd={handleAdd} aluno={aluno} cursos={listCursos} />
                <TableArea cursos={listCursosAluno} aluno={aluno}/>
            </C.Body>
        </C.Container>
    );
}
