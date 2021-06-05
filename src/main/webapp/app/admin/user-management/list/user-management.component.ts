import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import {IUser, User} from '../user-management.model';
import {IPonudjaci} from "app/entities/ponudjaci/ponudjaci.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PonudjaciService} from "app/entities/ponudjaci/service/ponudjaci.service";
import {IPonude} from "app/entities/ponude/ponude.model";
import {PonudjaciDeleteDialogComponent} from "app/entities/ponudjaci/delete/ponudjaci-delete-dialog.component";
import {UserManagementService} from "app/admin/user-management/service/user-management.service";
import {UserManagementDeleteDialogComponent} from "app/admin/user-management/delete/user-management-delete-dialog.component";

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
  styleUrls: ['./managment.scss'],
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;

  public displayedColumns = [
   'login',
    'email',
    'activated',
    'authorities',
    'createdBy',
    // 'createdDate',
    // 'lastModifiedDate',
    'delete',
    'edit',

  ];

  public dataSource = new MatTableDataSource<IPonudjaci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserManagementService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  public getAllUsers(): void {
    this.userService.usersAll().subscribe((res: IUser[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  delete(user: IUser[]): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getAllUsers();
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
    this.getAllUsers();
  }
}
