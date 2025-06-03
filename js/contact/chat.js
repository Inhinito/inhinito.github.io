// Facebook Chat.
var chatbox = document.getElementById('fb-customer-chat');
chatbox.setAttribute("page_id", "175067943434194");
chatbox.setAttribute("attribution", "biz_inbox");

window.fbAsyncInit = function() {
    FB.init({
        appId      : '549522668554179',
        cookie     : true,
        xfbml      : true,
        version    : 'v17.0'
    });
        
    FB.AppEvents.logPageView();    
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// Load the Facebook SDK asynchronously