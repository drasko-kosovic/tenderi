package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tenderi.domain.Ugovor;
import tenderi.domain.UgovorPdf;
import tenderi.repository.UgovorPdfRepository;

import java.util.List;

/**
 * REST controller for managing {@link Ugovor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UgovorPdfResource {

    private final Logger log = LoggerFactory.getLogger(UgovorPdfResource.class);

    private static final String ENTITY_NAME = "ugovor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UgovorPdfRepository ugovorPdfRepository;

    public UgovorPdfResource(UgovorPdfRepository ugovorPdfRepository) {
        this.ugovorPdfRepository = ugovorPdfRepository;

    }


    @GetMapping("/ugovori")
    public List<UgovorPdf> getAllUgovors() {
        log.debug("REST request to get all Ugovors");
        return ugovorPdfRepository.findAll();
    }
    @GetMapping("/ugovor/{broj_ugovora}")
    public List<UgovorPdf> getPonude(@PathVariable String broj_ugovora) {
        return ugovorPdfRepository.findUgovorPdfByBrojUgovora(broj_ugovora);
    }

}
