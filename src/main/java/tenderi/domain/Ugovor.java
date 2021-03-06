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
public class
Ugovor implements Serializable {

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
    @Column(name = "broj_datum_odluke_izbora", nullable = false)
    private String brojDatumOdlukeIzbora;


    @NotNull
    @Column(name = "iznos_ugovora_bez_pdf", nullable = false)
    private Integer iznosUgovoraBezPdf;

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;


    @NotNull
    @Column(name = "sifra_ponude", nullable = false)
    private Integer sifraPonude;

   @OneToOne
    @JoinColumn(unique = true)
    private Ponudjaci ponudjaci;

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

    public Ponudjaci getPonudjaci() {
        return this.ponudjaci;
    }

    public Ugovor ponudjaci(Ponudjaci ponudjaci) {
        this.setPonudjaci(ponudjaci);
        return this;
    }

    public void setPonudjaci(Ponudjaci ponudjaci) {
        this.ponudjaci = ponudjaci;
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



    public Integer getIznosUgovoraBezPdf() {


        return this.iznosUgovoraBezPdf;
    }

    public Ugovor iznosUgovoraBezPdf(Integer iznosUgovoraBezPdf) {
       this.iznosUgovoraBezPdf = iznosUgovoraBezPdf;
       return this;
    }

    public void setIznosUgovoraBezPdf(Integer iznosUgovoraBezPdf) {
//        if (iznosUgovoraBezPdf>100)
//            this.iznosUgovoraBezPdf = iznosUgovoraBezPdf;
//        else System.out.println("ne moze manje od 100");

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

    @Override
    public String toString() {
        return "Ugovor{" +
            "id=" + id +
            ", brojUgovora='" + brojUgovora + '\'' +
            ", datumUgovora=" + datumUgovora +
            ", brojDatumOdlukeIzbora='" + brojDatumOdlukeIzbora + '\'' +
            ", iznosUgovoraBezPdf=" + iznosUgovoraBezPdf +
            ", sifraPostupka=" + sifraPostupka +
            ", sifraPonude=" + sifraPonude +
            ", ponudjaci=" + ponudjaci +
            '}';
    }
}
