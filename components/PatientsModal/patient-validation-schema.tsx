import { cPatientModel, PatientType } from "../../models/Patient";
import * as yup from "yup";

export const patientValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
  patientTypeValue: yup.object().required("form:error-patient-type-required"),
});