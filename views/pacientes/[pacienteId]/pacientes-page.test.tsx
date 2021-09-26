import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Provider } from "react-redux";
import { initializeStore } from "../../../store/configureStore";
import PacientesPage, { PacientesPageProps } from "../../../pages/pacientes/[pacienteId]";
import { NoteObject } from "../../../models/Note";

describe("Pacientes page", () => {
  let wrapper: ShallowWrapper;
  const store = initializeStore();

  beforeEach(() => {
    const mockProps: PacientesPageProps = {
      session: null,
      pacienteNotes: [NoteObject],
    };

    wrapper = shallow(
      <Provider store={store}>
        <PacientesPage {...mockProps} />
      </Provider>
    );
  });

  it("should render Pacientes page", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
