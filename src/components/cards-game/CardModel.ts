export enum CardFace {
    BACK,
    FRONT
}

export interface CardModel {
    id: number;
    value: number;
    face: CardFace;
    color: string;
    matched: boolean;
    isClickable: boolean;
}