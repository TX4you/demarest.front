import { CursosModel } from './CursosModel';

export type AlunosModel = {
    id?: string;
    nome: string;
    sobreNome: string;
    cpf: string;
    sexo: string;
    cursos?: CursosModel[];
}
