export interface Token {
    access_token: string;
    access_type: string;
}

export interface AuthState {
    requesting: boolean;
    access_token: string | null | undefined;
    access_type: string | null | undefined;
    issued_at: number;
    expires: number;
    failCounter: number;
}