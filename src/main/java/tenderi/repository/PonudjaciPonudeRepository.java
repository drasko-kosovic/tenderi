package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ponudjaci;
import tenderi.domain.PonudjaciPonude;

import java.util.List;

/**
 * Spring Data SQL repository for the Ponudjaci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PonudjaciPonudeRepository extends JpaRepository<PonudjaciPonude, Long> {


}
