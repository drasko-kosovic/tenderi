package tenderi.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ponudjaci;
import tenderi.domain.Prvorangirani;

import java.util.List;

/**
 * Spring Data SQL repository for the Ponudjaci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PonudjaciRepository extends JpaRepository<Ponudjaci, Long> {

    @Query(value = "SELECT distinct \n" +
        "  public.ponude.sifra_postupka,\n" +
        "  public.ponude.sifra_ponude,\n" +
        "  public.ponudjaci.id,\n" +
        "  public.ponudjaci.naziv_ponudjaca,\n" +
        "  public.ponudjaci.odgovorno_lice,\n" +
        "  public.ponudjaci.adresa_ponudjaca,\n" +
        "  public.ponudjaci.banka_racun,\n" +
        "  public.ponudjaci.sifra_ponudjaca\n" +
        "FROM\n" +
        "  public.ponude\n" +
        "  INNER JOIN public.ponudjaci ON (public.ponude.naziv_ponudjaca = public.ponudjaci.naziv_ponudjaca)\n",nativeQuery = true)
    List<Ponudjaci> allPonudjaciDistinct();
}
