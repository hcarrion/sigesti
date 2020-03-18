import { ParametroDetalleFire } from './parametro-detalle-fire';
import { ColaboradorDetalleFire } from './colaborador-detalle-fire';
import { ContactoFire } from './contacto-fire';
import { EventoDetalleFire } from './evento-detalle-fire';

export class IniciativaMainFire {
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
    codigoSVT: number;
    contacto: ContactoFire;
    horaReal: number;
    recursos: ColaboradorDetalleFire[];
    fechaReg: Date;
    fechaAct: Date;
    usuarioReg: string;
    usuarioAct: string;
    esnuevo: boolean;
    actividad: EventoDetalleFire[];
    usuarioSolicitante: ColaboradorDetalleFire;
}
