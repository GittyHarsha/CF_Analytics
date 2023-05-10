
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let handle1 = params.handle; // "some_value"

const usernameElement = document.getElementById("username");

usernameElement.textContent = handle1; // Replace 'elementId' with the ID of the element you want to find
// console.log(usernameElement.textContent);
console.log(handle1);

// async function main() {
//   async function getUserSolvedProblems(handle) {
//     const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`);

//     if (response.status !== 200) {
//       console.log(`Failed to get the user's solved problems data. Status code: ${response.status}`);
//       return null;
//     }

//     const submissions = response.data.result;
//     const solvedProblems = {};

//     for (const submission of submissions) {
//       if (submission.verdict === 'OK') {
//         const problem = submission.problem;
//         const problemLevel = problem.index;
//         const div = problem.contestId.toString().charAt(0);

//         if (!solvedProblems[div]) {
//           solvedProblems[div] = {};
//         }

//         if (!solvedProblems[div][problemLevel]) {
//           solvedProblems[div][problemLevel] = 0;
//         }

//         solvedProblems[div][problemLevel]++;
//       }
//     }

//     return solvedProblems;
//   }
//   const handle = 'tourist';
//   const solvedProblems = await getUserSolvedProblems(handle);

//   console.log(solvedProblems);
//   let totalPoints = 0;
//   let factorA = 90, factorB = 180, factorC = 270, factorD = 360, factorE = 400, factorF = 450;
//   for (const key in solvedProblems) {
//     for (const level in solvedProblems[key]) {
//       if (level == 'A')
//         totalPoints += (factorA * solvedProblems[key][level]);
//       else if (level == 'B')
//         totalPoints += (factorB * solvedProblems[key][level]);
//       else if (level == 'C')
//         totalPoints += (factorC * solvedProblems[key][level]);
//       else if (level == 'D')
//         totalPoints += (factorD * solvedProblems[key][level]);
//       else if (level == 'E')
//         totalPoints += (factorE * solvedProblems[key][level]);
//       else if (level == 'F')
//         totalPoints += (factorF * solvedProblems[key][level]);
//     }
//     factorA -= 10;
//     factorB -= 20;
//     factorC -= 30;
//     factorD -= 40;
//     factorE -= 50;
//     factorF -= 60;
//   }
//   console.log(totalPoints);
//   let stars = 0;
//   if (totalPoints >= 200000)
//     stars = 5;
//   else if (totalPoints >= 100000)
//     stars = 4;
//   else if (totalPoints >= 50000)
//     stars = 3;
//   else if (totalPoints >= 10000)
//     stars = 2;
//   else if (totalPoints >= 5000)
//     stars = 1;
//   else
//     stars = 0;


//   const filledStarImage = '<img src="star.png" alt="Filled Star" height="18px" width="18px">';
//   const emptyStarImage = '<img src="empty_star.png" alt="Empty Star" height="18px" width="18px">';

//   const filledStarsCount = stars; // Number of filled stars
//   const emptyStarsCount = 5 - stars; // Number of empty stars

//   // Generate HTML for filled stars
//   let filledStarsHTML = '';
//   for (let i = 0; i < filledStarsCount; i++) {
//     filledStarsHTML += filledStarImage;
//   }

//   // Generate HTML for empty stars
//   let emptyStarsHTML = '';
//   for (let i = 0; i < emptyStarsCount; i++) {
//     emptyStarsHTML += emptyStarImage;
//   }

//   // Display the stars
//   const starsContainer = document.getElementById('stars-container');
//   starsContainer.innerHTML = filledStarsHTML + emptyStarsHTML;


// }
// main();

