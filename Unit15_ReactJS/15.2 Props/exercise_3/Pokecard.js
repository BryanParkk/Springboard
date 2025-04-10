const Pokecard = ({ name, type, base_experience, id }) => {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokemon">
      <h3>{name}</h3>
      <img src={imgSrc} alt={name}></img>
      <p id="type">Type: {type}</p>
      <p id="exp">EXP: {base_experience}</p>
    </div>
  );
};
