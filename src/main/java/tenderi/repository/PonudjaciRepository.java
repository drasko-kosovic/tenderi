package tenderi.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ponudjaci;

/**
 * Spring Data SQL repository for the Ponudjaci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PonudjaciRepository extends JpaRepository<Ponudjaci, Long> {}
