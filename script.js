$( document ).ready(function(){
    var longitude;
    var latitude;
    var url ;
    if ( navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            
            longitude= position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            
            url = 'https://api.foursquare.com/v2/venues/search?ll='+latitude+','+longitude+'&categoryId=4d4b7105d754a06374d81259&oauth_token=LTOAHM2P1VEGKHBZUECE2L0MCQUM24FBW440M2SZ1KJT3QKJ&v=20170221';
            
            $.getJSON(url,function(data){
                
            var cate= [];
                
            data.response.venues.forEach(function(element){
               cate.push(element.categories[0].name); 
            });
                
            var unique = cate.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
            
            var categorization = [];
            var html = "";
            var cateo = "";
            for ( var i = 0 ; i < unique.length ; i ++){
                cateo += "<a class='btn btn-default' href='#"+i+"' role='button'>"+ unique[i]+"<a/>";
                html += "<div class='item'>";
                html += "<a id='category' name='"+i+"'>"+unique[i]+"</a>";
                console.log(unique[i]);
                data.response.venues.forEach(function(elemento){
                    if(elemento.categories[0].name === unique[i]){
                        html += "<div class='inner-content'>";
                        html += "<h4>"+elemento.name+"</h4>";
                        if(elemento.location.formattedAddress){
                            html += "<p>"+elemento.location.formattedAddress[0]+"</p>";
                        }else{
                            html += "<p>No Address Added</p>";
                        }
                        
                        html += "<a href='http://maps.google.com/?q="+elemento.location.lat+','+elemento.location.lng+"' target='_blank' class='location'>see the location on the map</a>";
                        html += "</div>";
                        //console.log(elemento.name);
                        //console.log(elemento.location.formattedAddress[0]);
                    }
                });
                
                html += "</div>";   
                $("#categories").html(cateo);
                $(".results").html(html);
            }
            });
        })
    };
});
/*
for each category 
 add the category name 
----
add the category 
*/
