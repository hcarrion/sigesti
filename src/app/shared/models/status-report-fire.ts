import { StatusReportDocFire } from './status-report-doc-fire';

export class StatusReportFire {
    codigo: number;
    idStatusReport: string;
    idIniciativa: string;
    actSemanaAnterior: string;
    actSemanaProxima: string;
    temasDecisionesRiesgos: string;
    estado: string;
    documentos: StatusReportDocFire[] = [];
    fechaReg: Date;
    fechaAct: Date;
    usuarioReg: string;
    usuarioAct: string;
}
