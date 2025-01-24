//from priv
$(".none").fadeIn();
$(".customtest").fadeOut();

$("#customRadio10").click(function () {
  if (subscription_status == "active") {
    $(".none").fadeOut();
    $(".customtest").fadeIn();
  } else {
    Swal.fire({
      title: "Premium Feature",
      html: "Access to this feature is limited to premium members. Upgrade to enjoy full access!",
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#8BC34A",
      confirmButtonText:
        '<a href="paypal/index.php" style="color:white;text-decoration:none"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve" width="20px" style="margin-right: 8px;"><polygon style="fill:#FFEA8A;" points="0,443.733 0,68.267 17.067,68.267 136.533,187.733 256,68.267 375.467,187.733   494.933,68.267 512,68.267 512,443.733 "></polygon><polygon style="fill:#FFDB2D;" points="494.933,68.267 375.467,187.733 256.002,68.267 256,68.267 256,443.733 512,443.733   512,68.267 "></polygon></svg>Upgrade Now</a>',
      cancelButtonText:
        '<a href="#" style="color:white;text-decoration:none">Later</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle "Later" action
      } else {
        // Handle "Upgrade Now" action
      }
    });
    $("#unusedRadio").trigger("click");
  }
});

$("#unusedRadio").click(function () {
  $(".none").fadeIn();
  $(".customtest").fadeOut();
});
$("#incorrectRadio").click(function () {
  $(".none").fadeIn();
  $(".customtest").fadeOut();
});
$("#markedRadio").click(function () {
  $(".none").fadeIn();
  $(".customtest").fadeOut();
});
$("#allRadio").click(function () {
  $(".none").fadeIn();
  $(".customtest").fadeOut();
});
$("#omittedRadio").click(function () {
  $(".none").fadeIn();
  $(".customtest").fadeOut();
});

// get getQuesions for custom page
function getQuesions(str) {
  str = document.getElementById("retreve_id").value;
  if (str.length == 0) {
    document.getElementById("textarea").innerHTML = "";
    alert("Please Enter a Testid value");
    return;
  } else {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("textarea").innerHTML = this.responseText;
      }
    };
    xmlhttp.open("GET", "retrieve_test_Q_ids.php?q=" + str, true);
    xmlhttp.send();
  }
}

// for subject checkboxes
$(".selectALLSUB").click(function () {
  // If the "Select All" checkbox is checked
  if (this.checked) {
    // Check all boxes
    $(".subj_input").prop("checked", true);
  } else {
    // Uncheck all boxes
    $(".subj_input").prop("checked", false);
    $(".sys_input").prop("checked", false);
    $(".cat_input ").prop("checked", false);
  }
});

$(".subj_input").click(function () {
  // If the number of checked subj_inputes is equal to the total number of subj_inputes
  if ($(".subj_input:checked").length == $(".subj_input").length) {
    // Check the "Select All" box
    $(".selectALLSUB").prop("checked", true);
  } else {
    // Uncheck the "Select All" box
    $(".selectALLSUB").prop("checked", false);
  }
});

// for system checkboxes

$(".selectALLSYS").click(function () {
  // If the "Select All" checkbox is checked
  if (this.checked) {
    // Check all boxes
    $(".sys_input").prop("checked", true);
    $(".cat_input ").prop("checked", true);
  } else {
    // Uncheck all boxes
    $(".sys_input").prop("checked", false);
    $(".cat_input ").prop("checked", false);
  }
});

$(document).on("change", ".sys_input", function () {
  if (this.checked) {
    sysId = $(this).val();
    $('[class*="sys_sub_cat' + sysId + '"]').prop("checked", true);
  } else {
    $('[class*="sys_sub_cat' + sysId + '"]').prop("checked", false);
  }
  // If the number of checked sys_inputs is equal to the total number of sys_inputs
  if ($(".sys_input:checked").length === $(".sys_input").length) {
    // Check the "Select All" box
    $(".selectALLSYS").prop("checked", true);
  } else {
    // Uncheck the "Select All" box
    $(".selectALLSYS").prop("checked", false);
  }
});
$(document).on("change", ".cat_input", function () {
  var sysid = $(this).closest(".nc-sub").data("id"); // Use .data('id') to access data-id attribute
  $("#sys-ck" + sysid).prop("checked", true);
});

