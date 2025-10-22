const btn = document.getElementById('btnComparar');

btn.addEventListener('click',async() => {
  const nombre1 = document.getElementById('pokemon1').value.toLowerCase();
  const nombre2 = document.getElementById('pokemon2').value.toLowerCase();

  if (!nombre1 || !nombre2) {
    alert("Por favor escribe ambos nombres de Pokémon.");
    return;
  }

    const data1 = await obtenerPokemon(nombre1);
    const data2 = await obtenerPokemon(nombre2);

  if (!data1 || !data2) {
    alert("Alguno de los Pokémon no existe 😢");
    return;
  }

  mostrarPokemon(data1, 'card1');
  mostrarPokemon(data2, 'card2');

  compararEstadisticas(data1, data2);
});

async function obtenerPokemon(nombre) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function mostrarPokemon(data, cardId) {
  const card = document.getElementById(cardId);
  const stats = data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('');
  card.innerHTML = `
    <h3>${data.name.toUpperCase()}</h3>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <p>Tipo: ${data.types.map(t => t.type.name).join(', ')}</p>
    <ul>${stats}</ul>
  `;
}

function compararEstadisticas(p1, p2) {
  const total1 = p1.stats.reduce((a, s) => a + s.base_stat, 0);
  const total2 = p2.stats.reduce((a, s) => a + s.base_stat, 0);

  const resultado = document.getElementById('resultado');
  if (total1 > total2) {
    resultado.textContent = `${p1.name.toUpperCase()} gana con ${total1} puntos contra ${total2}!`;
  } else if (total2 > total1) {
    resultado.textContent = `${p2.name.toUpperCase()} gana con ${total2} puntos contra ${total1}!`;
  } else {
    resultado.textContent = `¡Empate! Ambos tienen ${total1} puntos`;
  }
}
