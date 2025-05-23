"use strict";
!(function (e, t) {
  var l,
    n,
    c,
    i,
    a = !0;
  function o(e, t) {
    var n = [],
      a = moment(e.start.toUTCString());
    return (
      t || n.push("<strong>" + a.format("HH:mm") + "</strong> "),
      e.isPrivate
        ? (n.push('<span class="calendar-font-icon ic-lock-b"></span>'),
          n.push(" Private"))
        : (e.isReadOnly
            ? n.push('<span class="calendar-font-icon ic-readonly-b"></span>')
            : e.recurrenceRule
            ? n.push('<span class="calendar-font-icon ic-repeat-b"></span>')
            : e.attendees.length
            ? n.push('<span class="calendar-font-icon ic-user-b"></span>')
            : e.location &&
              n.push('<span class="calendar-font-icon ic-location-b"></span>'),
          n.push(" " + e.title)),
      n.join("")
    );
  }
  function r(e) {
    var t = $(e.target).closest('a[role="menuitem"]')[0],
      n = f(t),
      a = l.getOptions(),
      o = "";
    switch ((console.log(t), console.log(n), n)) {
      case "toggle-daily":
        o = "day";
        break;
      case "toggle-weekly":
        o = "week";
        break;
      case "toggle-monthly":
        (a.month.visibleWeeksCount = 0), (o = "month");
        break;
      case "toggle-weeks2":
        (a.month.visibleWeeksCount = 2), (o = "month");
        break;
      case "toggle-weeks3":
        (a.month.visibleWeeksCount = 3), (o = "month");
        break;
      case "toggle-narrow-weekend":
        (a.month.narrowWeekend = !a.month.narrowWeekend),
          (a.week.narrowWeekend = !a.week.narrowWeekend),
          (o = l.getViewName()),
          (t.querySelector("input").checked = a.month.narrowWeekend);
        break;
      case "toggle-start-day-1":
        (a.month.startDayOfWeek = a.month.startDayOfWeek ? 0 : 1),
          (a.week.startDayOfWeek = a.week.startDayOfWeek ? 0 : 1),
          (o = l.getViewName()),
          (t.querySelector("input").checked = a.month.startDayOfWeek);
        break;
      case "toggle-workweek":
        (a.month.workweek = !a.month.workweek),
          (a.week.workweek = !a.week.workweek),
          (o = l.getViewName()),
          (t.querySelector("input").checked = !a.month.workweek);
    }
    l.setOptions(a, !0), l.changeView(o, !0), k(), p(), w();
  }
  function d(e) {
    switch (f(e.target)) {
      case "move-prev":
        l.prev();
        break;
      case "move-next":
        l.next();
        break;
      case "move-today":
        l.today();
        break;
      default:
        return;
    }
    p(), w();
  }
  function s() {
    var e = $("#new-schedule-title").val(),
      t = $("#new-schedule-location").val(),
      n = document.getElementById("new-schedule-allday").checked,
      a = c.getStartDate(),
      o = c.getEndDate(),
      r = i || CalendarList[0];
    e &&
      (l.createSchedules([
        {
          id: String(chance.guid()),
          calendarId: r.id,
          title: e,
          isAllDay: n,
          start: a,
          end: o,
          category: n ? "allday" : "time",
          dueDateClass: "",
          color: r.color,
          bgColor: r.bgColor,
          dragBgColor: r.bgColor,
          borderColor: r.borderColor,
          raw: { location: t },
          state: "Busy",
        },
      ]),
      $("#modal-new-schedule").modal("hide"));
  }
  function u(e) {
    var t,
      n,
      a,
      o,
      r = f($(e.target).closest('a[role="menuitem"]')[0]);
    (t = r),
      (n = document.getElementById("calendarName")),
      (a = findCalendar(t)),
      (o = []).push(
        '<span class="calendar-bar" style="background-color: ' +
          a.bgColor +
          "; border-color:" +
          a.borderColor +
          ';"></span>'
      ),
      o.push('<span class="calendar-name">' + a.name + "</span>"),
      (n.innerHTML = o.join("")),
      (i = a);
  }
  function g(e) {
    var t = e.start ? new Date(e.start.getTime()) : new Date(),
      n = e.end ? new Date(e.end.getTime()) : moment().add(1, "hours").toDate();
    a && l.openCreationPopup({ start: t, end: n });
  }
  function m(e) {
    var t = e.target.value,
      n = e.target.checked,
      a = document.querySelector(".lnb-calendars-item input"),
      o = Array.prototype.slice.call(
        document.querySelectorAll("#calendarList input")
      ),
      r = !0;
    "all" === t
      ? ((r = n),
        o.forEach(function (e) {
          var t = e.parentNode;
          (e.checked = n),
            (t.style.backgroundColor = n ? t.style.borderColor : "transparent");
        }),
        CalendarList.forEach(function (e) {
          e.checked = n;
        }))
      : ((findCalendar(t).checked = n),
        (r = o.every(function (e) {
          return e.checked;
        })),
        (a.checked = !!r)),
      h();
  }
  function h() {
    var e = Array.prototype.slice.call(
      document.querySelectorAll("#calendarList input")
    );
    CalendarList.forEach(function (e) {
      l.toggleSchedules(e.id, !e.checked, !1);
    }),
      l.render(!0),
      e.forEach(function (e) {
        var t = e.nextElementSibling;
        t.style.backgroundColor = e.checked
          ? t.style.borderColor
          : "transparent";
      });
  }
  function k() {
    var e = document.getElementById("calendarTypeName"),
      t = document.getElementById("calendarTypeIcon"),
      n = l.getOptions(),
      a = l.getViewName(),
      o =
        "day" === a
          ? ((a = "Daily"), "calendar-icon ic_view_day")
          : "week" === a
          ? ((a = "Weekly"), "calendar-icon ic_view_week")
          : 2 === n.month.visibleWeeksCount
          ? ((a = "2 weeks"), "calendar-icon ic_view_week")
          : 3 === n.month.visibleWeeksCount
          ? ((a = "3 weeks"), "calendar-icon ic_view_week")
          : ((a = "Monthly"), "calendar-icon ic_view_month");
    (e.innerHTML = a), (t.className = o);
  }
  function p() {

    var e = document.getElementById("renderRange"),
      t = l.getOptions(),
      n = l.getViewName(),
      a = [];
    "day" === n
      ? a.push(moment(l.getDate().getTime()).format("YYYY.MM.DD"))
      : "month" === n &&
        (!t.month.visibleWeeksCount || 4 < t.month.visibleWeeksCount)
      ? a.push(moment(l.getDate().getTime()).format("YYYY.MM"))
      : (a.push(moment(l.getDateRangeStart().getTime()).format("YYYY.MM.DD")),
        a.push(" ~ "),
        a.push(moment(l.getDateRangeEnd().getTime()).format(" MM.DD"))),
      (e.innerHTML = a.join(""));
  }
  function w() {
    l.clear(),
      generateSchedule(
        l.getViewName(),
        l.getDateRangeStart(),
        l.getDateRangeEnd()
      ),
      l.createSchedules(ScheduleList),
      h();
  }
  function f(e) {
    return e.dataset ? e.dataset.action : e.getAttribute("data-action");
  }
  (l = new t("#calendar", {
    defaultView: "month",
    useCreationPopup: a,
    useDetailPopup: !0,
    calendars: CalendarList,
    template: {
      milestone: function (e) {
        return (
          '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
          e.bgColor +
          '">' +
          e.title +
          "</span>"
        );
      },
      allday: function (e) {
        return o(e, !0);
      },
      time: function (e) {
        return o(e, !1);
      },
    },
  })).on({
    clickMore: function (e) {
      console.log("clickMore", e);
    },
    clickSchedule: function (e) {
      console.log("clickSchedule", e);
    },
    clickDayname: function (e) {
      console.log("clickDayname", e);
    },
    beforeCreateSchedule: function (e) {
      console.log("beforeCreateSchedule", e),
        (function (e) {
          var t = e.calendar || findCalendar(e.calendarId),
            n = {
              id: String(chance.guid()),
              title: e.title,
              isAllDay: e.isAllDay,
              start: e.start,
              end: e.end,
              category: e.isAllDay ? "allday" : "time",
              dueDateClass: "",
              color: t.color,
              bgColor: t.bgColor,
              dragBgColor: t.bgColor,
              borderColor: t.borderColor,
              location: e.location,
              raw: { class: e.raw.class },
              state: e.state,
            };
          t &&
            ((n.calendarId = t.id),
            (n.color = t.color),
            (n.bgColor = t.bgColor),
            (n.borderColor = t.borderColor));
          l.createSchedules([n]), h();
        })(e);
    },
    beforeUpdateSchedule: function (e) {
      var t = e.schedule,
        n = e.changes;
      console.log("beforeUpdateSchedule", e),
        l.updateSchedule(t.id, t.calendarId, n),
        h();
    },
    beforeDeleteSchedule: function (e) {
      console.log("beforeDeleteSchedule", e),
        l.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    },
    afterRenderSchedule: function (e) {
      e.schedule;
    },
    clickTimezonesCollapseBtn: function (e) {
      return (
        console.log("timezonesCollapsed", e),
        e
          ? l.setTheme({
              "week.daygridLeft.width": "77px",
              "week.timegridLeft.width": "77px",
            })
          : l.setTheme({
              "week.daygridLeft.width": "60px",
              "week.timegridLeft.width": "60px",
            }),
        !0
      );
    },
  }),
    (n = tui.util.throttle(function () {
      l.render();
    }, 50)),
    (e.cal = l),
    k(),
    p(),
    w(),
    $("#menu-navi").on("click", d),
    $('.dropdown-menu a[role="menuitem"]').on("click", r),
    $("#lnb-calendars").on("change", m),
    $("#btn-save-schedule").on("click", s),
    $("#btn-new-schedule").on("click", g),
    $("#dropdownMenu-calendars-list").on("click", u),
    e.addEventListener("resize", n);
})(window, tui.Calendar),
  (function () {
    var e = document.getElementById("calendarList"),
      t = [];
    CalendarList.forEach(function (e) {
      t.push(
        '<div class="lnb-calendars-item"><label><input type="checkbox" class="tui-full-calendar-checkbox-round" value="' +
          e.id +
          '" checked><span style="border-color: ' +
          e.borderColor +
          "; background-color: " +
          e.borderColor +
          ';"></span><span>' +
          e.name +
          "</span></label></div>"
      );
    }),
      (e.innerHTML = t.join("\n"));
  })();
