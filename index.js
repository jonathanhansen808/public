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
// search
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
        calendar.forEach((rental) => {
            content.innerHTML += `
            <div class="box">
            <h1 class="title is-size-3 has-background-success-light p-2"> ${calendar.data().league}</h1>
            <p class="has-text-right has-text-danger"> ${calendar.data().receiving_gym}</p>
            <p class="has-text-right has-text-danger"> ${calendar.data().receiving_time}</p>
            <p class="has-text-right has-text-danger"> ${calendar.data().sending_gym}</p>
            <p class="has-text-right has-text-danger"> ${calendar.data().sending_time}</p>
            <p class="has-text-left has-text-success"> ${calendar.data().team}</p>
            <p class="has-text-left has-text-success"> ${calendar.data().trading_team}</p>
            <p class="m-2"><img width="200" src="${calendar.data().url}"/></p>
            // adjust here with form stuff
          </div>    
        `;
            // console.log(item.data().title,"=>",item.data().desc)
            // adjust title and description for each specific modal
        })
    })

    // adjust vehicle modals to be posted on the main page
})

// trade submission form
let tradebtn = document.querySelector("#tradebtn");
let main = document.querySelector("#trade_form");
let html = `<div class="is-size-2  title has-background-primary-dark has-text-centered has-text-white">Post your Trade</div>
            <div class="field">
                <label class="label has-text-white">What league are you in?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. League 1" id="trade_league">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What court will you be trading for?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Court 1" id="trade_receiving_gym">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What time slot will you be trading for?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 6 pm" id="trade_receiving_time"">
                </div>
              </div>
                
              <div class="field">
                <label class="label has-text-white">What court will you be trading?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Court 2" id="trade_sending_gym">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What time slot will you be trading?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 6 pm" id="trade_sending_time">
                </div>
              </div>
              
              <div class="field">
                <label class="label has-text-white">What team are you</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Team 1" id="trade_team">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What team are you trading with?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Team 2" id="trade_trading_team">
                </div>
              </div>
`;
let tradeform = document.querySelector("#tradeform");
tradebtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#tradeform").innerHTML = "";
    tradeform.innerHTML = html;
});


// availability submission form
let availbtn = document.querySelector("#availbtn");
let main2 = document.querySelector("#avail_form");
let html2 = `<div class="is-size-2  title has-background-primary-dark has-text-centered has-text-white">Post your Trade</div>
            <div class="field">
                <label class="label has-text-white">What league are you in?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. League 1" id="trade_league">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What nights of the week will work best?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Court 1" id="trade_receiving_gym">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What time slot will work best?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 6 pm" id="trade_receiving_time"">
                </div>
              </div>
`;
let avail_form = document.querySelector("#avail_form");
availbtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#avail_form").innerHTML = "";
    avail_form.innerHTML = html2;
});

// store trade data in database
tradeform.addEventListener("submit", (e) => {
    e.preventDefault()
    // adjust this part to match form 

    let trade_league = document.querySelector("#trade_league").value;
    let trade_receiving_gym = document.querySelector("#trade_receiving_gym").value;
    let trade_receiving_time = document.querySelector("#trade_receiving_time").value;
    let trade_sending_gym = document.querySelector("#trade_sending_gym").value;
    let trade_sending_time = document.querySelector("#trade_sending_time").value;
    let trade_team = document.querySelector("#trade_team").value;
    let trade_trading_team = document.querySelector("#trade_trading_team").value;
    // console.log(url);
    // combine title and description into one object
    let trade_details = {
        league: trade_league,
        receiving_gym: trade_receiving_gym,
        receiving_time: trade_receiving_time,
        sending_gym: trade_sending_gym,
        sending_time: trade_sending_time,
        team: trade_team,
        trading_team: trade_trading_team
    }
    console.log(trade_details);

    // add recipe details into firebase
    db.collection("trades").add(trade_details).then((data) => {
        console.log("trade added");
        // console.log(data.id)

        // 1. reset the form
        tradeform.reset();
        // 2. display success message for the user
        alert("You successfully submitted a trade");
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


// attach submit event for reviews 

// store details in FIREBASE
// let post_trade = document.querySelector('#post_trade');

// post_trade.addEventListener("click", (e) => {
//     e.preventDefault();
//     // grab review 
//     let trade_league = document.querySelector("#trade_league").value;
//     console.log(trade_league);
//     let trade_team = document.querySelector("#trade_team").value;
//     let receiving_team = document.querySelector("#receiving_team").value;
//     let sending_time = document.querySelector("#sending_time").value;
//     let receiving_time = document.querySelector("#receiving_time").value;


//     task
//         .then((url) => {
//             let trade_details = {
//                 league: trade_league,
//                 trading_team: trade_team,
//                 receiving_team: receiving_team,
//                 trading_time: sending_time,
//                 receiving_time: receiving_time,
//                 email: auth.currentUser.email,
//             }
//             console.log(trade_details);

//             db.collection("trade_details").add(trade_details).then((data) => {
//                 console.log("trade added");
//             })
//         })
// })

// retrieve data from firebase 
// db.collection("reviews").get().then((data) => {
// my data is an array
// let mydata = data.docs;

// mydata.forEach((item) => {
//     console.log("the name of the stadium is", item.data().stadium_name);
//     console.log("the score of the stadium is", item.data().stadium_score);
//     console.log("the review of the stadium is", item.data().stadium_review);

// })
// console.log(data.docs[0].data());
// })

// this area needs to be fixed - not sure exactly how
// function configureContent(user_) {
//     if (user_) {

//         db.collection("forms").get().then((data) => {
//             let forms = data.docs;
//             center.innerHTML = "";

//             forms.forEach((form) => {
//                 center.innerHTML += `
//                 <div class="box">
//                     <h1 class="title is-size-3 has-background-primary-light has-text-danger-dark">${stadium.data().stadium_name}</h1>
//                     <p class="has-text-right">Submitted by: ${stadium.data().email}</p>
//                     <p>${stadium.data().stadium_score}</p>
//                     <p>${stadium.data().stadium_review}</p>
//                     <div class="has-text-centered">
//                         <p class="m-2 ml-auto mr-auto is-centered"><img width="600" src="${stadium.data().url}" /></p>
//                     </div>
//                 </div>
//                 `;
//             })
//         })

//     } else {
//         review_content.innerHTML = "";
//         review_content.innerHTML = `
//         <div class="has-text-centered mb-3">
//         <p class="is-size-5">Be sure to sign up at the top-right of the page to be able to look at the content!</p>
//         </div>`
//     }
// }