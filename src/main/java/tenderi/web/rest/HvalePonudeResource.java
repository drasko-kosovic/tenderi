package tenderi.web.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.PaginationUtil;
import tenderi.domain.Ponude;
import tenderi.repository.HvalePonudeRepository;

/**
 * REST controller for managing {@link Ponude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HvalePonudeResource {

    private final Logger log = LoggerFactory.getLogger(HvalePonudeResource.class);

    private final HvalePonudeRepository hvalePonudeRepository;

    public HvalePonudeResource(HvalePonudeRepository hvalePonudeRepository) {
        this.hvalePonudeRepository = hvalePonudeRepository;
    }

    @GetMapping("/hvale/{sifra}")
    public List<Ponude> getHvalePonude(@PathVariable Integer sifra) {
        List<Ponude> hvalePonude = hvalePonudeRepository.HvalePonude(sifra);
        return hvalePonude;
    }
}
