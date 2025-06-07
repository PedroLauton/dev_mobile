import React, { useState } from "react";
import type { Pokemon } from "../types/Pokemon.tsx";
import "./PokeCard.css";

export function PokeCard({pokemon}: {pokemon: Pokemon}){
    const [favorito, setFavorito] = useState(false);

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