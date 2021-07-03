import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPonudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { PonudjaciDeleteDialogComponent } from '../delete/ponudjaci-delete-dialog.component';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogPonudjaciComponent } from 'app/entities/ponudjaci/add/add.dialog.ponudjaci.component';
import { PonudjaciUpdateComponent } from 'app/entities/ponudjaci/update/ponudjaci-update.component';
import * as dayjs from 'dayjs';
import { PostupciUpdateComponent } from 'app/entities/postupci/update/postupci-update.component';
import { HttpResponse } from '@angular/common/http';
import { IPostupci } from 'app/entities/postupci/postupci.model';

@Component({
  selector: 'jhi-ponudjaci',
  templateUrl: './ponudjaci.component.html',
  styleUrls: ['./ponudjaci.scss'],
})
export class PonudjaciComponent implements AfterViewInit, OnInit {
  ponudjacis?: HttpResponse<IPostupci[]>;
  account: Account | null = null;
  authSubscription?: Subscription;
  id?: number;
  public displayedColumns = ['id', 'naziv ponudjaca', 'odgovorno lice', 'adresa ponudjaca', 'banka racun', 'delete', 'edit'];

  public dataSource = new MatTableDataSource<IPonudjaci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  public getAllPonudjaci(): void {
    this.ponudjaciService.ponudjaciAll().subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
      // this.ponudjacis = res;
    });
  }

  previousState(): void {
    window.history.back();
  }

  delete(ponudjaci: IPonudjaci[]): void {
    const modalRef = this.modalService.open(PonudjaciDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ponudjaci = ponudjaci;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getAllPonudjaci();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.getAllPonudjaci();
  }

  startEdit(id?: number, nazivPonudjaca?: number, odgovornoLice?: string | null, adresaPonudjaca?: string, bankaRacun?: string): any {
    this.id = id;
    const dialogRef = this.dialog.open(PonudjaciUpdateComponent, {
      data: {
        id,
        nazivPonudjaca,
        odgovornoLice,
        adresaPonudjaca,
        bankaRacun,
      },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      val =>
        this.ponudjaciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
          this.dataSource.data = res.body ?? [];
          this.ponudjacis = res;
        })
    );
  }

  addNew(): any {
    const dialogRef = this.dialog.open(PonudjaciUpdateComponent, {
      data: { Ponudjaci: {} },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      val =>
        this.ponudjaciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
          this.dataSource.data = res.body ?? [];
          this.ponudjacis = res;
        })
    );
  }
}
