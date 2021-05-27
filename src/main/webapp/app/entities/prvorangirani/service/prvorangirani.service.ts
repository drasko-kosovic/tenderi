import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IPrvorangirani } from '../prvorangirani.model';
export type EntityResponseType = HttpResponse<IPrvorangirani>;
export type EntityArrayResponseType = HttpResponse<IPrvorangirani[]>;

@Injectable({ providedIn: 'root' })
export class PrvorangiraniService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/prvorangirani');
  // public resourceUrlPostupak = this.applicationConfigService.getEndpointFor('api/prvorangirani');
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}
  prvorangiraniAll(): any {
    return this.http.get<IPrvorangirani[]>(this.resourceUrl);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrvorangirani>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findPostupak(sifraPostupka: number): any {
    return this.http.get<IPrvorangirani>(`${this.resourceUrl}/${sifraPostupka}`);
  }
}
