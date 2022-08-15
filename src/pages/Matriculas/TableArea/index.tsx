import { useNavigate } from 'react-router-dom';
import { AlunosModel } from '../../../types/AlunosModel';
import { CursosModel } from "../../../types/CursosModel";
import { MatriculasModel } from '../../../types/MatriculasModel';
import * as C from "./styles";
import axios from "../../../utils/axios";

type Props = {
    cursos: CursosModel[],
    aluno: AlunosModel
}
export const TableArea = ({ cursos, aluno }: Props) => {
    const navigate = useNavigate();

    const handleAvaliacoes = (id:any) => { 
        const data: MatriculasModel = {
            cursosId: id?.toString(),
            alunosId:aluno.id?.toString()
        }
     getMatricula(data.alunosId, data.cursosId, "avaliacoes");
    }

    const handleFaltas = (id:any) => { 
        const data: MatriculasModel = {
            cursosId: id?.toString(),
            alunosId:aluno.id?.toString()
        }
        getMatricula(data.alunosId, data.cursosId, "faltas");
    }

    const getMatricula = async (AlunosId: any, CursosId: any, page: string) => {
        try {
            const resp =  await axios.get<MatriculasModel>("/api/v1/AlunosCursos/GetByAlunoIdCursoId/" + AlunosId +"/" + CursosId);
            const newMatricula: MatriculasModel = resp.data;
            if(newMatricula !== undefined)
            {
                navigate("/"+page+"/"+ newMatricula.id);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return (
        <C.Table>
            <thead>
            <C.TableHeadLine>
                    <C.TableHeadColumn width={80}>Id</C.TableHeadColumn>
                    <C.TableHeadColumn>Descrição</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Avaliações</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Faltas</C.TableHeadColumn>
            </C.TableHeadLine>
            </thead>
            <tbody>
                {cursos.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn>{item.id}</C.TableColumn>
                        <C.TableColumn>{item.descricao}</C.TableColumn>
                        <C.TableColumn><C.Button onClick={() => handleAvaliacoes(item.id)}>Avaliações</C.Button></C.TableColumn>
                        <C.TableColumn><C.Button onClick={() => handleFaltas(item.id)}>Faltas</C.Button></C.TableColumn>
                    </C.TableLine>
                ))}
            </tbody>
        </C.Table>

    );
}