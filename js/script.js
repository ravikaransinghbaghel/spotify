console.log("ram ram ji");
let currfolder;
let currentsong = new Audio();
let songs;
let privers = document.querySelector(".privers-play");
let on_off = document.querySelector(".off-on");
let next = document.querySelector(".next-play");


async function main(folder) {

    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a") || element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }

    }
    currfolder = folder;


    let songlist = document.querySelector(".gane").getElementsByTagName("ul")[0];
    songlist.innerHTML = ""
    for (const s of songs) {
        songlist.innerHTML = songlist.innerHTML + `<li> <div class="play-list">
        <div class="music"><img class="invert" src="https://cdn-icons-png.flaticon.com/128/461/461238.png" alt=""></div>
        <div class="name">
        <div class="song-name" style="word-break: break-all;">${s.replaceAll("%20", " ")}</div>
        <div class="artis">Ravi karan</div>
        </div>
        <div class="playnow">
            <img class="invert" src="https://cdn-icons-png.flaticon.com/128/0/375.png" alt="">
        </div>
        </div>
    </li>`;
    }

    //actach song 

    Array.from(document.querySelector(".gane").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", ele => {

            console.log(e.querySelector(".name").firstElementChild.innerHTML);
            play(e.querySelector(".name").firstElementChild.innerHTML.trim());
        })
    });

    return songs;

}

const play = (play, pause = false) => {
    // let audio = new Audio("/song/" + play);
    currentsong.src = `/${currfolder}/` + play;
    if (!pause) {
        currentsong.play()

    }
    on_off.src = "img/pause.svg"

    document.querySelector(".songinfo").innerHTML = play;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

const BASE_URL = 'http://127.0.0.1:5500';

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
}

async function displayAlbums() {
    try {
        const responseText = await fetch(`${BASE_URL}/song/`).then(res => res.text());
        const div = document.createElement("div");
        div.innerHTML = responseText;

        const anchors = div.getElementsByTagName("a");
        const cardContainer = document.querySelector(".cards");

        const cards = [];

        for (const e of anchors) {
            if (e.href.includes("/song/")) {
                const folder = e.href.split("/").slice(-1)[0];

                const metadata = await fetchJson(`${BASE_URL}/song/${folder}/info.json`);

                cards.push(`
                    <div data-folder="${folder}" class="card">
                        <div class="play">
                            <img src="https://t3.ftcdn.net/jpg/00/80/56/28/240_F_80562883_PAJJNiVcccBaPnU1ee1vNredJ5mJkYyz.jpg" alt="">
                        </div>
                        <img src="/song/${folder}/cover.webp" alt="">
                        <h2>${metadata.title}</h2>
                        <p>${metadata.description}</p>
                    </div>
                `);
            }
        }

        cardContainer.innerHTML = cards.join('');
    } catch (error) {
        console.error("Error displaying albums:", error);
    }
    //click card opan folder
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async ele => {
            await main(`song/${ele.currentTarget.dataset.folder}`)
            play(songs[0]);

        })
    });
}

// Call the function to display albums when needed
// displayAlbums();



async function getsong() {
    await main("song/ravi")
    play(songs[0], true)


    //attach button on-off
    on_off.addEventListener("click", e => {
        if (currentsong.paused) {
            currentsong.play();
            on_off.src = "img/pause.svg"
        } else {
            currentsong.pause();
            on_off.src = "img/play.svg"
        }

    })

    //attach button next, provers

    privers.addEventListener("click", e => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index + 1 > length) {
            play(songs[index - 1]);
        }
    })

    next.addEventListener("click", e => {
        // console.log("next")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index >= 0) {
            play(songs[index + 1]);
        }
    })

    function time(sec) {
        let min = sec / 60;
        let min2 = min.toFixed(2);
        return min2;
    }

    //attach current time update
    currentsong.addEventListener("timeupdate", () => {
        let play_time = time(currentsong.currentTime) ;
        let totel_time = time(currentsong.duration) ;
        // console.log(play_time,totel_time)
        document.querySelector(".songtime").innerHTML = `${play_time} / ${totel_time}`;
        document.querySelector(".circuler").style.left = (play_time / totel_time) * 100 + "%";

        // auto play song
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (play_time === totel_time) {
            play(songs[index + 1]);
        }

    })

    //add seek ber cursor
    document.querySelector(".seekber").addEventListener("click", e => {
        let seek_width = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circuler").style.left = seek_width + "%";

        currentsong.currentTime = currentsong.duration * seek_width / 100;
    })

    //add medio query me left ber
    document.querySelector(".pop").addEventListener("click", e => {
        let op = true;
        if (op) {
            document.querySelector(".laft").style.left = 0;
            document.querySelector(".pop2").addEventListener("click", ele => {
                if (op) {
                    document.querySelector(".laft").style.left = -100 + "%";

                }
            })
        }
    })



    //show all cards
    displayAlbums();


}

getsong();

document.querySelector("#login").addEventListener("click", e => {
    let op = true;
    if (op) {
        document.querySelector(".profile").style.left = 0;
        document.querySelector(".main2").addEventListener("click", ele => {
            if (op) {
                document.querySelector(".profile").style.left = -120 + "%";

            }
        })
    }
})


document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    // Get uploaded image
    const profileImage = document.getElementById('profileImage').files[0];
    let imageUrl = '';

    if (profileImage) {
        imageUrl = URL.createObjectURL(profileImage);
    }

    // Display user profile
    displayUserProfile(username, email, bio, imageUrl);
    alert("Thank you,login this Profile")
});

function displayUserProfile(username, email, bio, imageUrl) {
    const profileDiv = document.getElementById('displayProfile');

    // Clear previous content
    profileDiv.innerHTML = '';

    // screen hidden 
    let form=document.getElementById('form');
    form.style.display='none'

    let heading=document.getElementById('heading');
    heading.innerHTML='User Profile :-'

    // Create elements to display user profile
    const usernameElement = document.createElement('p');
    usernameElement.textContent = `Username: ${username}`;

    const emailElement = document.createElement('p');
    emailElement.textContent = `Email: ${email}`;

    const bioElement = document.createElement('p');
    bioElement.textContent = `Bio: ${bio}`;

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = 'Profile Image';
    imageElement.style.width = '150px';
    imageElement.style.borderRadius = '50%';
    imageElement.style.border = '5px solid gray';

    // Append elements to display profile
    profileDiv.appendChild(imageElement);
    profileDiv.appendChild(usernameElement);
    profileDiv.appendChild(emailElement);
    profileDiv.appendChild(bioElement);
}

