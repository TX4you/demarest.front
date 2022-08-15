import { useNavigate } from 'react-router-dom';
import { AlunosModel } from "../../../types/AlunosModel";
import * as C from "./styles";

type Props = {
    alunos: AlunosModel[]
}
export const TableArea = ({ alunos }: Props) => {
    const navigate = useNavigate();
    return (
        <C.Table>
            <thead>
                <C.TableHeadLine>
                    <C.TableHeadColumn width={80}>Id</C.TableHeadColumn>
                    <C.TableHeadColumn>Nome</C.TableHeadColumn>
                    <C.TableHeadColumn width={180}>SobreNome</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>CPF</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Sexo</C.TableHeadColumn>
                    <C.TableHeadColumn width={100}>Matrículas</C.TableHeadColumn>
                    
                    
                </C.TableHeadLine>
            </thead>
            <tbody>
                {alunos.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn>{item.id}</C.TableColumn>
                        <C.TableColumn>{item.nome}</C.TableColumn>
                        <C.TableColumn>{item.sobreNome}</C.TableColumn>
                        <C.TableColumn>{item.cpf}</C.TableColumn>
                        <C.TableColumn>{item.sexo}</C.TableColumn>
                        <C.TableColumn>
                            <C.Button onClick={() => navigate(`/matriculas/${item.id}`)}>Matrículas</C.Button>
                        </C.TableColumn>
                    </C.TableLine>
                ))}
            </tbody>
        </C.Table>

    );
}
