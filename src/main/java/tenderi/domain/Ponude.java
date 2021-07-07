package tenderi.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

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

    @Column(name = "selected")
    private Boolean selected;

    @Column(name = "datum_ponude", nullable = true)
    private LocalDate datumPonude;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSifraPostupka() {
        return sifraPostupka;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public Integer getSifraPonude() {
        return sifraPonude;
    }

    public void setSifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public Integer getBrojPartije() {
        return brojPartije;
    }

    public void setBrojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
    }

    public String getNazivProizvodjaca() {
        return nazivProizvodjaca;
    }

    public void setNazivProizvodjaca(String nazivProizvodjaca) {
        this.nazivProizvodjaca = nazivProizvodjaca;
    }

    public String getZastceniNaziv() {
        return zastceniNaziv;
    }

    public void setZastceniNaziv(String zastceniNaziv) {
        this.zastceniNaziv = zastceniNaziv;
    }

    public Double getPonudjenaVrijednost() {
        return ponudjenaVrijednost;
    }

    public void setPonudjenaVrijednost(Double ponudjenaVrijednost) {
        this.ponudjenaVrijednost = ponudjenaVrijednost;
    }

    public Integer getRokIsporuke() {
        return rokIsporuke;
    }

    public void setRokIsporuke(Integer rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public LocalDate getDatumPonude() {
        return datumPonude;
    }

    public void setDatumPonude(LocalDate datumPonude) {
        this.datumPonude = datumPonude;
    }
}
