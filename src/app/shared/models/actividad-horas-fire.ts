import { IniciativaFire } from './iniciativa-fire';

export class ActividadHorasFire {
    iniciativa: IniciativaFire;
    codigoAct: number;
    tituloAct: string;
    fechaInicioAct: Date;
    fechaFinAct: Date;
    avance: string;
    horasFecha: number[] = [];
}
