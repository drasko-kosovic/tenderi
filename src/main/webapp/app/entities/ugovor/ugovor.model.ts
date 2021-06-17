import * as dayjs from 'dayjs';
import {IPonudjaci} from "app/entities/ponudjaci/ponudjaci.model";

export interface IUgovor {
  id?: number;
  brojUgovora?: string;
  datumUgovora?: dayjs.Dayjs;
  brojDatumOdlukeIzbora?: string;
  iznosUgovoraBezPdf?: number;
  sifraPostupka?: number;
  sifraPonude?: number;
  ponudjaci?: IPonudjaci | null;

}

export class Ugovor implements IUgovor {
  constructor(
    public id?: number,
    public brojUgovora?: string,
    public datumUgovora?: dayjs.Dayjs,
    public brojDatumOdlukeIzbora?: string,
    public iznosUgovoraBezPdf?: number,
    public sifraPostupka?: number,
    public sifraPonude?: number,
    public ponudjaci?: IPonudjaci | null,

  ) {}
}

export function getUgovorIdentifier(ugovor: IUgovor): number | undefined {
  return ugovor.id;
}
