import { HoraFire } from './hora-fire';

export class ColaboradorDetalleFire {
    codigo: number;
    codigoEmpleado: number;
    tipoDocumento: string;
    numeroDocumento: string;
    nombres: string;
    codigoCargo: number;
    cargo: string;
    codigoUnidadOperativa: string;
    unidadOperativa: string;
    correo: string;
    sucursal: number;
    descripcionSucursal: string;
    codigoUsuario: string;
    isJefe: boolean;
    porcentaje: number;
    horasAsig: number;
    isAsignado: boolean;
    horasReg: HoraFire[] = [];
    perfil: string;
    // Poniendo Datos de Resumen Calculado 
    HorasTrabajadas: number;    // calcula las horas de trabajo realizado 
    sporcentaje: string; 
}
