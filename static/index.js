function init() {
    const input = document.getElementById("search-input");
    var timeout = null;
    input.addEventListener('keyup', function (e) {
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            search(input.value);
        }, 200);
    });
}

function search(query){
        if(query.length < 3){
            const searchResults = document.getElementById("search-results");
            searchResults.innerHTML = "";
            return;
        }

        fetch("/api/search/"+query)
            .then(response => response.json())
            .then(data => {
                data = data.slice(0, 4);

                const searchResults = document.getElementById("search-results");
                searchResults.innerHTML = "";
                data.forEach(song => {
                    const searchResult = document.createElement("div");
                    searchResult.onclick = function(){
                        // TODO: redirect to lyrics page
                    };
                    searchResult.style.cursor = "pointer";
                    searchResult.className = "search-result";
                    searchResult.innerHTML = `
                        <img src="${song.artwork.url.replace("{w}", "128").replace("{h}", "128")}">
                        <div class="search-result-inner">
                            <h2>${song.name}</h2>
                            <h3>${song.artistName}</h3>
                        </div>
                    `;
                    searchResults.appendChild(searchResult);
                });
            }
        );
    }