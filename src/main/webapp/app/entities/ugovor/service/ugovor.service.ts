import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUgovor, getUgovorIdentifier } from '../ugovor.model';
import {SERVER_API_URL} from "app/app.constants";
import {IPonude} from "app/entities/ponude/ponude.model";
export type EntityResponseType = HttpResponse<IUgovor>;
export type EntityArrayResponseType = HttpResponse<IUgovor[]>;

@Injectable({ providedIn: 'root' })
export class UgovorService {


  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ugovors');
  public resourceUrlPostupci = this.applicationConfigService.getEndpointFor('api/ugovor');
  public resourceUrlPdf = 'https://esjn-montefarm.herokuapp.com/api/report/ugovor/';
  public resourceUrlPdfLocal = 'http://localhost:8080/api/report/ugovor/';
  public resourceUrlPdfLocal2 = SERVER_API_URL + 'api/report/ugovor/';
  public resourceUrlPdfPrvorangirani = SERVER_API_URL + 'api/report/prvorangirani';
  public resourceUrlPostupakPonudeeUgovor = this.applicationConfigService.getEndpointFor('api/prvorangirani/ugovor');
  public resourceUrlPdfLocal1 = this.applicationConfigService.getEndpointFor('api/report/ugovor');
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getPrvorangiraniPonude(sifraPostupka: number, sifraPonude: number): Observable<IPonude[]> {
    const params = new HttpParams();
    params.set('sifraPostupka', String(sifraPostupka));
    params.set('sifraPonude', String(sifraPonude));

    return this.http.get<IPonude[]>(
      `${this.resourceUrlPostupakPonudeeUgovor}?sifraPostupka=${sifraPostupka}&sifraPonude=${sifraPonude}`,{ params: params }
    );

  }
  printReportAnexiUgovor(sifraPostupka: number, sifraPonude: number ): any {

    const params = new HttpParams();
    params.set('sifraPostupka', String(sifraPostupka));
    params.set('sifraPonude', String(sifraPonude));

    return this.http.get<IPonude[]>(
      `${this.resourceUrlPdfPrvorangirani}?sifraPostupka=${sifraPostupka}&sifraPonude=${sifraPonude}`,{ params: params,
        responseType: 'arraybuffer' as 'json' }
    );
  }
  printReportServiceUgovor(brojUgovora: string ): any {
    // const httpOptions = {
    //   responseType: 'arraybuffer' as 'json'
    //   // 'responseType'  : 'blob' as 'json'        //This also worked
    // };
    return this.http.get<[IUgovor]>(this.resourceUrlPdfLocal2 + brojUgovora,{
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    });

  }
  create(ugovor: IUgovor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ugovor);
    return this.http
      .post<IUgovor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ugovor: IUgovor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ugovor);
    return this.http
      .put<IUgovor>(`${this.resourceUrl}/${getUgovorIdentifier(ugovor) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(ugovor: IUgovor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ugovor);
    return this.http
      .patch<IUgovor>(`${this.resourceUrl}/${getUgovorIdentifier(ugovor) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUgovor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findSiftraPostupak(sifra_postupka: number): any {
    return this.http.get<[IUgovor]>(`${this.resourceUrlPostupci}/${sifra_postupka}`);
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUgovor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  ponudjaciAll(): any {
    return this.http.get<IPonude[]>(this.resourceUrl);
  }
  addUgovorToCollectionIfMissing(ugovorCollection: IUgovor[], ...ugovorsToCheck: (IUgovor | null | undefined)[]): IUgovor[] {
    const ugovors: IUgovor[] = ugovorsToCheck.filter(isPresent);
    if (ugovors.length > 0) {
      const ugovorCollectionIdentifiers = ugovorCollection.map(ugovorItem => getUgovorIdentifier(ugovorItem)!);
      const ugovorsToAdd = ugovors.filter(ugovorItem => {
        const ugovorIdentifier = getUgovorIdentifier(ugovorItem);
        if (ugovorIdentifier == null || ugovorCollectionIdentifiers.includes(ugovorIdentifier)) {
          return false;
        }
        ugovorCollectionIdentifiers.push(ugovorIdentifier);
        return true;
      });
      return [...ugovorsToAdd, ...ugovorCollection];
    }
    return ugovorCollection;
  }

  protected convertDateFromClient(ugovor: IUgovor): IUgovor {
    return Object.assign({}, ugovor, {
      datumUgovora: ugovor.datumUgovora?.isValid() ? ugovor.datumUgovora.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datumUgovora = res.body.datumUgovora ? dayjs(res.body.datumUgovora) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ugovor: IUgovor) => {
        ugovor.datumUgovora = ugovor.datumUgovora ? dayjs(ugovor.datumUgovora) : undefined;
      });
    }
    return res;
  }

}
