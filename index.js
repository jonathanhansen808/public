let loggedoutlinks = document.querySelectorAll(".loggedout");
let loggedinlinks = document.querySelectorAll(".loggedin");

// content div
let content = document.querySelector("#content");
// let review_content = document.querySelector('#review_content');

// function configureContent(user_) {
//     if (user_) {

//         db.collection("reviews").get().then((data) => {
//             let stadiums = data.docs;

//             let content = document.querySelector("#center");
//             review_content.innerHTML = "";

//             stadiums.forEach((stadium) => {
//                 review_content.innerHTML += `
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
//         <p class="is-size-5">Be sure to sign up at the top-right of the page to be able to look at? </p>
//         </div>`
//     }
// }

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

// let about = document.querySelector("#about");
// about.addEventListener("click", (e) => {
//     e.preventDefault();
//     let content = document.querySelector('#center');

//     html =
//         `
//             <div>
//                 <div>
//                     <p class="has-background-danger-dark p-1 mb-5"></p>
//                     <p
//                         class="menu-label has-text-centered  has-text-danger-dark has-text-weight-bold is-size-3">
//                         About
//                     </p>
//                     <p class="has-background-danger-dark p-1 mb-5"></p>
//                     <p class="mb-5">

//                     </p>
//                     <div>
//                         <p class="mb-6">
//                             Welcome to <a href="index.html">America's Pastime Reviews</a>! This website was
//                             created
//                             to consolidate all information about the MLB stadiums, both in the
//                             American and National League. Information about any stadium, including their events
//                             and
//                             ticket information can be found on any individual stadium's page.
//                         </p>
//                         <p class="mb-6">
//                             Here, fans can rate their experiences at various stadiums to help other fans decide
//                             whether or not they want to attend an event happening at a certain stadium. To see
//                             fan's
//                             reviews or leave your own review, please sign up using the link at the top right of
//                             the
//                             website.
//                         </p>
//                         <p class="mb-6">
//                             Both Jon and Peter are avid sports fans, so when they were assigned to create a
//                             website for their web development class, it was a no brainer to create a sports
//                             related website. We both like baseball and really enjoy the architecture of the
//                             stadiums and the uniqueness that each stadium has.
//                         </p>

//                         <p class="mb-6">
//                             Peter is from the Chicago suburbs and has been a life long Cubs fan. He has been to
//                             several opening day games at Wrigley Field, as well as attended games at several
//                             other ballparks. Below are some pictures that he has captured over the years that
//                             shows the beauty of Wrigley Field.
//                         </p>

//                         <p class="mb-6">
//                             Jon is from the Oshkosh, Wisconsin and has been a Brewers fan his whole life. As big of a fan as he is,
//                             he'll never get over the fact that the Brewers switched their name from Miller Park. 
//                         </p>
//                         <div class='ml-4 mr-4 mb-4'>
//                             <p><img src="images/chicubs.JPG"></p>
//                         <div>
//                     </div>
//                 </div>
//             </div>
//            `
// content = document.querySelector("#center");
// content.innerHTML = html
// })


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

// attach submit event for reviews 

// store details in FIREBASE
// let post_comment = document.querySelector('#post_comment');

// post_comment.addEventListener("click", (e) => {
//     e.preventDefault();
//     // grab review 
//     let stadium = document.querySelector("#stadium").value;
//     let score = document.querySelector("#score").value;
//     let review = document.querySelector("#review").value;

//     let file = document.querySelector("#stadium_image").files[0];
//     let image = new Date() + "_" + file.name;

//     const task = ref.child(image).put(file);

//     task
//         .then(snapshot => snapshot.ref.getDownloadURL())
//         .then((url) => {
//             let comment_details = {
//                 stadium_name: stadium,
//                 stadium_score: score,
//                 stadium_review: review,
//                 email: auth.currentUser.email,
//                 url: url
//             }

//             db.collection("reviews").add(comment_details).then((data) => {
//                 console.log("review added");
//             })
//             document.getElementById('stadium').value = '';
//             document.getElementById('score').value = '';
//             document.getElementById('review').value = '';
//             document.getElementById("stadium_image").value = "";
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

// submitrecipeform.addEventListener("submit", (e) => {
//     e.preventDefault();
//     // grab recipte title
//     let recipe_title = document.querySelector("#recipe_title").value;
//     let recipe_description = document.querySelector("#recipe_description").value;
//     // let recipe_title = document.querySelector("#recipe_title");
//     let recipe_details = {
//         title: recipe_title,
//         desc: recipe_description
//     }
//     // console.log(recipe_details);
//     db.collection("recipes").add(recipe_details).then((data) => {
//         console.log("recipe added");
//     })
// })

