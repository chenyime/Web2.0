$(document).ready(function() {

  let num = [];
  let ajaxList = [];
  let buttonNum = 0;
  let autoNum = false;
  let buttons = $(".button");
  let randomString = '';

  function clear() {
    for (let i = 0; i < ajaxList.length; ++i) {
      let ajaxObj = ajaxList.pop();
      ajaxObj.abort();
    }
    num = [];
    autoNum = false;
    buttonNum = 0;
    randomString = '';
    buttons = $(".button");
    $(".unread").addClass("hidden").text("");
    $(".button").removeClass("disable-button");
    $(".info").removeClass("active-infobar");
    $(".sum").text("");
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

  function getRandomOrder() {
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
  }

  function autoClick() {
    if (buttonNum < buttons.length) {
      $this = $(buttons[buttonNum]);
      $this.children("span").removeClass("hidden").text("...");
      disableOther($this);
      let ajaxObj = $.get("http://localhost:3000/S4/", function(data, state) {
        $this.children("span").text(data.toString());
        recover($this);
        num.push(data.toString());
        buttonNum++;
        if (getAll()) {
          let sum = 0;
          for (let i = 0; i < num.length; i++) {
            sum += parseInt(num[i]);
          }
          $(".info").removeClass("active-infobar");
          $(".sum").text(sum).css("font-size", '58px');
        } else {
          autoClick();
        }
      })
      ajaxList.push(ajaxObj);
    } else {
      buttonNum = 0;
    }
  }

  clear();
  $.ajaxSetup ({
    cache: false //关闭AJAX缓存
  });

  $(".button").click(function() {
    let $this = $(this);
    if (!$this.hasClass("disable-button") && $this.children("span").hasClass("hidden")) {
      $this.children("span").removeClass("hidden").text("...");
      disableOther($this);
      let ajaxObj = $.get("http://localhost:3000/S4/", function(data, state) {
        $this.children("span").text(data.toString());
        recover($this);
        num.push(data.toString());
        getAll();
      })
      ajaxList.push(ajaxObj);
    }
  })

  $("#info-bar").click(function() {
    let $this = $(this);
    if (getAll()) {
      let sum = 0;
      for (let i = 0; i < num.length; i++) {
        sum += parseInt(num[i]);
      }
      $(".info").removeClass("active-infobar");
      $(".sum").text(sum);
    }
  })

  $(".apb").click(function() {
    if (!autoNum) {
      getRandomOrder();
      $(".sum").text(randomString).css("font-size", '20px');
      autoClick();
    }
    autoNum = true;
  })

  $("#button").hover(function() {
    clear();
  })

})