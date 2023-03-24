import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { LinhaService } from 'src/app/services/linha.service';
import { SemestreService } from 'src/app/services/semestre.service';
interface DiasDaSemana {
  [key: string]: Disciplina[];
  Segunda: any[];
  Terça: any[];
  Quarta: any[];
  Quinta: any[];
  Sexta: any[];
}

interface Disciplina {
  diaSemana: string;
}
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent {
  public idAluno: string = "";
  public idSemestre: string = "";
  public nomeSemestre: string = "";
  public alunos: any[] = [];
  public semestres: any[] = [];
  public disciplinasAluno: any[] = [];

  // MAT TABLE
  public disciplinasSemestre: any[] = [];
  public dataSource: any[] = [];
  public displayedColumns: string[] = ['horario', 'segunda', 'terca', 'quarta', 'quinta', 'sexta'];

  constructor(
    private alunoService: AlunoService,
    private semestreService: SemestreService,
    private disciplinaService: DisciplinaService,
    private linhaService: LinhaService,
  ) { }

  ngOnInit() {
    this.listarAlunos();
    this.listarSemestres();
    //teste:
    // this.idAluno = "1";
    // this.idSemestre = "1";
    // this.filterChanged();
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

  listarDisciplinasSemestre() {
    if (this.idSemestre != "") {
      this.disciplinaService.getDisciplinasSemestre(this.idSemestre).subscribe({
        next: (data) => {
          ///buscas as disciplinas daquele semestre
          console.log(data);
          this.disciplinasAluno = data;
        },
        error: (error) => {
          console.error("Erro na busca de disciplinas de um aluno por semestre:");
          console.error(error);
        },
        complete: () => {
          console.log('Consulta de disciplinas de um aluno por semestre concluída');
        },
      });
    }
  }

  filterChanged() {
    this.dataSource = [];
    if (this.idAluno != "" && this.idSemestre != "") {
      this.nomeSemestre = this.semestres.filter(s => s.id === this.idSemestre)[0].nome;

      this.disciplinaService.getDisciplinasAlunoSemestre(this.idAluno, this.idSemestre).subscribe({
        next: (data) => {
          //buscas as disciplinas daquele aluno naquele semestre
          console.log(data);
          this.disciplinasSemestre = data;
        },
        error: (error) => {
          console.error("Erro na busca de disciplinas de um aluno por semestre:");
          console.error(error);
        },
        complete: () => {
          console.log('Consulta de disciplinas de um aluno por semestre concluída');
          this.organizaDisciplinas(this.disciplinasSemestre);
        },
      });
    }
  }

  organizaDisciplinas(disciplinas: any[]) {
    let disciplinasOrdenadas = disciplinas.sort((a, b) => {
      return a.horario.localeCompare(b.horario);
    });

    disciplinasOrdenadas.map(disciplina => {
      this.linhaService.melhorLinhaHorario(disciplina.horario).subscribe({
        next: (data) => {
          // console.log(data);
          disciplina.melhorLinha = data.linha + " - " + data.horario;
          
          console.log(disciplina.melhorLinha);
        },
        error: (error) => {
          console.error("Erro na busca de disciplinas de um aluno por semestre:");
          console.error(error);
        },
        complete: () => {
          console.log('Consulta de disciplinas de um aluno por semestre concluída');
        },
      });
    });

    let diasDaSemana: DiasDaSemana = {
      "Segunda": [],
      "Terça": [],
      "Quarta": [],
      "Quinta": [],
      "Sexta": [],
    };

    disciplinasOrdenadas.forEach(disciplina => {
      diasDaSemana[disciplina.diaSemana] = disciplina;
    });

    this.dataSource = [];

    disciplinasOrdenadas.forEach(disciplina => {
      let hora = disciplina.horario;
    
      if (!this.dataSource.some(item => item.horario === hora)) {
        this.dataSource.push({
          horario: hora,
          Segunda: {},
          Terca: {},
          Quarta: {},
          Quinta: {},
          Sexta: {},
        });
      }
    
      this.dataSource.forEach(item => {
        if (item.horario === hora) {
          item[disciplina.diaSemana] = disciplina;
        }
      });
    });

    console.log("this.dataSource")
    console.log(this.dataSource);
  }



}