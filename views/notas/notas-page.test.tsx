import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import NotasPage, { NotasPageProps } from "../../pages/notas/[index]";
import { NotaObject } from "../../models/Nota";
import { initializeStore } from "../../store/configureStore";
import { Provider } from "react-redux";

describe("Notas page", () => {
  let wrapper: ShallowWrapper;
  const store = initializeStore();

  beforeEach(() => {
    const mockProps: NotasPageProps = {
      session: null,
      userNotas: [NotaObject, NotaObject],
    };

    wrapper = shallow(
      <Provider store={store}>
        <NotasPage {...mockProps} />
      </Provider>
    );
  });

  it("should render Notas page", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
