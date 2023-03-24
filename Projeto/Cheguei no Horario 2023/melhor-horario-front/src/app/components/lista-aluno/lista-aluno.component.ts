
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent {
  public alunos: any[] = [];
  public displayedColumns: string[] = ['id', 'nome', 'acoes'];

  public formulario: FormGroup;

  constructor(
    private alunoService: AlunoService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listarAlunos();
  };

  listarAlunos() {
    this.alunoService.getAlunos().subscribe({
      next: (data) => {
        console.log(data.data);
        this.alunos = data.data;
      },
      error: (error) => {
        console.error("Erro na busca de alunos:");
        console.error(error);
      },
      complete: () => {
        console.log('Consulta de alunos concluída');
      },
    });
  }

  adicionarAluno(){
    console.log(this.formulario.value.nome);
    const aluno = {
      nome: this.formulario.value.nome
    }
    this.alunoService.createAluno(aluno).subscribe({
      next: (data) => {
        console.log(data.data);
      },
      error: (error) => {
        console.error("Erro na criação do aluno:");
        console.error(error);
      },
      complete: () => {
        console.log('Criação do aluno concluída');
        this.listarAlunos();
      },
    });
  }

  deletarAluno(idAluno: string){
    console.log(idAluno);
    this.alunoService.deleteAlunoPorId(idAluno).subscribe({
      next: (data) => {
        console.log(data.data);
      },
      error: (error) => {
        console.error("Erro ao deletar aluno:");
        console.error(error);
      },
      complete: () => {
        console.log('Exclusão de aluno concluída');
        this.listarAlunos();
      },
    });
  }

}
