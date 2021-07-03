import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LANGUAGES } from 'app/config/language.constants';
import { User } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
  styleUrls: ['./update-managment.scss'],
})
export class UserManagementUpdateComponent implements OnInit {
  user!: User;
  languages = LANGUAGES;
  authorities: string[] = [];
  isSaving = false;
  editForm: FormGroup;

  constructor(
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserManagementUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
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
    }: User
  ) {
    this.editForm = this.fb.group({
      id: [id],
      login: [
        login,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
        ],
      ],
      firstName: [firstName, [Validators.maxLength(50)]],
      lastName: [lastName, [Validators.maxLength(50)]],
      email: [email, [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      activated: [activated],
      langKey: [langKey],
      authorities: [authorities],
      createdBy: [createdBy],
      createdDate: [createdDate],
      lastModifiedBy: [lastModifiedBy],
      lastModifiedDate: [lastModifiedDate],
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        if (this.user.id === undefined) {
          this.user.activated = true;
        }
        this.updateForm(user);
      }
    });
    this.userService.authorities().subscribe(authorities => (this.authorities = authorities));
  }

  previousState(): void {
    window.history.back();
  }
  close(): any {
    this.dialogRef.close();
  }
  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== undefined) {
      this.userService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      langKey: user.langKey,
      authorities: user.authorities,
    });
  }

  private updateUser(user: User): void {
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.langKey = this.editForm.get(['langKey'])!.value;
    user.authorities = this.editForm.get(['authorities'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
