import { ParametroDetalleFire } from './parametro-detalle-fire';
import { ColaboradorDetalleFire } from './colaborador-detalle-fire';

export class IniciativaFire {
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
}
