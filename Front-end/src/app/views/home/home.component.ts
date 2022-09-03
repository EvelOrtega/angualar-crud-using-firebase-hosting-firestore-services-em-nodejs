import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTable } from '@angular/material/table';
import { Subscriber } from 'rxjs';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/services/funcionarios.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FuncionarioService],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = [
    'id',
    'nomeCompleto',
    'idade',
    'contato',
    'departamento',
    'action',
  ];
  dataSource!: Funcionario[];

  constructor(
    public dialog: MatDialog,
    public funcionarioService: FuncionarioService
  ) {
    this.funcionarioService
      .getFuncionarios()
      .subscribe((data: Funcionario[]) => {
        this.dataSource = data;
      });
  }

  ngOnInit(): void {
    console.log(this.dataSource);
  }

  openDialog(element: Funcionario | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data:
        element === null
          ? {
              id: null,
              nomeCompleto: '',
              idade: null,
              contato: '',
              departamento: '',
            }
          : {
              id: element.id,
              nomeCompleto: element.nomeCompleto,
              idade: element.idade,
              contato: element.contato,
              departamento: element.departamento,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        if (this.dataSource.map((p) => p.id).includes(result.id)) {
          this.funcionarioService
            .editFuncionario(result)
            .subscribe((data: Funcionario) => {
              const index = this.dataSource.findIndex((p) => p.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
              window.alert('funcionario editado com sucesso!');
            });
        } else {
          this.funcionarioService
            .createFuncionario(result)
            .subscribe((data: Funcionario) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
          window.alert('funcionario criado com sucesso!');
        }
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  editElement(element: Funcionario): void {
    this.openDialog(element);
  }

  deleteElement(id: any): void {
    this.funcionarioService.deleteFuncionario(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((p) => p.id !== id);
    });
  }
}
