import { AlunosModel } from './AlunosModel';
import { CursosModel } from './CursosModel';

export type CursosAvaliacoesModel = {
    id?: string;
    cursosId: string;
    alunosId: string;
    nota: string;
    curso?: CursosModel;
    aluno?: AlunosModel;
}
