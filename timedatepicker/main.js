(function () {
    window.datePicker = {};
    window.datePicker.getDateData = function (year, month) {
        var data = [];
        var dataYear = year;
        var dataMonth = month - 1;
        if (month > 12) {
            let year1 = parseInt(month / 12);
            let month1 = parseInt(month % 12);
            dataYear = dataYear + year1;
            dataMonth = month1;
        }
        var dataDate = new Date(dataYear, dataMonth, 1);
        var firstDay = dataDate.getDay();
        if (firstDay === 0) {
            firstDay = 7;
        }
        var preMonthLastDay = new Date(dataYear, dataMonth, 0).getDate();
        var thisMonthLastDate = new Date(dataYear, month, 0).getDate();
        for (let i = 0; i < 6 * 7; i++) {
            let thisDay = {}
            thisDay.year = dataYear;
            if ((i + 1) < firstDay) {
                thisDay.date = preMonthLastDay - (firstDay - i - 1 - 1);
                thisDay.month = dataMonth - 1;
            }
            else if (i > (firstDay - 1 + thisMonthLastDate - 1)) {
                thisDay.date = i - (firstDay - 1 + thisMonthLastDate - 1);
                thisDay.month = dataMonth + 1;
            }
            else {
                thisDay.date = i - (firstDay - 1 - 1)
                thisDay.month = dataMonth;
            }
            data.push(thisDay);
        }
        return data;
    }
})()