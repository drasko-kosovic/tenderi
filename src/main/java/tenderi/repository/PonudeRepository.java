package tenderi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ponude;

/**
 * Spring Data SQL repository for the Ponude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PonudeRepository extends JpaRepository<Ponude, Long> {
    List<Ponude> findBySifraPostupka(Integer sifra_postupka);

    List<Ponude> findPonudeByBrojPartije(Integer sifra_postupka);

    @Query(value = "select * from Ponude  where ponude.sifra_ponude = 10000 ",nativeQuery = true)
    List<Ponude> allPonude();
}
