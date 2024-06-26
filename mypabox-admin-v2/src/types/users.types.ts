export interface UserObject {
    id: string;
    displayName: string;
    email: string;
    isSuperAdmin: boolean;
    permissions: {
        canEditWithVerificationNeeded: boolean;
        canEditWithoutVerificationNeeded: boolean;
        canVerify: boolean;
        canMakeLive: boolean;
        canAddOrDelete: boolean;
    };
    activeTasks: {
        state: string;
        schools: string[];
        description: string | null;
    }[];
    completedTasks: {
        state: string;
        schools: string[];
        description: string | null;
    }[];
    archivedTasks: {
        state: string;
        schools: string[];
        description: string | null;
        timestamp: string | null;
    }[];
};

export interface Task {
    state: string;
    schools: string[];
    description: string | null;
    timestamp?: string | null;
}

export interface UserState {
    users: UserObject[]
}