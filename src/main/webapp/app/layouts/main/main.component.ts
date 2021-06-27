import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { VERSION } from 'app/app.constants';
import { MatSidenav } from '@angular/material/sidenav';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { AddDialogPostupciComponent } from 'app/entities/postupci/add/add.dialog.component';
import { AddDialogPonudeComponent } from 'app/entities/ponude/add/add.dialog.ponude.component';
import { AddDialogSpecifikacijeComponent } from 'app/entities/specifikacije/add/add.dialog.specifikacije.component';
import { AddDialogPonudjaciComponent } from 'app/entities/ponudjaci/add/add.dialog.ponudjaci.component';
import { AddDialogUgovorComponent } from 'app/entities/ugovor/add/add.dialog.ugovor.component';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  // languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  isLoggedIn: boolean | undefined;
  account: Account | null = null;
  authSubscription?: Subscription;
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;
  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorage: SessionStorageService,
    private profileService: ProfileService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION;
    }
  }
  addNew(): any {
    const dialogRef = this.dialog.open(AddDialogPostupciComponent, {
      data: { Postupci: {} },
    });
  }
  addNewPonude(): any {
    const dialogRef = this.dialog.open(AddDialogPonudeComponent, {
      data: { Ponude: {} },
    });
  }
  addNewSpecifikacije(): any {
    const dialogRef = this.dialog.open(AddDialogSpecifikacijeComponent, {
      data: { Specifikacije: {} },
    });
  }

  addNewPonudjaci(): any {
    const dialogRef = this.dialog.open(AddDialogPonudjaciComponent, {
      data: { Ponudjaci: {} },
    });
  }
  addNewUgovori(): any {
    const dialogRef = this.dialog.open(AddDialogUgovorComponent, {
      data: { Ugovor: {} },
    });
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
      this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }
}
