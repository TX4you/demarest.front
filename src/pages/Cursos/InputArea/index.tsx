import { useState, FormEvent } from "react";
import { CursosModel } from "../../../types/CursosModel";
import * as C from "./styles";

type Props = {
    onAdd: (curso: CursosModel) => void;
    cursosCadastrados: CursosModel[];
}
const initialCursosModel: CursosModel = { descricao: '', exclusivo: '', avaliacoes: '', frequenciaMinima: '', quantidadeAulas: '' }

export const InputArea = ({ onAdd, cursosCadastrados }: Props) => {
    const [curso, setCurso] = useState(initialCursosModel);

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setCurso({ ...curso, [name]: value })
    };

    const handleSendData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let msg = "";
        let valido = true;

        if (curso.descricao === "") {
            valido = false;
            msg = "Selecione um curso";
        }
        if (curso.exclusivo === "") {
            valido = false;
            msg = "Selecione exclisivo";
        }
        if (curso.avaliacoes === "") {
            valido = false;
            msg = "Selecione uma avaliação";
        }
        if (curso.frequenciaMinima === "") {
            valido = false;
            msg = "Selecione uma frequência";
        }
        if (curso.quantidadeAulas === "") {
            valido = false;
            msg = "Selecione uma qtde de aula";
        }

        let newcurso: CursosModel = {
            descricao: curso.descricao,
            exclusivo: curso.exclusivo,
            avaliacoes: curso.avaliacoes,
            frequenciaMinima: curso.frequenciaMinima,
            quantidadeAulas: curso.quantidadeAulas
        };

        cursosCadastrados.forEach(element => {
            if (newcurso.descricao === element.descricao) {
                valido = false;
                msg = 'Curso já cadastrado.';
            }
        });

        if (valido) {
            onAdd(newcurso);
            setCurso(initialCursosModel);
        }
        else {
            alert(msg);
        }

    }

    const optionDescricao = [
        { value: '', text: '--Curso--' },
        { value: 'Inglês', text: 'Inglês' },
        { value: 'Espanhol', text: 'Espanhol' },
        { value: 'Francês', text: 'Francês' },
        { value: 'Alemão', text: 'Alemão' },
        { value: 'Arabe', text: 'Arabe' },
    ];

    const optionAvaliacoes = [
        { value: '', text: '--Avaliações--' },
        { value: 2, text: 2 },
        { value: 4, text: 4 },
    ];

    const optionFrequenciaMinima = [
        { value: '', text: '--Frequência Mínima--' },
        { value: 50, text: 50 },
        { value: 75, text: 75 },
    ];
    const optionQuantidadeAulas = [
        { value: '', text: '--Quantidade de Aulas--' },
        { value: 10, text: 10 },
        { value: 20, text: 20 },
        { value: 30, text: 30 },
        { value: 50, text: 50 },
    ];
    const options = [
        { value: '', text: '--Exclusivo--' },
        { value: 'Sim', text: 'Sim' },
        { value: 'Não', text: 'Não' },
    ];

    return (
        <C.Container>
            <C.H1>cursos</C.H1>
            <C.form method="POST" onSubmit={handleSendData}>
                <C.Select id="descricao" name="descricao" value={curso.descricao} tamanho={150} onChange={selectChange}>
                    {optionDescricao.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </C.Select>
                <C.Select id="avaliacoes" name="avaliacoes" value={curso.avaliacoes} tamanho={150} onChange={selectChange}>
                    {optionAvaliacoes.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </C.Select>
                <C.Select id="frequenciaMinima" name="frequenciaMinima" value={curso.frequenciaMinima} tamanho={200} onChange={selectChange}>
                    {optionFrequenciaMinima.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </C.Select>
                <C.Select id="quantidadeAulas" name="quantidadeAulas" value={curso.quantidadeAulas} tamanho={200} onChange={selectChange}>
                    {optionQuantidadeAulas.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </C.Select>
                <C.Select id="exclusivo" name="exclusivo" value={curso.exclusivo} tamanho={200} onChange={selectChange}>
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

