let loggedoutlinks = document.querySelectorAll(".loggedout");
let loggedinlinks = document.querySelectorAll(".loggedin");
let loggedadminlinks = document.querySelectorAll(".loggedadmin")

// content div
let content = document.querySelector("#content");
let review_content = document.querySelector('#review_content');

function configureNav(user) {
    // check is user is passed and signed in
    if (user) {
        document.querySelector("#welcome_user").innerHTML = `${auth.currentUser.email}`;
        // console.log(loggedoutlinks);

        // show all loggedin links
        loggedinlinks.forEach((link) => {
            link.classList.remove("is-hidden");
        })
        // hide all the loggedout links
        loggedoutlinks.forEach((link) => {
            link.classList.add("is-hidden");
        })
    } else {
        document.querySelector("#welcome_user").innerHTML = "";

        loggedoutlinks.forEach((link) => {
            link.classList.remove("is-hidden");
        })

        loggedinlinks.forEach((link) => {
            link.classList.add("is-hidden");
        })
    }
}

let signupbtn = document.querySelector('#signupbtn');
let signupModal = document.querySelector('#signup-modal');
let signupModalBg = document.querySelector('#signup-modalbg');
signupbtn.addEventListener('click', () => {
    signupModal.classList.add('is-active');
});

signupModalBg.addEventListener('click', () => {
    signupModal.classList.remove('is-active');
});

let signinbtn = document.querySelector('#signinbtn');
let signinModal = document.querySelector('#signin-modal');
let signinModalBg = document.querySelector('#signin-modalbg');

signinbtn.addEventListener('click', () => {
    signinModal.classList.add('is-active');
})

signinModalBg.addEventListener('click', () => {
    signinModal.classList.remove('is-active');
});

// admin sign in IA
let admin_signinbtn = document.querySelector('#admin_signinbtn');
let admin_signinModal = document.querySelector('#admin_signin-modal');
let admin_signinModalBg = document.querySelector('#admin_signin-modalbg');

admin_signinbtn.addEventListener('click', () => {
    admin_signinModal.classList.add('is-active');
})

admin_signinModalBg.addEventListener('click', () => {
    admin_signinModal.classList.remove('is-active');
});

// Left side buttons 
const dropdowns = document.querySelectorAll('.dropdown:not(.is-hoverable)');
if (dropdowns.length > 0) {
    // For each dropdown, add event handler to open on click.
    dropdowns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            el.classList.toggle('is-active');
        });
    });
    // If user clicks outside dropdown, close it.
    document.addEventListener('click', function (e) {
        closeDropdowns();
    });
}
/*
 * Close dropdowns by removing `is-active` class.
 */
function closeDropdowns() {
    dropdowns.forEach(function (el) {
        el.classList.remove('is-active');
    });
}

let signup_form = document.querySelector("#signup_form");

signup_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form submitted");

    // grab the email and password 

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    // pass firebase email pass word and sign them up
    auth.createUserWithEmailAndPassword(email, password).then(() => {
            console.log("user created successfully");
            // close modal
            signupModal.classList.remove("is-active");

            // reset form
            signup_form.reset();
        })
        .catch((error) => {
            let signup_error = document.querySelector("#signup_error");
            signup_error.innerHTML = `<p>${error.message}</p>`;
        });
})

// sign users in 
let signin_form = document.querySelector("#signin_form");

signin_form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("sign in form submitted");
    // grab the email and password from form

    let email = document.querySelector("#email_").value;
    let password = document.querySelector("#password_").value;
    // console.log(email, password);

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            console.log(userCredentials);
            // console.log(userCredentials.user.email + " with the uid " + userCredentials.user.uid + " is logged in!");
            signinModal.classList.remove("is-active");

            // reset form 
            signin_form.reset();

        })
        .catch((error) => {
            let signin_error = document.querySelector("#signin_error");
            signin_error.innerHTML = `<p>${error.message}</p>`;
            // console.log(error.message);

        });
})

// sign out 
let signoutbtn = document.querySelector("#signoutbtn");
signoutbtn.addEventListener("click", (e) => {
    auth.signOut().
    then((msg) => {
        console.log("User signed out!");
    })
})

// keep track of users authentification 
auth.onAuthStateChanged((user) => {
    // check if user is signed in or out 
    if (user) {
        console.log("user is now signed in ")
        configureNav(user);
        configureContent(user);
    } else {
        console.log("user is signed out")
        configureNav();
        configureContent();
    }
})

