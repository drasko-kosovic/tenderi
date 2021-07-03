import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IUser, User } from '../user-management.model';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserManagementService } from 'app/admin/user-management/service/user-management.service';
import { UserManagementDeleteDialogComponent } from 'app/admin/user-management/delete/user-management-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { PostupciUpdateComponent } from 'app/entities/postupci/update/postupci-update.component';
import { HttpResponse } from '@angular/common/http';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { UserManagementUpdateComponent } from 'app/admin/user-management/update/user-management-update.component';

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
  styleUrls: ['./managment.scss'],
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  id?: number;
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
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  public getAllUsers(): void {
    this.userService.usersAll().subscribe((res: IUser[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }
  previousState(): void {
    window.history.back();
  }
  startEdit(
    id?: number,
    login?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    activated?: boolean,
    langKey?: string,
    authorities?: string[],
    createdBy?: string,
    createdDate?: Date,
    lastModifiedBy?: string,
    lastModifiedDate?: Date
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(UserManagementUpdateComponent, {
      data: {
        id,
        login,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        authorities,
        createdBy,
        createdDate,
        lastModifiedBy,
        lastModifiedDate,
      },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      val =>
        this.userService.query().subscribe((res: HttpResponse<IUser[]>) => {
          this.dataSource.data = res.body ?? [];
        })
    );
  }
  addNew(): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: { User: {} },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      val =>
        this.userService.query().subscribe((res: HttpResponse<IUser[]>) => {
          this.dataSource.data = res.body ?? [];
        })
    );
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
