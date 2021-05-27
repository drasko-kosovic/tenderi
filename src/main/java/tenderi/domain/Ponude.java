package tenderi.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Ponude.
 */
@Entity
@Table(name = "ponude")
public class Ponude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;

    @NotNull
    @Column(name = "sifra_ponude", nullable = false)
    private Integer sifraPonude;

    @NotNull
    @Column(name = "broj_partije", nullable = false)
    private Integer brojPartije;

    @NotNull
    @Column(name = "naziv_ponudjaca", nullable = false)
    private String nazivPonudjaca;

    @Column(name = "naziv_proizvodjaca")
    private String nazivProizvodjaca;

    @Column(name = "zastceni_naziv")
    private String zastceniNaziv;

    @NotNull
    @Column(name = "ponudjena_vrijednost", nullable = false)
    private Double ponudjenaVrijednost;

    @NotNull
    @Column(name = "rok_isporuke", nullable = false)
    private Integer rokIsporuke;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ponude id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getSifraPostupka() {
        return this.sifraPostupka;
    }

    public Ponude sifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
        return this;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public Integer getSifraPonude() {
        return this.sifraPonude;
    }

    public Ponude sifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
        return this;
    }

    public void setSifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public Integer getBrojPartije() {
        return this.brojPartije;
    }

    public Ponude brojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
        return this;
    }

    public void setBrojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
    }

    public String getNazivPonudjaca() {
        return this.nazivPonudjaca;
    }

    public Ponude nazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
        return this;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

    public String getNazivProizvodjaca() {
        return this.nazivProizvodjaca;
    }

    public Ponude nazivProizvodjaca(String nazivProizvodjaca) {
        this.nazivProizvodjaca = nazivProizvodjaca;
        return this;
    }

    public void setNazivProizvodjaca(String nazivProizvodjaca) {
        this.nazivProizvodjaca = nazivProizvodjaca;
    }

    public String getZastceniNaziv() {
        return this.zastceniNaziv;
    }

    public Ponude zastceniNaziv(String zastceniNaziv) {
        this.zastceniNaziv = zastceniNaziv;
        return this;
    }

    public void setZastceniNaziv(String zastceniNaziv) {
        this.zastceniNaziv = zastceniNaziv;
    }

    public Double getPonudjenaVrijednost() {
        return this.ponudjenaVrijednost;
    }

    public Ponude ponudjenaVrijednost(Double ponudjenaVrijednost) {
        this.ponudjenaVrijednost = ponudjenaVrijednost;
        return this;
    }

    public void setPonudjenaVrijednost(Double ponudjenaVrijednost) {
        this.ponudjenaVrijednost = ponudjenaVrijednost;
    }

    public Integer getRokIsporuke() {
        return this.rokIsporuke;
    }

    public Ponude rokIsporuke(Integer rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
        return this;
    }

    public void setRokIsporuke(Integer rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ponude)) {
            return false;
        }
        return id != null && id.equals(((Ponude) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ponude{" +
            "id=" + getId() +
            ", sifraPostupka=" + getSifraPostupka() +
            ", sifraPonude=" + getSifraPonude() +
            ", brojPartije=" + getBrojPartije() +
            ", nazivPonudjaca='" + getNazivPonudjaca() + "'" +
            ", nazivProizvodjaca='" + getNazivProizvodjaca() + "'" +
            ", zastceniNaziv='" + getZastceniNaziv() + "'" +
            ", ponudjenaVrijednost=" + getPonudjenaVrijednost() +
            ", rokIsporuke=" + getRokIsporuke() +
            "}";
    }
}