// Search Bar 
// Search bar would be set up for Admin to search through trades
let search_button = document.querySelector("#search_button");
// attach click event
search_button.addEventListener("click", () => {
    // grab content of input with id search_box

    let search_box = document.querySelector("#search_box").value;
    // test it out
    // console.log(search_box);

    // grab customized data from firebse
    db.collection("calendar").where("team", "==", search_box).get().then((data) => {
        // adjust this rentals if adjust database
        // adjust title for field we choose
        let calendar = data.docs;
        // empty content div
        content.innerHTML = "";

        // loop through array
        calendar.forEach((calendar) => {
            content.innerHTML += `
            <div class="box">
            <h1 class="title is-size-3 has-background-success-light p-2"> ${calendar.data().league}</h1>
            <p class="has-text-right has-text-danger"> ${calendar.data().receiving_gym}</p>
            <p class="has-text-right has-text-danger"> ${calendar.data().receiving_time}</p>
            <p class="has-text-right has-text-danger"> ${calendar.data().sending_gym}</p>
            <p class="has-text-right has-text-danger"> ${calendar.data().sending_time}</p>
            <p class="has-text-left has-text-success"> ${calendar.data().team}</p>
            <p class="has-text-left has-text-success"> ${calendar.data().trading_team}</p>
            
            // adjust here with form stuff
          </div>    
        `;
            // console.log(item.data().title,"=>",item.data().desc)
            // adjust title and description for each specific modal
        })
    })

    // adjust vehicle modals to be posted on the main page
})


// availability submission form
let availbtn = document.querySelector("#availbtn");
let main2 = document.querySelector("#avail_form");
let html2 = `<div class="is-size-2  title has-background-primary-dark has-text-centered has-text-white">Post your Trade</div>
            <div class="field">
                <label class="label has-text-white">What league are you in?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. League 1" id="avail_league">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What nights of the week will work best?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Court 1" id="avail_day_of_week">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What time slot will work best?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 6 pm" id="avail_time"">
                </div>
              </div>
`;
let avail_form = document.querySelector("#avail_form");
availbtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#avail_form").innerHTML = "";
    avail_form.innerHTML = html2;
});


// store coach avail data in database
avail_form.addEventListener("submit", (e) => {
    e.preventDefault()
    // adjust this part to match form 

    let avail_league = document.querySelector("#avail_league").value;
    let avail_day_of_week = document.querySelector("#avail_day_of_week").value;
    let avail_time = document.querySelector("#avail_time").value;

    // console.log(url);
    // combine title and description into one object
    let avail_details = {
        league: avail_league,
        day_of_week: avail_day_of_week,
        time: avail_time,

    }
    console.log(avail_details);

    // add recipe details into firebase
    db.collection("avail_form").add(coach_availability).then((data) => {
        console.log("availability added");
        // console.log(data.id)

        // 1. reset the form
        avail_form.reset();
        // 2. display success message for the user
        alert("You successfully submitted your availability");
    })
})

// Loads trade and availability pop ups for Bulma Form Buttons on left side 
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        console.log($target);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;
        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});



// display only coach trades
let show_trade = document.querySelector("#show_trade")

show_trade.addEventListener("click", () => {
    db.collection("trade_details").where("email", "==", auth.currentUser.email).get().then((data) => {
        let trade2 = data.docs;
        // empty content div
        content2.innerHTML = "";

        // loop through array
        trade2.forEach((trade2) => {
            content2.innerHTML += `
            <div class="box">
            <h2 class="title is-size-3 has-text-centered has-background-success-light p-2"> Submitted by ${trade2.data().email}</h1>
            <p class="has-text-centered has-text-success"> League: ${trade2.data().league}</p>
            <p class="has-text-centered has-text-success"> Team: ${trade2.data().trading_team}</p>
            <p class="has-text-centered has-text-success"> Trading Time: ${trade2.data().trading_time}</p>
            <p class="has-text-centered has-text-danger"> Team to Trade With: ${trade2.data().receiving_team}</p>
            <p class="has-text-centered has-text-danger"> Receiving Time: ${trade2.data().receiving_time}</p>

          </div>    
        `;
        })
    })
})

// store details in FIREBASE
function addTrade() {
    let trade_league = document.querySelector("#trade_league").value;
    let m = document.querySelector("#post_trade").value;
    let trade_team = document.querySelector("#trade_team").value;
    let receiving_team = document.querySelector("#receiving_team").value;
    let sending_time = document.querySelector("#sending_time").value;
    let receiving_time = document.querySelector("#receiving_time").value;

    let trade_details = {
        league: trade_league,
        trading_team: trade_team,
        receiving_team: receiving_team,
        trading_time: sending_time,
        receiving_time: receiving_time,
        email: auth.currentUser.email
    }

    alert(trade_details.email);

    db.collection("trade_details").add(trade_details).then(() => {
        console.log('review_added');

    })
}

function addAvailability() {
    let availability_team = document.querySelector("#availability_team").value;
    let availability_day = document.querySelector("#availability_day").value;
    let availability_time = document.querySelector("#availability_time").value;


    let availability_details = {
        league: availability_team,
        day_of_week: availability_day,
        time: availability_time,
        email: auth.currentUser.email
    }

    alert(availability_details.email);

    db.collection("coach_availability").add(availability_details).then(() => {
        console.log('review_added');

    })
}

// store trade data in database