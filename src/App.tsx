import * as C from './App.styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { Home }  from './pages/Home';
import  { Alunos }  from './pages/Alunos';
import  { Cursos }  from './pages/Cursos';
import  { Avaliacoes }  from './pages/Avaliacoes';
import  { Resultados }  from './pages/Resultados';
import  { Matriculas }  from './pages/Matriculas';
import { Faltas } from './pages/Faltas';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/alunos' element={<Alunos />} />
                <Route path='/cursos' element={<Cursos />} />
                <Route path='/avaliacoes' element={<Avaliacoes />} />
                <Route path='/resultados' element={<Resultados />} />
                <Route path="/matriculas/:id"  element={<Matriculas />} />
                <Route path='/avaliacoes/:id' element={<Avaliacoes />} />
                <Route path='/faltas/:id' element={<Faltas />} />
                
                <Route path='*' element={'Not found 404'} />
            </Routes>
        </BrowserRouter>
       
    );
}

export default App;
