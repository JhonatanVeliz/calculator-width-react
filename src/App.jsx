import { useState } from "react";

import Buttom from "./components/Buttom";
import Operations from "./components/Operations";

import up from './assets/up.png';
import sun from './assets/sun.png'
import moon from './assets/moon.png'

function App() {

  const [operation, setOperation] = useState({ value: '0', result: '0' });
  const [seeDb, setSeeDb] = useState(false);
  const [operationsSave, setOperationsSave] = useState(
    JSON.parse(localStorage.getItem('operation')) || []
  );
  const [ darkMode, setDarkMode ] = useState(false);

  const hanldeClick = (e) => {
    const { innerText: btnValue } = e.target;
    setOperation(
      {
        ...operation,
        value: `${operation.value == '0' ? btnValue : operation.value + btnValue}`
      })
  }

  const handleAction = () => {

    if(operation.value === '0'){
      return
    }

    try {

      const value = operation.value;
      const result = eval(value);

      setOperation({ value : '0', result });
      setOperationsSave([...operationsSave, { value, result }]);
      const storagePrev = JSON.parse(localStorage.getItem('operation')) || [];
      localStorage.setItem('operation', JSON.stringify([...storagePrev, { ...operation, result }]));
    }
    catch (error) {
      setOperation({ ...operation, value: '0', result: 'Invalido' })
    }

  }

  const handleClean = () => {
    setOperation({ value: '0', result: '0' })
  }

  const handleDelete = () => {

    if (operation.value.length <= 1) {
      setOperation({ ...operation, value: '0' });
      return;
    }

    setOperation({ ...operation, value: operation.value.slice(0, -1) });
  }

  const toggleDb = () => {
    setSeeDb(!seeDb);
  }

  const handleCleanOperations = () => {
    setOperationsSave([]);
    localStorage.removeItem('operation');
    toggleDb();
  }

  const copyOpertaion = (operation, result) => {
    setOperation({ value: operation, result });
    toggleDb();
  }

  const changeTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <main className={ darkMode ? 'dark' : ''}>

      <div className={`${darkMode ? 'container--dark' : ''} container bg-gray-200 rounded-xl p-3 gap-2`}>

        <span className="p-4 text-end font-bold text-3xl dark:text-white">{operation.value}</span>
        <span className="pb-4 pr-4 text-end font-bold text-4xl text-gray-500">{operation.result}</span>

        <div className="btn__darkMode">

          <div 
            className={`${darkMode ? 'btn__darkMode__content' : 'btn__darkMode__content btn__darkMode__content--dark'}`} 
            onClick={changeTheme}
          >

            <div className="btn__darkMode__bg">
              <button>

                <img 
                  src={ darkMode ? moon : sun} 
                  alt="theme light" 
                  className={`${darkMode ? 'btn__darkMode__img--dark' : 'btn__darkMode__img'}`} 
                />

              </button>
            </div>

          </div>

        </div>


        <Buttom
          text="C"
          clase="text-xl bg-gray-400 rounded p-4 font-bold"
          onclick={handleClean}
        />

        <Buttom
          text="DB"
          clase="text-xl bg-gray-400 rounded p-4 font-bold"
          onclick={toggleDb}
        />

        <Buttom
          text="%"
          clase="text-xl bg-gray-400 rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="/"
          clase="text-xl bg-indigo-600 text-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="7"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="8"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="9"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="*"
          clase="text-xl bg-indigo-600 text-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="4"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="5"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="6"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="-"
          clase="text-xl bg-indigo-600 text-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="1"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="2"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="3"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="+"
          clase="text-xl bg-indigo-600 text-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="."
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="0"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={hanldeClick}
        />

        <Buttom
          text="<"
          clase="text-xl bg-white rounded p-4 font-bold"
          onclick={handleDelete}
        />

        <Buttom
          text="="
          clase="text-xl bg-indigo-600 rounded p-4 font-bold text-white"
          onclick={handleAction}
        />

        <div className={`${seeDb ? 'db--active' : ''} db p-4 flex justify-center bg-indigo-900`}>
          <div className="db__content">

            <button
              className="p-2 bg-red-900 text-white font-bold rounded"
              onClick={handleCleanOperations}
            >
              Eliminar Todo
            </button>

            <div className="db__operations">
              {
                operationsSave.map((operation, index) => (
                  <Operations
                    key={index}
                    operation={operation.value}
                    result={operation.result}
                    onclick={copyOpertaion}
                  />
                ))
              }
            </div>

            <button className="db__up" onClick={toggleDb}>
              <img src={up} alt="subir ventana" />
            </button>

          </div>
        </div>

      </div>

    </main>
  )
}

export default App