import React, { useEffect, useState } from "react";
import "./Pokedex.css";
import { PokeCard } from "./PokeCard.tsx";
import type { Pokemon } from "../types/Pokemon.tsx";

export default function Pokedex() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [erro, setErro] = useState("");
  const [pokemonsList, setPokemonList] = useState<Pokemon[]>([]);

  const buscarPokemon = async () => {
    if (!nome.trim()) return;

    if(pokemonsList.some(p => p.name.toLowerCase() === nome.toLowerCase())){
      setErro("Pokémon já pesquisado! 😊");
      return;
    }

    setCarregando(true);
    setErro("");
    setPokemon(null);

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
      );
      if (!resposta.ok) throw new Error("Pokémon não encontrado");

      // Convertemos o JSON dizendo ao TS que ele tem formato Pokemon 
      const dados: Pokemon = await resposta.json();

      setPokemon(dados);
      setPokemonList(prev => [dados, ...prev]);
    } catch  {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (pokemon) {
      console.log(`Pokémon ${pokemon.name} carregado com sucesso!`);
    }
  }, [pokemon]);

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title">🔎 Pokédex</h2>

      <input
        className="pokedex-input"
        type="text"
        placeholder="Digite o nome do Pokémon"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <button className="pokedex-button" onClick={buscarPokemon}>
        Buscar
      </button>

      {carregando && <p className="pokedex-loading">Carregando...</p>}
      {erro && <p className="pokedex-error">{erro}</p>}

      {pokemonsList.map((p) => (<PokeCard pokemon={p}/>))}
    </div>
      // Map que exibi individualmente cada card Pokémon

  );
}