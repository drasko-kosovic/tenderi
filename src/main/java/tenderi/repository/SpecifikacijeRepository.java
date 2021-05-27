package tenderi.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import tenderi.domain.Specifikacije;

/**
 * Spring Data SQL repository for the Specifikacije entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecifikacijeRepository extends JpaRepository<Specifikacije, Long> {}
