$(document).ready(function(){
    $("#accessibility").click(function(){
        console.log("hello world")
        $("#accessibility").css("color", "rgb(1,16,89)")
        $("#collection").css("color", "rgb(1,16,89)")
        $("#collection-active").hide();
        $("#offline-active").hide();
        $("#accessibility-active").show();
        $("#offline").css("color", "rgb(0,0,0)");
        $("#collection").css("color", "rgb(0,0,0)")
    })
    $("#collection").click(function(){
        $("#collection").css("color", "rgb(1,16,89)")
        $("#collection-active").show()
        $("#accessibility").css("color", "rgb(0,0,0)")
        $("#offline").css("color", "rgb(0,0,0)");
        $("#accessibility-active").hide();
        $("#offline-active").hide();
    })
    $("#offline").click(function(){
        $("#collection").css("color", "rgb(0,0,0)");
        $("#accessibility").css("color", "rgb(0,0,0)")
        $("#offline").css("color", "rgb(1,16,89)")
        $("#accessibility-active").hide();
        $("#offline-active").show();
        $("#collection-active").hide()
    })
})