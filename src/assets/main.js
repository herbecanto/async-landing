const API = "https://pokeapi.co/api/v2/pokemon";

const content = null || document.getElementById("content");
const options = {
   method: "get",
};

async function fetchData(urlAPI) {
   const response = await fetch(urlAPI, options);
   const data = await response.json();
   return data;
}

(async () => {
   try {
      const pokemons = await fetchData(API);
      let view = "";
      for (let pokemon of pokemons.results.slice(0, 10)) {
         const pokemonData = await fetchData(pokemon.url);
         view += `
         <div class="group relative">
            <div
               class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
               <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="w-full" />
            </div>

            <div class="mt-4 flex justify-between">
               <h3 class="text-sm text-gray-700">
                  <span aria-hidden="true">${pokemonData.name}</span>
               </h3>
            </div>
         </div>`;
      }
      content.innerHTML = view;
   } catch (error) {
      console.error(error);
   }
})();
