import { TestBed } from '@angular/core/testing';

import { UsuarioPerfilFireService } from './usuario-perfil-fire.service';

describe('UsuarioPerfilFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioPerfilFireService = TestBed.get(UsuarioPerfilFireService);
    expect(service).toBeTruthy();
  });
});
