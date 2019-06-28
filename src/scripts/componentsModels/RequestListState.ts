export interface State {
    isFilterToggle: boolean;
    leaveTypeId: Number;
    status: string;
    isReset: boolean;
    startDate: string;
    startDateLink: string;
    endDateLink: string;
    endDate: string;
    leaveTypes: { code: string; numberOfDay: number; id: number }[];
    requests: {
        startDate: string;
        endDate: string;
        leaveTypeId: number;
        reason: string;
        numberOfDay: number;
        leaveType: string;
    }[];
}
