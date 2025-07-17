import { InspectionItem } from "./InspectionItem";

export type InspectionSheet = {
    id: string;
    zone: string;
    zoneLeader: string;
    auditDate: string;
    auditedBy: string;
    totalScore: number;
    entries: InspectionItem[];
}