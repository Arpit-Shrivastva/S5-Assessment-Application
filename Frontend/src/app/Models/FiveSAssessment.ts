import { Assesment } from "./Assesment";

export type FiveSAssessment = {
    scope: string;
    auditor: string;
    date: string;
    comment: string;
    stages: Assesment[];
}