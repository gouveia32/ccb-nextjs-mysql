import { useRef, useState } from "react";
import axios from "axios";

export default function AddCliente({ closeModal }) {
  const [disable, setDisable] = useState(false);
  const formRef = useRef();

  async function addNewCliente(params) {
    setDisable(true);
    const {
      addClienteNome,
      addClienteTelefone1,
    } = formRef.current;

    const nome = addClienteNome.value;
    const telefone1 = addClienteTelefone1.value;

    await axios.post("/api/cliente/addCliente", {
      nome,
      telefone1,
    });

    setDisable(false);
    window.location.reload();
  }
  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Adiciona Cliente</h3>
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
                  <input name="addClienteNome" type="text" />
                </div>
              </div>
              <div
                style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Telefone</label>
                </div>
                <div>
                  <input name="addClienteTelefone1" type="text" />
                </div>
              </div>
              <div
                style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Active</label>
                </div>
                <div>
                  <input name="addClienteActive" type="text" />
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>ImageUrl</label>
              </div>
              <div>
                <input name="addClienteImageUrl" type="text" />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Ingredients</label>
              </div>
              <div>
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  name="addClienteIngredients"
                  type="text"
                ></textarea>
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  name="addClienteDescription"
                  type="text"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button style={{ marginLeft: "0" }} onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            disabled={disable}
            className="btn"
            onClick={() => addNewCliente()}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
