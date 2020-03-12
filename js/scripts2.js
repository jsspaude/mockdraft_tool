$(document).ready(function() {

    fetch('js/draft_data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
        
    var id = 0;
    
    function appendData(data) {
        var mainContainer = document.getElementById("myData");
        for (var i = 0; i < data.length; i++) {
            var row = document.createElement("tr");
            var pos = data[i].pos;
            var name = data[i].name;
            var teamname = data[i].team;
            var nameNoSpace = name.replace(/\s+/g, '');
            var nameShort = nameNoSpace.replace(/[^a-z0-9\s]/gi, '');
            row.innerHTML = "<td class='player-data'>" + data[i].adp + "</td>" + "<td class='player-data'>" + data[i].overall + "</td>" + "<td class='player-data player-name" + "'>" + data[i].name + "</td>" + "<td class='player-data'>" + data[i].pos + "</td>" + "<td class='player-data'>" + data[i].team + "</td>" + "<td class='player-data'>" + data[i].stddev + "</td>" + "<td class='player-data'>" + data[i].high + "</td>" + "<td class='player-data'>" + data[i].low + "</td>" + "<button class='player-data draft " + nameShort +  "'"  + "data-pos='" + pos + "'" + "data-teamname='" + teamname + "'" + "data-id='" + id + "'" + "data-name='" + name + "'>" + "draft" + "</button>";
            mainContainer.appendChild(row);
            id++;
            $(row).addClass(nameShort);
            $(".name").addClass('name');
        }
    }
    
    var team = 0;
    var round = 1;
    var flag = false;
    var totalTeams = 14;
    var teamName="";
   
    $(".round").html(round);
    $("#playerList").on("click", "button", function(){
    
        var pos = $(this).data('pos');
        var position = pos.toLowerCase();
        var input = $(this).data('name');
        var nflTeam = $(this).data('teamname');
        
        $("#tracker").attr('data-currentPos', position);
        $("#tracker").attr('data-currentName', input);
        $("td").removeClass("currentDrafted");
        teamCountA();
        currentTeamName();
        keeperCount();
        isEven();
        totalCountA();
        posCountA();
        flexCountA();
        benchCountA();
        $(".currentPlayer").html(input + "&nbsp|&nbsp" + pos + "&nbsp|&nbsp" + nflTeam);
        $(this).parent().addClass('gone');
        console.log(team);
    });

    function keeperCount(){
        if(round==1){
            switch (team){
        
                case 4:
                    team++;
        
                case 5:
                    team++;
        
                case 6:
                    team++;
        
                case 7:
                    team++;
        
                case 8:
                    team++;
        
                case 9:
                    team++;
                
                case 10:
                    team++;
        
                case 11:
                    team++;
        
                case 12:
                    team++;
        
                case 13:
                    team++;
            }
        }

        if(round==3){
            switch (team){
                case 1:
                    team=2;
                    return team;

                case 9:
                    team++;
            }
        }

        if(round==7){
            switch(team){
                case 5:
                    team++;
            }
        }

        if(round==8){
            switch(team){
                case 2:
                    team--;
            }
        }

        if(round==9){
            switch(team){
                case 11:
                    team++;
            }
        }

        if(round==10){
            switch(team){
                case 7:
                    team--;
            }
        }

        if(round==13){
            switch(team){
                case 1:
                    team=2;
                    return team;
                
                case 13:
                    team++;

                case 14:
                    team=14;
                    return team;
            }    
        }

        if(round==14){
            switch(team){
                case 12:
                    team--;
            }
        }

        if(round==15){
            switch(team){
                case 6:
                    team++;
                
                case 8:
                    team++;
            }
        }
    }

    function currentTeamName(){
        currentTeamText=$("#" + "team" + team).children('h2');
        currentTeam=currentTeamText.html();
        $(".currentTeam").html(currentTeam + " drafted:");
        console.log(currentTeam);
    }

    function teamCountA(){
        if(flag==false){
            team++;
        } 
            else{
            team --;
            }
        if(team == 15 || team == 0){
            round ++;
            $(".round").html(round);
        }
        
        if(team == 15){
            team = 14;
        }

        if(team == 0){
            team = 1;
        }
    }
    function isEven(){
        if (round%2 == 0){
            flag = true;
        }
        else{
            flag = false;
        }
    }

    function totalCountA(){
        var totalAttr = $("#" + "team" + team).attr("data-total");
        var totalCount = parseInt(totalAttr);
        totalCount++;
        $("#" + "team" + team).attr("data-total", totalCount);
        
        if(totalCount > 15){
            window.alert('Your Draft is Over');
        }
    }

    function posCountA(){
        var inputText = $("#tracker").attr('data-currentName');
        var posText = $("#tracker").attr('data-currentPos');
        var posAttr = $("#" + "team" + team).attr("data-" + posText);
        var posCount = parseInt(posAttr);

        posCount++;
        $("#" + "team" + team).attr("data-" + posText, posCount);
        if(posCount==1){
        $("." + team + posText + "1").html(inputText);
        $("." + team + posText + "1").addClass("currentDrafted");
        $("." + team + posText + "1" + "r").html(round);
        }
            else if(posCount==2){
            $("." + team + posText + "2").html(inputText);
            $("." + team + posText + "2").addClass("currentDrafted");
            $("." + team + posText + "2" + "r").html(round);
            }
    }

    function flexCountA(){
        var inputText = $("#tracker").attr('data-currentName');
        var posText = $("#tracker").attr('data-currentPos');
        var posAttr = $("#" + "team" + team).attr("data-" + posText);
        var posCount = parseInt(posAttr);
        var flexAttr = $("#" + "team" + team).attr("data-flex");
        var flexCount = parseInt(flexAttr);
        if(posCount==3 && flexCount==0){
            $("." + team + posText + "3").html(inputText);
            $("." + team + posText + "3").addClass("currentDrafted");
            $("." + team + posText + "3" + "r").html(round);
            flexCount++;
            $("#" + "team" + team).attr("data-flex", flexCount);
        }
    }

    function benchCountA(posCount, benchAttr){
        var inputText = $("#tracker").attr('data-currentName');
        var posText = $("#tracker").attr('data-currentPos');
        var posAttr = $("#" + "team" + team).attr("data-" + posText);
        var posCount = parseInt(posAttr);
        var benchAttr = $("#" + "team" + team).attr("data-bench");
        var benchCount = parseInt(benchAttr);
        var flexAttr = $("#" + "team" + team).attr("data-flex");
        var flexCount = parseInt(flexAttr);
        if(posCount > 2){
            benchCount++;
            $("#" + "team" + team).attr("data-bench", benchCount);
            $("." + team + "bench" + benchCount).html(inputText);
            $("." + team + "bench" + benchCount).addClass("currentDrafted");
            $("." + team + "bench" + benchCount + "r").html(round);
        }
    }
});