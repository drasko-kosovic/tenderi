import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { IViewVrednovanje } from '../view-vrednovanje.model';
import { ViewVrednovanjeService } from '../service/view-vrednovanje.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'jhi-view-vrednovanje',
  templateUrl: './view-vrednovanje.component.html',
  styleUrls: ['./view-vrednovanje.scss'],
})
export class ViewVrednovanjeComponent implements AfterViewInit, OnChanges {
  viewVrednovanjes?: IViewVrednovanje[];

  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'atc',
    'inn',
    'zasticeni naziv',
    'farmaceutski oblik',
    'jacina lijeka',
    'pakovanje',
    'kolicina',
    'procijenjena vrijednost',
    'ponudjena vrijednost',
    'rok isporuke',
    'naziv ponudjaca',
    'naziv proizvodjaca',
    'bod cijena',
    'bod rok',
    'bod ukupno',
  ];
  public dataSource = new MatTableDataSource<IViewVrednovanje>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;

  constructor(protected vrednovanjeService: ViewVrednovanjeService) {}

  public getAllVrednovanjei(): void {
    this.vrednovanjeService.vrednovanjeAll().subscribe((res: IViewVrednovanje[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  public getAllPostupciVrednovanjei(): void {
    this.vrednovanjeService.findPostupak(this.postupak).subscribe((res: IViewVrednovanje[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngOnChanges(): void {
    this.getAllPostupciVrednovanjei();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
