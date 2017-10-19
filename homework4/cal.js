$(document).ready(function() {

    let result = "0", show = "0";

    $("td").click(function() {
        let $this = $(this);
        let value = $this.text();
        if(isNum(value)) {
            numClick(value);
            $(".show").val(show);
        } else if(isOper(value)) {
            operClick(value);
        } else if(value == '=') {
            getRes();
            $(".show").val(show);
        } else if(value == "CE") {
            result = "0";
            show = "0";
            $(".error").text("");
            $(".show").val(show);
        } else if(value == "->") {
            cutStr();
            $(".show").val(show);
        } else if(value == '.') {
            addPoint();
            $(".show").val(show);
        } else if(value == '(' || value == ')') {
            addBracket(value);
        }
        checkShow();
        console.log(show);
        console.log(result);
    })

    function isNum(value) {
        return (value == '0' || value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7' || value == '8' || value == '9');
    }

    function numClick(value) {
        if(result[result.length-1] == ")")
            return;
        if(result == "0") {
            result = value;
            show = value;
        } else if(result != "0" && show == "0") {
            if(value != "0") {
                show = value;
                result += value;
            }
        } else {
            show += value;
            result += value;
        }
    }

    function isOper(value) {
        return (value == '+' || value == '-' || value == '÷' || value == '×');
    }

    function operClick(value) {
        if(result[result.length-1] == "(") 
            result += "0";
        if (isOper(result[result.length-1]) || result[result.length-1] == '/' || result[result.length-1] == '*')
            result = result.substr(0, result.length-1);
        if(value == '÷') {
            result += '/';
        } else if(value == '×') {
            result += '*';
        } else {
            result += value;
        }
        show = "0";
    }

    function getRes() {
        try {
           show = formatFloat(eval(result), 5);
           show = String(show);
           result = show;
        }
       catch(exception) {
            $(".error").text(exception);
            show = "0";
            result = "0";
        }
    }

    function cutStr() {
        if(show != "0") {
            if(show.length > 1) {
                show = show.substr(0, show.length-1);
                result = result.substr(0, result.length-1);
            } else {
                show = "0";
                result = result.substr(0, result.length-1);
                if(result == "")
                    result = "0";
            }
        }
    }

    function addPoint() {
        if(result[result.length-1] != "." && result[result.length-1] != ")") {
            if(show == "0") {
                show += ".";
                if(result == "0") {
                    result += ".";
                } else {
                    result += "0.";
                }
            } else {
                show += ".";
                result += ".";
            }
        }
    }

    function addBracket(value) {
        if(value == "(") {
            if(result == "0"){
                result = "(";
                return;
            } else if(isNum(result[result.length-1]) || result[result.length-1] == "." || result[result.length-1] == ")")
                return;
            result += "(";
            show = "0";
        } else {
            if(isOper(result[result.length-1]) || result[result.length-1] == "*" || result[result.length-1] == "/") {
                result += "0)";
            } else if(isNum(result[result.length-1])) {
                result += ")";
                show = "0";
            }
        }
    }

    function checkShow() {
        console.log(show.length);
        if (show.length < 8) {
            $(".show").css("font-size", 60);
        } else if (show.length < 11 && show.length >= 8) {
            $(".show").css("font-size", 45);
        } else if (show.length >= 11) {
            console.log("111111");
            $(".show").css("font-size", 35);
        }
        if (show.length > 20) {
            show = show.substr(0, show.length-1);
            show += '0';
            result = result.substr(0, result.length-1);
            result += '0';
            $(".error").text("Exceed calculated length!");
            $(".show").val(show);
        }
    }

    function formatFloat(f, digit) { 
        var m = Math.pow(10, digit); 
        return parseInt(f * m, 10) / m; 
    }
})