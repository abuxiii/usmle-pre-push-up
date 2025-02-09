// Select Time Limit
var mins;
var secs;

function cd() {
    var timeExamLimit = $("#timeExamLimit").val();
    mins = 1 * m("" + timeExamLimit); // change minutes here
    secs = 0 + s(":01");
    redo();
}

function m(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj.substring(i, i + 1) == ":") break;
    }
    return obj.substring(0, i);
}

function s(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj.substring(i, i + 1) == ":") break;
    }
    return obj.substring(i + 1, obj.length);
}

function dis(mins, secs) {
    var disp;
    if (mins <= 9) {
        disp = " 0";
    } else {
        disp = " ";
    }
    disp += mins + ":";
    if (secs <= 9) {
        disp += "0" + secs;
    } else {
        disp += secs;
    }
    return disp;
}

function redo() {
    secs--;
    if (secs == -1) {
        secs = 59;
        mins--;
    }
    document.cd.disp.value = dis(mins, secs);
    if (mins == 0 && secs == 0) {
        $("#examAction").val("autoSubmit");
        $("#submitAnswerFrm").submit();
    } else {
        cd = setTimeout("redo()", 100);
    }
}

function init() {
    cd();
}
window.onload = init;

function closeFormSuspend() {
    document.getElementById("suspendform").style.display = "none";
}

function closeFormEnd() {
    document.getElementById("endform").style.display = "none";
}

