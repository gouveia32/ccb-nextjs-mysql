export interface ICliente {
  id: number
  nome: string
  telefone1: string
  email: string
}

export interface IClienteCard {
  item: ICliente
  customContainerClassName?: string
}

export interface IClienteList {
  clientes: [ICliente]
}