 
    let currentAudio = null;
    let currentPlayBtn = null;
    // Function to fetch and display songs
 async function loadSongs() {
    try {
        // Fetch the JSON data
        const response = await fetch('songs.json');
        const songs = await response.json();

        // Get the container element
        const topSongs = document.getElementById('topSongs');

        // Clear existing content
        topSongs.innerHTML = '';
        let count = 0; // Initialize a counter

        // Loop through the songs and create HTML elements
        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'song';
            songDiv.id = 'song'

            const img = document.createElement('img');
            img.className = 'songimg';
            img.src = song.imgSrc;
            img.id = 'songimg'
            songDiv.appendChild(img);

            const textCenterDiv = document.createElement('div');
            textCenterDiv.className = 'text-center';
            const nameSpan = document.createElement('span');
            nameSpan.style.fontSize = 'large';
            nameSpan.id = 'name';
            nameSpan.style.fontWeight = 'bold'
            nameSpan.innerHTML = `<b>${song.name}</b>`;
            textCenterDiv.appendChild(nameSpan);
            textCenterDiv.appendChild(document.createElement('br'));

            songDiv.appendChild(textCenterDiv);
            
             // Create audio element
             const audio = document.createElement('audio');
             audio.src = song.downloadLink;
             audio.id = `audio-${song.name}`;
             songDiv.appendChild(audio);

             // Create play/pause button
             const playBtn = document.createElement('button');
             playBtn.className = 'button';
             playBtn.innerHTML = '<img src="icon/play.png" alt="Play" />';
             playBtn.addEventListener('click', () => {
                if (audio.paused) {
                    // Pause the current audio if there is one
                    if (currentAudio && currentAudio !== audio) {
                        currentAudio.pause();
                        currentPlayBtn.innerHTML = '<img src="icon/play.png" alt="Play" />';
                    }
                    // Play the new audio and set it as current
                    audio.play();
                    playBtn.innerHTML = '<img src="icon/pause.png" alt="Pause" />';
                    currentAudio = audio;
                    currentPlayBtn = playBtn;
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<img src="icon/play.png" alt="Play" />';
                    currentAudio = null;
                    currentPlayBtn = null;
                }
            });
            document.querySelectorAll('.button').forEach(link => {
                link.addEventListener('click', function (event) {
                    event.stopPropagation();
                });
            });
             songDiv.appendChild(playBtn);

             const downloadLink = document.createElement('a');
             downloadLink.href = song.downloadLink;
             downloadLink.download = song.name;
             downloadLink.classList = 'Downloadlink'
             downloadLink.innerHTML = '<img src="icon/downloading.png" alt="Download"/>';
             document.querySelectorAll('.Downloadlink').forEach(link => {
                link.addEventListener('click', function (event) {
                    event.stopPropagation();
                });
            });
             songDiv.appendChild(downloadLink);
             

            // Make the song element clickable
            songDiv.addEventListener('click', () => {
                const songPage = song.pagename;
                window.location.href = `${songPage}.html?songPage=${songPage}`;
            });
            topSongs.appendChild(songDiv);
            count++; // Increment the counter

            // Check if we've processed 22 items
            if (count === 23) {
                const heading = document.createElement('h1');
                heading.textContent = `Song of Chhatrapati Shivaji Maharaj`;
                heading.style.backgroundColor = 'white'
                heading.style.padding = '15px 0'
                heading.id = 'songsOfShivaji'
                topSongs.appendChild(heading);
            }
            if(count === 33){
                  const heading = document.createElement('h1');
                  heading.textContent = `Song of Chhatrapati Shivaji Maharaj`;
                  heading.style.backgroundColor = 'white'
                  heading.style.padding = '15px 0'
                  heading.id = 'songsOfShivaji'
                  topSongs.appendChild(heading);
            }

    // search songs
        const resultsContainer = document.getElementById('search-results');
            fetch('songs.json')
            .then(response => response.json())
            .then(data => {
                // Function to perform search
                function searchsongs(query) {
                    if (query === '') {
                        return [];
                    } else {
                        const results = data.filter(song =>
                            song.name.toLowerCase().includes(query.toLowerCase())
                        );
                        return results.slice(0, 15);
                    }
                }
                // Function to display search results
                function displayResults(results) {
                    resultsContainer.innerHTML = '';
                    if (results.length === 0) {
                        resultsContainer.style.height = '20px'; 
                    } else {
                        resultsContainer.style.height = '50%';
                    }
                    results.forEach(song => {
                        const listItem = document.createElement('li');
                        listItem.style.listStyle = 'none'
                        listItem.innerHTML = `<img src="${song.imgSrc}" alt="${song.name}">
                                 <span>${song.name}</span>`;
                        listItem.style.cursor = 'pointer';
                        listItem.style.margin = '10px 15px'
                        resultsContainer.appendChild(listItem);
                        listItem.addEventListener('click', function () {
                            const songPage = song.pagename;
                            window.location.href = `${songPage}.html?songPage=${songPage}`;
                        });
    
                    });
                }
    
                // Event listener for input changes
                document.getElementById('searchsongs').addEventListener('input', function () {
                    const query = this.value;
                    const searchResults = searchsongs(query);
                    displayResults(searchResults);
                });
            })
            .catch(error => console.log('Error fetching for Search Allsongs JSON file:', error))
        });
    } catch (error) {
        console.error('Error fetching the songs:', error);
    }
    
}
// Load songs when the page loads
window.onload = loadSongs;

