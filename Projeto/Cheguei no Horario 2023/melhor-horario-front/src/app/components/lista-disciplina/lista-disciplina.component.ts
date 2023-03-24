import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-lista-disciplina',
  templateUrl: './lista-disciplina.component.html',
  styleUrls: ['./lista-disciplina.component.css']
})
export class ListaDisciplinaComponent {
  public disciplinas: any[] = [];
  public displayedColumns: string[] = ['id', 'nome', 'nome-curto', 'acoes'];

  public formulario: FormGroup;

  constructor(
    private disciplinaService: DisciplinaService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      nomeCurto: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listarDisciplinas();
  };


  listarDisciplinas() {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data) => {
        console.log(data);
        this.disciplinas = data;
      },
      error: (error) => {
        console.error("Erro na busca de disciplinas:");
        console.error(error);
      },
      complete: () => {
        console.log('Consulta de disciplinas concluída');
      },
    });
  }

  adicionarDisciplina(){
    console.log(this.formulario.value.nome);
    const disciplina = {
      nome: this.formulario.value.nome,
      nome_curto: this.formulario.value.nomeCurto
    }
    this.disciplinaService.createDisciplina(disciplina).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Erro na criação do disciplina:");
        console.error(error);
      },
      complete: () => {
        console.log('Criação do disciplina concluída');
        this.listarDisciplinas();
      },
    });
  }

  deletarDisciplina(idDisciplina: string){
    console.log(idDisciplina);
    this.disciplinaService.deleteDisciplinaPorId(idDisciplina).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Erro ao deletar disciplina:");
        console.error(error);
      },
      complete: () => {
        console.log('Exclusão de disciplina concluída');
        this.listarDisciplinas();
      },
    });
  }

  detalharDisciplina(idDisciplina: string){
    console.log(idDisciplina);
    //todo: chamar modal passando id por parametro
  }
}
