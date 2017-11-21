$(document).ready(function() {
    const blocks = [
        {
            pos: [0, 0],
            curPos: [0, 0],
        },
        {
            pos: [0, 1],
            curPos: [0, 1],
        },
        {
            pos: [0, 2],
            curPos: [0, 2],
        },
        {
            pos: [0, 3],
            curPos: [0, 3],
        },
        {
            pos: [1, 0],
            curPos: [1, 0],
        },
        {
            pos: [1, 1],
            curPos: [1, 1],
        },
        {
            pos: [1, 2],
            curPos: [1, 2],
        },
        {
            pos: [1, 3],
            curPos: [1, 3],
        },
        {
            pos: [2, 0],
            curPos: [2, 0],
        },
        {
            pos: [2, 1],
            curPos: [2, 1],
        },
        {
            pos: [2, 2],
            curPos: [2, 2],
        },
        {
            pos: [2, 3],
            curPos: [2, 3],
        },
        {
            pos: [3, 0],
            curPos: [3, 0],
        },
        {
            pos: [3, 1],
            curPos: [3, 1],
        },
        {
            pos: [3, 2],
            curPos: [3, 2],
        },
        {
            pos: [3, 3],
            curPos: [3, 3],
        },
    ];
    let state = [], start = false, active = false;

    $(".gamearea div").click(function(ele) {
        if (!start)
            return;
        let index = parseInt($(ele.target).attr("index"));
        let tempState = JSON.parse(state[state.length-1]);
        let blockPos = tempState[index];
        console.log(nearWhite(blockPos));
        if (nearWhite(blockPos)) {
            let temp = tempState[15].curPos;
            tempState[15].curPos = blockPos.curPos;
            blockPos.curPos = temp;
        } else {
            return;
        }
        state.push(JSON.stringify(tempState));
        check();
        // console.log(state);
        render();
        if (equal(tempState) && active) {
            console.log("win");
            win();
            return;
        }
        console.log(state);
    })

    $(".start").click(function() {
        $(".result").html("Game start!");
        start = true;
        active = false;
        targetIndex = -3;
        let curState = _.cloneDeep(blocks), j = 0, lastIndex = -1;
        state = [JSON.stringify(blocks)];
        console.log(state);
        while (state.length < 5) {
            state = [JSON.stringify(blocks)];
            for (let i = 300; i > 0; i--) {
                let index = parseInt(15*Math.random());
                console.log(index);
                $(".gamearea div").eq(index).trigger("click");
            }
            j++;
            if (j == 3)
            break;
        }
        console.log(state);
        active = true;
    })

    $(".re").click(function() {
        if (!start)
            return;
        $(".result").html("Game over!");
        start = false;
        active = false;
        $(".gamearea div").each(function(index) {
            let className = "p" + JSON.parse(state[state.length-1])[index].pos[0] + '-' + JSON.parse(state[state.length-1])[index].pos[1] + " " + "index" + index;
            $(this).removeClass().addClass(className);
        })
        state = [];
    })

    $(".au").click(function() {
        if (!start)
            return;
        $(".result").html("Game over!");
        start = false;
        active = false;
        state.pop();
        const timer = setInterval(() => {
            if (!state.length) {
                return clearInterval(timer);
            }
            render();
            console.log(JSON.parse(state[state.length-1])[15].curPos);
            state.pop();
        }, 300);
    })

    function check() {
        for (let i = 0; i < state.length-1; i++) {
            if (state[i] === state[state.length-1]) {
                state = state.slice(0, i+1);
                return;
            }
        }
    }

    function equal(state1) {
        for (let i = 0; i < state1.length; i++) {
            if (state1[i].pos[0] == state1[i].curPos[0] && state1[i].pos[1] == state1[i].curPos[1])
                continue;
            else 
                return false;
        }
        return true;
    }

    function win() {
        start = false;
        active = false;
        state = [];
        $(".result").html("You win!");
    }


    function nearWhite(blockPos) {
        let posX = blockPos.curPos[0], posY = blockPos.curPos[1];
        let whiteX = JSON.parse(state[state.length-1])[15].curPos[0], whiteY = JSON.parse(state[state.length-1])[15].curPos[1];
        console.log(posX, posY, whiteX, whiteY);
        if (posY - whiteY == 0) {
            if (posX - whiteX == 1 || posX - whiteX == -1) {
                return true;
            }
        }
        if (posX - whiteX == 0) {
            if (posY - whiteY == 1 || posY - whiteY == -1) {
                return true;
            }
        }
        return false;
    }

    function render() {
        $(".gamearea div").each(function(index) {
            console.log(state);
            let className = "p" + JSON.parse(state[state.length-1])[index].curPos[0] + '-' + JSON.parse(state[state.length-1])[index].curPos[1] + " " + "index" + index;
            // if (active) {
                $(this).removeClass().addClass(className).addClass("trans");
            // } else {
            //     $(this).removeClass().addClass(className);
            // }
        });
    }
})