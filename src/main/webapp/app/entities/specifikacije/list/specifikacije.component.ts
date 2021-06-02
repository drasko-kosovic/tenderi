import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { SpecifikacijeDeleteDialogComponent } from '../delete/specifikacije-delete-dialog.component';
import {IPonude} from "app/entities/ponude/ponude.model";
import {Account} from "app/core/auth/account.model";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "app/core/auth/account.service";


@Component({
  selector: 'jhi-specifikacije',
  templateUrl: './specifikacije.component.html',
  styleUrls:['./specifikacije.scss']
})
export class SpecifikacijeComponent implements AfterViewInit, OnChanges, OnInit {
  specifikacijes?: ISpecifikacije[];
  account: Account | null = null;
  authSubscription?: Subscription;
  public displayedColumns = [
    'sifra postupka',
    'broj partije',
    'atc',
    'inn',
    'farmaceutski oblik',
    'jacina lijeka',
    'trazena kolicina',
    'pakovanje',
    'procijenjena vrijednost',
    'delete',
    'edit',
     ];

  public dataSource = new MatTableDataSource<IPonude>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  constructor(
    protected specifikacijaService: SpecifikacijeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  public getSifraPostupka(): void {
    this.specifikacijaService.findSiftraPostupak(this.postupak).subscribe((res: ISpecifikacije[]) => {
      this.dataSource.data = res;
    });
  }

  delete(specifikacije: ISpecifikacije[]): void {
    const modalRef = this.modalService.open(SpecifikacijeDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.specifikacije = specifikacije;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getSifraPostupka();
      }
    });
  }

  // public getAllPonude(): void {
  //   this.ponudeService.ponudeAll().subscribe((res: IPonude[]) => {
  //     this.dataSource.data = res;
  //     // eslint-disable-next-line no-console
  //     console.log(res);
  //   });
  // }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();

  };

  ngOnChanges(): void {
    this.getSifraPostupka();
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
}
