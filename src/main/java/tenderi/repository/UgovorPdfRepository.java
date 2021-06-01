package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ugovor;
import tenderi.domain.UgovorPdf;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Spring Data SQL repository for the Ugovor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorPdfRepository extends JpaRepository<UgovorPdf, Long> {
    List<UgovorPdf> findUgovorPdfByBrojUgovora(String brojUgovora);
}
