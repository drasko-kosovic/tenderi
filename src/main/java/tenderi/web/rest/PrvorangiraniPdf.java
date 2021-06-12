package tenderi.web.rest;


import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import tenderi.domain.Prvorangirani;
import tenderi.repository.PrvorangiraniRepository;
import tenderi.repository.UgovorPdfRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = ("*"))
@RestController
@RequestMapping("api/report")
public class PrvorangiraniPdf {

    @Autowired
    ApplicationContext context;



    @Autowired
    PrvorangiraniRepository prvorangiraniRepository;


    @GetMapping(path = "/prvorangirani")
    @ResponseBody

    public void getPdfUgovor(HttpServletResponse response, @RequestParam Integer sifraPonude) throws Exception {

        Resource resource = context.getResource("classpath:reports/PrvorangiraniUgovor.jrxml");
        InputStream inputStream = resource.getInputStream();
        JasperReport report = JasperCompileManager.compileReport(inputStream);

        Map<String, Object> params = new HashMap<>();


        List<Prvorangirani> ugovor= prvorangiraniRepository.findPrvorangiraniBySifraPonude(sifraPonude);

        //Data source Set
        JRDataSource dataSource = new JRBeanCollectionDataSource(ugovor);
        params.put("datasource", dataSource);

        //Make jasperPrint
        JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
        //Media Type
        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        //Export PDF Stream
        JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
    }


}
