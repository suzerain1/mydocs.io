
$(document).ready(function(){

  feather.replace({ 'aria-hidden': 'true' })

  //Note Content
  $('ul.nav li a').click(function() {
    $('ul.nav li').removeClass('nav-item');
    $('ul.nav li a').removeClass('active');
    $(this).addClass('active');
    $(this).parent().addClass('nav-item');
  });

  function viewnotes(){
    db.collection('notes')
    .get()
    .then(function(querySnapshot) {
      var notelists = '';
      querySnapshot.forEach(function(doc) {
        var milliseconds1 = doc.data().credate.seconds * 1000 + Math.floor(doc.data().credate.nanoseconds / 1000000);
        var milliseconds2 = doc.data().upddate.seconds * 1000 + Math.floor(doc.data().upddate.nanoseconds / 1000000);
        notelists += '<div class="card note">';
        notelists += '<div class="card-body">';
        notelists += '<h6 class="card-title">'+doc.data().title+'</h6>';
        notelists += '<p class="card-text">'+doc.data().desc.substring(0, 90)+'...</p>';
        notelists += '<span>Added: '+moment(milliseconds1).format('YYYY-MM-DD HH:mm:ss')+'</span><br>';
        notelists += '<span>Updated: '+moment(milliseconds2).format('YYYY-MM-DD HH:mm:ss')+'</span>';
        notelists += '</div>';
        notelists += '</div>';
      });
      $('.notelists').html(notelists);
    })
    .catch(function(error) {
      console.error('Error getting notes: ', error);
    });
  }
  viewnotes();
})

  
