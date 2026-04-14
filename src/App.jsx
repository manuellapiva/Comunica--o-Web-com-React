import { useState } from 'react';
import './App.css';

function App() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [pokemon, setPokemon] = useState('');

  const buscarDados = async () => {
    if (!pokemon) return;

    setLoading(true);
    setErro(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

      if (!response) {
        throw new Error('Pokémon não encontrado');
      }

      const resultado = await response.json();
      setDados(resultado);
    } catch (error) {
      setErro(error.message);
      setDados(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="titulo">
        <img src={`${pokebola}`} alt="" />
        <h1>POKÉDEX PRO</h1>
        <img src={`${pokebola}`} alt="" />
      </div>
      <div className="info">
        <strong>Conceito : </strong>Cliente (navegador) solicita dados de um Servidor através de requisições HTTP
      </div>

      <input
        type="text"
        placeholder="Digite o nome do Pokémon EM INGLÊÊÊÊS..."
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
      />

      <button onClick={buscarDados} disabled={loading}>
        {loading ? 'Carregando...' : 'Buscar Dados da API'}
      </button>

      <div className="resultado">
        {loading && <em>⌛ Carregando dados...</em>}

        {erro && (
          <>
            <h3>❌ Erro</h3>
            <p>{erro}</p>
          </>
        )}
        
      </div>
    );
}

export default App;
