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

const initialMatriculasModel: MatriculasModel = { alunosId: '', cursosId: '' }
const initialAlunosModel: AlunosModel = { nome: '', sobreNome: '', cpf: '', sexo: '' }
const initialCursosModel: CursosModel = { id: '', descricao: '', exclusivo: '', avaliacoes: '', frequenciaMinima: '', quantidadeAulas: '' }

export const Faltas = () => {
    const params = useParams();
    const [matricula, setMatricula] = useState<MatriculasModel>(initialMatriculasModel);
    const [aluno, setaluno] = useState<AlunosModel>(initialAlunosModel);
    const [curso, setCurso] = useState<CursosModel>(initialCursosModel);
    const [listFaltas, setlistFaltas] = useState<AlunosFaltasModel[]>([]);

    const getMatricula = async (id: any) => {
        try {
             await axios.get<MatriculasModel>("/api/v1/AlunosCursos/" + id)
            .then(matricula =>{
                setMatricula(matricula.data);
                getAluno(matricula.data.alunosId);
                getCurso(matricula.data.cursosId);
                getFaltas(matricula.data.alunosId, matricula.data.cursosId);
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getAluno = async (id: any) => {
        try {
           await axios.get<AlunosModel>("/api/v1/Alunos/" + id)
            .then(aluno => setaluno(aluno.data));
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getCurso = async (cursosId: any) => {
        try {
            await axios.get<CursosModel>("/api/v1/Cursos/" + cursosId)
            .then(curso => setCurso(curso.data));
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getFaltas = async (AlunosId: any, CursosId: any) => {
        try {
              await axios.get<AlunosFaltasModel[]>("/api/v1/AlunosFaltas/GetByAlunoIdCursoId/" + AlunosId +"/" + CursosId)
            .then(faltas => setlistFaltas(faltas.data));
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

