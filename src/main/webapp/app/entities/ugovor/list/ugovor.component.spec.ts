import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UgovorService } from '../service/ugovor.service';

import { UgovorComponent } from './ugovor.component';

describe('Component Tests', () => {
  describe('Ugovor Management Component', () => {
    let comp: UgovorComponent;
    let fixture: ComponentFixture<UgovorComponent>;
    let service: UgovorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UgovorComponent],
      })
        .overrideTemplate(UgovorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UgovorComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UgovorService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ugovors?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
