import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUgovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';
import { UgovorDeleteDialogComponent } from '../delete/ugovor-delete-dialog.component';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { PonudeUpdateComponent } from 'app/entities/ponude/update/ponude-update.component';
import { AddDialogPonudeComponent } from 'app/entities/ponude/add/add.dialog.ponude.component';
import { AddDialogUgovorComponent } from 'app/entities/ugovor/add/add.dialog.ugovor.component';
import { UgovorUpdateComponent } from 'app/entities/ugovor/update/ugovor-update.component';

@Component({
  selector: 'jhi-ugovor',
  templateUrl: './ugovor.component.html',
  styleUrls: ['./ugovor.scss'],
})
export class UgovorComponent implements AfterViewInit, OnChanges, OnInit {
  ugovor?: IUgovor[];
  account: Account | null = null;
  authSubscription?: Subscription;
  id?: number;
  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'broj ugovora',
    'datum ugovora',
    'naziv ponudjaca',
    'delete',
    'edit',
    'print',
    'print-prvorangirani',
  ];

  public dataSource = new MatTableDataSource<IUgovor>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  constructor(
    protected ugovorService: UgovorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService,
    protected dialog: MatDialog
  ) {}

  public getSifraPostupka(): void {
    this.ugovorService.findSiftraPostupak(this.postupak).subscribe((res: IUgovor[]) => {
      this.dataSource.data = res;
    });
  }

  startEdit(
    id?: number,
    brojUgovora?: string,
    datumUgovora?: dayjs.Dayjs,
    brojDatumOdlukeIzbora?: string,
    iznosUgovoraBezPdf?: number,
    sifraPostupka?: number,
    sifraPonude?: number,
    ponudjaci?: IPonudjaci | null
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(UgovorUpdateComponent, {
      data: {
        id,
        brojUgovora,
        datumUgovora,
        brojDatumOdlukeIzbora,
        iznosUgovoraBezPdf,
        sifraPostupka,
        sifraPonude,
        ponudjaci,
      },
    });
  }
  addNew(): any {
    const dialogRef = this.dialog.open(AddDialogUgovorComponent, {
      data: { Ugovore: {} },
    });
  }

  delete(ugovor: IUgovor[]): void {
    const modalRef = this.modalService.open(UgovorDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ugovor = ugovor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getSifraPostupka();
      }
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.getSifraPostupka();
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.getAllPonudjaci();
  }

  printUgovor(broj: string): any {
    this.ugovorService.printReportServiceUgovor(broj).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  public getAllPonudjaci(): void {
    this.ugovorService.ponudjaciAll().subscribe((res: IUgovor[]) => {
      this.ugovor = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  getPrvorangiraniPonude(sifraPostupka: number, sifraPonude: number): any {
    this.ugovorService.getPrvorangiraniPonude(sifraPostupka, sifraPonude).subscribe();
  }

  printUgovorAnex(sifraPostupka: number, sifraPonude: number): any {
    this.ugovorService.printReportAnexiUgovor(sifraPostupka, sifraPonude).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
