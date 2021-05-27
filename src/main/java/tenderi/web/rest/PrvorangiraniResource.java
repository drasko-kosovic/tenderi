package tenderi.web.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tenderi.domain.Prvorangirani;
import tenderi.repository.PrvorangiraniRepository;

/**
 * REST controller for managing {@link Prvorangirani}.
 */
@RestController
@RequestMapping("/api")
public class PrvorangiraniResource {

    private final Logger log = LoggerFactory.getLogger(PrvorangiraniResource.class);

    private final PrvorangiraniRepository prvorangiraniRepository;

    public PrvorangiraniResource(PrvorangiraniRepository prvorangiraniRepository) {
        this.prvorangiraniRepository = prvorangiraniRepository;
    }

    @GetMapping("/prvorangirani")
    public List<Prvorangirani> getAllPrvorangiranis() {
        return prvorangiraniRepository.findAll();
    }

    @GetMapping("/prvorangirani/{sifraPostupka}")
    public List<Prvorangirani> findByPostupakPrvorangirani(@PathVariable Integer sifraPostupka) {
        return prvorangiraniRepository.findBySifraPostupka(sifraPostupka);
    }
}