// });
//////////
mode = p.unused;
$("#unused_countlabel").text(p.unused_count);
$("#incorrect_countlabel").text(p.incorrect_count);
$("#marked_countlabel").text(p.marked_count);
$("#all_countlabel").text(p.all_count);
$("#omitted_countlabel").text(p.omitted_count);

subjects_list = getAllSubjects();
var midpoint = Math.ceil(subjects_list.length / 2); // Calculate midpoint, rounding up for odd numbers

subjects_list.forEach(function (subject, index) {
  // Determine which list to append to based on the current index
  var targetListId =
    index < midpoint ? "#subjectsListFirstHalf" : "#subjectsListSecondHalf";

  var listItem = $(
    '<li class="list-group-item d-flex justify-content-left align-items-center"></li>'
  );

  var input = $('<input type="checkbox" class="option subj_input">')
    .val(subject.id)
    .attr("name", "subject[]");
  var span = $('<span class="float-right"></span>').text(subject.name);
  var badge = $(
    '<div class="mt-2 border border-info text-info badge-pill"></div>'
  ).addClass("subj_tr" + subject.id);
  var badgeSpan = $("<span></span>").text("0"); // Assuming 0 is a placeholder value

  badge.append(badgeSpan);
  listItem.append(input);
  listItem.append(span);
  listItem.append(badge);

  $(targetListId).append(listItem);
});

//system

system_list = getAllSystems();
var midpoint = Math.ceil(system_list.length / 2); // Calculate the midpoint
system_list.forEach(function (system, index) {
  // Determine the target div based on the index
  var targetListId =
    index < midpoint ? "#systemsListFirstHalf" : "#systemsListSecondHalf";

  var contiainer_div = $('<div class="nc-top-container" data-depth="1"></div>');
  // var listItem = $('<li class="list-group-item d-flex justify-content-left align-items-center"></li>');
  var main_system_contiainer = $('<div class="nc-main"></div>');
  var sub_system_contiainer = $(
    '<div class="nc-sub-container2 toglview' + system.id + '"></div>'
  );

  var input = $(
    '<input type="checkbox" class="option sys_input" name="System[]" disabled>'
  )
    .val(system.id)
    .attr("id", "sys-ck" + system.id);
  var button = $(
    '<button type="button" class="nc-arrow floatr toggle" data-id="' +
      system.id +
      '"><span><i class="las la-plus"></i></span></button>'
  );
  var span = $('<lable class="float-right"></lable>').text(system.name);
  var badge = $(
    ' <span class="mt-2  border border-info text-info mt-2 badge-pill">0</span>'
  ).addClass("sys_tr" + system.id);
  // var badgeSpan = $('<span></span>').text("0"); // Assuming 0 is a placeholder value

  // badge.append(badgeSpan);
  contiainer_div.append(main_system_contiainer);
  contiainer_div.append(sub_system_contiainer);
  main_system_contiainer.append(input);
  main_system_contiainer.append(span);
  main_system_contiainer.append(button);
  main_system_contiainer.append(badge);

  $(targetListId).append(contiainer_div);
});

