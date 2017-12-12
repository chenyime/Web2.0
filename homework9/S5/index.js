$(document).ready(function() {

  let ajaxList = [];
  let autoNum = false;

  function clear() {
    for (let i = 0; i < ajaxList.length; ++i) {
      let ajaxObj = ajaxList.pop();
      ajaxObj.abort();
    }
    autoNum = false;
    $(".unread").addClass("hidden").text("");
    $(".button").removeClass("disable-button");
    $(".info").removeClass("active-infobar");
    $(".sum").text("");
    $(".autoMessage").addClass("hidden").text("");
  }

  function disableOther($button) {
    $('li').not($button).addClass("disable-button");
  }

  function recover($button) {
    $button.addClass("disable-button");
    $(".unread").each(function() {
      let $this = $(this);
      if ($this.text() == '') {
        $this.parent().removeClass("disable-button");
      }
    })
  }

  function getAll() {
    let target = true;
    $(".unread").each(function() {
      if ($(this).text() == '')
        target = false;
    })
    if (target) {
      $(".info").addClass("active-infobar");
    }
    return target;
  }

  function getRandomOrder(buttons) {
    let randomString = '';
    for (let i = 0; i < 30; i++) {
      let index1 = Math.floor(Math.random() * buttons.length);
      let index2 = Math.floor(Math.random() * buttons.length);
      if (index1 != index2) {
        let temp = buttons[index1];
        buttons[index1] = buttons[index2];
        buttons[index2] = temp;
      }
    }
    for (let i = 0; i < buttons.length; i++) {
      randomString += $(buttons[i]).text();
    }
    return randomString;
  }

  function aHandler(message, curSum, callback) {
    $this = $(".button-a");
    $this.children("span").removeClass("hidden").text("...");
    // $(".autoMessage").text(message[buttonNum]);
    disableOther($this);
    let ajaxObj = $.get("http://localhost:3000/S5/", function(data, state) {
      state = Math.random() > 0.5;
      if (!state) {
        return callback({ message, curSum });
      }
      $(".autoMessage").text(message);
      $this.children("span").text(data.toString());
      recover($this);
      curSum += parseInt(data.toString());
      callback(null, curSum);
    });
    ajaxList.push(ajaxObj);
  }

  function bHandler(message, curSum, callback) {
    $this = $(".button-b");
    $this.children("span").removeClass("hidden").text("...");
    // $(".autoMessage").text(message[buttonNum]);
    disableOther($this);
    let ajaxObj = $.get("http://localhost:3000/S5/", function(data, state) {
      state = Math.random() > 0.5;
      if (!state) {
        return callback({ message, curSum });
      }
      $(".autoMessage").text(message);
      $this.children("span").text(data.toString());
      recover($this);
      curSum += parseInt(data.toString());
      callback(null, curSum);
    });
    ajaxList.push(ajaxObj);
  }

  function cHandler(message, curSum, callback) {
    $this = $(".button-c");
    $this.children("span").removeClass("hidden").text("...");
    // $(".autoMessage").text(message[buttonNum]);
    disableOther($this);
    let ajaxObj = $.get("http://localhost:3000/S5/", function(data, state) {
      state = Math.random() > 0.5;
      if (!state) {
        return callback({ message, curSum });
      }
      $(".autoMessage").text(message);
      $this.children("span").text(data.toString());
      recover($this);
      curSum += parseInt(data.toString());
      callback(null, curSum);
    });
    ajaxList.push(ajaxObj);
  }

  function dHandler(message, curSum, callback) {
    $this = $(".button-d");
    $this.children("span").removeClass("hidden").text("...");
    // $(".autoMessage").text(message[buttonNum]);
    disableOther($this);
    let ajaxObj = $.get("http://localhost:3000/S5/", function(data, state) {
      state = Math.random() > 0.5;
      if (!state) {
        return callback({ message, curSum });
      }
      $(".autoMessage").text(message);
      $this.children("span").text(data.toString());
      recover($this);
      curSum += parseInt(data.toString());
      callback(null, curSum);
    });
    ajaxList.push(ajaxObj);
  }

  function eHandler(message, curSum, callback) {
    $this = $(".button-e");
    $this.children("span").removeClass("hidden").text("...");
    // $(".autoMessage").text(message[buttonNum]);
    disableOther($this);
    let ajaxObj = $.get("http://localhost:3000/S5/", function(data, state) {
      state = Math.random() > 0.5;
      if (!state) {
        return callback({ message, curSum });
      }
      $(".autoMessage").text(message);
      $this.children("span").text(data.toString());
      recover($this);
      curSum += parseInt(data.toString());
      callback(null, curSum);
    });
    ajaxList.push(ajaxObj);
  }

  function bubbleHandler(curSum, message) {
    $(".info").removeClass("active-infobar");
    $(".sum").text(curSum).css("font-size", '58px');
    $(".autoMessage").text(message+curSum);
  }

  function handleErrMess(message) {
    const map = {
      'A：这是个天大的秘密': 'A：这不是个天大的秘密',
      'B：我不知道': 'B：我知道',
      'C：你不知道': 'C：你知道',
      'D：他不知道': 'D：他知道',
      'E：才怪': 'E：才不怪',
    }
    return map[message];
  }

  function autoClick(buttons) {
    const methods = {
      A: aHandler,
      B: bHandler,
      C: cHandler,
      D: dHandler,
      E: eHandler,
    }
    let curSum = 0;
    let index = 0;
    const message = [
      'A：这是个天大的秘密',
      'B：我不知道',
      'C：你不知道',
      'D：他不知道',
      'E：才怪',
      '大气泡：楼主异步调用战斗力感人，目测不超过',
    ]
    function next() {
      const name = $(buttons[index]).attr("title");
      console.log(name);
      methods[name] && methods[name](message[index], curSum, function(err, sum) {
        if (err) {
          let message = handleErrMess(err.message);
          console.log(message);
          $(".autoMessage").text(message);
          curSum = err.curSum;
          return next();
        }
        curSum = sum;
        if (index >= 4) {
          return setTimeout(function() {
            bubbleHandler(curSum, message[message.length-1])
          }, 1000);
        }
        index++;
        next();
      });
    }
    next();
  }

  clear();
  $.ajaxSetup ({
    cache: false //关闭AJAX缓存
  });

  // $(".button").click(function() {
  //   let $this = $(this);
  //   if (!$this.hasClass("disable-button") && $this.children("span").hasClass("hidden")) {
  //     $this.children("span").removeClass("hidden").text("...");
  //     disableOther($this);
  //     let ajaxObj = $.get("http://localhost:3000/S5/", function(data, state) {
  //       $this.children("span").text(data.toString());
  //       recover($this);
  //       num.push(data.toString());
  //       getAll();
  //     })
  //     ajaxList.push(ajaxObj);
  //   }
  // })

  $(".apb").click(function() {
    let buttons = $(".button")
    $(".autoMessage").removeClass("hidden");
    if (!autoNum) {
      let randomString = getRandomOrder(buttons);
      $(".sum").text(randomString).css("font-size", '20px');
      autoClick(buttons);
    }
    autoNum = true;
  })

  $("#button").hover(function() {
    clear();
  })

})