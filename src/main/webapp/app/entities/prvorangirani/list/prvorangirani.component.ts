import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';

import { IPrvorangirani } from '../prvorangirani.model';
import { PrvorangiraniService } from 'app/entities/prvorangirani/service/prvorangirani.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'jhi-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.scss'],
})
export class PrvorangiraniComponent implements OnChanges, AfterViewInit {
  prvorangiranis?: IPrvorangirani[];
  ukupnaPonudjena?: number | null | undefined;
  ukupnaProcijenjena?: number | null | undefined;
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
  ];

  public dataSource = new MatTableDataSource<IPrvorangirani>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected prvorangiraniService: PrvorangiraniService) {}

  public getAllPrvorangirani(): void {
    this.prvorangiraniService.prvorangiraniAll().subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  public getAllPrvorangiraniPostupak(): void {
    this.prvorangiraniService.findPostupak(this.postupak).subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
    });
  }

  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
    this.ukupnaProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  ngOnChanges(): void {
    this.getAllPrvorangiraniPostupak();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTotalCost(): number {
    return <number>this.prvorangiranis?.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }

}
