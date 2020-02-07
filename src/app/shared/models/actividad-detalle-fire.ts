import { ParametroDetalleFire } from './parametro-detalle-fire';
import { ColaboradorDetalleFire } from './colaborador-detalle-fire';

export class ActividadDetalleFire {
    codigo: number;
    estado: ParametroDetalleFire;
    tipo: ParametroDetalleFire;
    subtipo: ParametroDetalleFire;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    horaAsignada: number;
    recursos: ColaboradorDetalleFire[];
    fechaFin: Date;
    fechaReg: Date;
    fechaAct: Date;
}
