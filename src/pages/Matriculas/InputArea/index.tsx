import { useEffect, useState, FormEvent } from "react";
import { AlunosModel } from "../../../types/AlunosModel";
import { CursosModel } from "../../../types/CursosModel";
import { MatriculasModel } from "../../../types/MatriculasModel";
import * as C from "./styles";
import axios from "../../../utils/axios";

type Props = {
    onAdd: (matricula: MatriculasModel) => void;
    aluno: AlunosModel;
    cursos: CursosModel[];
}

export const InputArea = ({ onAdd, aluno, cursos }: Props) => {
    const formData: MatriculasModel = { alunosId: "", cursosId: "" }
    const [matriculas, setMatriculas] = useState<MatriculasModel>(formData);
   
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setMatriculas({ ...matriculas, [name]: value })
    };

    const handleSendData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let msg = "";
        let valido = true;

        if (matriculas.cursosId === "") {
            alert("Selecione um curso");
        }
        else {
            let newMatricula: MatriculasModel = {
                alunosId: aluno?.id?.toString(),
                cursosId: matriculas.cursosId
            };
            
            aluno?.cursos?.forEach(element => {
                if (Number(newMatricula.cursosId) === Number(element.id)) {
                    valido = false;
                    msg = 'Curso já cadastrado para esse Aluno';
                }
                else if (element.exclusivo === "Sim") {
                    valido = false
                    msg = 'Este aluno está matriculado em um curso Exclusivo!';
                }
            });

            let totalMatriculas: number = aluno.cursos?.length ? aluno.cursos?.length : 0;
            let result = cursos.filter(item =>  Number(item.id)  === Number(newMatricula.cursosId));
            
            
            result.forEach(e => {
                if (e.exclusivo === "Sim" && totalMatriculas > 0)
                {
                    valido = false
                    msg = 'Este aluno já possuin matrículas, não é possível adicionar curso Exclusivo!';
                }   
            });

            if (valido) {
                onAdd(newMatricula);
                setMatriculas({ alunosId: "" , cursosId: ""});
            }
            else {
                alert(msg);
            }
        }
    }

    return (
        <C.Container>
            <C.H1>Matrículas</C.H1>
            <C.form method="POST" onSubmit={handleSendData}>
                <C.Select id="nome" name="nome" tamanho={150} onChange={selectChange}>
                    <option key={aluno.id} value={aluno.id}>
                        {aluno.nome}
                    </option>
                </C.Select>

                <C.Select id="descricao" name="cursosId" tamanho={200} onChange={selectChange}>
                    <option key="0" value="0">
                        Selecione um curso
                    </option>
                    {cursos.map(option => (
                        <option key={option?.id} value={option?.id}>
                            {option.descricao}
                        </option>
                    ))}
                </C.Select>

                <C.Button type="submit">Adicionar</C.Button>
            </C.form>
        </C.Container>
    );

}
