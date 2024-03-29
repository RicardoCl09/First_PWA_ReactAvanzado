import React, { useState } from 'react';
import './App.css';
import { withServiceWorkerUpdater } from '@3m1/service-worker-updater'

const App = (props) => {

  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;

  const [newItem, setnewItem] = useState("");
  const [items, setItems] = useState([]);

  const addNewItem = () => {
    setItems([...items, newItem]);
    setnewItem("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>** Proyecto PWA - Lista de la Compra **</h1>
        {newServiceWorkerDetected &&
          <div style={{ backgroundColor: 'red', marginBottom: 20, padding: 20 }}>
            <h3>¡Nueva actualización! ¿Quieres actualizar?</h3>
            <button onClick={onLoadNewServiceWorkerAccept} style={{padding: 15}}>¡Actualizar!</button>
          </div>
        }
        <input style={{ fontSize: 24 }} type="text" onKeyDown={e => e.key === 'Enter' && addNewItem()} onChange={e => setnewItem(e.target.value)} value={newItem} />
        <button style={{ fontSize: 24 }} onClick={addNewItem}>Añadir</button>
        <ul>
          {items.map((item, key) => <li key={key}>{item}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default withServiceWorkerUpdater(App);
