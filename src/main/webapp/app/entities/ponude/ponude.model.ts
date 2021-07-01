import * as dayjs from 'dayjs';
import {IPonudjaci} from "app/entities/ponudjaci/ponudjaci.model";

export interface IPonude {
  id?: number;
  sifraPostupka?: number;
  sifraPonude?: number;
  brojPartije?: number;
  nazivPonudjaca?: string;
  nazivProizvodjaca?: string | null;
  zastceniNaziv?: string | null;
  ponudjenaVrijednost?: number;
  rokIsporuke?: number;
  datumPonude?: dayjs.Dayjs;
  ponudjaci_id?:number;
}

export class Ponude implements IPonude {
  constructor(
    public id?: number,
    public sifraPostupka?: number,
    public sifraPonude?: number,
    public brojPartije?: number,
    public nazivPonudjaca?: string,
    public nazivProizvodjaca?: string | null,
    public zastceniNaziv?: string | null,
    public ponudjenaVrijednost?: number,
    public rokIsporuke?: number,
    public datumPonude?: dayjs.Dayjs,
    public ponudjaci_id?:number,
  ) {}
}

export function getPonudeIdentifier(ponude: IPonude): number | undefined {
  return ponude.id;
}
