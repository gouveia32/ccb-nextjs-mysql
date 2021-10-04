import * as React from "react";
import { SimpleCtx } from '../../AppContext/Context';
import { useContext } from "react";
let renderCount = 0;

const A = () => {
  renderCount += 1;
  console.log(`${A.name}. renderCount: `, renderCount);
  const { valueA, setValueA } = useContext(SimpleCtx);
  return (
    <div >
      <h2>Component A</h2>
      <div>value: {valueA}</div>
      <input onChange={e => setValueA(e.target.value)} />
    </div>
  );
};
export default A;
