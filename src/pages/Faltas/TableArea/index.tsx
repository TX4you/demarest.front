import { AlunosFaltasModel } from "../../../types/AlunosFaltasModel";
import * as C from "./styles";

type Props = {
    faltas: AlunosFaltasModel[]
}
export const TableArea = ({ faltas }: Props) => {

    return (
        <C.Table>
            <thead>
            <C.TableHeadLine>
                    <C.TableHeadColumn width={80}>Id</C.TableHeadColumn>
                    <C.TableHeadColumn>Aluno</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Curso</C.TableHeadColumn>
            </C.TableHeadLine>
            </thead>
            <tbody>
                {
                 faltas.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn>{item.id}</C.TableColumn>
                        <C.TableColumn>{item.alunosId}</C.TableColumn>
                        <C.TableColumn>{item.cursosId}</C.TableColumn>
                    </C.TableLine>
                ))
            }
            </tbody>
        </C.Table>

    );
}
