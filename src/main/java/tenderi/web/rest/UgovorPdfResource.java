package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import tenderi.domain.Ugovor;
import tenderi.repository.UgovorPdfRepository;
import tenderi.repository.UgovorRepository;
import tenderi.web.rest.errors.BadRequestAlertException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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
    public List<Ugovor> getAllUgovors() {
        log.debug("REST request to get all Ugovors");
        return ugovorPdfRepository.findAll();
    }


}
