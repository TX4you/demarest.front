import { CriteriosModel } from "../../../types/CriteriosModel";
import { ResultadosModel } from "../../../types/ResultadosModel";
import * as C from "./styles";

type Props = {
    resultado: ResultadosModel[],
    criterios: CriteriosModel[]
}
export const TableArea = ({ resultado, criterios }: Props) => {

    return (
        <C.Table>
            <thead>
            <C.TableHeadLine>
                    <C.TableHeadColumn width={80}>Aluno</C.TableHeadColumn>
                    <C.TableHeadColumn>curso</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Avaliaçõss</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>freq. Minima</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Qtde Aulas</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>faltas</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>media</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>cursos Avaliacoes</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Resultado</C.TableHeadColumn>
            </C.TableHeadLine>
            </thead>
            <tbody>
                {
                 resultado.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn>{item.aluno}</C.TableColumn>
                        <C.TableColumn>{item.curso}</C.TableColumn>
                        <C.TableColumn>{item.avaliacoes}</C.TableColumn>
                        <C.TableColumn>{item.frequenciaMinima}</C.TableColumn>
                        <C.TableColumn>{item.quantidadeAulas}</C.TableColumn>
                        <C.TableColumn>{item.faltas}</C.TableColumn>
                        <C.TableColumn>{item.media}</C.TableColumn>
                        <C.TableColumn>{item.cursosAvaliacoes}</C.TableColumn>
                        <C.TableColumn>
                                    {
                                     ((1 - Number(item.faltas)/Number(item.quantidadeAulas)) * 100) < Number(item.frequenciaMinima) ? "Reprovado":
                                        item.cursosAvaliacoes < item.avaliacoes ? "Em curso" :
                                        criterios.map(option => (
                                            Number(item.media) >= Number(option.valorMinimo) && Number(item.media) <= Number(option.valorMaximo)
                                            ? option.descricao :""
                                            ))
                                    }
                        </C.TableColumn>
                    </C.TableLine>
                ))
            }
            </tbody>
        </C.Table>

    );
}
