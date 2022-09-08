import React from 'react';
import PropTypes from 'prop-types';

export default function Calendar(props) {
    const date = props.date;
    const currentWeekDay = props.date.getDay();
    const currentMonth = props.date.getMonth() + 1;
    const currentDay = props.date.getDate();
    const currentYear = props.date.getFullYear();
    const byMonth = props.date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
    }).split(' ')[1];
    const numDays = [1, 3, 5, 7, 8, 10, 12].includes(currentMonth) ? 31 : (currentMonth === 2) ? 28 : 30;
    const leftOtherMonth = 7 - (currentDay - currentWeekDay) % 7;
    const rightOtherMonth = 7 - (numDays - (currentDay + 7 - currentWeekDay)) % 7;
    const prevMonth = ([30, 28].includes(numDays) || (currentMonth === 8)) ? 31 : (currentMonth === 3) ? 29 : 30;

    let daysArray = [];
    var i;
    for (i = 0; i < leftOtherMonth; i++) {
        daysArray[i] = {
            value: prevMonth - leftOtherMonth + i + 1,
            className: 'ui-datepicker-other-month', key: i
        }
    };
    for (i = leftOtherMonth; i < numDays + leftOtherMonth; i++) {
        daysArray[i] = {
            value: i - leftOtherMonth + 1,
            className: (i - leftOtherMonth + 1 === currentDay) ? 'ui-datepicker-today' : '', key: i
        }
    };
    for (i = numDays + leftOtherMonth; i < numDays + leftOtherMonth + rightOtherMonth; i++) {
        daysArray[i] = {
            value: i - numDays - rightOtherMonth,
            className: 'ui-datepicker-other-month', key: i
        }
    };

    let weekArray = [];
    for (i = 0; i < 5; i++) { weekArray[i] = daysArray.splice(0, 7) };  


    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{props.date.toLocaleString('en-us', { weekday: 'long' })}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{currentDay}</div>
                    <div className="ui-datepicker-material-month">{byMonth}</div>
                    <div className="ui-datepicker-material-year">{currentYear}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{props.date.toLocaleString('en-us', { month: 'long' })}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {weekArray.map(week =>
                        <tr>{week.map(day => <td className={day.className}>{day.value}</td>)}
                        </tr>)}                    
                </tbody>
            </table>
        </div>
    )
}

Calendar.propTypes={
    date: PropTypes.object.isRequired,
}