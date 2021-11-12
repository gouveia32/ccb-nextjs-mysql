import React, { useState } from "react";
import {
    selectPatient,
  } from "../../API/PatientsAPI/PatientsAPI"

  import { cPatientModel, PatientType } from "../../models/Patient";

  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Grid,
    IconButton,
    TextField,
  } from "@material-ui/core";
//import styles from '../styles/Home.module.css'



export default function PatientForm(patient: PatientType) {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState({
      name: "José Alves de Gouveia",
      email: "gouveia32@gmail.com",
      telephone: ""
    });

    
    console.log("contact:",patient)

    // Update inputs value
    const handleParam = () => (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    // Form Submit function
    const formSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(query).forEach(([key, value]) => {
            formData.append(key, value);
        });
        fetch("https://getform.io/{your-form-endpoint}", {
            method: "POST",
            body: formData
        }).then(() => setQuery (patient));
    };

    return (
          <form onSubmit={formSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="form-control"
              value={query.name}
              onChange={handleParam()}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="form-control"
              value={query.email}
              onChange={handleParam()}
            />
          </div>
          <div>
            <label>telephone</label>
            <input
              type="text"
              name="telephone"
              required
              placeholder="telephone"
              className="form-control"
              value={query.telephone}
              onChange={handleParam()}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
    )
   

}
