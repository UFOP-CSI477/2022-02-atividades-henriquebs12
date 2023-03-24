import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SemestreService } from 'src/app/services/semestre.service';

@Component({
  selector: 'app-lista-semestre',
  templateUrl: './lista-semestre.component.html',
  styleUrls: ['./lista-semestre.component.css']
})
export class ListaSemestreComponent {
  public semestres: any[] = [];
  public displayedColumns: string[] = ['id', 'nome', 'acoes'];

  public formulario: FormGroup;

  constructor(
    private semestreService: SemestreService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listarSemestres();
  };

  listarSemestres() {
    this.semestreService.getSemestres().subscribe({
      next: (data) => {
        //buscas quantas disciplinas tem naquele semestre
        console.log(data);
        this.semestres = data;
      },
      error: (error) => {
        console.error("Erro na busca de semestres:");
        console.error(error);
      },
      complete: () => {
        console.log('Consulta de semestres concluída');
      },
    });
  }

  adicionarSemestre(){
    console.log(this.formulario.value.nome);
    const semestre = {
      nome: this.formulario.value.nome,
    }
    const aluno = {}
    this.semestreService.createSemestre(semestre).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Erro na criação do semestre:");
        console.error(error);
      },
      complete: () => {
        console.log('Criação do semestre concluída');
        this.listarSemestres();
      },
    });
  }

  deletarSemestre(idSemestre: string){
    console.log(idSemestre);
    this.semestreService.deleteSemestrePorId(idSemestre).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Erro ao deletar semestre:");
        console.error(error);
      },
      complete: () => {
        console.log('Exclusão de semestre concluída');
        this.listarSemestres();
      },
    });
  }

}
