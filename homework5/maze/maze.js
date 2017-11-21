$(document).ready(function() {
    let start = false, win = true;
    let $result = $(".result")

    $(".start").mouseenter(function() {
        start = true, win = true;
        $(".wall").each(function() {
            $(this).removeClass("lose");
        })
        $result.text("Game start!");
        console.log(start);
        console.log(win);
    })

    $(".wall").mouseenter(function() {
        if (win && start) {
            win = false;
            $(this).addClass("lose");
            $result.text("You Lose!");
        }
        
    })

    $(".end").mouseenter(function() {
        console.log(start);
        console.log(win);
        if (start && win) {
            $result.text("You Win!");
            start = false;
        } else if (!start && win) {
            $result.text("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!")
        }
    })

    $(".maze-gamearea").mouseleave(function() {
        if (start) {
            start = false;
        }
    })
})