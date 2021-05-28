package tenderi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ponude;

@Repository
public interface HvalePonudeRepository extends JpaRepository<Ponude, Long> {
    @Query(
        value = "SELECT \n" +
        "  specifikacije.id, \n" +
        "  specifikacije.broj_partije, \n" +
        "  specifikacije.inn, \n" +
        "  specifikacije.farmaceutski_oblik_lijeka, \n" +
        "  specifikacije.pakovanje, \n" +
        "  specifikacije.trazena_kolicina, \n" +
        "  specifikacije.procijenjena_vrijednost, \n" +
        "  specifikacije.sifra_postupka \n" +
        "FROM specifikacije \n" +
        "WHERE\n" +
        "  (\n" +
        "    (specifikacije.sifra_postupka =:sifra) AND\n" +
        "    (\n" +
        "      NOT (\n" +
        "        specifikacije.broj_partije IN ( SELECT \n" +
        "          view_prvorangirani.broj_partije \n" +
        "        FROM view_prvorangirani \n" +
        "        WHERE\n" +
        "          (view_prvorangirani.sifra_postupka =:sifra))\n" +
        "      )\n" +
        "    )\n" +
        "    )",
        nativeQuery = true
    )
    List<Ponude> HvalePonude(@Param("sifra") Integer sifra);
}