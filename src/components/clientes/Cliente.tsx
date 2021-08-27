export default class Cliente {
  id: number
  nome: string
  telefone1: string

  constructor(_nome: string, _telefone1: string, _id: number = -1){
    this.nome = _nome
    this.telefone1 = _telefone1
    this.id = _id
  }

  static empty() {
    return new Cliente('', '')
  }


}