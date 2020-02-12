var capTableData = {
    names:["Juan Ramírez","Julia Pérez","Oscar Gómez"],
    classes:{
      classI: {
        seriesE: {
          "Juan Ramírez": 300000
        },
        seriesF: {
          "Juan Ramírez": 100000,
          "Julia Pérez": 50000,
          "Oscar Gómez": 100000
        },
        seriesR: {
          "Julia Pérez": 100000
        }
      },
      classII: {
        seriesE: {
          "Juan Ramírez": 100000
        },
        seriesF: {
          "Julia Pérez": 50000,
          "Oscar Gómez": 100000
        }
      },
      classIII: {
        seriesA: {
          "Juan Ramírez": 25000
        },
        seriesE: {
          "Oscar Gómez": 50000
        },
        seriesF: {},
        seriesL: {
          "Julia Pérez": 50000
        },
        seriesR: {
          "Juan Ramírez": 25000,
          "Oscar Gómez": 50000
        }
      }
    },
    percentCap:{
      "Juan Ramírez": 50,
      "Julia Pérez": 20,
      
    }
  };

// build capTable from JSON
function buildTable(capTableData){

    $.each( capTableData.names, function( i, name ) {
       
        $("#names-column").append( '<div class="border-top">'+name+'</div>' );  
        $("#percent-column").append( '<div class="border-top" id="percent'+i+'">0 % </div>' ); 
         
        $.each(capTableData.percentCap, function( j, percent) {
            if(name===j){
                $('#percent'+i).html(percent+'%' );  
            
            }
        }); 
     }); 
     
    
}

//Delete sub table Series 
function deleteSubTable(numClass){
  var classesArray= Object.entries(capTableData.classes);
  var seriesArray=Object.entries(classesArray[numClass][1]);

  nameClass=classesArray[numClass][0];

  $('#'+nameClass+'-table').html(''); 
}

//Map  JSON and build sub table Series

function buildSubtable(capTableData,numClass){
  var classesArray= Object.entries(capTableData.classes);
  var seriesArray=Object.entries(classesArray[numClass][1]);

  console.log(classesArray[numClass][0]);

  $('#'+classesArray[numClass][0]+'-table').append('<table id="classTable" class="sub-tables-class">' ); 
  $('#'+classesArray[numClass][0]+'-table table').append('<tr  class="border-top" id="seriesTitle"></tr>');
  
  
  $.each(seriesArray, function( i, nameSerie) {
    var nameSeries=nameSerie[0];
    var namesArray=Object.entries(nameSerie[1]);
    console.log(nameSeries);
    $("#seriesTitle").append('<th>'+nameSeries+'</th>');
   
  });
  
  $.each( capTableData.names, function( i, name ) {
    $('#'+classesArray[numClass][0]+'-table table').append( '<tr  class="border-top" id=name-'+i+'></tr>' );
    

    $.each(seriesArray, function( j, nameSerie) {
      var nameSeries=nameSerie[0];
      var namesArray=Object.entries(nameSerie[1]);
      $("#name-"+i).append( '<td id='+nameSeries+i+'> - </td>' );
      
        for (let [key, value] of namesArray) {
          if(name===key){
            console.log('name'+name+' key '+key);
            $("#"+nameSeries+i).html( value);  
          }
        }
     
  });
  });

  $('#'+classesArray[numClass][0]+'-table table').append('</tr>');
  $('#'+classesArray[numClass][0]+'-table').append('</table>' );  
}
  

$(function(){

buildTable(capTableData);


//collapse classI column
$('#collapse-classI').on('show.bs.collapse', function () {

      $('#classI-title').css({'transform' : 'rotate(360deg)'});
      $('#classI-title').css({'text-align' : 'center'});
      $('#classI').css({'background-color':'#E8E8E8'});

      // show and hidde spinner

     $('#spinner-classI').css({'visibility':'visible'});
     setTimeout(function(){ 
      $('#spinner-classI').css({'visibility':'hidden'});
      buildSubtable(capTableData, 0); }, 800);
     
          
  })
  
  $('#collapse-classI').on('hidden.bs.collapse', function () {
  
      $('#classI-title').css({'transform' : 'rotate(270deg)'});
      $('#classI').css({'background-color':'#F0F0F0'});
      deleteSubTable(0);
  })

  //collapse classII column
$('#collapse-classII').on('show.bs.collapse', function () {

  $('#classII-title').css({'transform' : 'rotate(360deg)'});
  $('#classII-title').css({'text-align' : 'center'});
  $('#classII').css({'background-color':'#E8E8E8'});
  
  // show and hidde spinner

  $('#spinner-classII').css({'visibility':'visible'});
  setTimeout(function(){ 
   $('#spinner-classII').css({'visibility':'hidden'});
   buildSubtable(capTableData, 1); }, 800);
})

$('#collapse-classII').on('hidden.bs.collapse', function () {

  $('#classII-title').css({'transform' : 'rotate(270deg)'});
  $('#classII').css({'background-color':'#F0F0F0'});
  deleteSubTable(1);
})

//collapse classIII column
$('#collapse-classIII').on('show.bs.collapse', function () {

  $('#classIII-title').css({'transform' : 'rotate(360deg)'});
  $('#classII-title').css({'text-align' : 'center'});
  $('#classIII').css({'background-color':'#E8E8E8'});
  // show and hidde spinner

  $('#spinner-classIII').css({'visibility':'visible'});
  setTimeout(function(){ 
   $('#spinner-classIII').css({'visibility':'hidden'});
   buildSubtable(capTableData, 2); }, 800);

})

$('#collapse-classIII').on('hidden.bs.collapse', function () {

  $('#classIII-title').css({'transform' : 'rotate(270deg)'});
  $('#classIII').css({'background-color':'#F0F0F0'});
  deleteSubTable(2);
})

})