// cat
cat_list = groupCategoriesBySystem(p.all);
Object.entries(cat_list).forEach(function ([sys_id, values]) {
  // console.log("system ID:", categoryId); // Log the category ID

  // Now, iterate over the values if it's an object
  // Assuming 'values' is an object here:
  Object.entries(values).forEach(function ([index, cat_id]) {
    // console.log("Key:", key, "Value:", value); // Do something with each key-value pair within the category
    var categoryDiv = $('<div class="nc-sub" data-id="' + sys_id + '"></div>');

    // Create the input checkbox for the category
    var input = $(
      '<input type="checkbox" class="diffcategory cat_input sys_sub_cat' +
        sys_id +
        '" disabled>'
    )
      .val(cat_id)
      .attr("id", "cat-ck" + sys_id + "_" + cat_id)
      .attr("name", "categ[]");
    // Create the label for the checkbox
    var label = $("<label></label>")
      .attr("for", "cat-ck" + cat_id)
      .text(getCategoryNameById(cat_id));
    // Create the badge span with a placeholder value
    var badgeSpan = $(
      '<span class="mt-2 border border-info text-info mt-2 badge-pill cat_tr' +
        sys_id +
        "_" +
        cat_id +
        '">0</span>'
    );
    $("input[type=checkbox]:checked").closest(".panel-collapse").attr("id");

    // Append the elements to the main category div
    categoryDiv.append(input);
    categoryDiv.append(label);
    categoryDiv.append(badgeSpan);

    // Append the category div to the container
    $(".toglview" + sys_id).append(categoryDiv);
  });
  // });
  // Create the main container for each category
});

$('input[type="radio"][name="exam_type"]').change(function () {
  $('[class*=" sys_tr"], [class*="sys_tr"]').each(function () {
    $(this).text("0");
  });
  $('[class*=" cat_tr"], [class*="cat_tr"]').each(function () {
    $(this).text("0");
  });
  $(".selectALLSUB").prop("checked", false);
  $(".selectALLSYS").prop("checked", false);
  $('input[name="subject[]"]').prop("checked", false);
  $('input[name="System[]"]').prop("checked", false);
  $('input[name="categ[]"]').prop("checked", false);
  $('input[name="System[]"]').prop("disabled", true);
  $('input[name="categ[]"]').prop("disabled", true);

  // This function is triggered whenever a radio button with the name 'exam_type' changes
  // alert("The radio button value has changed. The new value is: " + this.value);
  switch (this.value) {
    // case value1:
    //     // Code to execute when the expression matches value1
    case "Unused":
      mode = p.unused;
      break;
    case "Incorrect":
      mode = p.incorrect;
      break;
    case "Marked":
      mode = p.marked;
      break;
    case "All":
      mode = p.all;
      break;
    case "Omitted":
      mode = p.omitted;
      break;
    default:
      mode = p.all;
  }
  console.log(this.value);
  console.log(p.omitted);
  subjectQuestionCount = countQuestionsByField(mode, "subj_id");
});
function groupCategoriesBySystem(data) {
  // Initialize an empty object to hold the grouping
  const result = {};

  // Loop through each item in the provided data
  data.forEach((item) => {
    // Extract system ID and category ID from the current item
    const sysId = item.sys_id;
    const catId = item.cat_id;

    // Initialize the system ID key in the result object if not already present
    if (!result[sysId]) {
      result[sysId] = new Set(); // Using a Set to ensure unique categories
    }

    // Add the category ID to the set of categories for the current system
    result[sysId].add(catId);
  });

  // Convert Sets back to arrays for easier consumption
  for (const sysId in result) {
    result[sysId] = Array.from(result[sysId]);
  }

  return result;
}
function countQuestionsByField(allQuestions, field, sys_id = null) {
  // Function to count questions by a specific field (e.g., subj_id, sys_id, cat_id, topic_id) without filtering
  count = allQuestions.reduce((acc, question) => {
    acc[question[field]] = (acc[question[field]] || 0) + 1;
    return acc;
  }, {});
  console.log(count);
  switch (field) {
    case "subj_id":
      $('[class*=" subj_tr"] span, [class*="subj_tr"] span').each(function () {
        $(this).text("0");
      });

      Object.entries(count).map(([key, value]) => {
        // [Number(key), value];

        id = Number(key);
        name = getSubjectNameById(Number(key));
        count = value;
        // alert([name, id, count]);
        $(".subj_tr" + id + " span").text(count);
      });

      break;
    case "sys_id":
      $('[class*=" sys_tr"], [class*="sys_tr"] span').each(function () {
        $(this).text("0");
      });
      $('[class*=" cat_tr"], [class*="cat_tr"]').each(function () {
        $(this).text("0");
      });
      // $('input[name="subject[]"]').prop("checked", false);
      $('input[name="System[]"]').prop("checked", false);
      $('input[name="categ[]"]').prop("checked", false);
      $('input[name="System[]"]').prop("disabled", true);
      $('input[name="categ[]"]').prop("disabled", true);
      Object.entries(count).map(([key, value]) => {
        // [Number(key), value];
        var countsByCatId = [];
        id = Number(key);
        name = getSystemNameById(Number(key));
        count = value;
        $("#sys-ck" + id).prop("disabled", false);
        // alert([name, id, count]);
        $(".sys_tr" + id).text(count);
        filteredQuestions = allQuestions.filter(
          (question) => question.sys_id == id
        );
        countsByCatId = filteredQuestions.reduce((acc, question) => {
          acc[question.cat_id] = (acc[question.cat_id] || 0) + 1;
          return acc;
        }, {});

        $('[class*=" cat_tr' + id + '"], [class*="cat_tr' + id + '"]').each(
          function () {
            $(this).text("0");
          }
        );
        // console.log("filteredQuestions")
        // console.log(filteredQuestions)
        // console.log("countsByCatId")
        // console.log(countsByCatId)
        Object.entries(countsByCatId).map(([key, value]) => {
          // alert(value)
          // [Number(key), value];
          cat_id = Number(key);
          name = getCategoryNameById(Number(key));
          count = value;
          $("#cat-ck" + id + "_" + cat_id).prop("disabled", false);
          $(".cat_tr" + id + "_" + cat_id).text(count);
        });
      });

      break;
    case "cat_id":
      $('[class*=" cat_tr"], [class*="cat_tr"]').each(function () {
        $(this).text("0");
      });
      console.log("this is count:" + count);
      console.log(count);
      Object.entries(count).map(([key, value]) => {
        // [Number(key), value];
        id = Number(key);
        name = getCategoryNameById(Number(key));
        count = value;
        console.log(id, count);
        $("#sys-ck" + id).prop("disabled", false);
        // alert([name, id, count]);
        $(".cat_tr" + sys_id + "_" + id).text(count);
      });
      break;

    default:
      break;
  }
  return count;
}

