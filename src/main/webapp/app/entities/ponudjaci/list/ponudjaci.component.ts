import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPonudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { PonudjaciDeleteDialogComponent } from '../delete/ponudjaci-delete-dialog.component';
import {IPonude} from "app/entities/ponude/ponude.model";
import {Account} from "app/core/auth/account.model";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "app/core/auth/account.service";

@Component({
  selector: 'jhi-ponudjaci',
  templateUrl: './ponudjaci.component.html',
  styleUrls:['./ponudjaci.scss']
})
export class PonudjaciComponent implements AfterViewInit, OnInit {
  ponudjacis?: IPonudjaci[];
  account: Account | null = null;
  authSubscription?: Subscription;

  public displayedColumns = [
    'id',
    'naziv ponudjaca',
    'odgovorno lice',
    'adresa ponudjaca',
    'banka racun',
    'delete',
    'edit',
  ];

  public dataSource = new MatTableDataSource<IPonudjaci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected ponudjaciService:PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  public getAllPonudjaci(): void {
    this.ponudjaciService.ponudjaciAll().subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
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
}
