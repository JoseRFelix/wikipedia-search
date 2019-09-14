$(document).ready(function () {
    const search = document.getElementById("search");
    var searchContent;   

    document.getElementById("search").addEventListener("input", () => {
        searchContent = search.value;             

        if (searchContent.length === 0){
            return;
        } else{
            ajax(searchContent);
        }        
    }, false); 
    
    ajax("pizza");
    
    /*Codepen search bar code - MIT License */
    const s = $('input'),
        f  = $('form'),
        a = $('.after');       

    $("#search").keypress(e => {        
        if(e.which == 13) e.preventDefault();
    })

    s.focus(function(){
        if( f.hasClass('open') ) return;
        f.addClass('in');
        s.css("cursor", "text");
        setTimeout(function(){
            f.addClass('open');
            f.removeClass('in');        
        }, 1300);
    });

    a.on('click', function(e){
        e.preventDefault();
        if( !f.hasClass('open') ) return;
        s.val('');
        f.addClass('close');
        f.removeClass('open');
        s.css("cursor", "pointer")
        setTimeout(function(){
            f.removeClass('close');
        }, 1300);
    }) 
    /*End of Codepen code */
});

function ajax(search){
    $.ajax({
    type: "method",
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search + "&prop=info|description&inprop=url|displaytitle&format=json&srlimit=10",
    data: "data",
    dataType: "jsonp",
    success: function (response) {
        showResults(response);       
    },
    error: function (){
        alert("Error retrieving search results, please refresh page.")
    } 
});
}

function showResults(response){   

    if (document.getElementsByClassName("wikiContent")){
        $(".wikiContent").remove();
    } 

    for(var i=0; i < 10; i++){       
        var result = response.query.search[i];
        var title = result.title;
        var description = result.snippet;
        var url = title.replace(/ /g, "_");
        var wikiURL = "https://en.wikipedia.org/wiki/" + url   

        $(".main").append(
            "<div class=\"wikiContent animated bounceInUp container\">" + 
            "<p class=\"wikiTitle\"><a href=\"" + wikiURL + "\"" +  "target=\"_blank\">"+ title +"</a></p>" +
            "<p class=\"wikiDescription\">" + description + "</p>" +          
            "</div>");          
       
    }
}