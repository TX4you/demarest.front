import { CursosModel } from "../../../types/CursosModel";
import * as C from "./styles";

type Props = {
    cursos: CursosModel[]
}

export const TableArea = ({ cursos }: Props) => {

    return (
        <C.Table>
            <thead>
            <C.TableHeadLine>
                    <C.TableHeadColumn width={80}>Id</C.TableHeadColumn>
                    <C.TableHeadColumn>Descrição</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>exclusivo</C.TableHeadColumn>
                    <C.TableHeadColumn width={180}>Avaliações</C.TableHeadColumn>
                    <C.TableHeadColumn width={100}>freq. Mínima</C.TableHeadColumn>
                    <C.TableHeadColumn width={100}>Qtde de Aulas</C.TableHeadColumn>
            </C.TableHeadLine>
            </thead>
            <tbody>
                {cursos.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn>{item.id}</C.TableColumn>
                        <C.TableColumn>{item.descricao}</C.TableColumn>
                        <C.TableColumn>{item.exclusivo}</C.TableColumn>
                        <C.TableColumn>{item.avaliacoes}</C.TableColumn>
                        <C.TableColumn>{item.frequenciaMinima}</C.TableColumn>
                        <C.TableColumn>{item.quantidadeAulas}</C.TableColumn>
                    </C.TableLine>
                ))}
            </tbody>
        </C.Table>

    );
}
