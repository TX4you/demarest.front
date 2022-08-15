import * as C from "./styles";
import { MenuArea } from '../../components/menu';

export const Home = () => {
    return (
        <C.Container>
            <C.Header>
                <C.HeaderInfo>Escola de idiomas</C.HeaderInfo>
            </C.Header>
            <C.Body>
                <MenuArea />

                <h1>Teste Demarest</h1>
                <p>
                    Seu João tem uma escola de idiomas de médio porte e
                    gostaria de um pequeno sistema que permita controlar as notas dos alunos nas provas.
                Conversamos com eles e levantamos as seguintes regras:
                </p>
                
                <h5>
                    1 - A escola possui cursos de vários idiomas (inglês, espanhol, alemão etc);<br />
                    2 - Alunos podem participar em mais de um curso, menos os de alemão<br />
                    3 - Cada estágio possui no mínimo 2 provas<br />
                    4 - Os critérios de aprovação são:
                </h5>
                <h6>
                    - Média 7,5 ou mais: Aprovado <br />
                    - Média abaixo de 6: Reprovado <br />
                    - Média entre 6 e 7,5: Conselho
                </h6>
                <h5>
                    5 - Alunos com menos de 75% de presença serão reprovados automaticamente.
                </h5>
            </C.Body>
        </C.Container>
    );
}