function filterQuestionsByField(allQuestions, field, specifiedIds) {
  // General function to filter questions by specific IDs of any given field
  filteredQuestions = allQuestions.filter((question) =>
        specifiedIds.includes(String( question[field]))
  );
  console.log(filteredQuestions);
  return filteredQuestions;
}

// Example usage:
// Count questions by subject
subjectQuestionCount = countQuestionsByField(mode, "subj_id");
var filteredconnected_ques = [];
filteredconnected_ques = p.all.filter(
  (item) => Number(item.questionSetCount) > 0
);
// Filter questions for specified subjects
var specifiedSubjectIds = [];
var questionsForSpecifiedSubjects = [];
$('input[name="subject[]"], .selectALLSUB').change(function () {
  // Clear the array
  specifiedSubjectIds = [];

  // Iterate over all checked checkboxes with name 'subject[]' and add their value to the array
  $('input[name="subject[]"]:checked').each(function () {
    specifiedSubjectIds.push($(this).val());
  });

  questionsForSpecifiedSubjects = filterQuestionsByField(
    mode,
    "subj_id",
    specifiedSubjectIds
  );
  systemQuestionCount = countQuestionsByField(
    questionsForSpecifiedSubjects,
    "sys_id"
  );
});

var questionsForSpecifiedSystems = [];
var questionsFor_one_System;
var catQuestionCount;
$('input[name="System[]"], .selectALLSYS').change(function () {
  // Clear the array
  specifiedSystemIds = [];

  // Iterate over all checked checkboxes with name 'System[]' and add their value to the array
  $('input[name="System[]"]:checked').each(function () {
    specifiedSystemIds.push($(this).val());
  });
  let flag =
    !questionsForSpecifiedSubjects || questionsForSpecifiedSubjects.length === 0
      ? "subjnot_exist"
      : "exists";

  if (flag == "subjnot_exist") {
    questionsForSpecifiedSubjects = mode;
    $('input[name="subject[]"]').prop("checked", true);
    $(".selectALLSUB").prop("checked", true);
    $('input[name="subject[]"], .selectALLSUB').trigger("change");

    // questionsForSpecifiedSystems = filterQuestionsByField(mode, 'subj_id', specifiedSystemIds);
  }
  questionsForSpecifiedSystems = filterQuestionsByField(
    questionsForSpecifiedSubjects,
    "sys_id",
    specifiedSystemIds
  );
  rre = [$(this).val()];
  questionsFor_one_System = filterQuestionsByField(
    questionsForSpecifiedSystems,
    "sys_id",
    rre
  );
});

