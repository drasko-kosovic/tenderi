import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPonude, getPonudeIdentifier } from '../ponude.model';

export type EntityResponseType = HttpResponse<IPonude>;
export type EntityArrayResponseType = HttpResponse<IPonude[]>;

@Injectable({ providedIn: 'root' })
export class PonudeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ponudes');
  public resourceUrlSifraPonude = this.applicationConfigService.getEndpointFor('api/ponude');
  public resourceUrlUpload = this.applicationConfigService.getEndpointFor('api/uploadfiles?uploadfiles=');
  public resourceUrlExcelUpload='http://localhost:8080/api/uploadfiles';

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  findSiftraPostupak(sifra_postupka: number): any {
    return this.http.get<IPonude[]>(`${this.resourceUrlSifraPonude}/${sifra_postupka}`);
  }
  ponudeAll(): any {
    return this.http.get<IPonude[]>(this.resourceUrl);
  }

  create(ponude: IPonude): Observable<EntityResponseType> {
    return this.http.post<IPonude>(this.resourceUrl, ponude, { observe: 'response' });
  }

  update(ponude: IPonude): Observable<EntityResponseType> {
    return this.http.put<IPonude>(`${this.resourceUrl}/${getPonudeIdentifier(ponude) as number}`, ponude, { observe: 'response' });
  }

  //   updatePonude (): Observable<EntityResponseType> {
  //   return this.http.put<IPonude>(`${this.resourceUrlUpload}/${"C:/ponude.xlsx"}`);
  //
  // }

  partialUpdate(ponude: IPonude): Observable<EntityResponseType> {
    return this.http.patch<IPonude>(`${this.resourceUrl}/${getPonudeIdentifier(ponude) as number}`, ponude, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPonude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPonude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPonudeToCollectionIfMissing(ponudeCollection: IPonude[], ...ponudesToCheck: (IPonude | null | undefined)[]): IPonude[] {
    const ponudes: IPonude[] = ponudesToCheck.filter(isPresent);
    if (ponudes.length > 0) {
      const ponudeCollectionIdentifiers = ponudeCollection.map(ponudeItem => getPonudeIdentifier(ponudeItem)!);
      const ponudesToAdd = ponudes.filter(ponudeItem => {
        const ponudeIdentifier = getPonudeIdentifier(ponudeItem);
        if (ponudeIdentifier == null || ponudeCollectionIdentifiers.includes(ponudeIdentifier)) {
          return false;
        }
        ponudeCollectionIdentifiers.push(ponudeIdentifier);
        return true;
      });
      return [...ponudesToAdd, ...ponudeCollection];
    }
    return ponudeCollection;
  }


  UploadExcel(formData: FormData):any {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.resourceUrlExcelUpload , formData, httpOptions)
  }
}
