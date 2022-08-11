$(document).ready(function(){
   $('.test').on('click', function(e){ $target = $(e.target)
    console.log($target.attr('data-id'))
    })
})