// Count and filter questions by category within specified systems
var specifiedCatIds = [];
var questionsForSpecifiedCats = [];
var selectedItems;
let tq = [];
$("#create_test_btn").click(function () {
  // var subscriptionCheck = subscription_check();
  var subscriptionCheck = subscription_check().then((status) => {
    console.log("Subscription status:", status);
    if (status == "trial_ended" || status == "trial") {
      return;
    } else {
      create_test();
    }
  });
});

function filterByParentQuestionId(data, parentId) {
  return data.filter(item => item.parentQuestionId === parentId);
}
function create_test() {
  if (questionsForSpecifiedSubjects.length === 0) {
    alert("Please select at least one subject.");
    return; // Exits the function early
  }
  if (questionsForSpecifiedSystems.length === 0) {
    alert("Please select at least one System.");
    return; // Exits the function early
  }

  // Clear the array
  specifiedCatIds = [];

  // Iterate over all checked checkboxes with name 'categ[]' and add their value to the array
  $('input[name="categ[]"]:checked').each(function () {
    specifiedCatIds.push($(this).val());
  });
  questionsForSpecifiedCats = filterQuestionsByField(
    questionsForSpecifiedSystems,
    "cat_id",
    specifiedCatIds
  );

  if (questionsForSpecifiedCats.length === 0) {
    // If the array is empty, alert the user and exit the function
    alert("Please select at least one cat.");
    return; // Exits the function early
  }

  if ($("#number_qbox").val() <= 0) {
    // If the array is empty, alert the user and exit the function
    alert("Please Input no of questions");
    return; // Exits the function early
  }
  $(".loader_cont").css("display", "flex");

  console.log(questionsForSpecifiedCats);
  ques_no =
    questionsForSpecifiedCats.length < $("#number_qbox").val()
      ? questionsForSpecifiedCats.length
      : $("#number_qbox").val();
  randomselectedItems = questionsForSpecifiedCats
    .map((value) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, ques_no);
  var ques_counter = 0;
  var num_of_qus = randomselectedItems.length;
  console.log("randomselectedItems.length :" + randomselectedItems.length);
  $.each(randomselectedItems, function (index, question) {
    // Example operation: Logging each question's ques_id to the console
    if (question.questionSetCount > 1) {
      console.log("Question ID: " + question.ques_id);
      let remidsno = num_of_qus - ques_counter;
      let rem = parseInt(remidsno, 10);
      // if (rem >= question.questionSetCount) {
        try {
          // Create a set containing "parentQuestionId" values from array1
  

          // const filteredAndSortedQuestions = questionsForSpecifiedCats
          //   .filter(
          //     (ques) => ques.parentQuestionId == question.parentQuestionId
          //   )
          //   .sort((a, b) => a.questionSetSequenceId - b.questionSetSequenceId);
          filteredAndSortedQuestions=filterByParentQuestionId(filteredconnected_ques, question.parentQuestionId)
          console.log("filteredAndSortedQuestions");
          console.log(filteredAndSortedQuestions);
          for (const id of filteredAndSortedQuestions) {
            if (!tq.includes(id["ques_id"])) {
              // Check for duplicates
              tq[ques_counter] = id["ques_id"];
              console.log("ques_id", id["ques_id"]);
              ques_counter += 1;
              console.log(
                `ques_counter ${ques_counter} Rem ${rem} Remaining is greater than setCount of ${question.questionSetCount}`
              );
            } else {
              console.log(`Duplicate ID skipped: ${id["ques_id"]}`);
            }
          }
        } catch (error) {
          console.error("Error fetching sequenced questions:", error);
        }
      // }
    } else {
      if (!tq.includes(question.ques_id)) {
        // Also check for duplicates here
        tq[ques_counter] = question.ques_id;
        ques_counter++;
      } else {
        console.log(`Duplicate ID skipped: ${question.ques_id}`);
      }
    }

    // You can perform any other operations needed here, such as appending data to the DOM
  });
  console.log(tq);

  var questionIds = tq;
  // ques_no = $("#number_qbox").val();
  test_type = $("#customSwitch1").is(":checked") ? "Timed" : "Tutor";
  test_pool = $('input[name="exam_type"]:checked').val();
  test_start_time = new Date().getTime();

  $.ajax({
    type: "POST",
    url: "controller/createEx.php", // Path to your PHP file
    data: {
      questionIds: tq,
      ques_no: tq.length,
      test_type: test_type,
      test_pool: test_pool,
      test_start_time: test_start_time,
    }, // Your data you want to send
    success: function (response) {
      // Code to execute upon success
      console.log(response); // Log the response from the server
      if (response.redirect) {
        // Redirect user to the specified location
        window.location.href = response.location;
      }
    },
    dataType: "json",
    error: function (xhr, status, error) {
      // Code to execute on error
      console.error(error); // Log error information
    },
  });

  // const topicQuestionCount = countQuestionsByField(questionsForSpecifiedCats, 'topic_id');
}
$(document).on("click", ".toggle", function (e) {
  // e.preventDefault();

  var id = $(this).data("id");
  //alert(id);
  $(".toglview" + id).slideToggle();
});
$("#number_qbox").change(function () {
  subscription_check();
});

