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
import { CursosAvaliacoesModel } from "../../types/CursosAvaliacoesModel";

const initialMatriculasModel: MatriculasModel = { alunosId: '', cursosId: '' }
const initialAlunosModel: AlunosModel = { nome: '', sobreNome: '', cpf: '', sexo: '' }
const initialCursosModel: CursosModel = { id: '', descricao: '', exclusivo: '', avaliacoes: '', frequenciaMinima: '', quantidadeAulas: '' }

export const Avaliacoes = () => {
    const params = useParams();
    const [matricula, setMatricula] = useState(initialMatriculasModel);
    const [aluno, setaluno] = useState(initialAlunosModel);
    const [curso, setCurso] = useState(initialCursosModel);
    const [listAvaliacoes, setlistAvaliacoes] = useState<CursosAvaliacoesModel[]>([]);

    const getAluno = async (id: any) => {
        try {
            await axios.get<AlunosModel>("/api/v1/Alunos/" + id).then(aluno =>  setaluno(aluno.data))
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getCurso = async (cursosId: any) => {
        try {
              await axios.get<CursosModel>("/api/v1/Cursos/" + cursosId).then(curso => setCurso(curso.data))
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getAvaliacoesAluno = async (AlunosId: any, CursosId: any) => {
        try {
             await axios.get<CursosAvaliacoesModel[]>("/api/v1/CursosAvaliacoes/GetByAlunoIdCursoId/" + AlunosId +"/" + CursosId)
             .then(avaliacoes => setlistAvaliacoes(avaliacoes.data));
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const handleAdd = (avaliacao: CursosAvaliacoesModel) => {
        addAvaliacao(avaliacao);
    }

    const addAvaliacao = async (avaliacao: CursosAvaliacoesModel) => {
        try {
            let data = JSON.stringify(avaliacao);
            await axios.post<CursosAvaliacoesModel[]>("/api/v1/CursosAvaliacoes", data);

            getAvaliacoesAluno(matricula.alunosId, matricula.cursosId);
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    useEffect(() => {
        const getMatricula = async (id: any) => {
                await axios.get<MatriculasModel>("/api/v1/AlunosCursos/" + id)
                .then(matriculaNew => {
                                    //console.log(matriculaNew.data);
                                    setMatricula(matriculaNew.data);
                                    getAluno(matriculaNew.data.alunosId);
                                    getCurso(matriculaNew.data.cursosId);
                                    getAvaliacoesAluno(matriculaNew.data.alunosId, matriculaNew.data.cursosId);
                    });
        }

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
                <TableArea avaliacoes={listAvaliacoes} />
            </C.Body>
        </C.Container>
    );
}

