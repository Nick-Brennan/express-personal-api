console.log("Sanity Check: JS is working!");
var profileTemplate;
var guitarTemplate;
var guitarsTarget;
var nickTarget;
var profile;
var guitars = [];
$(document).ready(function(){
  nickTarget = $('#profileTarget');
  guitarsTarget = $('#guitarsTarget');
  var nickSource = $('#nick-template').html();
  var guitarSource = $('#guitar-template').html();
  profileTemplate = Handlebars.compile(nickSource);
  guitarTemplate = Handlebars.compile(guitarSource);

  $.ajax({
    method: 'GET',
    url: '/profile',
    success: handleProfileData
  });
  $.ajax({
    method: 'GET',
    url: '/guitars',
    success: handleGuitarData
  });

  $('#newGuitarForm').on('submit', function(e){
    e.preventDefault();
    console.log('submitted');
    var newGuit = $(this).serialize();
    $('#newGuitarForm').val('');
    $.ajax({
      method: 'POST',
      url: '/guitars',
      data: newGuit,
      success: handleGuitarData
    });
  });
});

function handleProfileData(data){
  profile = data;
  console.log(profile);
  renderProfile();
}

function renderProfile(){
  console.log('rendering');
  nickTarget.empty();
  var profileHtml = profileTemplate({ profile: profile });
  console.log(profileHtml)
  nickTarget.append(profileHtml);
};

function handleGuitarData(data){
  guitars = data;
  console.log(guitars);
  renderGuitars();
}

function renderGuitars(){
  guitarsTarget.empty();
  var guitarHtml = guitarTemplate({guitars: guitars});
  guitarsTarget.append(guitarHtml);
}

function deleteGuitar(context){
  var deletePath = '/guitars/' + context;
  console.log(deletePath);
  $.ajax({
    method: 'DELETE',
    url: '/guitars/' + context,
    success: handleGuitarData
  });
}
