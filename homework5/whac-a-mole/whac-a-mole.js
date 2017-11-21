$(document).ready(function() {
    let time = 30, status = false, score = 0, n, hit = true, num;

    function timer() {
        return setInterval(getTime, 1000);
    }

    function getTime() {
        time--;
        $(".time").val(time);
        if (time == 0) {
            clearInterval(n);
            status = false;
            changeMoleStatus(false);
            $(".status").val("Game over");
        }
    }

    function randomNum(min, max) {
        let range = max - min, rand = Math.random();
        return min + Math.round(range * rand);
    }


    function getNum() {
        if (hit) {
            num = randomNum(1, 60);
            console.log(num);
        }
        getFocus();
        return num;
    }

    function getFocus() {
        $(".mole").each(function() {
            let $this = $(this);
            if ($this.attr("key") == num.toString()) {
                $this.focus();
            }
        })
    }

    function changeMoleStatus(state) {
        $(".mole").each(function() {
            let $this = $(this);
            if (state) {
                $this.removeAttr("disabled");
            } else {
                $this.attr("disabled", "true");
            }
        })
    }

    function freshMole() {
        $(".mole").each(function() {
            let $this = $(this);
            $this.prop("checked", false);
        })
    }

    $(".control").click(function() {
        if (status) {
            status = false;
            clearInterval(n);
            time = 0;
            $(".time").val(time);
            changeMoleStatus(false);
            $(".status").val("Game over");
        } else {
            console.log(hit);
            status = true;
            time = 30;
            score = 0;
            n = timer();
            changeMoleStatus(true);
            getNum();
            hit = false;
            $(".status").val("Game start");
            $(".score").val(score);
        }
    })

    $(".mole-gamearea").click(function() {
        getFocus();
    })

    $(".mole").click(function() {
        let $this = $(this);
        freshMole();
        if ($this.attr("key") == num.toString()) {
            hit = true;
            score++;
            $this.prop("checked", false);
        } else {
            hit = false;
            score--;
            $this.prop("checked", true);
        }
        console.log($this.attr("key"));
        getNum();
        $(".score").val(score);
    })

})