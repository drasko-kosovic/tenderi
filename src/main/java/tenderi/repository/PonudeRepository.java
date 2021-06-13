package tenderi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
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

    @Modifying
    @Query("delete from Ponude p where p.sifraPonude=:sifraPonude")
    void deletePonudeSifraPonude(@Param("sifraPonude") Integer sifraPonude);


    @Modifying
    @Query("DELETE from Ponude p WHERE p.selected = true")
    void deleteBySelected();

    @Modifying
    @Query("UPDATE Ponude p SET p.selected=true WHERE p.id = :Id")
    void updateSlected(@Param("Id") int Id);

}