// let sfg = document.querySelector("#sfg");

// sfg.addEventListener("click", (e) => {
//     e.preventDefault();
//     let html =
//         `
//     <div class="section>
//         <div class="container">
//             <div class = "columns">
//                 <div class="column p-2">
//                     <div class="content">
//                     <p class="has-background-danger-dark p-1 mb-0"></p>
//                     <p
//                         class="menu-label has-text-centered  has-text-danger-dark has-text-weight-bold is-size-3">
//                         Oracle Park
//                     </p>
//                     <p class="has-background-danger-dark p-1 mb-5"></p>                        <p><img src="images/sfg.webp"></p>
//                         <p> Oracle Park has a beautiful backdrop of the San Francisco Bay that is so close that people in boats sometimes can catch the homeruns. Enjoy the sun and sit back for a great experience. </p>
//                         <p>
//                             <ul>
//                                 <li>Address: 24 Willie Mays Plaza</li>
//                                 <li>Opened: Aril 11, 2000</li>
//                                 <li>Capacity: 40,930</li>
//                             </ul>
//                         </p>
//                         <p> 
//                             <h1> Buy Tickets Now! </h1>
//                             <p> <a target="_blank" href="https://www.ticketmaster.com/san-francisco-giants-tickets/artist/806016">Giants Tickets</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
// check that you have done things correctly so far 
//     let content = document.querySelector("#center");
//     let information = `sfg`;
//     content.innerHTML = html;
// });


// let rankings = document.querySelector("#rankings");
// console.log(rankings.id);
// rankings.addEventListener("click", (e) => {
//     e.preventDefault();
//     let content = document.querySelector("#center");
//     html = `
//     <div class="has-text-centered">
//     <p class="has-background-danger-dark p-1 mb-0"></p>
//     <p
//         class="menu-label has-text-centered  has-text-danger-dark has-text-weight-bold is-size-3">
//         Rankings
//     </p>
//     <p class="has-background-danger-dark p-1 mb-5"></p>

//         <table class="table is-hoverable is-fullwidth is-striped">
//             <thead>
//                 <tr>
//                 <th>Rank</th> 
//                 <th>Stadium</th>
//                 <th>Team</th>  
//                 <th>Score</th>
//                 </tr>
//             </thead>

//             <tbody>
//                 <tr>
//                 <th>1</th>
//                 <td><a target="_blank" href="https://www.mlb.com/pirates/ballpark" title="PNC Park">PNC Park</a>
//                 </td>
//                 <td>Pittsburgh Pirates</td>
//                 <td>96</td>
//                 </tr>

//                 <tr>
//                 <th>2</th>
//                 <td><a target="_blank" href="https://www.mlb.com/cubs/ballpark" title="Wrigley Field">Wrigley Field</a></td>
//                 <td>Chicago Cubs</td>
//                 <td>95</td>
//                 </tr>

//                 <tr>
//                 <th>3</th>
//                 <td><a target="_blank" href="https://www.mlb.com/braves/ballpark" title="Truist Park">Truist Park</a></td>
//                 <td>Atlanta Braves</td>
//                 <td>93</td>
//                 </tr>

//                 <tr>
//                 <th>4</th>
//                 <td><a target="_blank" href="https://www.mlb.com/twins/ballpark" title="Target Field">Target Field</a></td>
//                 <td>Minnesota Twins</td>
//                 <td>91</td>
//                 </tr>

//                 <tr>
//                 <th>5</th>
//                 <td><a target="_blank" href="https://www.mlb.com/giants/ballpark" title="Oracle Park">Oracle Park</a></td>
//                 <td>San Francisco Giants</td>
//                 <td>90</td>
//                 </tr>

//                 <tr>
//                 <th>6</th>
//                 <td><a target="_blank" href="https://www.mlb.com/dodgers/ballpark" title="Dodger Stadium">Dodger Stadium</a></td>
//                 <td>Los Angeles Dodgers</td>
//                 <td>89</td>
//                 </tr>

//                 <tr>
//                 <th>7</th>
//                 <td><a target="_blank" href="https://www.mlb.com/padres/ballpark" title="Petco Park ">Petco Park </a></td>
//                 <td>San Diego Padres</td>
//                 <td>87</td>
//                 </tr>

