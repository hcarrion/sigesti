import { ParametroDetalleFire } from './parametro-detalle-fire';
import { ColaboradorDetalleFire } from './colaborador-detalle-fire';

export class IniciativaFire {
    numeroIniciativa: string;
    estado: ParametroDetalleFire;
    titulo: string;
    jefeProyecto: ColaboradorDetalleFire;
    sumilla: string;
    procesos: string;
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
}
