import { useState, useRef } from "react";
import axios from "axios";

export default function EditCliente({ closeModal, cliente }) {
  const formRef = useRef();

  const [disable, setDisable] = useState(false);

  async function editCliente() {
    setDisable(true);
    const {
      editClienteNome,
      editClienteTelefone1,
      editClienteEmail,

    } = formRef.current;

    const nome = editClienteNome.value;
    const telefone1 = editClienteTelefone1.value;
    const email = editClienteEmail.value;
    //const preco_base = editClientePreco_base.value;

    await axios.put("/api/cliente/editCliente", {
      id: parseInt(cliente?.id),
      nome,
      telefone1,
      email,
      //preco_base,
    });

    setDisable(false);
    window.location.reload();
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Alterar Cliente</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <form ref={formRef}>
            <div style={{ display: "flex", margin: "2px 2px 0 0" }}>
              <div
                style={{ flex: "1 1 100%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Nome</label>
                </div>
                <div>
                  <input
                    defaultValue={cliente?.nome}
                    name="editClienteNome"
                    type="text"
                  />
                </div>
              </div>
              <div
                style={{ flex: "1 1 70%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Telefone1</label>
                </div>
                <div>
                  <input
                    defaultValue={cliente?.telefone1}
                    name="editClienteTelefone1"
                    type="text"
                  />
                </div>
              </div>
              <div
                style={{ flex: "1 1 30%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Active</label>
                </div>
                <div>
                  <input
                    defaultValue={cliente?.active}
                    name="editClienteActive"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Email</label>
              </div>
              <div>
                <input
                  defaultValue={cliente?.email}
                  name="editClienteEmail"
                  type="text"
                />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  defaultValue={cliente?.nome_contato}
                  style={{ width: "100%", height: "100px" }}
                  name="editClienteDescription"
                  type="text"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal()}>Cancel</button>
          <button disabled={disable} className="btn" onClick={() => editCliente()}>
            Gravar
          </button>
        </div>
      </div>
    </div>
  );
}