const api_url = `https://codeforces.com/api/user.status?handle=${handle1}&from=1&count=1000000`;
fetch(api_url)
  .then(response => response.json())
  .then(data => {

    const tags = {};
    const language = {};
    const verdicts = {};
    const ratings = {};
    const accepted = new Set();
    const tried = new Set();
    // Levels of the user
    let problem_count = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    var total = 0;
    for (let submission of data.result) {
      total = total + 1;

      tried.add(submission.problem.contestId + '-' + submission.problem.index);

      if (submission.verdict === 'OK') {

        accepted.add(submission.problem.contestId + '-' + submission.problem.index);
        //Tags of the user
        submission.problem.tags.forEach((tag) => {
          tags[tag] = (tags[tag] || 0) + 1;
        });

        //Levels of the user
        let problem_index = submission.problem.index;
        if (problem_index in problem_count) {
          problem_count[problem_index]++;
        }

        //Ratings of the user
        const rt = submission.problem.rating;
        if (ratings[rt])
          ratings[rt]++;
        else
          ratings[rt] = 1;

      }
      //Language of the user
      const pl = submission.programmingLanguage;
      if (language[pl])
        language[pl]++;
      else
        language[pl] = 1;

      //Verdicts of the user
      const vr = submission.verdict;
      if (verdicts[vr])
        verdicts[vr]++;
      else
        verdicts[vr] = 1;



    }


    let labels = Object.keys(problem_count);
    let bata = Object.values(problem_count);

    let ctx = document.getElementById('level-chart').getContext('2d');

    let Levelchart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Problems Solved',
          data: bata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    //Tags of the user

    let TagLabel = Object.keys(tags);
    let TagData = Object.values(tags);

    let cty = document.getElementById('tag-chart').getContext('2d');

    let TagChart = new Chart(cty, {
      type: 'doughnut',
      data: {
        labels: TagLabel,
        datasets: [{
          label: 'Problems Solved',
          data: TagData,

        }]


      },
    });

    //Language of the user
    let LangLabel = Object.keys(language);
    let LangData = Object.values(language);

    let ctz = document.getElementById('lang-chart').getContext('2d');

    let LangChart = new Chart(ctz, {
      type: 'pie',
      data: {
        labels: LangLabel,
        datasets: [{
          data: LangData,
          radius: '60%',

        }]


      },
    });

    //Verdicts of the user

    let VerdictLabel = Object.keys(verdicts);
    let VerdictData = Object.values(verdicts);

    let ctty = document.getElementById('verdict-graph').getContext('2d');

    let VerdChart = new Chart(ctty, {
      type: 'pie',
      data: {
        labels: VerdictLabel,
        datasets: [{
          data: VerdictData,
          radius: '64%',
        }]
      }
    });

    //Problem rating of user

    let RatingLabel = Object.keys(ratings);
    let RatingData = Object.values(ratings);

    let ctte = document.getElementById('rating-graph').getContext('2d');

    let RatingChart = new Chart(ctte, {
      type: 'bar',
      data: {
        labels: RatingLabel,
        datasets: [{
          data: RatingData,
          label: 'Problems Solved',
        }]
      }
    });


    const solved = accepted.size;
    const countElement = document.getElementById('solved-value');
    countElement.textContent = solved;

    const triednum = tried.size;
    const ctelt = document.getElementById('tried-value');
    ctelt.textContent = triednum;

    const avnum = document.getElementById('average-value');
    avnum.textContent = (total / solved).toFixed(2);

  })
  .catch(error => console.error(error));

const api_url1 = 'https://codeforces.com/api/user.rating?handle=' + handle1;
fetch(api_url1)
  .then(response => response.json())
  .then(data => {

    var maxRatingUp = 0;
    var maxRatingDown = 0;
    var contests = 0;
    for (let RatingChange of data.result) {
      contests++;
      maxRatingUp = Math.max(maxRatingUp, Math.max(RatingChange.newRating - RatingChange.oldRating, 0));
      maxRatingDown = Math.max(maxRatingDown, Math.max(0, RatingChange.oldRating - RatingChange.newRating));
    }
    console.log(maxRatingUp);

    const maxup = document.getElementById('chadai-value');
    maxup.textContent = maxRatingUp;

    const maxdown = document.getElementById('girna-value');
    maxdown.textContent = -maxRatingDown;

    document.getElementById('contest-value').textContent = contests;

    // if(contests==0)


  })
  .catch(error => console.error(error));
