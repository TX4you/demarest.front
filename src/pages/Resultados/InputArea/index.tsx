import { useState, FormEvent } from "react";
import { AlunosModel } from "../../../types/AlunosModel";
import * as C from "./styles";

type Props = {
    onSelect: (alunoSelect: AlunosModel) => void;
    aluno: AlunosModel[];
}

export const InputArea = ({ onSelect, aluno }: Props) => {
    const formData: AlunosModel = {id:"",nome:"",sobreNome:"",cpf:"",sexo:""}
    const [alunoSelect, setAlunoSelect] = useState<AlunosModel>(formData);
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setAlunoSelect({ ...alunoSelect, [name]: value })
    };
   
    const handleSendData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let msg = "";
        let valido = true;
        
        if (alunoSelect.id === "") {
            valido = false;
            msg = "Selecione um aluno";
        }
       
        let newAluno: AlunosModel = {
            id: alunoSelect.id, nome: "", sobreNome: "", cpf: "", sexo: ""         
        };

        if (valido) {
           onSelect(newAluno);
        }
        else {
            alert(msg);
        }
    }

    return (
        <C.Container>
            <C.H1>Resultado</C.H1>
            <C.form method="POST" onSubmit={handleSendData}>
                
                <C.Select id="id" name="id" tamanho={200} onChange={selectChange}>
                    <option key="0" value="0">
                        Selecione um Aluno
                    </option>
                    {aluno.map(option => (
                        <option key={option?.id + option?.nome} value={option?.id}>
                            {option.nome}
                        </option>
                    ))}
                </C.Select>
                <C.Button  type="submit">Consultar</C.Button>
            </C.form>
        </C.Container>
    );

}

