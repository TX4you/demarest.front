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
import { AlunosFaltasModel } from "../../types/AlunosFaltasModel";

export const Faltas = () => {
    const params = useParams();
    const formDataMatricula: MatriculasModel = { alunosId: "", cursosId: "" }
    const formDataAluno: AlunosModel = { nome: "", sobreNome: "", cpf: "", sexo: "" }
    const formDataCursos: CursosModel = { id: "", descricao: "", exclusivo: "", avaliacoes: "", frequenciaMinima: "", quantidadeAulas: "" }

    const [matricula, setMatricula] = useState<MatriculasModel>(formDataMatricula);
    const [aluno, setaluno] = useState<AlunosModel>(formDataAluno);
    const [curso, setCurso] = useState<CursosModel>(formDataCursos);
    const [listFaltas, setlistFaltas] = useState<AlunosFaltasModel[]>([]);

    const getMatricula = async (id: any) => {
        try {
            const response = await axios.get<MatriculasModel>("/api/v1/AlunosCursos/" + id);
            const newMatricula: MatriculasModel = response.data;

            if(newMatricula !== undefined)
            {
                setMatricula(newMatricula);
                getAluno(newMatricula.alunosId);
                getCurso(newMatricula.cursosId);
                getFaltas(newMatricula.alunosId, newMatricula.cursosId);
            }


        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getAluno = async (id: any) => {
        try {
            const response = await axios.get<AlunosModel>("/api/v1/Alunos/" + id);
            const newAluno: AlunosModel = response.data;
            setaluno(newAluno);

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getCurso = async (cursosId: any) => {
        try {
            const response = await axios.get<CursosModel>("/api/v1/Cursos/" + cursosId);
            const newCurso: CursosModel = response.data;
            setCurso(newCurso);

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getFaltas = async (AlunosId: any, CursosId: any) => {
        try {
            const response =  await axios.get<AlunosFaltasModel[]>("/api/v1/AlunosFaltas/GetByAlunoIdCursoId/" + AlunosId +"/" + CursosId);
            const newlistFaltas: AlunosFaltasModel[] = response.data;
            setlistFaltas(newlistFaltas);

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const handleAdd = (faltas: AlunosFaltasModel) => {
        addFaltas(faltas);
    }

    const addFaltas = async (faltas: AlunosFaltasModel) => {
        try {
            let data = JSON.stringify(faltas);
            await axios.post<AlunosFaltasModel[]>("/api/v1/AlunosFaltas", data);

            getFaltas(matricula.alunosId, matricula.cursosId);
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    useEffect(() => {
        getMatricula(params.id);
    }, []);

    return (
        <C.Container>
            <C.Header>
              <C.HeaderInfo>Escola de idiomas</C.HeaderInfo>   
            </C.Header>

            <C.Body>
                <MenuArea />
                <InputArea onAdd={handleAdd} aluno={aluno} curso={curso} />
                <TableArea faltas={listFaltas} />
            </C.Body>
        </C.Container>
    );
}

