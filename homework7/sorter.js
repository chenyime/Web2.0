$(document).ready(function() {
  let data1 = [], data2 = [], target1 = -1, target2 = -1;

  $("#todo tbody tr").each(function(index) {
    let $this = $(this), tempdata = [];
    $this.children().each(function() {
      tempdata.push($(this).text());
    })
    data1.push(_.cloneDeep(tempdata));
  })

  $("#staff tbody tr").each(function(index) {
    let $this = $(this), tempdata = [];
    $this.children().each(function() {
      tempdata.push($(this).text());
    })
    data2.push(_.cloneDeep(tempdata));
  })

  $("#todo th").each(function(index) {
    let $this = $(this);
    $this.click(function() {
      $("#todo th").each(function() {
        $(this).removeClass("choosen");
        $(this).children("i").removeClass("upOrder downOrder");
      });
      if (target1 == index) {
        downOrder(data1, index);
        $this.addClass("choosen");
        $this.children("i").removeClass("upOrder").addClass("downOrder");
        review($("#todo"), data1);
      } else {
        target1 = index;
        upOrder(data1, index);
        review($("#todo"), data1);
        $this.addClass("choosen");
        $this.children("i").addClass("upOrder")
      }
    })
  })

  $("#staff th").each(function(index) {
    let $this = $(this);
    $this.click(function() {
      $("#staff th").each(function() {
        $(this).removeClass("choosen");
        $(this).children("i").removeClass("upOrder downOrder");
      });
      if (target2 == index) {
        downOrder(data2, index);
        $this.addClass("choosen");
        $this.children("i").removeClass("upOrder").addClass("downOrder");
        review($("#staff"), data2);
      } else {
        target2 = index;
        upOrder(data2, index);
        review($("#staff"), data2);
        $this.addClass("choosen");
        $this.children("i").addClass("upOrder")
      }
    })
  })

  function review(ele, data) {
    console.log(ele);
    ele.find("tbody tr").each(function(index) {
      let $this = $(this);
      $this.children().each(function(index1) {
        console.log(index);
        console.log(index1);
        console.log(data[index][index1]);
        $(this).text(data[index][index1]);
      })
    })
  }

  function upOrder(data, index) {
    data.sort(sortUp(index));
  }

  function downOrder(data, index) {
   data.sort(sortDown(index));
  }

  function sortDown(index) {
    return function(a, b) {
      return a[index] < b[index];
    };
  }

  function sortUp(index) {
    return function(a, b) {
      return a[index] > b[index];
    };
  }

})