$(document).ready(function () {
    $("#suspend").click(function () {
        $("#suspendform").css("display", "block");
    });

    $("#suspend_confirm").click(function () {
        var susp = "suspend";
        var exam = $("#exa_id").val();
        var queryString = "susp_exam=" + susp + "&exa_id=" + exam;

        // Initiate the AJAX request.
        $.ajax({
            type: "POST",
            url: "stop_end.php",
            data: queryString,
            dataType: "json",
            // Notice: No success callback here.
        });

        // Redirect immediately.
        window.location = "welcome.php";
    });

    $("#end").click(function () {
        $("#endform").css("display", "block");
    });
    var clickCounter = 0; // Initialize click counter

    $(document).ready(function () {
        // Initialize click counter from localStorage or default to 0
        var clickCounter = parseInt(localStorage.getItem("clickCounter")) || 0;

        $("#end_confirm").click(function () {
            clickCounter++; // Increment the click counter on each click

            //   if (clickCounter === 1) {
            // On the first click, reload the page
            // location.reload();
            //   } else if (clickCounter === 2) {
            // On the second click, perform the AJAX request and redirect

            var end = "completed";
            var exam = exam_id; // Assuming exam_id is defined somewhere in your code

            // Assuming exam_json is already an object or has been parsed from a JSON string correctly
            var examData = exam_json; // Directly use it if it's already an object or has been correctly parsed

            var quesNum = Object.keys(examData).length; // Total number of questions
            var correctQuestionNum = 0; // Initialize correct questions counter

            // Iterate over each question to count those with answer_status == "1"
            Object.values(examData).forEach((question) => {
                // Ensure to check the 'answer_status' from the correct part of the question structure
                // Assuming 'answer_status' is directly within each question object
                if (question.answer_status == "1") {
                    correctQuestionNum += 1;
                }
            });

            // Prepare data to send, including calculated values
            var dataToSend = {
                end_exam: end,
                exa_id: exam,
                ques_num: quesNum, // Total number of questions
                correct_qustion_num: correctQuestionNum, // Number of correct answers
            };

            // Perform the AJAX request
            $.ajax({
                type: "POST",
                url: "stop_end.php",
                data: dataToSend,
                dataType: "json",
                success: function (response) {
                    // Handle the success response if needed
                    // For example, you can redirect here if required
                    window.location = "test_result.php?id=" + exam_id;
                    // Reset the click counter to 0 after successful AJAX request
                    clickCounter = 0;
                    localStorage.setItem("clickCounter", clickCounter.toString());
                },
                error: function (xhr, status, error) {
                    // Handle any errors that occur during the AJAX request
                },
            });
            //   }

            // Update the click counter in localStorage
            localStorage.setItem("clickCounter", clickCounter.toString());
        });
    });

    $("#add_note").click(function () {
        var id = ques_id;
        var note = $("#note_text").val();
        // alert(note);
        queryString = "qu_id=" + id + "&note_text=" + note;
        //  queryString = 'ex_id=' + exam +'mark_add=' + mark_value + '&qu_id=' + id ;
        $.ajax({
            type: "POST",
            url: "add_note.php",
            data: queryString,
            dataType: "json",
            success: function (response) {
                if (response == "done") {
                    $("#noteform").css("display", "none");
                    document.getElementById("note_text").value = "";
                    alert("your note sucssfuly added");
                }
            },
        });
    });

    // addfeedback

    $("#add_feed_back").click(function () {
        var id = ques_id;
        var note = $("#feedback_text").val();
        //alert(id+note);
        queryString = "qu_id=" + id + "&feed_text=" + note;
        //  queryString = 'ex_id=' + exam +'mark_add=' + mark_value + '&qu_id=' + id ;
        $.ajax({
            type: "POST",
            url: "add_feedback.php",
            data: queryString,
            dataType: "json",
            success: function (response) {
                if (response == "done") {
                    $("#feedbackform").css("display", "none");
                    document.getElementById("feedback_text").value = "";
                    alert("your feedback sucssfuly added");
                }
            },
        });
    });

    // end submit0

    function anser_submit(ans) {
        // $("#q_anser_ch1").click(function () {
        // alert($(this).val())
        // var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;

        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    }

    $("#q_anser_ch2").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch3").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch4").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch5").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch6").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch7").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch8").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch9").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });

    $("#q_anser_ch10").change(function () {
        var ans = $(this).val();
        //  var exam=$('input[type="hidden"]').val();
        var exam = exam_id;
        var id = ques_id;
        //alert(ans + exam+id);
        // console.log(ans + exam+id);
        // console.log(exam);
        queryString =
            "ex_id=" +
            exam +
            "&qu_id=" +
            id +
            "&ans_ch=" +
            ans +
            "&user_id=" +
            user_id;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) { },
        });
    });
    $("#submit1").click(function () {
        var ans = $('input[type="radio"]:checked').val();
        var exam = $('input[type="hidden"]').val();
        var id = $(this).data("id");

        queryString = "ex_id=" + exam + "&qu_id=" + id + "&ans_ch=" + ans;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) {
                //     var dd=response[0].correct_choice;
                //    alert(dd);
                var correct = response[0].correct_choice;
                var txt1 = '<span><i class="las la-check"></i></span>';
                var txt2 = '<span><i class="las la-times"></i></span>';
                $(".answer_valid").css("display", "flex !important");

                if (ans == correct) {
                    if (correct == "A") {
                        $(".anser_a1").addClass("true_answer");
                        $(".anser_a1").append(txt1);
                    } else if (correct == "B") {
                        $(".anser_b1").addClass("true_answer");
                        $(".anser_b1").append(txt1);
                    } else if (correct == "C") {
                        $(".anser_c1").addClass("true_answer");
                        $(".anser_c1").append(txt1);
                    } else if (correct == "D") {
                        $(".anser_d1").addClass("true_answer");
                        $(".anser_d1").append(txt1);
                    } else if (correct == "E") {
                        $(".anser_e1").addClass("true_answer");
                        $(".anser_e1").append(txt1);
                    }
                } else {
                    if (correct == "A") {
                        $(".anser_a1").addClass("true_answer");
                        $(".anser_a1").append(txt1);
                    } else if (correct == "B") {
                        $(".anser_b1").addClass("true_answer");
                        $(".anser_b1").append(txt1);
                    } else if (correct == "C") {
                        $(".anser_c1").addClass("true_answer");
                        $(".anser_c1").append(txt1);
                    } else if (correct == "D") {
                        $(".anser_d1").addClass("true_answer");
                        $(".anser_d1").append(txt1);
                    } else if (correct == "E") {
                        $(".anser_e1").addClass("true_answer");
                        $(".anser_e1").append(txt1);
                    }

                    if (ans == "A") {
                        $(".anser_a1").addClass("false_answer");
                        $(".anser_a1").append(txt2);
                    } else if (ans == "B") {
                        $(".anser_b1").addClass("false_answer");
                        $(".anser_b1").append(txt2);
                    } else if (ans == "C") {
                        $(".anser_c1").addClass("false_answer");
                        $(".anser_c1").append(txt2);
                    } else if (ans == "D") {
                        $(".anser_d1").addClass("false_answer");
                        $(".anser_d1").append(txt2);
                    } else if (ans == "E") {
                        $(".anser_e1").addClass("false_answer");
                        $(".anser_e1").append(txt2);
                    }
                }
            },
        });
    });

    // end submit1

    $("#submit2").click(function () {
        var ans = $('input[type="radio"]:checked').val();
        var exam = $('input[type="hidden"]').val();
        var id = $(this).data("id");

        queryString = "ex_id=" + exam + "&qu_id=" + id + "&ans_ch=" + ans;
        $.ajax({
            type: "POST",
            url: "validate_answer.php",
            data: queryString,
            dataType: "json",
            success: function (response) {
                //     var dd=response[0].correct_choice;
                //    alert(dd);
                var correct = response[0].correct_choice;
                var txt1 = '<span><i class="las la-check"></i></span>';
                var txt2 = '<span><i class="las la-times"></i></span>';
                $(".answer_valid").css("display", "flex !important");

                if (ans == correct) {
                    if (correct == "A") {
                        $(".anser_a2").addClass("true_answer");
                        $(".anser_a2").append(txt1);
                    } else if (correct == "B") {
                        $(".anser_b2").addClass("true_answer");
                        $(".anser_b2").append(txt1);
                    } else if (correct == "C") {
                        $(".anser_c2").addClass("true_answer");
                        $(".anser_c2").append(txt1);
                    } else if (correct == "D") {
                        $(".anser_d2").addClass("true_answer");
                        $(".anser_d2").append(txt1);
                    } else if (correct == "E") {
                        $(".anser_e2").addClass("true_answer");
                        $(".anser_e2").append(txt1);
                    }
                } else {
                    if (correct == "A") {
                        $(".anser_a2").addClass("true_answer");
                        $(".anser_a2").append(txt1);
                    } else if (correct == "B") {
                        $(".anser_b2").addClass("true_answer");
                        $(".anser_b2").append(txt1);
                    } else if (correct == "C") {
                        $(".anser_c2").addClass("true_answer");
                        $(".anser_c2").append(txt1);
                    } else if (correct == "D") {
                        $(".anser_d2").addClass("true_answer");
                        $(".anser_d2").append(txt1);
                    } else if (correct == "E") {
                        $(".anser_e2").addClass("true_answer");
                        $(".anser_e2").append(txt1);
                    }

                    if (ans == "A") {
                        $(".anser_a2").addClass("false_answer");
                        $(".anser_a2").append(txt2);
                    } else if (ans == "B") {
                        $(".anser_b2").addClass("false_answer");
                        $(".anser_b2").append(txt2);
                    } else if (ans == "C") {
                        $(".anser_c2").addClass("false_answer");
                        $(".anser_c2").append(txt2);
                    } else if (ans == "D") {
                        $(".anser_d2").addClass("false_answer");
                        $(".anser_d2").append(txt2);
                    } else if (ans == "E") {
                        $(".anser_e2").addClass("false_answer");
                        $(".anser_e2").append(txt2);
                    }
                }
            },
        });
    });
    // end submit2
});

$(document).ready(function ($) {
    function animateElements() {
        $(".progressbar").each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find(".circle").attr("data-percent");
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data("animate");
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data("animate", true);
                $(this)
                    .find(".circle")
                    .circleProgress({
                        startAngle: -Math.PI / 2,
                        value: percent / 100,
                        size: 180,
                        thickness: 10,
                        emptyFill: "rgba(0,0,0, .2)",
                        fill: {
                            color: "#0ee732",
                        },
                    })
                    .on(
                        "circle-animation-progress",
                        function (event, progress, stepValue) {
                            $(this)
                                .find("div")
                                .text((stepValue * 100).toFixed(1) + "%");
                        }
                    )
                    .stop();
            }
        });
    }

    // Show animated elements
    animateElements();
    $(window).scroll(animateElements);
}); //end document ready function