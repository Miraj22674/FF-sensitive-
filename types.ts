export interface UserInput {
    phoneModel: string;
    ram: number;
    screenSize: number;
    gyroscope: 'ON' | 'OFF';
}

export interface SensitivitySettings {
    general: number;
    redDot: number;
    twoXScope: number;
    fourXScope: number;
    sniperScope: number;
    freeLook: number;
    dpi: number;
    reasoning: string;
}