export interface IPonudjaci {
  id?: number;
  nazivPonudjaca?: string;
  odgovornoLice?: string;
  adresaPonudjaca?: string | null;
  bankaRacun?: string | null;
}

export class Ponudjaci implements IPonudjaci {
  constructor(
    public id?: number,
    public nazivPonudjaca?: string,
    public odgovornoLice?: string,
    public adresaPonudjaca?: string | null,
    public bankaRacun?: string | null
  ) {}
}

export function getPonudjaciIdentifier(ponudjaci: IPonudjaci): number | undefined {
  return ponudjaci.id;
}
