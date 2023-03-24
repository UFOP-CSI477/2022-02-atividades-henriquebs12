import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-detalhar-linha',
  templateUrl: './detalhar-linha.component.html',
  styleUrls: ['./detalhar-linha.component.css']
})
export class DetalharLinhaComponent {
  public idLinha: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: { idLinha: string },
    private dialogRef: MatDialogRef<DetalharLinhaComponent>,
    private horarioService: HorarioService,
    private formBuilder: FormBuilder) {
    this.idLinha = data.idLinha;
    this.formulario = this.formBuilder.group({
      horario: ['', Validators.required],
    });
  }

  public horarios: any[] = [];
  public displayedColumns: string[] = ['dia', 'horario', 'acoes'];

  public formulario: FormGroup;

  ngOnInit() {
    this.listarHorariosPorLinha();
  };

  listarHorariosPorLinha() {
    this.horarioService.getHorariosPorLinha(this.idLinha).subscribe({
      next: (data) => {
        console.log(data);
        this.horarios = data;
        this.horarios = this.horarios.sort((a, b) => {
          return a.horario.localeCompare(b.horario);
        });
      },
      error: (error) => {
        console.error("Erro na busca de horarios:");
        console.error(error);
      },
      complete: () => {
        console.log('Consulta de horarios concluída');
      },
    });
  }

  adicionarHorario() {
    console.log(this.formulario.value.horario);
    let horas = this.formulario.value.horario;
    let novos: any[] = [];
    const weekdays = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta"];

    for (let i = 0; i < weekdays.length; i++) {
      let horario = {
        dia: weekdays[i],
        horario: horas,
        linhaId: this.idLinha
      };
      novos.push(horario);
    }
    
    const observables = novos.map((horario) =>
      this.horarioService.createHorario(horario)
    );

    forkJoin(observables).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Erro na busca dos detalhes dos pokemons:");
        console.error(error);
      },
      complete: () => {
        console.log('Consulta dos detalhes dos Pokemons da pagina concluída:');
        this.listarHorariosPorLinha();
      },
    });
    
  }

  deletarHorario(idHorario: string) {
    console.log(idHorario);
    this.horarioService.deleteHorarioPorId(idHorario).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Erro ao deletar horario:");
        console.error(error);
      },
      complete: () => {
        console.log('Exclusão de horario concluída');
        this.listarHorariosPorLinha();
      },
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    this.dialogRef.close();
  }
}