function subscription_check() {
  return new Promise((resolve, reject) => {
    if (subscription_status == "active") {
      if ($("#number_qbox").val() > 40) {
        $("#number_qbox").val("40");
      }
      resolve("active");
    } else if (parseInt(num_create_tests) < parseInt(num_allowed_test)) {
      if ($("#number_qbox").val() > 40) {
        $("#number_qbox").val("40");
      }
      resolve("active");
    } else if (num_allowed_test === "-1") {
      Swal.fire({
        title: "Premium Feature",
        html: "Access to this feature is limited to premium members. Upgrade to enjoy full access!",
        showCancelButton: true,
        showCloseButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#8BC34A",
        confirmButtonText:
          '<a href="paypal/index.php" style="color:white;text-decoration:none"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve" width="20px" style="margin-right: 8px;"><polygon style="fill:#FFEA8A;" points="0,443.733 0,68.267 17.067,68.267 136.533,187.733 256,68.267 375.467,187.733   494.933,68.267 512,68.267 512,443.733 "></polygon><polygon style="fill:#FFDB2D;" points="494.933,68.267 375.467,187.733 256.002,68.267 256,68.267 256,443.733 512,443.733   512,68.267 "></polygon></svg>Upgrade Now</a>',
        cancelButtonText:
          '<a href="#" style="color:white;text-decoration:none">Later</a>',
      }).then((result) => {
        if (result.isConfirmed) {
          $("#number_qbox").val("0");
          resolve("trial_ended");
        } else {
          resolve("trial_ended");
        }
      });
    } else {
      console.log("the subscription is not active");
      if ($("#number_qbox").val() > 5) {
        $("#number_qbox").val("5");
        Swal.fire({
          icon: "warning",
          title: "Only 5 Questions are allowed",
          text: "5 questions allowed in free version please upgrade now! to have Full Access!",
          showCancelButton: true,
          showCloseButton: true,
          cancelButtonColor: "#eeb103",
          confirmButtonText:
            '<a style="color:white;text-decoration:none">continue for free</a>',
          cancelButtonText:
            '<a href="paypal/index.php" style="color:white;text-decoration:none">Upgrade Now!</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            resolve("active");
          } else {
            resolve("trial"); // Or another status, depending on your business logic
          }
        });
      } else {
        resolve("active");
      }
    }
  });
}