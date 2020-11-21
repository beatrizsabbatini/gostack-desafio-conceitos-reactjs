import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, [])
  async function handleAddRepository() {
    const newRepository = {
      title: 'MEI Fácil',
      url: 'https://github.com/beatrizsabbatini/mei-facil',
      techs: ['React Native', 'JavaScript']
    }
    
    const response = await api.post('repositories', newRepository)

    setRepositories([...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(item => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item, index) => {
          return (
            <li key={index}>
              <h1>{item.title}</h1>
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          )
        })}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
