import { CursosAvaliacoesModel } from "../../../types/CursosAvaliacoesModel";
import * as C from "./styles";

type Props = {
    avaliacoes: CursosAvaliacoesModel[]
}
export const TableArea = ({ avaliacoes }: Props) => {

    return (
        <C.Table>
            <thead>
            <C.TableHeadLine>
                    <C.TableHeadColumn width={80}>Id</C.TableHeadColumn>
                    <C.TableHeadColumn>Aluno</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Curso</C.TableHeadColumn>
                    <C.TableHeadColumn width={180}>Nota</C.TableHeadColumn>
            </C.TableHeadLine>
            </thead>
            <tbody>
                {
                 avaliacoes.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn>{item.id}</C.TableColumn>
                        <C.TableColumn>{item.aluno?.nome}</C.TableColumn>
                        <C.TableColumn>{item.curso?.descricao}</C.TableColumn>
                        <C.TableColumn>{item.nota}</C.TableColumn>
                    </C.TableLine>
                ))
            }
            </tbody>
        </C.Table>

    );
}
