package tenderi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ponude;
import tenderi.domain.Ugovor;

/**
 * Spring Data SQL repository for the Ugovor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorRepository extends JpaRepository<Ugovor, Long> {
    List<Ugovor> findBySifraPostupka(Integer sifra_postupka);


@Query(value = "SELECT \n" +
    "  postupci.datum_objave, \n" +
    "  postupci.vrsta_postupka, \n" +
    "  ugovor.broj_ugovora, \n" +
    "  ugovor.datum_ugovora, \n" +
    "  ugovor.predmet_ugovora, \n" +
    "  ugovor.broj_datum_tenderske_dokumntacije, \n" +
    "  ugovor.broj_datum_odluke_izbora, \n" +
    "  ugovor.broj_datum_ponude, \n" +
    "  ugovor.iznos_ugovora_bez_pdf, \n" +
    "  ugovor.sifra_postupka, \n" +
    "  ugovor.sifra_ponude, \n" +
    "  ugovor.ponudjaci_id \n" +
    "FROM ((ugovor \n" +
    "  JOIN ponudjaci ON \n" +
    "    (\n" +
    "      (ugovor.ponudjaci_id = ponudjaci.id)\n" +
    "    )) \n" +
    "  JOIN postupci ON \n" +
    "    (\n" +
    "      (ugovor.sifra_postupka = postupci.sifra_postupka)\n" +
    "    ))",nativeQuery = true)
    List<Ugovor> allUgovori();
}
