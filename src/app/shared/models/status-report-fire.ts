import { StatusReportDocFire } from './status-report-doc-fire';

export class StatusReportFire {
    codigo: number;
    idStatusReport: string;
    idIniciativa: string;
    numeroSemana: number;
    anio: number;
    fechaInicioSemana: Date;
    fechaFinSemana: Date;
    fechaCierre: Date;
    actSemanaAnterior: string;
    actSemanaProxima: string;
    temasDecisionesRiesgos: string;
    lineaBase: string;
    estado: string;
    documentos: StatusReportDocFire[] = [];
    fechaReg: Date;
    fechaAct: Date;
    usuarioReg: string;
    usuarioAct: string;
}
