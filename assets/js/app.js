// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import $ from "jquery"

function initTimetracking() {
    if ($('.issue-time-blocks').length == 0) {
        return;
    }
    loadTimedata();
}


function loadTimedata() {
    $.get( window.issue_time_index_path, function(response) {
        let entryList = "";
        for (let i=0; i < response.data.length; i++) {
            let timeblock = response.data[i];
            entryList += "<tr id='entry_"+timeblock.id+"'>\n" +
                "            <td class=\"col-md-4\">" +
                "            <input id=startdate_"+timeblock.id+" type='date' value="+getFormattedDate(timeblock.starttime)+">" +
                "            <input id=starttime_"+timeblock.id+" type='time' value="+getFormattedTime(timeblock.starttime)+"></td>\n"+
                "            <td class=\"col-md-4\"> " +
                "            <input id=enddate_"+timeblock.id+" type='date' value="+getFormattedDate(timeblock.endtime)+">" +
                "            <input id=endtime_"+timeblock.id+" type='time' value="+getFormattedTime(timeblock.endtime)+"></td>\n" +
                "            <td class=\"col-md-4 text-right\">\n";


            if (window.permit_edit == "true") {
                entryList += " <span><a class=\"btn btn-default btn-xs\" onclick='window.updateTimeEntry("+timeblock.id+")'>Update</a></span>\n" +
                    "<span><a class='btn btn-danger btn-xs' onclick='window.deleteTimeEntry("+timeblock.id+")'>Delete</a></span>";
            }
            entryList += "</td></tr>"
        }
        $('.issue-time-blocks-content').html(entryList);
    });

}

function getFormattedDate(dateString) {
    if (!dateString) {
        return "";
    }

    let datetimeForm = new Date(dateString);
    let month = datetimeForm.getUTCMonth() + 1;
    let formattedMonth =  month < 10 ? '0'+ month : month;
    let formattedDay = datetimeForm.getUTCDate() < 10 ? '0' + datetimeForm.getUTCDate() : datetimeForm.getUTCDate();
    return datetimeForm.getUTCFullYear()+"-"+ formattedMonth+"-"+formattedDay;
}

function getCurrentTimeFormatted() {
    let datetimeForm = new Date();
    let month = datetimeForm.getUTCMonth() + 1;
    let formattedMonth =  month < 10 ? '0'+ month : month;
    let formattedDay = datetimeForm.getUTCDate() < 10 ? '0' + datetimeForm.getUTCDate() : datetimeForm.getUTCDate();
    let formattedMinutes = datetimeForm.getMinutes() < 10 ? '0' + datetimeForm.getMinutes() : datetimeForm.getMinutes();
    let formattedHours = datetimeForm.getHours() < 10 ? '0' + datetimeForm.getHours() : datetimeForm.getHours();
    let formattedDayPart = datetimeForm.getUTCFullYear()+"-"+ formattedMonth+"-"+formattedDay;
    let formattedTimePart = formattedHours+":"+formattedMinutes;
    return formattedDayPart +'T' + formattedTimePart + 'Z';
}

function getFormattedTime(dateString) {
    if (!dateString) {
        return "";
    }

    let datetimeForm = new Date(dateString);
    let formattedHours = datetimeForm.getHours() < 10 ? '0' + datetimeForm.getHours() : datetimeForm.getHours();
    let formattedMinutes = datetimeForm.getMinutes() < 10 ? '0' + datetimeForm.getMinutes() : datetimeForm.getMinutes();
    return formattedHours+":"+formattedMinutes;
}

window.updateTimeEntry = function (entryId) {
    let startDate = $('#startdate_'+entryId).val();
    let endDate = $('#enddate_'+entryId).val();
    let startTime = $('#starttime_'+entryId).val();
    let endTime = $('#endtime_'+entryId).val();

    if (!startDate || !endDate || !startTime || !endTime) {
        alert('Start date-time, end date-time are mandatory inputs');
        return;
    }

    let startDateObj = new Date(startDate +'T' + startTime + 'Z');
    let endDateObj = new Date(endDate +'T' + endTime + 'Z');

    if (startDateObj.getTime() > endDateObj.getTime()) {
        alert('Start date-time cannot be after End date-time');
        return;
    }
    let text = JSON.stringify({
        time_block: {
            id: entryId,
            starttime: startDateObj,
            endtime: endDateObj,
            task_id: window.current_issue_id
        },
    });

    $.ajax(window.time_path + '/' + entryId, {
        method: "PATCH",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => { alert("Activity updated successfully"); },
    });

};

window.deleteTimeEntry = function (entryId) {
    $.ajax(window.time_path + "/" + entryId, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: () => {
            alert('Deleted Time entry.');
            $('#entry_'+entryId).remove();
        },
        failure: () => {
            alert('Failed to delete entry.');
        }
    });
};

window.startStopTimer = function () {
    $('#startstop_button').each( (_, bb) => {
        let starttime = $(bb).data('starttime');
        if (starttime == "") {
            $(bb).text("Stop Timer");
            let formattedTime = getCurrentTimeFormatted();
            $(bb).data('starttime', formattedTime);
            let splitTime = formattedTime.split("T")
            $('#tracked_activity_details').html('Started activity at ' + splitTime[0]
                + " "+ splitTime[1].slice(0, -1));
        }
        else {
            let text = JSON.stringify({
                time_block: {
                    starttime: new Date($(bb).data('starttime')).toISOString(),
                    endtime: new Date(getCurrentTimeFormatted()).toISOString(),
                    task_id: window.current_issue_id
                },
            });

            $.ajax(window.time_path, {
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: text,
                success: (resp) => {
                    alert("Activity recorded successfully");
                    $(bb).data('starttime', "");
                    $(bb).text("Start Timer");
                    $('#tracked_activity_details').html('Click on the start button and start recording, and stop timer to save the change.');
                    loadTimedata();
                },
            });

        }
    });
}


$(document).ready(function () {
    initTimetracking();
});
