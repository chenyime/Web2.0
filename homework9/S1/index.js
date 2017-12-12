$(document).ready(function() {

  let num = [];
  let ajaxList = [];

  function clear() {
    for (let i = 0; i < ajaxList.length; ++i) {
      let ajaxObj = ajaxList.pop();
      ajaxObj.abort();
    }
    num = [];
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

  clear();

  $(".button").click(function() {
    let $this = $(this);
    if (!$this.hasClass("disable-button") && $this.children("span").hasClass("hidden")) {
      $this.children("span").removeClass("hidden").text("...");
      disableOther($this);
      let ajaxObj = $.get("http://localhost:3000/S1/", function(data, state) {
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

  $("#button").hover(function() {
    clear();
  })

})