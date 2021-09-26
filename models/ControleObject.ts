export interface ControleInterface {
  id?: number | string;
  texto: string;
  marcado: boolean;
}

export type TipoControle = ControleInterface;

export const ControleObject: TipoControle = {
         id: 0,
         texto: "",
         marcado: false,
       };

export enum cControle {
  id = 'id',
  texto = 'texto',
  marcado = 'marcado',
}
