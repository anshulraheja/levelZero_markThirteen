import { useState } from "react";

export default function PalindromeBday() {
  const [dob, setDOB] = useState();
  const [output, setOutput] = useState();

  function checkPalindrome() {
    if (dob === "" || dob === undefined) {
      setOutput("Enter a date");
    } else {
      var splitDate = dob.split("-");
      var inputDate = {
        day: Number(splitDate[2]),
        month: Number(splitDate[1]),
        year: Number(splitDate[0])
      };
      var isPalindrome = checkAllDateFormats(inputDate);
      if (isPalindrome) {
        setOutput("Date is palindrome");
      } else {
        var [ctr, nextDate] = getNextPalindromeDate(inputDate);
        var result = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`;
        setOutput(result);
      }
    }
  }

  function checkAllDateFormats(date) {
    var list = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < list.length; i++) {
      if (isPalindrome(list[i])) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  function getAllDateFormats(date) {
    var strDate = convertDatetoStr(date);

    var ddmmyyyy = strDate.day + strDate.month + strDate.year;
    var mmddyyyy = strDate.month + strDate.day + strDate.year;
    var yyyymmdd = strDate.year + strDate.month + strDate.day;
    var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
    var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  function convertDatetoStr(date) {
    var strDate = { day: "", month: "", year: "" };

    if (date.day < 10) {
      strDate.day = "0" + date.day;
    } else {
      strDate.day = date.day.toString();
    }

    if (date.month < 10) {
      strDate.month = "0" + date.month;
    } else {
      strDate.month = date.month.toString();
    }

    strDate.year = date.year.toString();
    return strDate;
  }

  function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
  }
  function reverseStr(str) {
    var listOfChars = str.split("");
    var reverseList = listOfChars.reverse();
    var reversedStr = reverseList.join("");
    return reversedStr;
  }

  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }

  //gets next date
  function getNextDate(date) {
    var day = date.day + 1; // increment the day  => 32
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

    // check for february
    if (month === 2) {
      // check for leap year
      if (isLeapYear(year)) {
        // 2020 => true
        if (day > 29) {
          // false
          day = 1;
          month++; // increment the month
        }
      } else {
        if (day > 28) {
          day = 1;
          month++; // increment the month
        }
      }
    }
    // check for other months
    else {
      //  check if the day exceeds the max days in month
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++; // increment the month
      }
    }

    // increment the year if month is greater than 12
    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day,
      month: month,
      year: year
    };
  }

  // get next palindrome date
  function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
      ctr++;
      var isPalindrome = checkAllDateFormats(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }
  // -------------------------------------
  return (
    <>
      <h1>check if your bday is palindrome or not</h1>
      <input
        type="date"
        required
        value={dob}
        onChange={(e) => setDOB(e.target.value)}
      />
      <button onClick={checkPalindrome}>check</button>
      <div>{output}</div>
    </>
  );
}