//                 <tr>
//                 <th>8</th>
//                 <td><a target="_blank" href="https://www.mlb.com/mets/ballpark" title="Citi Field  ">Citi Field </a></td>
//                 <td>New York Mets</td>
//                 <td>86</td>
//                 </tr>



//                 <tr>
//                 <th>9</th>
//                 <td><a target="_blank" href="https://www.mlb.com/redsox/ballpark" title="Fenway Park">Fenway Park</a></td>
//                 <td>Boston Red Sox</td>
//                 <td>85</td>
//                 </tr>

//                 <tr>
//                 <th>10</th>
//                 <td><a target="_blank" href="https://www.mlb.com/phillies/ballpark" title="Citizens Bank Park">Citizens Bank Park</a></td>
//                 <td>Philadelphia Phillies</td>
//                 <td>84</td>
//                 </tr>

//                 <tr>
//                 <th>11</th>
//                 <td><a target="_blank" href="https://www.mlb.com/rangers/ballpark" title="Globe Life Field">Globe Life Field</a></td>
//                 <td>Texas Rangers</td>
//                 <td>84</td>
//                 </tr>



//                 <tr>
//                 <th>12</th>
//                 <td><a target="_blank" href="https://www.mlb.com/mariners/ballpark" title="T-Mobile Park">T-Mobile Park</a></td>
//                 <td>Seattle Mariners</td>
//                 <td>83</td>
//                 </tr>

//                 <tr>
//                 <th>13</th>
//                 <td><a target="_blank" href="https://www.mlb.com/yankees/ballpark" title="Yankee Stadium">Yankee Stadium</a></td>
//                 <td>New York Yankees</td>
//                 <td>82</td>
//                 </tr>

//                 <tr>
//                 <th>14</th>
//                 <td><a target="_blank" href="https://www.mlb.com/royals/ballpark" title="Kauffman Stadium">Kauffman Stadium</a></td>
//                 <td>Kansas City Royals</td>
//                 <td>80</td>
//                 </tr>

//                 <tr>
//                 <th>15</th>
//                 <td><a target="_blank" href="https://www.mlb.com/orioles/ballpark" title="Oriole Park at Camden Yards">Oriole Park at Camden Yards</td>
//                 <td>Baltimore Orioles</td>
//                 <td>79</td>
//                 </tr>

//                 <tr>
//                 <th>16</th>
//                 <td><a target="_blank" href="https://www.mlb.com/rockies/ballpark" title="Coors Field">Coors Field</a></td>
//                 <td>Colorado Rockies</td>
//                 <td>78</td>
//                 </tr>

//                 <tr>
//                 <th>17</th>
//                 <td><a target="_blank" href="https://www.mlb.com/indians/ballpark" title="Progressive Field"> Progressive Field</a></td>
//                 <td>Cleveland Indians</td>
//                 <td>77</td>
//                 </tr>

//                 <tr>
//                 <th>18</th>
//                 <td><a target="_blank" href="https://www.mlb.com/nationals/ballpark" title="Nationals Park">Nationals Park</a></td>
//                 <td>Washington Nationals</td>
//                 <td>76</td>
//                 </tr>

//                 <tr>
//                 <th>19</th>
//                 <td><a target="_blank" href="https://www.mlb.com/brewers/ballpark" title="Miller Park">American Family Field</a></td>
//                 <td>Milwaukee Brewers</td>
//                 <td>74</td>
//                 </tr>

//                 <tr>
//                 <th>20</th>
//                 <td><a target="_blank" href="https://www.mlb.com/astros/ballpark" title="Minute Maid Park">Minute Maid Park</a></td>
//                 <td>Houston Astros</td>
//                 <td>72</td>
//                 </tr>

//                 <tr>
//                 <th>21</th>
//                 <td><a target="_blank" href="https://www.mlb.com/tigers/ballpark" title="Comerica Park">Comerica Park</a></td>
//                 <td>Detroit Tigers</td>
//                 <td>70</td>
//                 </tr>

//                 <tr>
//                 <th>22</th>
//                 <td><a target="_blank" href="https://www.mlb.com/marlins/ballpark" title="Marlins Park ">Marlins Park </a></td>
//                 <td>Miami Marlins</td>
//                 <td>69</td>
//                 </tr>

