package tenderi.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import tenderi.IntegrationTest;
import tenderi.domain.Ugovor;
import tenderi.repository.UgovorRepository;

/**
 * Integration tests for the {@link UgovorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UgovorResourceIT {

    private static final String DEFAULT_BROJ_UGOVORA = "AAAAAAAAAA";
    private static final String UPDATED_BROJ_UGOVORA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATUM_UGOVORA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATUM_UGOVORA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PREDMET_UGOVORA = "AAAAAAAAAA";
    private static final String UPDATED_PREDMET_UGOVORA = "BBBBBBBBBB";

    private static final String DEFAULT_NAZIV_PONUDJACA = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV_PONUDJACA = "BBBBBBBBBB";

    private static final String DEFAULT_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE = "AAAAAAAAAA";
    private static final String UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE = "BBBBBBBBBB";

    private static final String DEFAULT_BROJ_DATUM_ODLUKE_IZBORA = "AAAAAAAAAA";
    private static final String UPDATED_BROJ_DATUM_ODLUKE_IZBORA = "BBBBBBBBBB";

    private static final String DEFAULT_BROJ_DATUM_PONUDE = "AAAAAAAAAA";
    private static final String UPDATED_BROJ_DATUM_PONUDE = "BBBBBBBBBB";

    private static final Integer DEFAULT_IZNOS_UGOVORA_BEZ_PDF = 1;
    private static final Integer UPDATED_IZNOS_UGOVORA_BEZ_PDF = 2;

    private static final Integer DEFAULT_SIFRA_POSTUPKA = 1;
    private static final Integer UPDATED_SIFRA_POSTUPKA = 2;

    private static final String ENTITY_API_URL = "/api/ugovors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UgovorRepository ugovorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUgovorMockMvc;

    private Ugovor ugovor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ugovor createEntity(EntityManager em) {
        Ugovor ugovor = new Ugovor()
            .brojUgovora(DEFAULT_BROJ_UGOVORA)
            .datumUgovora(DEFAULT_DATUM_UGOVORA)
            .predmetUgovora(DEFAULT_PREDMET_UGOVORA)
            .nazivPonudjaca(DEFAULT_NAZIV_PONUDJACA)
            .brojDatumTenderskeDokumntacije(DEFAULT_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE)
            .brojDatumOdlukeIzbora(DEFAULT_BROJ_DATUM_ODLUKE_IZBORA)
            .brojDatumPonude(DEFAULT_BROJ_DATUM_PONUDE)
            .iznosUgovoraBezPdf(DEFAULT_IZNOS_UGOVORA_BEZ_PDF)
            .sifraPostupka(DEFAULT_SIFRA_POSTUPKA);
        return ugovor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ugovor createUpdatedEntity(EntityManager em) {
        Ugovor ugovor = new Ugovor()
            .brojUgovora(UPDATED_BROJ_UGOVORA)
            .datumUgovora(UPDATED_DATUM_UGOVORA)
            .predmetUgovora(UPDATED_PREDMET_UGOVORA)
            .nazivPonudjaca(UPDATED_NAZIV_PONUDJACA)
            .brojDatumTenderskeDokumntacije(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE)
            .brojDatumOdlukeIzbora(UPDATED_BROJ_DATUM_ODLUKE_IZBORA)
            .brojDatumPonude(UPDATED_BROJ_DATUM_PONUDE)
            .iznosUgovoraBezPdf(UPDATED_IZNOS_UGOVORA_BEZ_PDF)
            .sifraPostupka(UPDATED_SIFRA_POSTUPKA);
        return ugovor;
    }

    @BeforeEach
    public void initTest() {
        ugovor = createEntity(em);
    }

    @Test
    @Transactional
    void createUgovor() throws Exception {
        int databaseSizeBeforeCreate = ugovorRepository.findAll().size();
        // Create the Ugovor
        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isCreated());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeCreate + 1);
        Ugovor testUgovor = ugovorList.get(ugovorList.size() - 1);
        assertThat(testUgovor.getBrojUgovora()).isEqualTo(DEFAULT_BROJ_UGOVORA);
        assertThat(testUgovor.getDatumUgovora()).isEqualTo(DEFAULT_DATUM_UGOVORA);
        assertThat(testUgovor.getPredmetUgovora()).isEqualTo(DEFAULT_PREDMET_UGOVORA);
        assertThat(testUgovor.getNazivPonudjaca()).isEqualTo(DEFAULT_NAZIV_PONUDJACA);
        assertThat(testUgovor.getBrojDatumTenderskeDokumntacije()).isEqualTo(DEFAULT_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE);
        assertThat(testUgovor.getBrojDatumOdlukeIzbora()).isEqualTo(DEFAULT_BROJ_DATUM_ODLUKE_IZBORA);
        assertThat(testUgovor.getBrojDatumPonude()).isEqualTo(DEFAULT_BROJ_DATUM_PONUDE);
        assertThat(testUgovor.getIznosUgovoraBezPdf()).isEqualTo(DEFAULT_IZNOS_UGOVORA_BEZ_PDF);
        assertThat(testUgovor.getSifraPostupka()).isEqualTo(DEFAULT_SIFRA_POSTUPKA);
    }

    @Test
    @Transactional
    void createUgovorWithExistingId() throws Exception {
        // Create the Ugovor with an existing ID
        ugovor.setId(1L);

        int databaseSizeBeforeCreate = ugovorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkBrojUgovoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setBrojUgovora(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDatumUgovoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setDatumUgovora(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPredmetUgovoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setPredmetUgovora(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNazivPonudjacaIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setNazivPonudjaca(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBrojDatumTenderskeDokumntacijeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setBrojDatumTenderskeDokumntacije(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBrojDatumOdlukeIzboraIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setBrojDatumOdlukeIzbora(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBrojDatumPonudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setBrojDatumPonude(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIznosUgovoraBezPdfIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setIznosUgovoraBezPdf(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSifraPostupkaIsRequired() throws Exception {
        int databaseSizeBeforeTest = ugovorRepository.findAll().size();
        // set the field null
        ugovor.setSifraPostupka(null);

        // Create the Ugovor, which fails.

        restUgovorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isBadRequest());

        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUgovors() throws Exception {
        // Initialize the database
        ugovorRepository.saveAndFlush(ugovor);

        // Get all the ugovorList
        restUgovorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ugovor.getId().intValue())))
            .andExpect(jsonPath("$.[*].brojUgovora").value(hasItem(DEFAULT_BROJ_UGOVORA)))
            .andExpect(jsonPath("$.[*].datumUgovora").value(hasItem(DEFAULT_DATUM_UGOVORA.toString())))
            .andExpect(jsonPath("$.[*].predmetUgovora").value(hasItem(DEFAULT_PREDMET_UGOVORA)))
            .andExpect(jsonPath("$.[*].nazivPonudjaca").value(hasItem(DEFAULT_NAZIV_PONUDJACA)))
            .andExpect(jsonPath("$.[*].brojDatumTenderskeDokumntacije").value(hasItem(DEFAULT_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE)))
            .andExpect(jsonPath("$.[*].brojDatumOdlukeIzbora").value(hasItem(DEFAULT_BROJ_DATUM_ODLUKE_IZBORA)))
            .andExpect(jsonPath("$.[*].brojDatumPonude").value(hasItem(DEFAULT_BROJ_DATUM_PONUDE)))
            .andExpect(jsonPath("$.[*].iznosUgovoraBezPdf").value(hasItem(DEFAULT_IZNOS_UGOVORA_BEZ_PDF)))
            .andExpect(jsonPath("$.[*].sifraPostupka").value(hasItem(DEFAULT_SIFRA_POSTUPKA)));
    }

    @Test
    @Transactional
    void getUgovor() throws Exception {
        // Initialize the database
        ugovorRepository.saveAndFlush(ugovor);

        // Get the ugovor
        restUgovorMockMvc
            .perform(get(ENTITY_API_URL_ID, ugovor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ugovor.getId().intValue()))
            .andExpect(jsonPath("$.brojUgovora").value(DEFAULT_BROJ_UGOVORA))
            .andExpect(jsonPath("$.datumUgovora").value(DEFAULT_DATUM_UGOVORA.toString()))
            .andExpect(jsonPath("$.predmetUgovora").value(DEFAULT_PREDMET_UGOVORA))
            .andExpect(jsonPath("$.nazivPonudjaca").value(DEFAULT_NAZIV_PONUDJACA))
            .andExpect(jsonPath("$.brojDatumTenderskeDokumntacije").value(DEFAULT_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE))
            .andExpect(jsonPath("$.brojDatumOdlukeIzbora").value(DEFAULT_BROJ_DATUM_ODLUKE_IZBORA))
            .andExpect(jsonPath("$.brojDatumPonude").value(DEFAULT_BROJ_DATUM_PONUDE))
            .andExpect(jsonPath("$.iznosUgovoraBezPdf").value(DEFAULT_IZNOS_UGOVORA_BEZ_PDF))
            .andExpect(jsonPath("$.sifraPostupka").value(DEFAULT_SIFRA_POSTUPKA));
    }

    @Test
    @Transactional
    void getNonExistingUgovor() throws Exception {
        // Get the ugovor
        restUgovorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUgovor() throws Exception {
        // Initialize the database
        ugovorRepository.saveAndFlush(ugovor);

        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();

        // Update the ugovor
        Ugovor updatedUgovor = ugovorRepository.findById(ugovor.getId()).get();
        // Disconnect from session so that the updates on updatedUgovor are not directly saved in db
        em.detach(updatedUgovor);
        updatedUgovor
            .brojUgovora(UPDATED_BROJ_UGOVORA)
            .datumUgovora(UPDATED_DATUM_UGOVORA)
            .predmetUgovora(UPDATED_PREDMET_UGOVORA)
            .nazivPonudjaca(UPDATED_NAZIV_PONUDJACA)
            .brojDatumTenderskeDokumntacije(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE)
            .brojDatumOdlukeIzbora(UPDATED_BROJ_DATUM_ODLUKE_IZBORA)
            .brojDatumPonude(UPDATED_BROJ_DATUM_PONUDE)
            .iznosUgovoraBezPdf(UPDATED_IZNOS_UGOVORA_BEZ_PDF)
            .sifraPostupka(UPDATED_SIFRA_POSTUPKA);

        restUgovorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUgovor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUgovor))
            )
            .andExpect(status().isOk());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
        Ugovor testUgovor = ugovorList.get(ugovorList.size() - 1);
        assertThat(testUgovor.getBrojUgovora()).isEqualTo(UPDATED_BROJ_UGOVORA);
        assertThat(testUgovor.getDatumUgovora()).isEqualTo(UPDATED_DATUM_UGOVORA);
        assertThat(testUgovor.getPredmetUgovora()).isEqualTo(UPDATED_PREDMET_UGOVORA);
        assertThat(testUgovor.getNazivPonudjaca()).isEqualTo(UPDATED_NAZIV_PONUDJACA);
        assertThat(testUgovor.getBrojDatumTenderskeDokumntacije()).isEqualTo(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE);
        assertThat(testUgovor.getBrojDatumOdlukeIzbora()).isEqualTo(UPDATED_BROJ_DATUM_ODLUKE_IZBORA);
        assertThat(testUgovor.getBrojDatumPonude()).isEqualTo(UPDATED_BROJ_DATUM_PONUDE);
        assertThat(testUgovor.getIznosUgovoraBezPdf()).isEqualTo(UPDATED_IZNOS_UGOVORA_BEZ_PDF);
        assertThat(testUgovor.getSifraPostupka()).isEqualTo(UPDATED_SIFRA_POSTUPKA);
    }

    @Test
    @Transactional
    void putNonExistingUgovor() throws Exception {
        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();
        ugovor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUgovorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ugovor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ugovor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUgovor() throws Exception {
        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();
        ugovor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUgovorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ugovor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUgovor() throws Exception {
        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();
        ugovor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUgovorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUgovorWithPatch() throws Exception {
        // Initialize the database
        ugovorRepository.saveAndFlush(ugovor);

        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();

        // Update the ugovor using partial update
        Ugovor partialUpdatedUgovor = new Ugovor();
        partialUpdatedUgovor.setId(ugovor.getId());

        partialUpdatedUgovor
            .datumUgovora(UPDATED_DATUM_UGOVORA)
            .predmetUgovora(UPDATED_PREDMET_UGOVORA)
            .nazivPonudjaca(UPDATED_NAZIV_PONUDJACA)
            .brojDatumTenderskeDokumntacije(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE)
            .brojDatumOdlukeIzbora(UPDATED_BROJ_DATUM_ODLUKE_IZBORA)
            .sifraPostupka(UPDATED_SIFRA_POSTUPKA);

        restUgovorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUgovor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUgovor))
            )
            .andExpect(status().isOk());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
        Ugovor testUgovor = ugovorList.get(ugovorList.size() - 1);
        assertThat(testUgovor.getBrojUgovora()).isEqualTo(DEFAULT_BROJ_UGOVORA);
        assertThat(testUgovor.getDatumUgovora()).isEqualTo(UPDATED_DATUM_UGOVORA);
        assertThat(testUgovor.getPredmetUgovora()).isEqualTo(UPDATED_PREDMET_UGOVORA);
        assertThat(testUgovor.getNazivPonudjaca()).isEqualTo(UPDATED_NAZIV_PONUDJACA);
        assertThat(testUgovor.getBrojDatumTenderskeDokumntacije()).isEqualTo(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE);
        assertThat(testUgovor.getBrojDatumOdlukeIzbora()).isEqualTo(UPDATED_BROJ_DATUM_ODLUKE_IZBORA);
        assertThat(testUgovor.getBrojDatumPonude()).isEqualTo(DEFAULT_BROJ_DATUM_PONUDE);
        assertThat(testUgovor.getIznosUgovoraBezPdf()).isEqualTo(DEFAULT_IZNOS_UGOVORA_BEZ_PDF);
        assertThat(testUgovor.getSifraPostupka()).isEqualTo(UPDATED_SIFRA_POSTUPKA);
    }

    @Test
    @Transactional
    void fullUpdateUgovorWithPatch() throws Exception {
        // Initialize the database
        ugovorRepository.saveAndFlush(ugovor);

        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();

        // Update the ugovor using partial update
        Ugovor partialUpdatedUgovor = new Ugovor();
        partialUpdatedUgovor.setId(ugovor.getId());

        partialUpdatedUgovor
            .brojUgovora(UPDATED_BROJ_UGOVORA)
            .datumUgovora(UPDATED_DATUM_UGOVORA)
            .predmetUgovora(UPDATED_PREDMET_UGOVORA)
            .nazivPonudjaca(UPDATED_NAZIV_PONUDJACA)
            .brojDatumTenderskeDokumntacije(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE)
            .brojDatumOdlukeIzbora(UPDATED_BROJ_DATUM_ODLUKE_IZBORA)
            .brojDatumPonude(UPDATED_BROJ_DATUM_PONUDE)
            .iznosUgovoraBezPdf(UPDATED_IZNOS_UGOVORA_BEZ_PDF)
            .sifraPostupka(UPDATED_SIFRA_POSTUPKA);

        restUgovorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUgovor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUgovor))
            )
            .andExpect(status().isOk());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
        Ugovor testUgovor = ugovorList.get(ugovorList.size() - 1);
        assertThat(testUgovor.getBrojUgovora()).isEqualTo(UPDATED_BROJ_UGOVORA);
        assertThat(testUgovor.getDatumUgovora()).isEqualTo(UPDATED_DATUM_UGOVORA);
        assertThat(testUgovor.getPredmetUgovora()).isEqualTo(UPDATED_PREDMET_UGOVORA);
        assertThat(testUgovor.getNazivPonudjaca()).isEqualTo(UPDATED_NAZIV_PONUDJACA);
        assertThat(testUgovor.getBrojDatumTenderskeDokumntacije()).isEqualTo(UPDATED_BROJ_DATUM_TENDERSKE_DOKUMNTACIJE);
        assertThat(testUgovor.getBrojDatumOdlukeIzbora()).isEqualTo(UPDATED_BROJ_DATUM_ODLUKE_IZBORA);
        assertThat(testUgovor.getBrojDatumPonude()).isEqualTo(UPDATED_BROJ_DATUM_PONUDE);
        assertThat(testUgovor.getIznosUgovoraBezPdf()).isEqualTo(UPDATED_IZNOS_UGOVORA_BEZ_PDF);
        assertThat(testUgovor.getSifraPostupka()).isEqualTo(UPDATED_SIFRA_POSTUPKA);
    }

    @Test
    @Transactional
    void patchNonExistingUgovor() throws Exception {
        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();
        ugovor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUgovorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ugovor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ugovor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUgovor() throws Exception {
        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();
        ugovor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUgovorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ugovor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUgovor() throws Exception {
        int databaseSizeBeforeUpdate = ugovorRepository.findAll().size();
        ugovor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUgovorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ugovor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ugovor in the database
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUgovor() throws Exception {
        // Initialize the database
        ugovorRepository.saveAndFlush(ugovor);

        int databaseSizeBeforeDelete = ugovorRepository.findAll().size();

        // Delete the ugovor
        restUgovorMockMvc
            .perform(delete(ENTITY_API_URL_ID, ugovor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ugovor> ugovorList = ugovorRepository.findAll();
        assertThat(ugovorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}