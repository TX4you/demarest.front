import { AlunosModel } from './AlunosModel';
import { CursosModel } from './CursosModel';

export type AlunosFaltasModel = {
    id?: string;
    cursosId: string;
    alunosId: string;
    curso?: CursosModel;
    aluno?: AlunosModel;
}
