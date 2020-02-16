import { ParametroDetalleFire } from './parametro-detalle-fire';
import { ColaboradorDetalleFire } from './colaborador-detalle-fire';
import { ContactoFire } from './contacto-fire';
import { ActividadFire } from './actividad-fire';

export class    IniciativaFire {
    idIniciativa: string;
    numeroIniciativa: number;
    estado: ParametroDetalleFire;
    titulo: string;
    jefeProyecto: ColaboradorDetalleFire;
    sumilla: string;
    usuarioProcesos: ColaboradorDetalleFire;
    objetivoPrincipal: string;
    objetivoSecundario: string;
    horaEstimada: number;
    fechaInicio: Date;
    fechaFin: Date;
    prioridad: ParametroDetalleFire;
    clasificacion: ParametroDetalleFire;
    area: ParametroDetalleFire;
    categoria: ParametroDetalleFire;
    tipo: ParametroDetalleFire;
    // Agregado por Harry Carrion 
    codigoSVT: string;
    fechaPaseProd: Date;
    gradoSatisfacccion: ParametroDetalleFire;
    contacto: ContactoFire;
    fechaIngresoRQ: Date;
    fechaFinComp: Date;
    fechaIngresoBroker: Date;
    // Add Recursos
    recursos: ColaboradorDetalleFire[];
    actividad: ActividadFire;
}
