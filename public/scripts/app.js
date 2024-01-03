// // Client facing scripts here
// $(document).ready(function () {
//   // --- our code goes here ---
//   $("#searchId").on("input", function (event) {
//     event.preventDefault();
//     const $searchText = $("#searchId").val();
//     console.log("$searchText:", $searchText);
//     $.ajax({
//       method: 'POST',
//       url: '/',
//       data: $searchText,
//       success: function (res) {
//         console.log(`data received:: ${res}`);
//        // loadTweets();//to load entered tweet as an article
//       },
//       error: function (err) {
//         console.log(`error received:: ${err}`);
//       }
//     });
//   });
// });