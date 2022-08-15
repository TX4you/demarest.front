import { useState, FormEvent } from "react";
import { AlunosModel } from "../../../types/AlunosModel";
import { CursosModel } from "../../../types/CursosModel";
import * as C from "./styles";
import axios from "../../../utils/axios";
import { AlunosFaltasModel } from "../../../types/AlunosFaltasModel";

type Props = {
    onAdd: (faltas: AlunosFaltasModel) => void;
    aluno: AlunosModel;
    curso: CursosModel;
}

const initialAlunosFaltasModel: AlunosFaltasModel = { alunosId: '', cursosId: ''}

export const InputArea = ({ onAdd, aluno, curso }: Props) => {
          const [faltas, setFaltas] = useState(initialAlunosFaltasModel);
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFaltas({ ...faltas, [name]: value })
    };
   
    const handleSendData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let msg = "";
        let valido = true;
        
        if (faltas.alunosId === "") {
            valido = false;
            msg = "Selecione um aluno";
        }
        if (faltas.cursosId === "") {
            valido = false;
            msg = "Selecione curso";
        }

        let newfaltas: AlunosFaltasModel = {
            alunosId: faltas.alunosId,
            cursosId: faltas.cursosId
        };

        if (valido) {
            onAdd(newfaltas);
        }
        else {
            alert(msg);
        }
    }

    return (
        <C.Container>
            <C.H1>Faltas</C.H1>
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
                <C.Button  type="submit">Adicionar</C.Button>
            </C.form>
        </C.Container>
    );

}