// load data for each html page
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const songPage = urlParams.get('songPage');
    fetch('songs.json')
        .then(response => response.json())
        .then(songs => {
            const song = songs.find(s => s.pagename === songPage);
            if (song) {
                document.getElementById('song-name').textContent = song.name;
                document.getElementById('song-img').src = song.imgSrc;
                document.getElementById('song-audio').src = song.downloadLink;
                document.getElementById('download-link').href = song.downloadLink;
                document.getElementById('download-link').setAttribute('download', song.name);

            } else {
                console.error('No song details found for the given page');
            }
        })
        .catch(error => console.error('Error fetching song details:', error));
});
// header for each daynamically created page
document.addEventListener('DOMContentLoaded', function() {
    // Get the container element
    const songpage = document.getElementById('songpage');

    // Create brand
    const brandDiv = document.createElement('div');
    brandDiv.className = 'brand';
    const brandH1 = document.createElement('h1');
    brandH1.textContent = 'marathigaan';
    brandDiv.appendChild(brandH1);
    songpage.appendChild(brandDiv);

    // Create header
    const headerDiv = document.createElement('div');
    headerDiv.id = 'header';

    const links = [
        { href: 'NewMarathiSongs', text: "God's song<br>देवा चे गाणे" },
        { href: '#songsOfShivaji', text: 'Song of Chhatrapati Shivaji Maharaj<br>छत्रपती शिवाजी महाराजांचे गाणे' },
        { href: 'CluturalMarathiSongs', text: 'Famous Marathi song<br>प्रसिद्ध मराठी गाणे' }
    ];

    links.forEach(linkInfo => {
        const linkDiv = document.createElement('div');
        const link = document.createElement('a');
        link.href = linkInfo.href;
        link.innerHTML = linkInfo.text;
        linkDiv.appendChild(link);
        headerDiv.appendChild(linkDiv);
    });

    songpage.appendChild(headerDiv);

    // Create search bar
    const searchBarDiv = document.createElement('div');
    searchBarDiv.id = 'searchbar';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchsongs';
    searchInput.placeholder = 'Search Marathi Songs';

    const searchButton = document.createElement('input');
    searchButton.type = 'button';
    searchButton.value = 'Search';

    searchBarDiv.appendChild(searchInput);
    searchBarDiv.appendChild(searchButton);
    songpage.appendChild(searchBarDiv);

    // Create search results
    const searchResultsUl = document.createElement('ul');
    searchResultsUl.id = 'search-results';
    songpage.appendChild(searchResultsUl);

    // Create home content
    const homeContentDiv = document.createElement('div');
    homeContentDiv.id = 'homeContent';

    const homeContentH1 = document.createElement('h1');
    homeContentH1.textContent = 'Discover the Melodious World of Marathi Music on MarathiGaan.in';

    const homeContentP = document.createElement('p');
    homeContentP.innerHTML = `Welcome to MarathiGaan.in, your ultimate destination for everything melodious and Marathi! Discover the vibrant world of Marathi music as we bring you a carefully curated collection of top trending songs, timeless classics, fresh releases, and cultural melodies. In our Top Trending section, stay updated with the hottest Marathi songs currently making waves, from foot-tapping dance numbers to soul-stirring ballads. Relive the golden era of Marathi music with our Old Marathi Songs section, `;

    homeContentDiv.appendChild(homeContentH1);
    homeContentDiv.appendChild(homeContentP);
    const daynamicallycontainer = document.createElement("div");
    daynamicallycontainer.classList = 'container';
    daynamicallycontainer.appendChild(homeContentDiv)
    songpage.appendChild(daynamicallycontainer);
});



