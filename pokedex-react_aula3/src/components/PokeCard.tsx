import React, { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon.tsx";
import "./PokeCard.css";

export function PokeCard({pokemon}: {pokemon: Pokemon}){
    const [favorito, setFavorito] = useState(false);
    
    // Estado que indica se o valor salvo no localStorage já foi carregado.
    const [carregado, setCarregado] = useState(false); 

    // useEffect roda quando o nome do Pokémon muda. Ou seja, quando um novo Pokémon é renderizado na lista. Como a lista é copiada a cada inserção, toda vez esse useEffect roda uma vez.   
     useEffect(() => {
        const salvo = localStorage.getItem(pokemon.name);
        setFavorito(salvo === "true");
        setCarregado(true); // Marca que o carregamento ocorreu.
    }, [pokemon.name]);

    // useEffect salva o valor do estado 'favorito' no localStorage.
    useEffect(() => {
        // Somente salva se o valor obtido do localStorage foi carregado, visando não sobreescrever o dado.
        if (carregado) {
            localStorage.setItem(pokemon.name, favorito.toString());
        }
    }, [favorito, pokemon.name, carregado]);

    return(
        <div className="pokedex-card">
            <h3 className="pokedex-card-name">{pokemon.name}{favorito ? "  ✪" : ""}</h3>
            {pokemon.sprites.front_default && (
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokedex-card-image"
                />
            )}
            <p>
                <strong>Altura:</strong> {pokemon.height * 10} cm
            </p>
            <p>
                <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
            <p>
                <strong>Tipos:</strong>{" "}
                {pokemon.types.map((t) => t.type.name).join(" / ")}
            </p>
            <button onClick={() => setFavorito(!favorito)} className="pokedex-card-button-favorite" style={{ backgroundColor: !favorito ? "#66FF66" : "crimson" }}>{!favorito  ? "Favoritar Pokémon" : "Desfavoritar Pokémon"}</button>
        </div>
    )
}