//                 <tr>
//                 <th>23</th>
//                 <td><a target="_blank" href="https://www.mlb.com/cardinals/ballpark" title="Busch Stadium">Busch Stadium</a></td>
//                 <td>St. Louis Cardinals </td>
//                 <td>67</td>
//                 </tr>

//                 <tr>
//                 <th>24</th>
//                 <td><a target="_blank" href="https://www.mlb.com/whitesox/ballpark" title="Guaranteed Rate Field">Guaranteed Rate Field</a></td>
//                 <td>Chicago White Sox </td>
//                 <td>66</td>
//                 </tr>

//                 <tr>
//                 <th>25</th>
//                 <td><a target="_blank" href="https://www.mlb.com/reds/ballpark" title="Great American Ball Park">Great American Ball Park</a></td>
//                 <td>Cincinnate Reds</td>
//                 <td>64</td>
//                 </tr>

//                 <tr>
//                 <th>26</th>
//                 <td><a target="_blank" href="https://www.mlb.com/angels/ballpark" title="Angel Stadium">Angel Stadium</a></td>
//                 <td>Los Angeles Angles</td>
//                 <td>63</td>
//                 </tr>

//                 <tr>
//                 <th>27</th>
//                 <td><a target="_blank" href="https://www.mlb.com/diamondbacks/ballpark" title="Chase Field">Chase Field</a></td>
//                 <td>Arizona Diamondbacks</td>
//                 <td>62</td>
//                 </tr>

//                 <tr>
//                 <th>28</th>
//                 <td><a target="_blank" href="https://www.mlb.com/bluejays/ballpark" title="Rogers Centre">Rogers Centre</a></td>
//                 <td>Toronto Blue Jays </td>
//                 <td>61</td>
//                 </tr>

//                 <tr>
//                 <th>29</th>
//                 <td><a target="_blank" href="https://www.mlb.com/rays/ballpark" title="Tropicana Field">Tropicana Field</a></td>
//                 <td>Tampa Bay Rays</td>
//                 <td>60</td>
//                 </tr>

//                 <tr>
//                 <th>30</th>
//                 <td><a target="_blank" href="https://www.mlb.com/athletics/ballpark" title="Oakland Coliseum">Oakland Coliseum</a></td>
//                 <td>Oakland Athletics </td>
//                 <td>59</td>
//                 </tr>


//             </tbody>
//         </table>
//     </div>
//     `
//     content = document.querySelector("#center");
//     content.innerHTML = html;
// });



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
let hidden_form = document.querySelector("#hidden_form");
let html = `<div class="is-size-2  title has-background-primary-dark has-text-centered has-text-white">Post your Rental!</div>
<!-- make this form centered using bulma -->
            <div class="field">
                <label class="label has-text-white">What league are you in?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. League 1">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What court will you be trading for?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Court 1">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What time slot will you be trading for?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 6 pm">
                </div>
              </div>
    
                
              <div class="field">
                <label class="label has-text-white">What court will you be trading?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Court 2">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What time slot will you be trading?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 6 pm">
                </div>
              </div>
                
              
              
              <div class="field">
                <label class="label has-text-white">What team are you</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Team 1">
                </div>
              </div>
              <div class="field">
                <label class="label has-text-white">What team are you trading with?</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Team 2">
                </div>
              </div>
`;
let tradeform = document.querySelector("#tradeform");
tradebtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#center").innerHTML = "";
    tradeform.innerHTML = html;
})

// store trade data in database
tradeform.addEventListener("submit", (e) => {
    e.preventDefault()
    // adjust this part to match form 

    // grab the recipe title
    // use everything but Wisc Email and url
    let trade_league = document.querySelector("#trade_league").value;
    let trade_receiving_gym = document.querySelector("#trade_receiving_gym").value;
    let trade_receiving_time = document.querySelector("#trade_receiving_time").value;
    let trade_sending_gym = document.querySelector("#trade_sending_gym").value;
    let trade_team = document.querySelector("#trade_team").value;
    let trade__trading_team = document.querySelector("#trade__trading_team").value;

    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            // console.log(url);
            // combine title and description into one object
            let trade_details = {
                league: trade_league,
                receiving_gym: trade_receiving_gym,
                receiving_time: trade_receiving_time,
                sending_gym: rental_pick_up_date,
                sending_time: trade_sending_gym,
                team: trade_team,
                trading_team: trade__trading_team


            }


            console.log(trade_details);




            // test
            // console.log(recipe_title, "=>", recipe_description);
            // console.log(recipe_details);

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


})