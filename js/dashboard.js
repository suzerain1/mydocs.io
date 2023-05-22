
$(document).ready(function(){

  feather.replace({ 'aria-hidden': 'true' })

  var activeid = '';
  var counter = 0;

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
        if(counter == 0){
          activeid = doc.id;
        }
        var milliseconds1 = doc.data().credate.seconds * 1000 + Math.floor(doc.data().credate.nanoseconds / 1000000);
        var milliseconds2 = doc.data().upddate.seconds * 1000 + Math.floor(doc.data().upddate.nanoseconds / 1000000);
        notelists += '<div class="card note">';
        notelists += '<div class="card-body">';
        notelists += '<h6 class="card-title">'+doc.data().title+'</h6>';
        notelists += '<p class="card-text">'+doc.data().desc.substring(0, 90)+'...</p>';
        notelists += '<span>Added: '+moment(milliseconds1).format('YYYY-MM-DD HH:mm:ss')+'</span><br>';
        // notelists += '<span>Updated: '+moment(milliseconds2).format('YYYY-MM-DD HH:mm:ss')+'</span>';
        notelists += '</div>';
        notelists += '</div>';
        counter++;
      });
      $('.notelists').html(notelists);
      viewbody();
    })
    .catch(function(error) {
      console.error('Error getting notes: ', error);
    });
  }
  viewnotes();

  function viewbody(){
    
    db.collection('notes').doc(activeid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        var data = doc.data();
        var body = '<p class"bodytitle">'+data.title+'</p><br>';
            body += '<p class="bodydesc">'+data.desc+'</p>';
        $('#edit').html(body);
        $('#edit').froalaEditor({
          toolbarInline: true,
          toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color', 'emoticons', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
          toolbarButtonsXS: null,
          toolbarButtonsSM: null,
          toolbarButtonsMD: null
        })
      } else {
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.error('Error getting note: ', error);
    });
  };
})

  
