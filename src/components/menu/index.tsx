import { useNavigate } from 'react-router-dom';
import * as C from './styles';

export const MenuArea = () => {
    const navigate = useNavigate();
    const handleHome = () => { navigate("/"); }
    const handleAlunos = () => { navigate("/alunos") }
    const handleCursos = () => { navigate("/cursos") }
    const handleResultados = () => { navigate("/resultados") }
    
    return (
        <C.Container>
            <C.ButtonsWrapper>
                <C.Button onClick={handleHome}>Home</C.Button>
                <C.Button onClick={handleAlunos}>Alunos</C.Button>
                <C.Button onClick={handleCursos}>Cursos</C.Button>
                <C.Button onClick={handleResultados}>Resultados</C.Button>
            </C.ButtonsWrapper>
        </C.Container>
    );
}
