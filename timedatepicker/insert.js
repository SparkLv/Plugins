(function () {
    var insertTimepicker = {};
    insertTimepicker.insert = function (data) {
        var html = "<div class='datepicker'><div class='datepicker-header'><a href='#' class='datepicker-btn datepicker-left-btn'>&lt;</a><a href='#' class='datepicker-btn datepicker-right-btn'>&gt;</a><span class='datepicker-message'></span></div><div class='datepicker-body'><table class='datepicker-table'><thead><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>七</th></thead><tbody>"
        var content = "";
        for (let i = 0; i < data.length; i++) {
            if ((i + 1) % 7 == 1) {
                content = content + "<tr>";
                content = content + "<td class='datepicker-td'>" + data[i].date + "</td>";
            }
            else if ((i + 1) % 7 == 0) {
                content = content + "<td class='datepicker-td'>" + data[i].date + "</td>";
                content = content + "</tr>";
            }
            else {
                content = content + "<td class='datepicker-td'>" + data[i].date + "</td>";
            }
        }
        html = html + content;
        html = html + "</tbody></table></div></div>";
        return html;
    };
    insertTimepicker.init = function () {
        var div = document.createElement('div');
        div.classList.add('datepicker-contain');
        document.body.appendChild(div);
    }
    insertTimepicker.changeBox = function (html) {
        var div = document.querySelector('.datepicker-contain')
        div.innerHTML = html;
        var leftBtn = document.querySelector('.datepicker-left-btn');
        var rightBtn = document.querySelector('.datepicker-right-btn');
        leftBtn.addEventListener('click', function () {
            let btnMessage = document.querySelector('.datepicker-message');
            let btnText = btnMessage.innerHTML;
            let btnArr = btnText.split('-');
            let btnYear = parseInt(btnArr[0]);
            let btnMonth = parseInt(btnArr[1]) - 1;
            insertTimepicker.changDate(btnYear, btnMonth);
        })
        rightBtn.addEventListener('click', function () {
            let btnMessage = document.querySelector('.datepicker-message');
            let btnText = btnMessage.innerHTML;
            let btnArr = btnText.split('-');
            let btnYear = parseInt(btnArr[0]);
            let btnMonth = parseInt(btnArr[1]) + 1;
            insertTimepicker.changDate(btnYear, btnMonth);
        })
    }
    insertTimepicker.changDate = function (inityear, initmonth) {
        var getDate = datePicker.getDateData(inityear, initmonth);
        var html = insertTimepicker.insert(getDate);
        insertTimepicker.changeBox(html);
        insertTimepicker.show();
        insertTimepicker.show();
        var year2, month2;
        if (initmonth > 12) {
            let year1 = parseInt(initmonth / 12);
            let month1 = parseInt(initmonth % 12);
            year2 = parseInt(inityear) + year1;
            month2 = month1;
        }
        else if (initmonth == 0) {
            year2 = parseInt(inityear) - 1;
            month2 = 12;
        }
        else {
            year2 = inityear;
            month2 = initmonth;
        }
        let messageMonth = insertTimepicker.formmat(month2);
        let message = year2 + '-' + messageMonth;
        insertTimepicker.changeMessage(message);
        var td = document.getElementsByClassName('datepicker-td');
        for (let i = 0; i < td.length; i++) {
            td[i].addEventListener('click', function () {
                let month1 = getDate[i].month + 1;
                var month2, year2;
                if (month1 > 12) {
                    let year1 = parseInt(month1 / 12);
                    let month3 = parseInt(month1 % 12);
                    year2 = getDate[i].year + year1;
                    month2 = insertTimepicker.formmat(month3);
                }
                else {
                    year2 = getDate[i].year;
                    month2 = insertTimepicker.formmat(month1);
                }
                let date = insertTimepicker.formmat(getDate[i].date);
                var input = document.querySelector('.datepicker-input');
                input.value = year2 + '-' + month2 + '-' + date;
                insertTimepicker.show();
            }, false)
        }
    }
    insertTimepicker.inputevent = function (event) {
        event.stopPropagation();
        var inityear, initmonth;
        var input = document.querySelector('.datepicker-input');
        var inputText = input.value;
        var inputArr = inputText.split('-');
        if (inputText == '') {
            var initData = new Date();
            inityear = initData.getFullYear();
            initmonth = initData.getMonth() + 1
        }
        else {
            inityear = inputArr[0];
            initmonth = inputArr[1];
        }
        var getDate = datePicker.getDateData(inityear, initmonth);
        var html = insertTimepicker.insert(getDate);
        insertTimepicker.mounted();
        insertTimepicker.changeBox(html);
        insertTimepicker.show();
        var year2, month2;
        if (initmonth > 12) {
            let year1 = parseInt(initmonth / 12);
            let month1 = parseInt(initmonth % 12);
            year2 = inityear + year1;
            month2 = month1;
        }
        else {
            year2 = inityear;
            month2 = initmonth;
        }
        let messageMonth = month2;
        let message = year2 + '-' + messageMonth;
        insertTimepicker.changeMessage(message);
        var td = document.getElementsByClassName('datepicker-td');
        for (let i = 0; i < td.length; i++) {
            td[i].addEventListener('click', function () {
                let month1 = getDate[i].month + 1;
                var month2, year2;
                if (month1 > 12) {
                    let year1 = parseInt(month1 / 12);
                    let month3 = parseInt(month1 % 12);
                    year2 = getDate[i].year + year1;
                    month2 = insertTimepicker.formmat(month3);
                }
                else {
                    year2 = getDate[i].year;
                    month2 = insertTimepicker.formmat(month1);
                }
                let date = insertTimepicker.formmat(getDate[i].date);
                var input = document.querySelector('.datepicker-input');
                input.value = year2 + '-' + month2 + '-' + date;
                insertTimepicker.show();
            }, false)
        }
    }
    insertTimepicker.mounted = function () {
        var input = document.querySelector('.datepicker-input');
        input.removeEventListener('click', insertTimepicker.inputevent);
        input.addEventListener('click', insertTimepicker.inputevent);
    }
    insertTimepicker.show = function () {
        var contain = document.querySelector('.datepicker-contain');
        var input = document.querySelector('.datepicker-input');
        var top = input.offsetTop;
        var left = input.offsetLeft;
        var height = input.offsetHeight;
        contain.style.top = top + height + 2 + 'px';
        contain.style.left = left + 'px';
        if (contain.classList.contains('datepicker-contain-show')) {
            contain.classList.remove('datepicker-contain-show');
        }
        else {
            contain.classList.add('datepicker-contain-show');
        }
    }
    insertTimepicker.formmat = function (val) {
        if (val < 10) {
            val = '0' + val;
        }
        return val;
    }
    insertTimepicker.changeMessage = function (val) {
        span = document.querySelector('.datepicker-message');
        span.innerHTML = val;
    }
    insertTimepicker.init();
    insertTimepicker.mounted();
    document.body.addEventListener('click', function () {
        var contain = document.querySelector('.datepicker-contain');
        contain.classList.remove('datepicker-contain-show');
    })
    var contain = document.querySelector('.datepicker-contain');
    contain.addEventListener('click', function (event) {
        event.stopPropagation();
    })
})()