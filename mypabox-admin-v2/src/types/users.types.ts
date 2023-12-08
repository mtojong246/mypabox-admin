export interface User {
    name: string;
    email: string;
    isSuperAdmin: boolean;
    permissions: {
        canEdit: boolean;
        canVerify: boolean;
        canMakeLive: boolean;
        canAddOrDelete: boolean;
    };
    activeTasks: {
        state: string;
        schools: string[];
        description: string | null;
    }[] | null;
    completedTasks: {
        state: string;
        schools: string[];
        description: string | null;
    }[] | null;
    archivedTasks: {
        state: string;
        schools: string[];
        description: string | null;
        timestamp: string | null;
    }[] | null;
};

export interface UserState {
    users: User[]
}