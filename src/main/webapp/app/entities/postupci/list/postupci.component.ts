import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';
import { HttpResponse } from '@angular/common/http';
import { PostupciDeleteDialogComponent } from 'app/entities/postupci/delete/postupci-delete-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { PostupciUpdateComponent } from 'app/entities/postupci/update/postupci-update.component';
import * as dayjs from 'dayjs';

@Component({
  selector: 'jhi-postupci',
  templateUrl: './postupci.component.html',
  styleUrls: ['./postupci.component.scss'],
})
export class PostupciComponent implements OnInit, AfterViewInit {
  postupaks?: HttpResponse<IPostupci[]>;

  public displayedColumns = ['sifra postupka', 'opis postupka', 'vrsta postupka', 'datum objave', 'broj tendera', 'delete', 'edit'];
  public dataSource = new MatTableDataSource<IPostupci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected postupciService: PostupciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    public dialog: MatDialog
  ) {}

  loadAll(): void {
    this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
      this.dataSource.data = res.body ?? [];
      this.postupaks = res;
    });
  }
  previousState(): void {
    window.history.back();
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    brojTendera?: string | null,
    opisPostupka?: string,
    vrstaPostupka?: string,
    datumObjave?: dayjs.Dayjs | null
  ): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        brojTendera,
        opisPostupka,
        vrstaPostupka,
        datumObjave,
      },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      val =>
        this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
          this.dataSource.data = res.body ?? [];
          this.postupaks = res;
        })
    );
  }
  addNew(): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: { Postupci: {} },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      val =>
        this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
          this.dataSource.data = res.body ?? [];
          this.postupaks = res;
        })
    );
  }
  delete(postupci: IPostupci[]): void {
    const modalRef = this.modalService.open(PostupciDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postupci = postupci;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
