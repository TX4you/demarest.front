import { useState, FormEvent } from "react";
import { AlunosModel } from "../../../types/AlunosModel";
import * as C from "./styles";

type Props = {
    onAdd: (aluno: AlunosModel) => void;
}
const initialAlunosModel: AlunosModel = { nome: '', sobreNome: '', cpf: '', sexo: '' }

export const InputArea = ({ onAdd }: Props) => {
    const [aluno, setaluno] = useState(initialAlunosModel);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setaluno({ ...aluno, [name]: value })
    }

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setaluno({ ...aluno, [name]: value })
    };

    const handleSendData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let msg = "";
        let valido = true;

        if(aluno.nome ===""){
            valido = false;
            msg = "Nome do Aluno";
        }
        if(aluno.sobreNome ===""){
            valido = false;
            msg = "sobreNome do Aluno";
        }
        if(aluno.cpf ===""){
            valido = false;
            msg = "cpf do Aluno";
        }
        if(aluno.sexo ===""){
            valido = false;
            msg = "sexo do Aluno";
        }
        let newAluno: AlunosModel = {
            nome: aluno.nome,
            sobreNome: aluno.sobreNome,
            cpf: aluno.cpf,
            sexo: aluno.sexo
        };
       
        if (valido) {
            onAdd(newAluno);
            setaluno(initialAlunosModel);
        }
        else {
            alert(msg);
        }
    }

    const options = [
        { value: '', text: '--Sexo--' },
        { value: 'Masculino', text: 'Masculino' },
        { value: 'Feminino', text: 'Feminino' },
    ];

    return (
        <C.Container>
            <C.H1>Alunos</C.H1>
            <C.form method="POST" onSubmit={handleSendData}>
                <C.Input id="nome" name="nome" placeholder="Nome" tamanho={15} value={aluno.nome} onChange={(e) => inputChangeHandler(e)} />
                <C.Input id="sobreNome" name="sobreNome" placeholder="SobreNome" tamanho={15} value={aluno.sobreNome} onChange={(e) => inputChangeHandler(e)} />
                <C.Input id="cpf" name="cpf" placeholder="Cpf" tamanho={15} value={aluno.cpf} onChange={(e) => inputChangeHandler(e)} />
                
                <C.Select id="sexo" name="sexo" tamanho={200} value={aluno.sexo} onChange={selectChange}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </C.Select>

                <C.Button type="submit">Adicionar</C.Button>
            </C.form>
        </C.Container>
    );

}

