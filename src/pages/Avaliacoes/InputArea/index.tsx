import { useState, FormEvent } from "react";
import { AlunosModel } from "../../../types/AlunosModel";
import { CursosModel } from "../../../types/CursosModel";
import * as C from "./styles";
import axios from "../../../utils/axios";
import { CursosAvaliacoesModel } from "../../../types/CursosAvaliacoesModel";

type Props = {
    onAdd: (avaliacao: CursosAvaliacoesModel) => void;
    aluno: AlunosModel;
    curso: CursosModel;
}

export const InputArea = ({ onAdd, aluno, curso }: Props) => {
          
    const formData: CursosAvaliacoesModel = { alunosId: "", cursosId: "", nota: "" }
    const [avaliacao, setAvaliacao] = useState<CursosAvaliacoesModel>(formData);
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setAvaliacao({ ...avaliacao, [name]: value })
    };

    const optionNotas = [
        { value: '', text: '--Nota--' },
        { value: 1, text: 1 },
        { value: 1.5, text: 1.5 },
        { value: 2, text: 2 },
        { value: 2.5, text: 2.5 },
        { value: 3, text: 3 },
        { value: 3.5, text: 3.5 },
        { value: 4, text: 4 },
        { value: 4.5, text: 4.5 },
        { value: 5, text: 5 },
        { value: 5.5, text: 5.5 },
        { value: 6, text: 6 },
        { value: 6.5, text: 6.5 },
        { value: 7, text: 7 },
        { value: 7.5, text: 7.5 },
        { value: 8, text: 8 },
        { value: 8.5, text: 8.5 },
        { value: 9, text: 9 },
        { value: 9.5, text: 9.5 },
        { value: 10, text: 10 },
    ];

   
    const handleSendData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let msg = "";
        let valido = true;
        
        if (avaliacao.alunosId === "") {
            valido = false;
            msg = "Selecione um aluno";
        }
        if (avaliacao.cursosId === "") {
            valido = false;
            msg = "Selecione curso";
        }
        if (avaliacao.nota === "") {
            valido = false;
            msg = "Selecione nota";
        }

        let newavaliacao: CursosAvaliacoesModel = {
            alunosId: avaliacao.alunosId,
            cursosId: avaliacao.cursosId,
            nota: avaliacao.nota
        };

        if(!msg){
            const cursoDadosResponse = await axios.get<CursosModel>("/api/v1/Cursos/" + avaliacao.cursosId);
            const cursoDados: CursosModel = cursoDadosResponse.data;
            const cursoDadosAvaliacoesResponse = await axios.get<CursosAvaliacoesModel[]>("/api/v1/CursosAvaliacoes/GetByAlunoIdCursoId/" + avaliacao.alunosId + "/" + avaliacao.cursosId);
            const cursoDadosAvaliacoes: CursosAvaliacoesModel[] = cursoDadosAvaliacoesResponse.data;
    
            if (Number(cursoDadosAvaliacoes.length) >= Number(cursoDados.avaliacoes)) {
                valido = false;
                msg = "Todas avaliação já realizada";
            }
        }

        if (valido) {
            
            onAdd(newavaliacao);
        }
        else {
            alert(msg);
        }
    }

    return (
        <C.Container>
            <C.H1>Avaliações</C.H1>
            <C.form method="POST" onSubmit={handleSendData}>
                <C.Select 
                  id="alunosId" name="alunosId" tamanho={200} onChange={selectChange}>
                    <option key="0" value={"0"} >
                        Selecione o aluno
                    </option>
                    <option key={aluno.id} value={aluno.id}>
                        {aluno.nome}
                    </option>
                </C.Select>

                <C.Select id="cursosId" name="cursosId" tamanho={200} onChange={selectChange}>
                    <option key="0" value="0">
                        Selecione o curso
                    </option>
                    <option key={curso?.id} value={curso?.id}>
                        {curso.descricao}
                    </option>
                </C.Select>
                <C.Select id="nota" name="nota" tamanho={150} onChange={selectChange}>
                    {optionNotas.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </C.Select>
                <C.Button  type="submit">Adicionar</C.Button>
            </C.form>
        </C.Container>
    );

}

