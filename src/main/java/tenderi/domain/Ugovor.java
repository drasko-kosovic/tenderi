package tenderi.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Ugovor.
 */
@Entity
@Table(name = "ugovor")
public class Ugovor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "broj_ugovora", nullable = false)
    private String brojUgovora;

    @NotNull
    @Column(name = "datum_ugovora", nullable = false)
    private LocalDate datumUgovora;

    @NotNull
    @Column(name = "predmet_ugovora", nullable = false)
    private String predmetUgovora;

    @NotNull
    @Column(name = "naziv_ponudjaca", nullable = false)
    private String nazivPonudjaca;

    @NotNull
    @Column(name = "broj_datum_tenderske_dokumntacije", nullable = false)
    private String brojDatumTenderskeDokumntacije;

    @NotNull
    @Column(name = "broj_datum_odluke_izbora", nullable = false)
    private String brojDatumOdlukeIzbora;

    @NotNull
    @Column(name = "broj_datum_ponude", nullable = false)
    private String brojDatumPonude;

    @NotNull
    @Column(name = "iznos_ugovora_bez_pdf", nullable = false)
    private Integer iznosUgovoraBezPdf;

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;

    @NotNull
    @Column(name = "sifra_ponude", nullable = false)
    private Integer sifraPonude;

    @NotNull
    @Column(name = "sifra_ponudjaca", nullable = false)
    private Integer sifraPonudjaca;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ugovor id(Long id) {
        this.id = id;
        return this;
    }

    public String getBrojUgovora() {
        return this.brojUgovora;
    }

    public Ugovor brojUgovora(String brojUgovora) {
        this.brojUgovora = brojUgovora;
        return this;
    }

    public void setBrojUgovora(String brojUgovora) {
        this.brojUgovora = brojUgovora;
    }

    public LocalDate getDatumUgovora() {
        return this.datumUgovora;
    }

    public Ugovor datumUgovora(LocalDate datumUgovora) {
        this.datumUgovora = datumUgovora;
        return this;
    }

    public void setDatumUgovora(LocalDate datumUgovora) {
        this.datumUgovora = datumUgovora;
    }

    public String getPredmetUgovora() {
        return this.predmetUgovora;
    }

    public Ugovor predmetUgovora(String predmetUgovora) {
        this.predmetUgovora = predmetUgovora;
        return this;
    }

    public void setPredmetUgovora(String predmetUgovora) {
        this.predmetUgovora = predmetUgovora;
    }

    public String getNazivPonudjaca() {
        return this.nazivPonudjaca;
    }

    public Ugovor nazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
        return this;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

    public String getBrojDatumTenderskeDokumntacije() {
        return this.brojDatumTenderskeDokumntacije;
    }

    public Ugovor brojDatumTenderskeDokumntacije(String brojDatumTenderskeDokumntacije) {
        this.brojDatumTenderskeDokumntacije = brojDatumTenderskeDokumntacije;
        return this;
    }

    public void setBrojDatumTenderskeDokumntacije(String brojDatumTenderskeDokumntacije) {
        this.brojDatumTenderskeDokumntacije = brojDatumTenderskeDokumntacije;
    }

    public String getBrojDatumOdlukeIzbora() {
        return this.brojDatumOdlukeIzbora;
    }

    public Ugovor brojDatumOdlukeIzbora(String brojDatumOdlukeIzbora) {
        this.brojDatumOdlukeIzbora = brojDatumOdlukeIzbora;
        return this;
    }

    public void setBrojDatumOdlukeIzbora(String brojDatumOdlukeIzbora) {
        this.brojDatumOdlukeIzbora = brojDatumOdlukeIzbora;
    }

    public String getBrojDatumPonude() {
        return this.brojDatumPonude;
    }

    public Ugovor brojDatumPonude(String brojDatumPonude) {
        this.brojDatumPonude = brojDatumPonude;
        return this;
    }

    public void setBrojDatumPonude(String brojDatumPonude) {
        this.brojDatumPonude = brojDatumPonude;
    }

    public Integer getIznosUgovoraBezPdf() {
        return this.iznosUgovoraBezPdf;
    }

    public Ugovor iznosUgovoraBezPdf(Integer iznosUgovoraBezPdf) {
        this.iznosUgovoraBezPdf = iznosUgovoraBezPdf;
        return this;
    }

    public void setIznosUgovoraBezPdf(Integer iznosUgovoraBezPdf) {
        this.iznosUgovoraBezPdf = iznosUgovoraBezPdf;
    }

    public Integer getSifraPostupka() {
        return this.sifraPostupka;
    }

    public Ugovor sifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
        return this;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public Integer getSifraPonude() {
        return this.sifraPonude;
    }

    public Ugovor sifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
        return this;
    }

    public void setSifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public Integer getSifraPonudjaca() {
        return this.sifraPonudjaca;
    }

    public Ugovor sifraPonudjaca(Integer sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
        return this;
    }

    public void setSifraPonudjaca(Integer sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ugovor)) {
            return false;
        }
        return id != null && id.equals(((Ugovor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ugovor{" +
            "id=" + getId() +
            ", brojUgovora='" + getBrojUgovora() + "'" +
            ", datumUgovora='" + getDatumUgovora() + "'" +
            ", predmetUgovora='" + getPredmetUgovora() + "'" +
            ", nazivPonudjaca='" + getNazivPonudjaca() + "'" +
            ", brojDatumTenderskeDokumntacije='" + getBrojDatumTenderskeDokumntacije() + "'" +
            ", brojDatumOdlukeIzbora='" + getBrojDatumOdlukeIzbora() + "'" +
            ", brojDatumPonude='" + getBrojDatumPonude() + "'" +
            ", iznosUgovoraBezPdf=" + getIznosUgovoraBezPdf() +
            ", sifraPostupka=" + getSifraPostupka() +
            ", sifraPonude=" + getSifraPonude() +
            ", sifraPonudjaca=" + getSifraPonudjaca() +
            "}";
    }
}
