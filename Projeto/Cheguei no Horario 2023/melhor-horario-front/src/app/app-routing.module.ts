import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeComponent } from './components/grade/grade.component';
import { ListaAlunoComponent } from './components/lista-aluno/lista-aluno.component';
import { ListaDisciplinaComponent } from './components/lista-disciplina/lista-disciplina.component';
import { ListaLinhaComponent } from './components/lista-linha/lista-linha.component';
import { ListaSemestreComponent } from './components/lista-semestre/lista-semestre.component';

const routes: Routes = [
  {path: 'aluno', component: ListaAlunoComponent},
  {path: 'linha', component: ListaLinhaComponent},
  {path: 'semestre', component: ListaSemestreComponent},
  {path: 'disciplina', component: ListaDisciplinaComponent},
  {path: 'grade', component: GradeComponent},
  {path: '', redirectTo: '/aluno', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
