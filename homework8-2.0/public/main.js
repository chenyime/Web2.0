$(document).ready(function() {
  $("form").submit(function() {
    let err = false;
    $("input").each(function() {
      $this = $(this);
      const error = vaildate($this.val(), $this.attr('name')); 
      if (error) {
        $this.parent().children(".err").text(error);
        console.log(error);
        err = true;
      } else {
        $this.parent().children(".err").text("");
      }
    });
    if (err)
      return false;
  });

  $(".reset").click(function() {
    $(".err").each(function() {
      $(this).text('');
    })
    $('input').removeClass('used');
    $(".tip").text('');
  })

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
    $(this).removeClass('is-active');
  });
})

